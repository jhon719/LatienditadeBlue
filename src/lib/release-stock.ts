import { prisma } from "@/lib/prisma"

// Limpieza de abandonos (bóveda 06.01 §4): órdenes de pasarela que quedaron
// en PENDING_PAYMENT (el cliente nunca completó el pago en Mercado Pago)
// liberan su stock reservado pasado el tiempo límite.
// La bóveda sugiere 15 min; usamos 60 por defecto para no cancelar pagos
// legítimos que el webhook confirme con demora (configurable por env).
const DEFAULT_MINUTES = 60

export async function releaseAbandonedStock(): Promise<{
  released: number
  processCodes: string[]
}> {
  const minutes = Number(process.env.STOCK_RELEASE_MINUTES) || DEFAULT_MINUTES
  const cutoff = new Date(Date.now() - minutes * 60 * 1000)

  const staleOrders = await prisma.order.findMany({
    where: {
      status: "PENDING_PAYMENT",
      createdAt: { lt: cutoff },
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
    })
    processCodes.push(order.processCode)
  }

  return { released: staleOrders.length, processCodes }
}
