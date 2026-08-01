import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

const MAX_SUGGESTIONS = 3

// Curaduría manual de "Combina y Ahorra". El endpoint público equivalente
// (/api/products/[id]/bundle) cae al automático por categoría cuando esta
// lista está vacía, así que guardar [] equivale a "volver al automático".
export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  const { id } = await params
  const rows = await prisma.productBundleSuggestion.findMany({
    where: { productId: id },
    orderBy: { order: "asc" },
    include: {
      suggested: {
        select: {
          id: true,
          name: true,
          images: true,
          price: true,
          status: true,
          categoryId: true,
          category: { select: { name: true } },
        },
      },
    },
  })

  return NextResponse.json(
    rows.map((r) => ({
      id: r.suggested.id,
      name: r.suggested.name,
      image: r.suggested.images[0] ?? null,
      price: Number(r.suggested.price),
      status: r.suggested.status,
      categoryId: r.suggested.categoryId,
      categoryName: r.suggested.category.name,
    }))
  )
}

const putSchema = z.object({
  suggestedIds: z.array(z.string().min(1)).max(MAX_SUGGESTIONS),
})

// Reemplaza la lista completa (el orden del arreglo es el orden mostrado).
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const parsed = putSchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }

    // Un producto no puede sugerirse a sí mismo, y no se repiten entradas
    const ids = [...new Set(parsed.data.suggestedIds)].filter((sid) => sid !== id)

    const found = await prisma.product.count({ where: { id: { in: ids } } })
    if (found !== ids.length) {
      return NextResponse.json(
        { error: "Alguno de los productos elegidos ya no existe" },
        { status: 400 }
      )
    }

    await prisma.$transaction([
      prisma.productBundleSuggestion.deleteMany({ where: { productId: id } }),
      prisma.productBundleSuggestion.createMany({
        data: ids.map((suggestedId, index) => ({
          productId: id,
          suggestedId,
          order: index,
        })),
      }),
    ])

    return NextResponse.json({ success: true, count: ids.length })
  } catch (error) {
    console.error("Error saving bundle suggestions:", error)
    return NextResponse.json({ error: "Error al guardar las sugerencias" }, { status: 500 })
  }
}
