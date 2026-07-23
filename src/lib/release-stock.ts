import { prisma } from "@/lib/prisma"

// Limpieza de abandonos (bóveda 06.01 §4): órdenes que quedaron reservando
// stock sin que el pago se concrete liberan su inventario pasado el tiempo
// límite. Dos flujos con ventanas distintas:
//  - PENDING_PAYMENT (pasarela): el cliente nunca completó el pago en Mercado
//    Pago. La bóveda sugiere 15 min; usamos 60 por defecto para no cancelar
//    pagos legítimos que el webhook confirme con demora.
//  - VERIFYING_MANUAL (Yape/Plin): el cliente adjuntó un voucher que el admin
//    nunca aprobó ni rechazó. Ventana más amplia (48 h) para dar margen a la
//    revisión manual en la Bandeja POS, pero evitando que un voucher falso
//    bloquee stock de un drop limitado para siempre.
const DEFAULT_MINUTES = 60
const DEFAULT_MANUAL_MINUTES = 60 * 48

export async function releaseAbandonedStock(): Promise<{
  released: number
  processCodes: string[]
}> {
  const minutes = Number(process.env.STOCK_RELEASE_MINUTES) || DEFAULT_MINUTES
  const manualMinutes =
    Number(process.env.MANUAL_RELEASE_MINUTES) || DEFAULT_MANUAL_MINUTES
  const cutoff = new Date(Date.now() - minutes * 60 * 1000)
  const manualCutoff = new Date(Date.now() - manualMinutes * 60 * 1000)

  const staleOrders = await prisma.order.findMany({
    where: {
      OR: [
        { status: "PENDING_PAYMENT", createdAt: { lt: cutoff } },
        { status: "VERIFYING_MANUAL", createdAt: { lt: manualCutoff } },
      ],
    },
    include: { items: true },
  })

  const processCodes: string[] = []

  for (const order of staleOrders) {
    await prisma.$transaction(async (tx) => {
      for (const item of order.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stockQty: { increment: item.quantity }, status: "STOCK" },
        })
      }
      await tx.order.update({
        where: { id: order.id },
        data: { status: "CANCELLED" },
      })
      // El voucher pendiente deja de aparecer en la Bandeja POS
      await tx.paymentProof.updateMany({
        where: { orderId: order.id, status: "PENDING" },
        data: { status: "REJECTED" },
      })
    })
    processCodes.push(order.processCode)
  }

  return { released: staleOrders.length, processCodes }
}
