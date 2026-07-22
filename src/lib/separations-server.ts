import type { Prisma, PrismaClient } from "@prisma/client"
import { computeBalance, computeSemaphore } from "@/lib/separations"

// Cliente de transacción o instancia global de Prisma
type Db = PrismaClient | Prisma.TransactionClient

// Recalcula el total abonado (suma de abonos APPROVED) y, si alcanza el total,
// marca la separación como COMPLETED. Devuelve el nuevo saldo. (bóveda 05.07 §2)
export async function recalcSeparation(db: Db, reservationId: string) {
  const reservation = await db.preorderReservation.findUnique({
    where: { id: reservationId },
    include: { payments: { where: { status: "APPROVED" } } },
  })
  if (!reservation) return null

  const paid = reservation.payments.reduce((acc, p) => acc + Number(p.amount), 0)
  const total = Number(reservation.totalPrice)
  const isPaidInFull = paid >= total - 0.01

  const data: Prisma.PreorderReservationUpdateInput = {
    depositPaid: paid,
  }
  // Al completar el 100%, pasa a COMPLETED (salvo que ya esté cancelada)
  if (isPaidInFull && reservation.status !== "CANCELLED" && reservation.status !== "COMPLETED") {
    data.status = "COMPLETED"
  }

  await db.preorderReservation.update({ where: { id: reservationId }, data })
  return { paid, total, balance: Math.max(0, total - paid), isPaidInFull }
}

// Serializa una separación para el frontend (con saldo y semáforo calculados)
type SeparationWithRelations = Prisma.PreorderReservationGetPayload<{
  include: {
    product: { select: { name: true; images: true; slug: true } }
    user: { select: { username: true; email: true; firstName: true; lastName: true; phone: true } }
    payments: true
  }
}>

export function serializeSeparation(r: SeparationWithRelations) {
  const balance = computeBalance(Number(r.totalPrice), Number(r.depositPaid))
  const semaphore = computeSemaphore(r.status, r.dueDate, balance.isPaidInFull)
  return {
    id: r.id,
    kind: r.kind,
    status: r.status,
    totalPrice: Number(r.totalPrice),
    depositPaid: Number(r.depositPaid),
    balance: balance.balance,
    progress: balance.progress,
    dueDate: r.dueDate?.toISOString() ?? null,
    notes: r.notes,
    createdAt: r.createdAt.toISOString(),
    semaphore,
    product: {
      name: r.product.name,
      slug: r.product.slug,
      image: r.product.images[0] ?? null,
    },
    customer: {
      username: r.user.username,
      email: r.user.email,
      name: [r.user.firstName, r.user.lastName].filter(Boolean).join(" ") || null,
      phone: r.user.phone,
    },
    payments: r.payments
      .slice()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map((p) => ({
        id: p.id,
        amount: Number(p.amount),
        operationNumber: p.operationNumber,
        imageUrl: p.imageUrl,
        status: p.status,
        note: p.note,
        createdAt: p.createdAt.toISOString(),
        approvedAt: p.approvedAt?.toISOString() ?? null,
      })),
  }
}

export const SEPARATION_INCLUDE = {
  product: { select: { name: true, images: true, slug: true } },
  user: { select: { username: true, email: true, firstName: true, lastName: true, phone: true } },
  payments: true,
} as const
