import { prisma } from "@/lib/prisma"

// Queries de analítica del Centro de Mando (bóveda 05.01).
// Se ejecutan en Server Components con Prisma directo — data 100% fresca.

export type TimeRange = "today" | "7d" | "30d" | "1y"

export function rangeToDate(range: TimeRange): Date {
  const now = new Date()
  switch (range) {
    case "today": {
      const d = new Date(now)
      d.setHours(0, 0, 0, 0)
      return d
    }
    case "7d":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    case "30d":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    case "1y":
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
  }
}

const PAID_STATUSES = ["PAID_APPROVED", "COMPLETED"] as const

// ---------- Flujo 1: KPIs (bóveda 05.01 Flujo 1) ----------

export interface DashboardKpis {
  totalRevenue: number
  completedSales: number
  preorderCapital: number
  pendingProofs: number
  pendingShipments: number
}

export async function getKpis(range: TimeRange): Promise<DashboardKpis> {
  const since = rangeToDate(range)

  const [revenue, completedSales, preorderOrders, pendingProofs, pendingShipments] =
    await Promise.all([
      prisma.order.aggregate({
        where: { status: { in: [...PAID_STATUSES] }, createdAt: { gte: since } },
        _sum: { totalAmount: true },
      }),
      prisma.order.count({
        where: { status: "COMPLETED", createdAt: { gte: since } },
      }),
      // Capital retenido en preventas: órdenes pagadas aún sin entregar
      // que incluyen al menos una figura en PREVENTA
      prisma.order.findMany({
        where: {
          status: "PAID_APPROVED",
          items: { some: { product: { status: "PREVENTA" } } },
        },
        select: { totalAmount: true },
      }),
      prisma.paymentProof.count({ where: { status: "PENDING" } }),
      prisma.order.count({
        where: { status: "PAID_APPROVED", shippingStatus: "PREPARING" },
      }),
    ])

  return {
    totalRevenue: Number(revenue._sum.totalAmount ?? 0),
    completedSales,
    preorderCapital: preorderOrders.reduce(
      (acc, o) => acc + Number(o.totalAmount),
      0
    ),
    pendingProofs,
    pendingShipments,
  }
}

// ---------- Flujo 2: Área suavizada de flujo de caja ----------

export interface CashFlowPoint {
  date: string // etiqueta corta para el eje X
  stock: number // ingresos por ventas de stock inmediato
  preventa: number // ingresos por órdenes con preventas
}

export async function getCashFlowSeries(range: TimeRange): Promise<CashFlowPoint[]> {
  const since = rangeToDate(range)
  const orders = await prisma.order.findMany({
    where: { status: { in: [...PAID_STATUSES] }, createdAt: { gte: since } },
    select: {
      totalAmount: true,
      createdAt: true,
      items: { select: { product: { select: { status: true } } } },
    },
    orderBy: { createdAt: "asc" },
  })

  // Agrupar por día (o por mes si el rango es 1 año)
  const byMonth = range === "1y"
  const buckets = new Map<string, { stock: number; preventa: number }>()

  for (const order of orders) {
    const d = order.createdAt
    const key = byMonth
      ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      : d.toISOString().slice(0, 10)
    const bucket = buckets.get(key) ?? { stock: 0, preventa: 0 }
    const isPreorder = order.items.some((i) => i.product.status === "PREVENTA")
    if (isPreorder) bucket.preventa += Number(order.totalAmount)
    else bucket.stock += Number(order.totalAmount)
    buckets.set(key, bucket)
  }

  return [...buckets.entries()].map(([key, value]) => ({
    date: byMonth
      ? new Date(`${key}-01T12:00:00`).toLocaleDateString("es-PE", {
          month: "short",
          year: "2-digit",
        })
      : new Date(`${key}T12:00:00`).toLocaleDateString("es-PE", {
          day: "numeric",
          month: "short",
        }),
    stock: Math.round(value.stock * 100) / 100,
    preventa: Math.round(value.preventa * 100) / 100,
  }))
}

// ---------- Flujo 3: Donut de estado logístico ----------

export interface LogisticsSlice {
  key: "delivered" | "pending" | "transit" | "cancelled"
  label: string
  count: number
}

export async function getLogisticsDonut(): Promise<LogisticsSlice[]> {
  const [delivered, pending, transit, cancelled] = await Promise.all([
    prisma.order.count({
      where: {
        OR: [{ status: "COMPLETED" }, { shippingStatus: "DELIVERED" }],
      },
    }),
    prisma.order.count({
      where: { status: "PAID_APPROVED", shippingStatus: "PREPARING" },
    }),
    prisma.order.count({
      where: { status: "PAID_APPROVED", shippingStatus: "SHIPPED" },
    }),
    prisma.order.count({ where: { status: { in: ["REJECTED", "CANCELLED"] } } }),
  ])

  return [
    { key: "delivered", label: "Entregado", count: delivered },
    { key: "pending", label: "Pendiente de envío", count: pending },
    { key: "transit", label: "En tránsito", count: transit },
    { key: "cancelled", label: "Cancelado / Rechazado", count: cancelled },
  ]
}

// ---------- Flujo 4: Mapa de calor por departamento del cliente ----------

export interface DepartmentStat {
  code: string // NOMBDEP del GeoJSON (ej. "AREQUIPA")
  customers: number
  totalSpent: number
}

export async function getCustomerMap(): Promise<DepartmentStat[]> {
  const users = await prisma.user.findMany({
    where: { role: "CUSTOMER", department: { not: null } },
    select: {
      department: true,
      orders: {
        where: { status: { in: [...PAID_STATUSES] } },
        select: { totalAmount: true },
      },
    },
  })

  const byDept = new Map<string, { customers: number; totalSpent: number }>()
  for (const user of users) {
    const code = user.department!
    const entry = byDept.get(code) ?? { customers: 0, totalSpent: 0 }
    entry.customers += 1
    entry.totalSpent += user.orders.reduce((acc, o) => acc + Number(o.totalAmount), 0)
    byDept.set(code, entry)
  }

  return [...byDept.entries()]
    .map(([code, v]) => ({ code, ...v, totalSpent: Math.round(v.totalSpent * 100) / 100 }))
    .sort((a, b) => b.customers - a.customers)
}
