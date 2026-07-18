import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

const updateSchema = z.object({
  shippingStatus: z.enum(["PREPARING", "SHIPPED", "DELIVERED"]).optional(),
  trackingNumber: z.string().max(60).nullable().optional(),
  status: z.enum(["COMPLETED", "CANCELLED"]).optional(),
})

// Fulfillment (bóveda 06.03): tracking + estado logístico
export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Datos no válidos" }, { status: 400 })
    }

    const order = await prisma.order.update({
      where: { id },
      data: {
        ...parsed.data,
        trackingNumber:
          parsed.data.trackingNumber === undefined
            ? undefined
            : parsed.data.trackingNumber || null,
        // Entregado ⇒ la orden queda COMPLETED (habilita reseñas)
        ...(parsed.data.shippingStatus === "DELIVERED"
          ? { status: "COMPLETED" }
          : {}),
      },
    })

    return NextResponse.json({
      id: order.id,
      shippingStatus: order.shippingStatus,
      trackingNumber: order.trackingNumber,
      status: order.status,
    })
  } catch (error) {
    console.error("Error updating admin order:", error)
    return NextResponse.json(
      { error: "Error al actualizar la orden" },
      { status: 500 }
    )
  }
}
