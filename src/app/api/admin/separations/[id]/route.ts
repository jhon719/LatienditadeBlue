import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"
import { SEPARATION_INCLUDE, serializeSeparation } from "@/lib/separations-server"

type Params = Promise<{ id: string }>

export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  const { id } = await params
  const separation = await prisma.preorderReservation.findUnique({
    where: { id },
    include: SEPARATION_INCLUDE,
  })
  if (!separation) {
    return NextResponse.json({ error: "Separación no encontrada" }, { status: 404 })
  }
  return NextResponse.json(serializeSeparation(separation))
}

const updateSchema = z.object({
  // Extender plazo de pago (bóveda 05.07 §3A: excepción administrativa)
  dueDate: z.string().datetime().nullable().optional(),
  notes: z.string().nullable().optional(),
})

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
    await prisma.preorderReservation.update({
      where: { id },
      data: {
        ...(d.dueDate === undefined ? {} : { dueDate: d.dueDate ? new Date(d.dueDate) : null }),
        ...(d.notes === undefined ? {} : { notes: d.notes || null }),
      },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating separation:", error)
    return NextResponse.json({ error: "Error al actualizar la separación" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const sep = await prisma.preorderReservation.findUnique({
      where: { id },
      select: { kind: true, status: true },
    })
    if (!sep) {
      return NextResponse.json({ error: "Separación no encontrada" }, { status: 404 })
    }

    await prisma.$transaction(async (tx) => {
      // Si retenía una unidad física, devolverla al stock antes de borrar
      const holdsStock =
        sep.kind === "STOCK" || (sep.kind === "PREORDER" && sep.status === "ARRIVED")
      if (holdsStock && sep.status !== "CANCELLED") {
        const sepFull = await tx.preorderReservation.findUnique({
          where: { id },
          select: { productId: true },
        })
        if (sepFull) {
          await tx.product.update({
            where: { id: sepFull.productId },
            data: { stockQty: { increment: 1 }, status: "STOCK" },
          })
        }
      }
      // Los abonos caen por onDelete: Cascade
      await tx.preorderReservation.delete({ where: { id } })
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting separation:", error)
    return NextResponse.json({ error: "Error al eliminar la separación" }, { status: 500 })
  }
}
