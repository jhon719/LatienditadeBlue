import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { transformCategory } from "@/lib/transformers"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

// GET: detalle para la página de edición del admin
export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  const { id } = await params
  const category = await prisma.category.findUnique({
    where: { id },
    include: { _count: { select: { products: true } } },
  })
  if (!category) {
    return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 })
  }
  return NextResponse.json(transformCategory(category))
}

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  imageUrl: z.string().url().nullable().optional(),
  isActive: z.boolean().optional(),
  isTrending: z.boolean().optional(),
  hasNewArrivals: z.boolean().optional(),
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

    const category = await prisma.category.update({
      where: { id },
      data: parsed.data,
      include: { _count: { select: { products: true } } },
    })

    return NextResponse.json(transformCategory(category))
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json(
      { error: "Error al actualizar la categoría" },
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
    const productCount = await prisma.product.count({ where: { categoryId: id } })
    if (productCount > 0) {
      return NextResponse.json(
        { error: "La categoría tiene productos asociados. Desactívala en su lugar." },
        { status: 400 }
      )
    }
    await prisma.category.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json(
      { error: "Error al eliminar la categoría" },
      { status: 500 }
    )
  }
}
