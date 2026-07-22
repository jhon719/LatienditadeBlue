import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

// Liberar separación (bóveda 05.06 §3): el plazo venció o el cliente abandonó.
// El stock retenido regresa al inventario general y el adelanto queda retenido
// (los abonos ya aprobados no se reembolsan; quedan registrados).
export async function POST(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const sep = await prisma.preorderReservation.findUnique({
      where: { id },
      select: { kind: true, status: true, productId: true },
    })
    if (!sep) {
      return NextResponse.json({ error: "Separación no encontrada" }, { status: 404 })
    }
    if (sep.status === "CANCELLED") {
      return NextResponse.json({ error: "La separación ya fue liberada" }, { status: 400 })
    }
    if (sep.status === "COMPLETED") {
      return NextResponse.json(
        { error: "No se puede liberar una separación ya pagada al 100%" },
        { status: 400 }
      )
    }

    // Devuelve la unidad física si la retenía (STOCK siempre; PREORDER solo si ya llegó)
    const holdsStock =
      sep.kind === "STOCK" || (sep.kind === "PREORDER" && sep.status === "ARRIVED")

    await prisma.$transaction(async (tx) => {
      if (holdsStock) {
        await tx.product.update({
          where: { id: sep.productId },
          data: { stockQty: { increment: 1 }, status: "STOCK" },
        })
      }
      await tx.preorderReservation.update({
        where: { id },
        data: { status: "CANCELLED" },
      })
    })

    return NextResponse.json({ success: true, stockReleased: holdsStock })
  } catch (error) {
    console.error("Error releasing separation:", error)
    return NextResponse.json({ error: "Error al liberar la separación" }, { status: 500 })
  }
}
