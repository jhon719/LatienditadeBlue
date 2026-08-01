import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string; itemId: string }>

const updateItemSchema = z.object({
  quantity: z.number().int().positive().optional(),
  unitCost: z.number().nonnegative().nullable().optional(),
})

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id, itemId } = await params
    const body = await request.json()
    const parsed = updateItemSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }
    const d = parsed.data

    // El itemId debe pertenecer a este lote (evita editar ítems de otro lote)
    const item = await prisma.importBatchItem.findFirst({
      where: { id: itemId, batchId: id },
      select: { id: true },
    })
    if (!item) {
      return NextResponse.json({ error: "Ítem no encontrado en este lote" }, { status: 404 })
    }

    await prisma.importBatchItem.update({
      where: { id: itemId },
      data: {
        ...(d.quantity === undefined ? {} : { quantity: d.quantity }),
        ...(d.unitCost === undefined ? {} : { unitCost: d.unitCost }),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating batch item:", error)
    return NextResponse.json({ error: "Error al actualizar el ítem" }, { status: 500 })
  }
}

// Quita el producto del lote. No borra el producto del catálogo ni revierte su
// estado: si quedó en PREVENTA por error, se ajusta desde su ficha.
export async function DELETE(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id, itemId } = await params
    const item = await prisma.importBatchItem.findFirst({
      where: { id: itemId, batchId: id },
      select: { id: true },
    })
    if (!item) {
      return NextResponse.json({ error: "Ítem no encontrado en este lote" }, { status: 404 })
    }

    await prisma.importBatchItem.delete({ where: { id: itemId } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting batch item:", error)
    return NextResponse.json({ error: "Error al quitar el producto del lote" }, { status: 500 })
  }
}
