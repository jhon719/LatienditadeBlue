import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

// Centro de notificaciones del admin (bóveda 05.01/05.02): conteos EN VIVO
// derivados de las tablas existentes — sin tabla de notificaciones propia. La
// campana del header hace polling a este endpoint.
export async function GET() {
  const { response } = await requireAdmin()
  if (response) return response

  const [pendingVouchers, pendingAbonos, lowStock, outOfStock, pendingShipments] =
    await Promise.all([
      prisma.paymentProof.count({ where: { status: "PENDING" } }),
      prisma.separationPayment.count({ where: { status: "PENDING" } }),
      prisma.product.count({
        where: { isActive: true, status: "STOCK", stockQty: { gte: 1, lte: 5 } },
      }),
      prisma.product.count({
        where: {
          isActive: true,
          OR: [{ status: "AGOTADO" }, { status: "STOCK", stockQty: 0 }],
        },
      }),
      prisma.order.count({
        where: { status: "PAID_APPROVED", shippingStatus: "PREPARING" },
      }),
    ])

  const items = [
    {
      key: "abonos",
      label: "Abonos de separación por validar",
      count: pendingAbonos,
      href: "/admin/manual-payments",
      tone: "warning" as const,
    },
    {
      key: "vouchers",
      label: "Comprobantes de pedido por validar",
      count: pendingVouchers,
      href: "/admin/manual-payments",
      tone: "warning" as const,
    },
    {
      key: "shipments",
      label: "Pedidos por despachar",
      count: pendingShipments,
      href: "/admin/orders",
      tone: "info" as const,
    },
    {
      key: "outOfStock",
      label: "Productos agotados",
      count: outOfStock,
      href: "/admin",
      tone: "critical" as const,
    },
    {
      key: "lowStock",
      label: "Productos con stock bajo",
      count: lowStock,
      href: "/admin",
      tone: "warning" as const,
    },
  ].filter((i) => i.count > 0)

  // El badge resalta la cola operativa (validaciones + despachos), lo urgente.
  // El stock aparece en el listado pero no infla el badge (evita alerta permanente).
  const badgeCount = pendingVouchers + pendingAbonos + pendingShipments

  return NextResponse.json({ items, badgeCount })
}
