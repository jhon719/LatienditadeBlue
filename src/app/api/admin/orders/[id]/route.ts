import { NextRequest, NextResponse } from "next/server"
import type { Prisma, OrderStatus } from "@prisma/client"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"
import { sendOrderShippedEmail, sendOrderDeliveredEmail } from "@/lib/email"

type Params = Promise<{ id: string }>

// Estados en los que el stock sigue descontado (reservado o vendido).
// Al pasar a CANCELLED/REJECTED desde uno de estos, se devuelve el stock.
const STOCK_HELD: OrderStatus[] = [
  "PENDING_PAYMENT",
  "VERIFYING_MANUAL",
  "PAID_APPROVED",
  "COMPLETED",
]

const updateSchema = z.object({
  shippingStatus: z.enum(["PREPARING", "SHIPPED", "DELIVERED"]).optional(),
  trackingNumber: z.string().max(60).nullable().optional(),
  status: z
    .enum([
      "PENDING_PAYMENT",
      "VERIFYING_MANUAL",
      "PAID_APPROVED",
      "REJECTED",
      "CANCELLED",
      "COMPLETED",
    ])
    .optional(),
  receiverName: z.string().min(3).max(80).optional(),
  receiverPhone: z.string().regex(/^\d{9}$/, "Teléfono de 9 dígitos").optional(),
  deliveryAddress: z.string().max(200).nullable().optional(),
})

// GET: detalle completo de una orden (para la página de edición del admin)
export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  const { id } = await params
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          dni: true,
          phone: true,
        },
      },
      items: { include: { product: { select: { name: true, images: true, slug: true } } } },
      paymentProof: true,
    },
  })

  if (!order) {
    return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 })
  }

  return NextResponse.json({
    id: order.id,
    processCode: order.processCode,
    status: order.status,
    paymentMethod: order.paymentMethod,
    totalAmount: Number(order.totalAmount),
    shippingCost: Number(order.shippingCost),
    couponDiscount: Number(order.couponDiscount ?? 0),
    couponCode: order.couponCode,
    shippingType: order.shippingType,
    shippingStatus: order.shippingStatus,
    receiverName: order.receiverName,
    receiverPhone: order.receiverPhone,
    deliveryAddress: order.deliveryAddress,
    trackingNumber: order.trackingNumber,
    createdAt: order.createdAt.toISOString(),
    customer: order.user,
    items: order.items.map((item) => ({
      id: item.id,
      name: item.product.name,
      slug: item.product.slug,
      image: item.product.images[0] ?? null,
      quantity: item.quantity,
      price: Number(item.price),
    })),
    proof: order.paymentProof
      ? {
          id: order.paymentProof.id,
          imageUrl: order.paymentProof.imageUrl,
          operationNumber: order.paymentProof.operationNumber,
          status: order.paymentProof.status,
          createdAt: order.paymentProof.createdAt.toISOString(),
        }
      : null,
  })
}

// PATCH: edición completa — datos del receptor, estado (con reposición de
// stock al cancelar/rechazar), estado logístico y tracking (bóveda 05 / 06.03)
export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }

    const current = await prisma.order.findUnique({
      where: { id },
      include: { items: true, user: { select: { email: true } } },
    })
    if (!current) {
      return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 })
    }

    const data = parsed.data
    const newStatus = data.status
    // ¿Hay que devolver stock? Solo si pasa a CANCELLED/REJECTED desde un
    // estado que lo tenía descontado (evita doble reposición).
    const mustRestock =
      !!newStatus &&
      (newStatus === "CANCELLED" || newStatus === "REJECTED") &&
      STOCK_HELD.includes(current.status)

    const updateData: Prisma.OrderUpdateInput = {
      ...(data.shippingStatus ? { shippingStatus: data.shippingStatus } : {}),
      ...(data.trackingNumber === undefined
        ? {}
        : { trackingNumber: data.trackingNumber || null }),
      ...(data.receiverName ? { receiverName: data.receiverName } : {}),
      ...(data.receiverPhone ? { receiverPhone: data.receiverPhone } : {}),
      ...(data.deliveryAddress === undefined
        ? {}
        : { deliveryAddress: data.deliveryAddress || null }),
      ...(newStatus ? { status: newStatus } : {}),
      // Entregado ⇒ la orden queda COMPLETED (habilita reseñas)
      ...(data.shippingStatus === "DELIVERED" && !newStatus
        ? { status: "COMPLETED" as OrderStatus }
        : {}),
    }

    const order = await prisma.$transaction(async (tx) => {
      if (mustRestock) {
        for (const item of current.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stockQty: { increment: item.quantity }, status: "STOCK" },
          })
        }
      }
      return tx.order.update({ where: { id }, data: updateData })
    })

    // Correos de fulfillment (bóveda 05.04): solo al cambiar a SHIPPED/DELIVERED
    const emailData = {
      email: current.user.email,
      processCode: order.processCode,
      totalAmount: Number(order.totalAmount),
      paymentMethod: order.paymentMethod,
      shippingType: order.shippingType,
      receiverName: order.receiverName,
    }
    if (data.shippingStatus === "SHIPPED" && current.shippingStatus !== "SHIPPED") {
      await sendOrderShippedEmail({ ...emailData, trackingNumber: order.trackingNumber })
    } else if (
      data.shippingStatus === "DELIVERED" &&
      current.shippingStatus !== "DELIVERED"
    ) {
      await sendOrderDeliveredEmail(emailData)
    }

    return NextResponse.json({
      id: order.id,
      status: order.status,
      shippingStatus: order.shippingStatus,
      trackingNumber: order.trackingNumber,
      receiverName: order.receiverName,
      receiverPhone: order.receiverPhone,
      deliveryAddress: order.deliveryAddress,
      restocked: mustRestock,
    })
  } catch (error) {
    console.error("Error updating admin order:", error)
    return NextResponse.json(
      { error: "Error al actualizar la orden" },
      { status: 500 }
    )
  }
}

// DELETE: elimina la orden (repone stock si aún estaba descontado) y borra
// items + comprobante en cascada.
export async function DELETE(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const current = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    })
    if (!current) {
      return NextResponse.json({ error: "Orden no encontrada" }, { status: 404 })
    }

    const mustRestock = STOCK_HELD.includes(current.status)

    await prisma.$transaction(async (tx) => {
      if (mustRestock) {
        for (const item of current.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stockQty: { increment: item.quantity }, status: "STOCK" },
          })
        }
      }
      // items y comprobante caen por onDelete: Cascade
      await tx.order.delete({ where: { id } })
    })

    return NextResponse.json({ success: true, restocked: mustRestock })
  } catch (error) {
    console.error("Error deleting admin order:", error)
    return NextResponse.json(
      { error: "Error al eliminar la orden" },
      { status: 500 }
    )
  }
}
