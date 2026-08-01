import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

// Lotes de importación en los que viene (o vino) un producto. Endpoint aparte
// del GET público de producto porque expone datos internos (costo del proveedor).
export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  const { id } = await params
  const items = await prisma.importBatchItem.findMany({
    where: { productId: id },
    include: {
      batch: {
        select: {
          id: true,
          name: true,
          supplier: true,
          eta: true,
          status: true,
          images: true,
        },
      },
    },
    orderBy: { batch: { createdAt: "desc" } },
  })

  return NextResponse.json(
    items.map((it) => ({
      itemId: it.id,
      quantity: it.quantity,
      unitCost: it.unitCost ? Number(it.unitCost) : null,
      batchId: it.batch.id,
      name: it.batch.name,
      supplier: it.batch.supplier,
      eta: it.batch.eta?.toISOString() ?? null,
      status: it.batch.status,
      image: it.batch.images[0] ?? null,
    }))
  )
}
