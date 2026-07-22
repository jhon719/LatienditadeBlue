import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BadgeCheck } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserAvatar } from "@/components/common/UserAvatar"
import { CrmPanel } from "@/components/admin/CrmPanel"
import { ContactBadges } from "@/components/admin/ContactBadges"

export const dynamic = "force-dynamic"

const statusLabels: Record<string, { label: string; className: string }> = {
  PENDING_PAYMENT: { label: "Pendiente pago", className: "bg-[#FFF5D1] text-[#8a6d00]" },
  VERIFYING_MANUAL: { label: "Verificando", className: "bg-[#E1F0FF] text-[#142F5C]" },
  PAID_APPROVED: { label: "Pagado", className: "bg-[#E2FBE9] text-[#1E7E34]" },
  REJECTED: { label: "Rechazado", className: "bg-[#FFEAEA] text-red-600" },
  CANCELLED: { label: "Cancelado", className: "bg-[#FFEAEA] text-red-600" },
  COMPLETED: { label: "Completado", className: "bg-[#E2FBE9] text-[#1E7E34]" },
}

// Ficha 360° del cliente (bóveda 05.04 §3)
export default async function CustomerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { response } = await requireAdmin()
  if (response) notFound()

  const { id } = await params
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      orders: {
        include: { items: { include: { product: { select: { name: true } } } } },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { reviews: true } },
    },
  })

  if (!user) notFound()

  const totalSpent = user.orders
    .filter((o) => ["PAID_APPROVED", "COMPLETED"].includes(o.status))
    .reduce((acc, o) => acc + Number(o.totalAmount), 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/users">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <UserAvatar
            username={user.username}
            avatarFileName={user.avatarFileName}
            size={48}
          />
          <div>
            <h1 className="text-2xl font-bold">@{user.username}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {/* Datos y stats */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total invertido</CardDescription>
                <CardTitle className="text-2xl">S/ {totalSpent.toFixed(2)}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pedidos</CardDescription>
                <CardTitle className="text-2xl">{user.orders.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Reseñas</CardDescription>
                <CardTitle className="text-2xl">{user._count.reviews}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Datos de contacto y envío</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">Nombre</dt>
                  <dd className="font-medium">
                    {user.firstName || user.lastName
                      ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
                      : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">DNI</dt>
                  <dd className="font-medium">{user.dni ?? "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Teléfono</dt>
                  <dd className="font-medium">{user.phone ?? "—"}</dd>
                  <ContactBadges phone={user.phone} whatsappMessage={`¡Hola @${user.username}! Te escribo desde La Tiendita de Blue. ✨`} />
                </div>
                <div>
                  <dt className="text-muted-foreground">Marketing opt-in</dt>
                  <dd className="font-medium">
                    {user.marketingOptIn ? (
                      <span className="flex items-center gap-1 text-[#1E7E34]">
                        <BadgeCheck className="h-4 w-4" /> Acepta promociones
                      </span>
                    ) : (
                      "No suscrito"
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">TikTok</dt>
                  <dd className="font-medium">{user.tiktokUsername ?? "—"}</dd>
                  <ContactBadges tiktokUsername={user.tiktokUsername} />
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-muted-foreground">Dirección</dt>
                  <dd className="font-medium">{user.address ?? "—"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Historial de compras (bóveda 05.04 §3) */}
          <Card>
            <CardHeader>
              <CardTitle>Historial de compras</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {user.orders.length === 0 ? (
                <p className="py-4 text-center text-sm text-muted-foreground">
                  Aún no tiene pedidos
                </p>
              ) : (
                user.orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3"
                  >
                    <div>
                      <p className="font-mono text-sm font-bold">
                        {order.processCode}
                      </p>
                      <p className="max-w-md truncate text-xs text-muted-foreground">
                        {order.items.map((i) => i.product.name).join(", ")}
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
        </div>

        {/* Panel CRM editable + plantillas */}
        <CrmPanel
          userId={user.id}
          username={user.username}
          firstName={user.firstName}
          phone={user.phone}
          initialTier={user.loyaltyTier}
          initialNotes={user.adminNotes ?? ""}
        />
      </div>
    </div>
  )
}
