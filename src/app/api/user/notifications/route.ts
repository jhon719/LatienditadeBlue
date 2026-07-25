import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/api-guards"

// Notificaciones del cliente (derivadas, sin tabla propia): mensajes sin leer y
// pedidos en proceso. Alimenta el badge del sidebar de perfil y la campana del
// header. Mismo contrato { items, badgeCount, messagesUnread } que la del admin.
export async function GET() {
  const { session, response } = await requireUser()
  if (response) return response

  const uid = session!.user.id
  const [messagesUnread, activeOrders] = await Promise.all([
    prisma.message.count({ where: { recipientId: uid, readAt: null } }),
    prisma.order.count({
      where: {
        userId: uid,
        status: { in: ["PENDING_PAYMENT", "VERIFYING_MANUAL", "PAID_APPROVED"] },
      },
    }),
  ])

  const items = [
    {
      key: "messages",
      label: "Mensajes sin leer",
      count: messagesUnread,
      href: "/profile/messages",
      tone: "info" as const,
    },
    {
      key: "orders",
      label: "Pedidos en proceso",
      count: activeOrders,
      href: "/profile/orders",
      tone: "warning" as const,
    },
  ].filter((i) => i.count > 0)

  // El badge del header resalta lo accionable/nuevo: mensajes sin leer.
  return NextResponse.json({ items, badgeCount: messagesUnread, messagesUnread })
}
