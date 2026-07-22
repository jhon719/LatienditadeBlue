import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/api-guards"
import { computeBalance, validatePaymentAmount } from "@/lib/separations"

type Params = Promise<{ id: string }>

const schema = z.object({
  amount: z.number().positive(),
  operationNumber: z.string().min(3),
  imageUrl: z.string().url(),
})

// El cliente sube un abono para pagar el saldo (bóveda 05.06 §4 "Pagar Saldo").
// Queda PENDING hasta que el admin lo valide en la Bandeja POS.
export async function POST(request: NextRequest, { params }: { params: Params }) {
  const { session, response } = await requireUser()
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
    if (!sep || sep.userId !== session!.user.id) {
      return NextResponse.json({ error: "Separación no encontrada" }, { status: 404 })
    }
    if (sep.status === "CANCELLED" || sep.status === "COMPLETED") {
      return NextResponse.json(
        { error: "Esta separación no admite más abonos" },
        { status: 400 }
      )
    }

    const { balance } = computeBalance(Number(sep.totalPrice), Number(sep.depositPaid))
    const check = validatePaymentAmount(d.amount, balance, sep.payments.length === 0)
    if (!check.ok) {
      return NextResponse.json({ error: check.error }, { status: 400 })
    }

    await prisma.separationPayment.create({
      data: {
        reservationId: id,
        amount: d.amount,
        operationNumber: d.operationNumber,
        imageUrl: d.imageUrl,
        status: "PENDING",
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error("Error uploading separation payment:", error)
    return NextResponse.json({ error: "Error al registrar el abono" }, { status: 500 })
  }
}
