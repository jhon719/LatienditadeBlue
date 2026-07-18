import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

const actionSchema = z.object({
  action: z.enum(["approve", "reject"]),
})

// Decisión de la Bandeja POS (bóveda 05.02):
// aprobar → PAID_APPROVED (stock reservado queda definitivo)
// rechazar → REJECTED + liberación inmediata del inventario
export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = actionSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Acción no válida" }, { status: 400 })
    }

    const proof = await prisma.paymentProof.findUnique({
      where: { id },
      include: { order: { include: { items: true } } },
    })

    if (!proof) {
      return NextResponse.json(
        { error: "Comprobante no encontrado" },
        { status: 404 }
      )
    }
    if (proof.status !== "PENDING") {
      return NextResponse.json(
        { error: "Este comprobante ya fue revisado" },
        { status: 400 }
      )
    }

    if (parsed.data.action === "approve") {
      await prisma.$transaction([
        prisma.paymentProof.update({
          where: { id },
          data: { status: "APPROVED" },
        }),
        prisma.order.update({
          where: { id: proof.orderId },
          data: { status: "PAID_APPROVED" },
        }),
      ])
      return NextResponse.json({ success: true, status: "APPROVED" })
    }

    // Rechazo: liberar el stock congelado
    await prisma.$transaction(async (tx) => {
      await tx.paymentProof.update({
        where: { id },
        data: { status: "REJECTED" },
      })
      await tx.order.update({
        where: { id: proof.orderId },
        data: { status: "REJECTED" },
      })
      for (const item of proof.order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stockQty: { increment: item.quantity }, status: "STOCK" },
        })
      }
    })

    return NextResponse.json({ success: true, status: "REJECTED" })
  } catch (error) {
    console.error("Error processing proof decision:", error)
    return NextResponse.json(
      { error: "Error al procesar la decisión" },
      { status: 500 }
    )
  }
}
