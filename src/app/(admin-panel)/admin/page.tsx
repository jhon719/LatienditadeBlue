import Link from "next/link"
import {
  DollarSign,
  Inbox,
  PackageCheck,
  CalendarClock,
  PackageX,
  ArrowUpRight,
  Map,
} from "lucide-react"
import { prisma } from "@/lib/prisma"
import { releaseAbandonedStock } from "@/lib/release-stock"
import {
  getKpis,
  getCashFlowSeries,
  getLogisticsDonut,
  getCustomerMap,
  type TimeRange,
} from "@/lib/analytics"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { CashFlowChart } from "@/components/admin/charts/CashFlowChart"
import { LogisticsDonut } from "@/components/admin/charts/LogisticsDonut"
import { PeruHeatMap } from "@/components/admin/charts/PeruHeatMap"

export const dynamic = "force-dynamic"

const statusLabels: Record<string, { label: string; className: string }> = {
  PENDING_PAYMENT: { label: "Pendiente pago", className: "bg-[#FFF5D1] text-[#8a6d00]" },
  VERIFYING_MANUAL: { label: "Verificando", className: "bg-[#E1F0FF] text-[#142F5C]" },
  PAID_APPROVED: { label: "Pagado", className: "bg-[#E2FBE9] text-[#1E7E34]" },
  REJECTED: { label: "Rechazado", className: "bg-[#FFEAEA] text-red-600" },
  CANCELLED: { label: "Cancelado", className: "bg-[#FFEAEA] text-red-600" },
  COMPLETED: { label: "Completado", className: "bg-[#E2FBE9] text-[#1E7E34]" },
}

// Selector de tiempo de los KPIs (bóveda 05.01 Flujo 1)
const RANGES: { value: TimeRange; label: string }[] = [
  { value: "today", label: "Hoy" },
  { value: "7d", label: "7 días" },
  { value: "30d", label: "30 días" },
  { value: "1y", label: "1 año" },
]

