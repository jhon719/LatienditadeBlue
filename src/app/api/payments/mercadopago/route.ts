import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/api-guards"
import { isMercadoPagoEnabled, getPreferenceClient } from "@/lib/mercadopago"

// El checkout consulta este endpoint para saber si mostrar la opción de pasarela
export async function GET() {
  return NextResponse.json({ enabled: isMercadoPagoEnabled() })
}

const schema = z.object({ orderId: z.string().min(1) })

// Crea la Preference de Checkout Pro (bóveda 03.01)
export async function POST(request: NextRequest) {
  const { session, response } = await requireUser()
  if (response) return response

  if (!isMercadoPagoEnabled()) {
    return NextResponse.json(
      { error: "Mercado Pago no está configurado todavía" },
      { status: 503 }
    )
  }

  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Datos no válidos" }, { status: 400 })
    }

    const order = await prisma.order.findUnique({
      where: { id: parsed.data.orderId },
      include: {
        items: { include: { product: { select: { name: true } } } },
      },
    })

    if (!order || order.userId !== session!.user.id) {
      return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 })
    }
    if (order.paymentMethod !== "MERCADO_PAGO" || order.status !== "PENDING_PAYMENT") {
      return NextResponse.json(
        { error: "El pedido no admite pago por pasarela" },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

    const preference = await getPreferenceClient().create({
      body: {
        items: order.items.map((item) => ({
          id: item.productId,
          title: item.product.name,
          quantity: item.quantity,
          unit_price: Number(item.price),
          currency_id: "PEN",
        })),
        ...(Number(order.shippingCost) > 0
          ? {
              shipments: { cost: Number(order.shippingCost), mode: "not_specified" },
            }
          : {}),
        payer: { email: session!.user.email ?? undefined },
        external_reference: order.id, // Vinculación crucial con nuestra DB
        back_urls: {
          success: `${baseUrl}/checkout/success?code=${order.processCode}&type=${order.shippingType}`,
          failure: `${baseUrl}/checkout/cancel`,
          pending: `${baseUrl}/checkout/success?code=${order.processCode}&type=${order.shippingType}&pending=1`,
        },
        auto_return: "approved",
        notification_url: `${baseUrl}/api/webhook/mercadopago`,
      },
    })

    await prisma.order.update({
      where: { id: order.id },
      data: { mpPreferenceId: preference.id },
    })

    return NextResponse.json({
      preferenceId: preference.id,
      initPoint: preference.init_point,
    })
  } catch (error) {
    console.error("Error creando preferencia de Mercado Pago:", error)
    return NextResponse.json(
      { error: "Error al iniciar el pago" },
      { status: 500 }
    )
  }
}
