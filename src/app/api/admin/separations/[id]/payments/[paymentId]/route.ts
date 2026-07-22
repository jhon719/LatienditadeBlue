import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"
import { recalcSeparation } from "@/lib/separations-server"

type Params = Promise<{ id: string; paymentId: string }>

const schema = z.object({
  action: z.enum(["approve", "reject"]),
})

// Aprobar o rechazar un abono subido por el cliente (Bandeja POS, bóveda 05.02 / 05.07).
// Al aprobar/rechazar se recalcula el saldo y, si llega al 100%, la separación
// pasa a COMPLETED automáticamente.
export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id, paymentId } = await params
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Acción no válida" }, { status: 400 })
    }

    const payment = await prisma.separationPayment.findUnique({
      where: { id: paymentId },
    })
    if (!payment || payment.reservationId !== id) {
      return NextResponse.json({ error: "Abono no encontrado" }, { status: 404 })
    }

    let liberated = false
    await prisma.$transaction(async (tx) => {
      await tx.separationPayment.update({
        where: { id: paymentId },
        data: {
          status: parsed.data.action === "approve" ? "APPROVED" : "REJECTED",
          approvedAt: parsed.data.action === "approve" ? new Date() : null,
        },
      })
      const recalc = await recalcSeparation(tx, id)

      // Si se rechazó y la separación quedó sin ningún abono aprobado (típico
      // del adelanto inicial rechazado), se libera: devuelve stock y cancela.
      if (parsed.data.action === "reject" && recalc && recalc.paid === 0) {
        const sep = await tx.preorderReservation.findUnique({
          where: { id },
          select: { kind: true, status: true, productId: true },
        })
        if (sep && sep.status === "PENDING") {
          if (sep.kind === "STOCK") {
            await tx.product.update({
              where: { id: sep.productId },
              data: { stockQty: { increment: 1 }, status: "STOCK" },
            })
          }
          await tx.preorderReservation.update({
            where: { id },
            data: { status: "CANCELLED" },
          })
          liberated = true
        }
      }
    })

    return NextResponse.json({ success: true, liberated })
  } catch (error) {
    console.error("Error updating separation payment:", error)
    return NextResponse.json({ error: "Error al actualizar el abono" }, { status: 500 })
  }
}
