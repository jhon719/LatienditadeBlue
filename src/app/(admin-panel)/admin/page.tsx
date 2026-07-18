import Link from "next/link"
import {
  DollarSign,
  Inbox,
  CalendarClock,
  PackageX,
  ArrowUpRight,
} from "lucide-react"
import { prisma } from "@/lib/prisma"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

const statusLabels: Record<string, { label: string; className: string }> = {
  PENDING_PAYMENT: { label: "Pendiente pago", className: "bg-[#FFF5D1] text-[#8a6d00]" },
  VERIFYING_MANUAL: { label: "Verificando", className: "bg-[#E1F0FF] text-[#142F5C]" },
  PAID_APPROVED: { label: "Pagado", className: "bg-[#E2FBE9] text-[#1E7E34]" },
  REJECTED: { label: "Rechazado", className: "bg-[#FFEAEA] text-red-600" },
  CANCELLED: { label: "Cancelado", className: "bg-[#FFEAEA] text-red-600" },
  COMPLETED: { label: "Completado", className: "bg-[#E2FBE9] text-[#1E7E34]" },
}

// Dashboard del Centro de Mando (bóveda 05.01)
export default async function AdminDashboardPage() {
  const [revenue, pendingProofs, activePreorders, lowStock, recentOrders, pendingShipments] =
    await Promise.all([
      prisma.order.aggregate({
        where: { status: { in: ["PAID_APPROVED", "COMPLETED"] } },
        _sum: { totalAmount: true },
      }),
      prisma.paymentProof.count({ where: { status: "PENDING" } }),
      prisma.product.count({ where: { status: "PREVENTA", isActive: true } }),
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
      prisma.order.count({
        where: { status: "PAID_APPROVED", shippingStatus: "PREPARING" },
      }),
    ])

  const totalRevenue = Number(revenue._sum.totalAmount ?? 0)
  const criticalTasks = pendingProofs + pendingShipments

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Centro de mando de La Tiendita de Blue
        </p>
      </div>

      {/* KPIs (bóveda 05.01) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ingresos aprobados
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">S/ {totalRevenue.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Link href="/admin/manual-payments">
          <Card className="transition-colors hover:border-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Vouchers por revisar
              </CardTitle>
              <Inbox className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p
                className={`text-2xl font-bold ${pendingProofs > 0 ? "text-orange-500" : ""}`}
              >
                {pendingProofs}
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Preventas activas
            </CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{activePreorders}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tareas críticas
            </CardTitle>
            <PackageX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p
              className={`text-2xl font-bold ${criticalTasks > 0 ? "text-red-500" : ""}`}
            >
              {criticalTasks}
            </p>
            <p className="text-xs text-muted-foreground">
              vouchers + despachos pendientes
            </p>
          </CardContent>
        </Card>
      </div>

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
    </div>
  )
}
