import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"
import { computeBalance } from "@/lib/separations"

// Abonos de separación subidos por clientes, pendientes de validar en la Bandeja
// POS (bóveda 05.02 / 05.07). Complementa a los vouchers de órdenes: el schema y
// la API de creación prometen que el adelanto se valida aquí, así que la bandeja
// debe surfacearlos junto a los pagos de órdenes.
export async function GET() {
  const { response } = await requireAdmin()
  if (response) return response

  const payments = await prisma.separationPayment.findMany({
    where: { status: "PENDING" },
    include: {
      reservation: {
        include: {
          product: { select: { name: true, images: true } },
          user: {
            select: {
              username: true,
              email: true,
              firstName: true,
              lastName: true,
              dni: true,
              phone: true,
              tiktokUsername: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "asc" }, // FIFO: el más antiguo primero
  })

  return NextResponse.json(
    payments.map((p) => {
      const total = Number(p.reservation.totalPrice)
      const approved = Number(p.reservation.depositPaid)
      const { balance } = computeBalance(total, approved)
      return {
        id: p.id,
        reservationId: p.reservationId,
        amount: Number(p.amount),
        operationNumber: p.operationNumber,
        imageUrl: p.imageUrl,
        note: p.note,
        createdAt: p.createdAt.toISOString(),
        reservation: {
          kind: p.reservation.kind,
          totalPrice: total,
          approvedPaid: approved,
          balance, // saldo actual (antes de aprobar este abono)
        },
        product: {
          name: p.reservation.product.name,
          image: p.reservation.product.images[0] ?? null,
        },
        customer: {
          username: p.reservation.user.username,
          email: p.reservation.user.email,
          firstName: p.reservation.user.firstName,
          lastName: p.reservation.user.lastName,
          dni: p.reservation.user.dni,
          phone: p.reservation.user.phone,
          tiktokUsername: p.reservation.user.tiktokUsername,
        },
      }
    })
  )
}
