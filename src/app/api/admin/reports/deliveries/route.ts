import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

// Reporte de entregas disponibles (solo ADMIN): pedidos pagados aún no entregados,
// separados por modalidad de envío (presencial / motorizado / agencia Shalom).
export async function GET() {
  const { response } = await requireAdmin()
  if (response) return response

  const orders = await prisma.order.findMany({
    where: {
      status: "PAID_APPROVED",
      shippingStatus: { in: ["PREPARING", "SHIPPED"] },
    },
    orderBy: { createdAt: "asc" },
    select: {
      processCode: true,
      shippingType: true,
      shippingStatus: true,
      receiverName: true,
      receiverPhone: true,
      deliveryAddress: true,
      trackingNumber: true,
      totalAmount: true,
      shippingCost: true,
      createdAt: true,
      user: {
        select: {
          username: true,
          firstName: true,
          lastName: true,
          phone: true,
          dni: true,
          department: true,
          tiktokUsername: true,
        },
      },
      items: {
        select: { quantity: true, product: { select: { name: true } } },
      },
    },
  })

  const map = (o: (typeof orders)[number]) => ({
    processCode: o.processCode,
    shippingStatus: o.shippingStatus,
    receiverName: o.receiverName,
    receiverPhone: o.receiverPhone,
    deliveryAddress: o.deliveryAddress,
    trackingNumber: o.trackingNumber,
    department: o.user.department,
    tiktokUsername: o.user.tiktokUsername,
    buyer:
      `${o.user.firstName ?? ""} ${o.user.lastName ?? ""}`.trim() ||
      o.user.username,
    buyerPhone: o.user.phone,
    dni: o.user.dni,
    items: o.items.map((i) => `${i.quantity}× ${i.product.name}`).join(", "),
    total: Number(o.totalAmount),
    shippingCost: Number(o.shippingCost),
    createdAt: o.createdAt.toISOString(),
  })

  const pickup = orders.filter((o) => o.shippingType === "PICKUP").map(map)
  const local = orders.filter((o) => o.shippingType === "LOCAL_DELIVERY").map(map)
  const courier = orders
    .filter((o) => o.shippingType === "NATIONAL_COURIER")
    .map(map)

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    total: orders.length,
    groups: {
      pickup, // Recojo presencial en tienda
      local, // Motorizado (Lima)
      courier, // Agencia Shalom / courier a provincia
    },
  })
}