// Dashboard del Centro de Mando (bóveda 05.01)
export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  // Limpieza oportunista de abandonos (bóveda 06.01 §4)
  await releaseAbandonedStock().catch(() => {})

  const params = await searchParams
  const range: TimeRange = (
    ["today", "7d", "30d", "1y"] as TimeRange[]
  ).includes(params.range as TimeRange)
    ? (params.range as TimeRange)
    : "30d"

  const [kpis, cashFlow, logistics, customerMap, lowStock, recentOrders] =
    await Promise.all([
      getKpis(range),
      getCashFlowSeries(range),
      getLogisticsDonut(),
      getCustomerMap(),
      prisma.product.findMany({
        where: { isActive: true, status: "STOCK", stockQty: { lte: 2, gt: 0 } },
        select: { id: true, name: true, stockQty: true },
        take: 5,
      }),
      prisma.order.findMany({
        include: { user: { select: { username: true } } },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
    ])

  const criticalTasks = kpis.pendingProofs + kpis.pendingShipments

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Centro de mando de La Tiendita de Blue
          </p>
        </div>

        {/* Selector de rango */}
        <div className="flex gap-1 rounded-full border bg-card p-1">
          {RANGES.map((r) => (
            <Link
              key={r.value}
              href={`/admin?range=${r.value}`}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold transition-colors",
                range === r.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {r.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Flujo 1: KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnimatedContent>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ingresos totales
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl tracking-wide">
                S/ {kpis.totalRevenue.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">
                pedidos aprobados en el rango
              </p>
            </CardContent>
          </Card>
        </AnimatedContent>

        <AnimatedContent delay={60}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Ventas completadas
              </CardTitle>
              <PackageCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl tracking-wide">
                {kpis.completedSales}
              </p>
              <p className="text-xs text-muted-foreground">cajas entregadas</p>
            </CardContent>
          </Card>
        </AnimatedContent>

        <AnimatedContent delay={120}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Capital en preventas
              </CardTitle>
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl tracking-wide">
                S/ {kpis.preorderCapital.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">
                liquidez retenida por entregar
              </p>
            </CardContent>
          </Card>
        </AnimatedContent>

        <AnimatedContent delay={180}>
          <Link href="/admin/manual-payments">
            <Card className="transition-colors hover:border-primary">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Tareas críticas
                </CardTitle>
                <PackageX className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p
                  className={cn(
                    "font-display text-3xl tracking-wide",
                    criticalTasks > 0 && "text-red-500"
                  )}
                >
                  {criticalTasks}
                </p>
                <p className="text-xs text-muted-foreground">
                  {kpis.pendingProofs} vouchers + {kpis.pendingShipments} despachos
                </p>
              </CardContent>
            </Card>
          </Link>
        </AnimatedContent>
      </div>

      {/* Flujo 2 y 3: área de flujo de caja + donut logístico */}
      <div className="grid gap-4 lg:grid-cols-5">
        <AnimatedContent className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Flujo de caja</CardTitle>
              <CardDescription>
                Ingresos por ventas de stock vs. preventas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CashFlowChart data={cashFlow} />
            </CardContent>
          </Card>
        </AnimatedContent>

        <AnimatedContent delay={80} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Estado logístico</CardTitle>
              <CardDescription>Todas las órdenes por estado de envío</CardDescription>
            </CardHeader>
            <CardContent>
              <LogisticsDonut data={logistics} />
            </CardContent>
          </Card>
        </AnimatedContent>
      </div>

      {/* Flujo 4: mapa de calor nacional */}
      <AnimatedContent>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" /> Clientes por departamento
            </CardTitle>
            <CardDescription>
              Cada región se tiñe según los clientes registrados en esa zona (dato
              del perfil del usuario)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PeruHeatMap stats={customerMap} />
          </CardContent>
        </Card>
      </AnimatedContent>

      <div className="grid gap-4 lg:grid-cols-7">
        {/* Últimos pedidos */}
        <Card className="lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Pedidos recientes</CardTitle>
              <CardDescription>Los últimos movimientos de la tienda</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/orders">
                Ver todos <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Aún no hay pedidos
              </p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-sm font-bold">{order.processCode}</p>
                    <p className="text-xs text-muted-foreground">
                      @{order.user.username} ·{" "}
                      {order.createdAt.toLocaleDateString("es-PE")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold">
                      S/ {Number(order.totalAmount).toFixed(2)}
                    </span>
                    <Badge className={statusLabels[order.status]?.className ?? ""}>
                      {statusLabels[order.status]?.label ?? order.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Alertas de stock bajo (bóveda 05.03) */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Stock bajo</CardTitle>
            <CardDescription>
              Figuras populares que se están agotando
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStock.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Todo el inventario está saludable ✨
              </p>
            ) : (
              lowStock.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg border border-[#FFF5D1] bg-[#FFF5D1]/30 p-3"
                >
                  <p className="text-sm font-medium">{product.name}</p>
                  <Badge className="bg-[#FFEAEA] text-red-600">
                    Quedan {product.stockQty}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alerta tipo campana (bóveda 05.01 §2A) */}
      {kpis.pendingProofs > 0 && (
        <Link
          href="/admin/manual-payments"
          className="flex items-center gap-3 rounded-2xl border-2 border-dashed border-[#F5B400] bg-[#FFF5D1]/40 p-4 text-sm font-semibold text-[#8a6d00] transition-colors hover:bg-[#FFF5D1]/70 dark:bg-[#FFF5D1]/10"
        >
          <Inbox className="h-5 w-5" />
          Hay {kpis.pendingProofs}{" "}
          {kpis.pendingProofs === 1 ? "voucher esperando" : "vouchers esperando"}{" "}
          tu aprobación en la Bandeja POS →
        </Link>
      )}
    </div>
  )
}
