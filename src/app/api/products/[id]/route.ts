import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { transformProduct } from "@/lib/transformers"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params

    // Buscar por slug primero, luego por id
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ slug: id }, { id }],
        isActive: true,
      },
      include: {
        category: true,
        line: true,
        brand: true,
        reviews: { select: { rating: true } },
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(transformProduct(product))
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json(
      { error: "Error al obtener el producto" },
      { status: 500 }
    )
  }
}

const updateProductSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  price: z.number().positive().optional(),
  status: z.enum(["STOCK", "PREVENTA", "AGOTADO", "ONLINE"]).optional(),
  expectedDate: z.string().datetime().nullable().optional(),
  stockQty: z.number().int().min(0).optional(),
  images: z.array(z.string()).optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  categoryId: z.string().optional(),
  lineId: z.string().nullable().optional(),
  brandId: z.string().optional(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateProductSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }

    const data = parsed.data
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        expectedDate:
          data.expectedDate === undefined
            ? undefined
            : data.expectedDate
              ? new Date(data.expectedDate)
              : null,
        lineId: data.lineId === undefined ? undefined : data.lineId || null,
      },
      include: {
        category: true,
        line: true,
        brand: true,
        reviews: { select: { rating: true } },
      },
    })

    return NextResponse.json(transformProduct(product))
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json(
      { error: "Error al actualizar el producto" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params

    // Si el producto tiene órdenes asociadas, se desactiva en lugar de borrarse
    const orderCount = await prisma.orderItem.count({ where: { productId: id } })
    if (orderCount > 0) {
      await prisma.product.update({ where: { id }, data: { isActive: false } })
      return NextResponse.json({ success: true, deactivated: true })
    }

    await prisma.product.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json(
      { error: "Error al eliminar el producto" },
      { status: 500 }
    )
  }
}
