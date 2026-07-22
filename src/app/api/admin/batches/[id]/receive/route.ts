import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

// Plazo para completar el saldo tras la llegada de la preventa (bóveda 05.03 §3)
const DUE_DAYS_AFTER_ARRIVAL = 7

// Recibir un lote (bóveda 05.03 §2): mueve el stock de tránsito a inmediato.
// Por cada producto inyecta (cantidad del lote − unidades ya separadas en preventa)
// al stock público, marca el lote RECEIVED y pasa sus separaciones a ARRIVED con
// nuevo plazo para cobrar el saldo final.
export async function POST(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const batch = await prisma.importBatch.findUnique({
      where: { id },
      include: { items: true },
    })
    if (!batch) {
      return NextResponse.json({ error: "Lote no encontrado" }, { status: 404 })
    }
    if (batch.status === "RECEIVED") {
      return NextResponse.json({ error: "El lote ya fue recibido" }, { status: 400 })
    }

    const dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + DUE_DAYS_AFTER_ARRIVAL)

    let totalInjected = 0

    await prisma.$transaction(async (tx) => {
      for (const item of batch.items) {
        // Unidades de este producto ya comprometidas en separaciones activas del lote
        const reserved = await tx.preorderReservation.count({
          where: {
            batchId: id,
            productId: item.productId,
            status: { in: ["PENDING", "ARRIVED"] },
          },
        })
        const inject = Math.max(0, item.quantity - reserved)
        if (inject > 0) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stockQty: { increment: inject }, status: "STOCK" },
          })
          totalInjected += inject
        }
      }

      // Las separaciones de preventa pasan a cobro de saldo final
      await tx.preorderReservation.updateMany({
        where: { batchId: id, status: "PENDING" },
        data: { status: "ARRIVED", dueDate },
      })

      await tx.importBatch.update({
        where: { id },
        data: { status: "RECEIVED", receivedAt: new Date() },
      })
    })

    return NextResponse.json({ success: true, injected: totalInjected })
  } catch (error) {
    console.error("Error receiving batch:", error)
    return NextResponse.json({ error: "Error al recibir el lote" }, { status: 500 })
  }
}
