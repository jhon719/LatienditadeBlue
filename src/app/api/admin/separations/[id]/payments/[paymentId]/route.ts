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

    await prisma.$transaction(async (tx) => {
      await tx.separationPayment.update({
        where: { id: paymentId },
        data: {
          status: parsed.data.action === "approve" ? "APPROVED" : "REJECTED",
          approvedAt: parsed.data.action === "approve" ? new Date() : null,
        },
      })
      // Recalcula el saldo (suma de abonos APPROVED). Rechazar un abono NO libera
      // la separación: el stock sigue reservado y el cliente puede subir otro
      // comprobante (p. ej. si mandó una captura equivocada). La liberación es una
      // acción deliberada aparte (POST /release, con doble confirmación).
      await recalcSeparation(tx, id)
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating separation payment:", error)
    return NextResponse.json({ error: "Error al actualizar el abono" }, { status: 500 })
  }
}
