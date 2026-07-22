import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { transformBrand } from "@/lib/transformers"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

// GET: detalle para la página de edición del admin
export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  const { id } = await params
  const brand = await prisma.brand.findUnique({
    where: { id },
    include: { _count: { select: { products: true } } },
  })
  if (!brand) {
    return NextResponse.json({ error: "Marca no encontrada" }, { status: 404 })
  }
  return NextResponse.json(transformBrand(brand))
}

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  imageUrl: z.string().url().nullable().optional(),
  isActive: z.boolean().optional(),
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

    const brand = await prisma.brand.update({
      where: { id },
      data: parsed.data,
      include: { _count: { select: { products: true } } },
    })

    return NextResponse.json(transformBrand(brand))
  } catch (error) {
    console.error("Error updating brand:", error)
    return NextResponse.json(
      { error: "Error al actualizar la marca" },
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
    const productCount = await prisma.product.count({ where: { brandId: id } })
    if (productCount > 0) {
      return NextResponse.json(
        { error: "La marca tiene productos asociados. Desactívala en su lugar." },
        { status: 400 }
      )
    }
    // Las líneas fabricadas por esta marca quedan sin marca asignada (brandId nulo)
    await prisma.line.updateMany({ where: { brandId: id }, data: { brandId: null } })
    await prisma.brand.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting brand:", error)
    return NextResponse.json(
      { error: "Error al eliminar la marca" },
      { status: 500 }
    )
  }
}
