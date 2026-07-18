import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { isMercadoPagoEnabled, getPaymentClient } from "@/lib/mercadopago"

// Webhook oficial de Mercado Pago (bóveda 03.01): acredita pagos al instante
export async function POST(req: NextRequest) {
  if (!isMercadoPagoEnabled()) {
    return NextResponse.json({ received: true }, { status: 200 })
  }

  const url = new URL(req.url)
  const type = url.searchParams.get("type") || url.searchParams.get("topic")

  if (type !== "payment") {
    return NextResponse.json({ received: true }, { status: 200 })
  }

  const dataId = url.searchParams.get("data.id") || url.searchParams.get("id")
  if (!dataId) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 })
  }

  try {
    const payment = await getPaymentClient().get({ id: dataId })
    const orderId = payment.external_reference

    if (!orderId) {
      return NextResponse.json(
        { error: "External reference not found" },
        { status: 400 }
      )
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    })
    if (!order) {
      return NextResponse.json({ received: true }, { status: 200 })
    }

    if (payment.status === "approved" && order.status === "PENDING_PAYMENT") {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID_APPROVED", mpPaymentId: String(dataId) },
      })
    } else if (
      (payment.status === "rejected" || payment.status === "cancelled") &&
      order.status === "PENDING_PAYMENT"
    ) {
      // Liberar el stock reservado
      await prisma.$transaction(async (tx) => {
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stockQty: { increment: item.quantity }, status: "STOCK" },
          })
        }
        await tx.order.update({
          where: { id: orderId },
          data: { status: "REJECTED", mpPaymentId: String(dataId) },
        })
      })
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error("Error en Webhook de Mercado Pago:", error)
    return NextResponse.json(
      { error: "Webhook internal error" },
      { status: 500 }
    )
  }
}
