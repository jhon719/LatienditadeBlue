import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

const createItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
  unitCost: z.number().nonnegative().optional().nullable(),
  // La mayoría de productos de un lote siguen en camino, así que PREVENTA es
  // el default; el admin elige STOCK si registra un lote ya recibido.
  status: z.enum(["PREVENTA", "STOCK"]).default("PREVENTA"),
})

// Agrega un producto ya existente del catálogo a un lote creado.
// Para dar de alta un producto nuevo directamente contra el lote se usa
// POST /api/products con el campo `batch` (ver bóveda 05.03 §11).
export async function POST(request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = createItemSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }
    const d = parsed.data

    const batch = await prisma.importBatch.findUnique({ where: { id }, select: { eta: true } })
    if (!batch) {
      return NextResponse.json({ error: "Lote no encontrado" }, { status: 404 })
    }

    // Evita duplicar el mismo producto en el lote (sería doble conteo al recibirlo)
    const existing = await prisma.importBatchItem.findFirst({
      where: { batchId: id, productId: d.productId },
      select: { id: true },
    })
    if (existing) {
      return NextResponse.json(
        { error: "Ese producto ya está en el lote. Edita su cantidad en la lista." },
        { status: 400 }
      )
    }

    const item = await prisma.$transaction(async (tx) => {
      const created = await tx.importBatchItem.create({
        data: {
          batchId: id,
          productId: d.productId,
          quantity: d.quantity,
          unitCost: d.unitCost ?? null,
        },
      })
      await tx.product.update({
        where: { id: d.productId },
        data: {
          status: d.status,
          expectedDate: d.status === "PREVENTA" ? batch.eta : null,
        },
      })
      return created
    })

    return NextResponse.json({ id: item.id }, { status: 201 })
  } catch (error) {
    console.error("Error adding item to batch:", error)
    return NextResponse.json({ error: "Error al agregar el producto al lote" }, { status: 500 })
  }
}
