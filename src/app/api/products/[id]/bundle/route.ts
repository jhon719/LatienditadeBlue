import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { transformProduct } from "@/lib/transformers"
import { getActiveDiscountRules } from "@/lib/campaigns"

type Params = Promise<{ id: string }>

// Cuántas sugerencias acompañan al producto en "Combina y Ahorra"
const MAX_SUGGESTIONS = 3

const PRODUCT_INCLUDE = {
  category: true,
  line: true,
  brand: true,
  reviews: { select: { rating: true } },
} as const

// Sugerencias para "Combina y Ahorra" (bóveda 02.02).
// Prioridad: curaduría manual del admin (ProductBundleSuggestion); si el
// producto no tiene ninguna, cae al automático por categoría/anime.
export async function GET(_request: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = await params

    const product = await prisma.product.findFirst({
      where: { OR: [{ slug: id }, { id }], isActive: true },
      select: { id: true, categoryId: true },
    })
    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    // Solo tiene sentido sugerir lo que el cliente puede comprar hoy
    const buyable = {
      isActive: true,
      status: { not: "AGOTADO" as const },
      OR: [{ status: "PREVENTA" as const }, { stockQty: { gt: 0 } }],
    }

    const curated = await prisma.productBundleSuggestion.findMany({
      where: { productId: product.id, suggested: buyable },
      orderBy: { order: "asc" },
      take: MAX_SUGGESTIONS,
      include: { suggested: { include: PRODUCT_INCLUDE } },
    })

    const rules = await getActiveDiscountRules()

    if (curated.length > 0) {
      return NextResponse.json({
        source: "manual",
        products: curated.map((c) => transformProduct(c.suggested, rules)),
      })
    }

    const automatic = await prisma.product.findMany({
      where: { ...buyable, categoryId: product.categoryId, id: { not: product.id } },
      orderBy: { createdAt: "desc" },
      take: MAX_SUGGESTIONS,
      include: PRODUCT_INCLUDE,
    })

    return NextResponse.json({
      source: "automatic",
      products: automatic.map((p) => transformProduct(p, rules)),
    })
  } catch (error) {
    console.error("Error fetching bundle suggestions:", error)
    return NextResponse.json({ error: "Error al obtener sugerencias" }, { status: 500 })
  }
}
