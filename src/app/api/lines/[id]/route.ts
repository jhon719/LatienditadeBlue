import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { transformLine } from "@/lib/transformers"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

// GET: detalle para la página de edición del admin
export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  const { id } = await params
  const line = await prisma.line.findUnique({
    where: { id },
    include: { _count: { select: { products: true } }, brand: true },
  })
  if (!line) {
    return NextResponse.json({ error: "Línea no encontrada" }, { status: 404 })
  }
  return NextResponse.json(transformLine(line))
}

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  imageUrl: z.string().url().nullable().optional(),
  brandId: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
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

    const line = await prisma.line.update({
      where: { id },
      data: parsed.data,
      include: { _count: { select: { products: true } }, brand: true },
    })

    return NextResponse.json(transformLine(line))
  } catch (error) {
    console.error("Error updating line:", error)
    return NextResponse.json(
      { error: "Error al actualizar la línea" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Params }
) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const productCount = await prisma.product.count({ where: { lineId: id } })
    if (productCount > 0) {
      return NextResponse.json(
        { error: "La línea tiene productos asociados. Desactívala en su lugar." },
        { status: 400 }
      )
    }
    await prisma.line.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting line:", error)
    return NextResponse.json(
      { error: "Error al eliminar la línea" },
      { status: 500 }
    )
  }
}
