import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"
import { computeBalance, validatePaymentAmount } from "@/lib/separations"
import { recalcSeparation } from "@/lib/separations-server"

type Params = Promise<{ id: string }>

const schema = z.object({
  amount: z.number().positive(),
  operationNumber: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  note: z.string().optional().nullable(),
  // El admin puede aprobar el abono directamente al registrarlo
  approve: z.boolean().default(true),
})

// Registrar un abono de una separación desde el panel (bóveda 05.07 §2)
export async function POST(request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }
    const d = parsed.data

    const sep = await prisma.preorderReservation.findUnique({
      where: { id },
      include: { payments: { where: { status: "APPROVED" } } },
    })
    if (!sep) {
      return NextResponse.json({ error: "Separación no encontrada" }, { status: 404 })
    }
    if (sep.status === "CANCELLED" || sep.status === "COMPLETED") {
      return NextResponse.json(
        { error: "La separación no admite más abonos" },
        { status: 400 }
      )
    }

    const { balance } = computeBalance(Number(sep.totalPrice), Number(sep.depositPaid))
    const isFirst = sep.payments.length === 0
    const check = validatePaymentAmount(d.amount, balance, isFirst)
    if (!check.ok) {
      return NextResponse.json({ error: check.error }, { status: 400 })
    }

    await prisma.$transaction(async (tx) => {
      await tx.separationPayment.create({
        data: {
          reservationId: id,
          amount: d.amount,
          operationNumber: d.operationNumber || null,
          imageUrl: d.imageUrl || null,
          note: d.note || null,
          status: d.approve ? "APPROVED" : "PENDING",
          approvedAt: d.approve ? new Date() : null,
        },
      })
      if (d.approve) await recalcSeparation(tx, id)
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Error adding separation payment:", error)
    return NextResponse.json({ error: "Error al registrar el abono" }, { status: 500 })
  }
}
