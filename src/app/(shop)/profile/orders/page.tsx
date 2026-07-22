import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Package, MessageSquare } from "lucide-react"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { transformOrder } from "@/lib/transformers"
import { whatsappLink } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShalomTracker } from "@/components/shipping/ShalomTracker"
import { BoletaButton } from "@/components/orders/BoletaButton"
import type { OrderStatusType, ShippingType } from "@/types"

export const dynamic = "force-dynamic"

const statusConfig: Record<OrderStatusType, { label: string; className: string }> = {
  PENDING_PAYMENT: { label: "Pendiente de pago", className: "bg-[#FFF5D1] text-[#8a6d00]" },
  VERIFYING_MANUAL: { label: "Verificando pago", className: "bg-[#E1F0FF] text-[#142F5C]" },
  PAID_APPROVED: { label: "Pago aprobado", className: "bg-[#E2FBE9] text-[#1E7E34]" },
  REJECTED: { label: "Pago rechazado", className: "bg-[#FFEAEA] text-red-600" },
  CANCELLED: { label: "Cancelado", className: "bg-[#FFEAEA] text-red-600" },
  COMPLETED: { label: "Completado", className: "bg-[#E2FBE9] text-[#1E7E34]" },
}

const shippingLabels: Record<ShippingType, string> = {
  PICKUP: "Recojo en Tienda",
  LOCAL_DELIVERY: "Motorizado (Lima)",
  NATIONAL_COURIER: "Courier a Provincia (Olva/Shalom)",
}

export default async function OrdersPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const rawOrders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      items: { include: { product: { select: { name: true, images: true } } } },
    },
    orderBy: { createdAt: "desc" },
  })

  const orders = rawOrders.map(transformOrder)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Mis Pedidos</h2>
        <p className="text-muted-foreground">
          Historial de compras con su código de proceso único
        </p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">Aún no tienes pedidos</p>
              <p className="text-sm text-muted-foreground">
                Cuando compres una figura, aparecerá aquí con su código de seguimiento.
              </p>
            </div>
            <Button asChild>
              <Link href="/products">Explorar catálogo</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status]
            return (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <CardTitle className="font-mono text-base">
                        {order.processCode}
                      </CardTitle>
                      <CardDescription>
                        {new Date(order.createdAt).toLocaleDateString("es-PE", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                        · {shippingLabels[order.shippingType]}
                      </CardDescription>
                    </div>
                    <Badge className={status.className}>{status.label}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={item.image ?? "/Imagenes/Mascota BLUE.png"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          x{item.quantity} · S/ {item.price.toFixed(2)} c/u
                        </p>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Total: </span>
                      <span className="font-bold text-primary">
                        S/ {order.totalAmount.toFixed(2)}
                      </span>
                      {order.shippingType !== "NATIONAL_COURIER" &&
                        order.trackingNumber && (
                          <p className="text-xs text-muted-foreground">
                            Tracking:{" "}
                            <span className="font-mono font-medium">
                              {order.trackingNumber}
                            </span>
                          </p>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <BoletaButton order={order} />
                      <Button asChild size="sm" variant="outline" className="gap-2">
                        <a
                          href={whatsappLink(
                            `¡Hola! Quiero consultar por mi pedido *${order.processCode}* (${shippingLabels[order.shippingType]}). ✨`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageSquare className="h-4 w-4 text-[#25D366]" />
                          Coordinar por WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>

                  {/* Rastreo Shalom para envíos a provincia */}
                  {order.shippingType === "NATIONAL_COURIER" && (
                    <ShalomTracker trackingNumber={order.trackingNumber} />
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
