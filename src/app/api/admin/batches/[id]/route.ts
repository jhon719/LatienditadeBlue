import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  const { id } = await params
  const b = await prisma.importBatch.findUnique({
    where: { id },
    include: { items: { include: { product: { select: { name: true } } } } },
  })
  if (!b) {
    return NextResponse.json({ error: "Lote no encontrado" }, { status: 404 })
  }
  return NextResponse.json({
    id: b.id,
    name: b.name,
    supplier: b.supplier,
    trackingRef: b.trackingRef,
    eta: b.eta?.toISOString() ?? null,
    status: b.status,
    notes: b.notes,
    items: b.items.map((it) => ({
      id: it.id,
      name: it.product.name,
      quantity: it.quantity,
      unitCost: it.unitCost ? Number(it.unitCost) : null,
    })),
  })
}

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  supplier: z.string().nullable().optional(),
  trackingRef: z.string().nullable().optional(),
  eta: z.string().datetime().nullable().optional(),
  notes: z.string().nullable().optional(),
})

// PATCH: editar datos del lote. Si cambia el ETA, arrastra las preventas
// asociadas que aún no llegaron (bóveda 05.03 §3, línea de tiempo visual).
export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }
    const d = parsed.data
    const etaChanged = d.eta !== undefined

    await prisma.$transaction(async (tx) => {
      await tx.importBatch.update({
        where: { id },
        data: {
          ...(d.name ? { name: d.name } : {}),
          ...(d.supplier === undefined ? {} : { supplier: d.supplier || null }),
          ...(d.trackingRef === undefined ? {} : { trackingRef: d.trackingRef || null }),
          ...(etaChanged ? { eta: d.eta ? new Date(d.eta) : null } : {}),
          ...(d.notes === undefined ? {} : { notes: d.notes || null }),
        },
      })
      // Arrastrar el nuevo ETA como fecha límite de las preventas pendientes del lote
      if (etaChanged && d.eta) {
        await tx.preorderReservation.updateMany({
          where: { batchId: id, status: "PENDING" },
          data: { dueDate: new Date(d.eta) },
        })
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating batch:", error)
    return NextResponse.json({ error: "Error al actualizar el lote" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const preorderCount = await prisma.preorderReservation.count({ where: { batchId: id } })
    if (preorderCount > 0) {
      return NextResponse.json(
        { error: "El lote tiene separaciones asociadas. No se puede eliminar." },
        { status: 400 }
      )
    }
    // Los items caen por onDelete: Cascade
    await prisma.importBatch.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting batch:", error)
    return NextResponse.json({ error: "Error al eliminar el lote" }, { status: 500 })
  }
}
