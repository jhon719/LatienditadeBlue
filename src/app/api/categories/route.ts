import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { transformCategory } from "@/lib/transformers"
import { requireAdmin } from "@/lib/api-guards"
import { slugify } from "@/lib/utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get("all") === "true"

    const categories = await prisma.category.findMany({
      where: includeInactive ? undefined : { isActive: true },
      include: {
        _count: {
          select: { products: { where: { isActive: true } } },
        },
      },
      // Tendencias primero (bóveda 02.05), luego alfabético
      orderBy: [{ isTrending: "desc" }, { name: "asc" }],
    })

    return NextResponse.json(categories.map(transformCategory))
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json(
      { error: "Error al obtener categorías" },
      { status: 500 }
    )
  }
}

const categorySchema = z.object({
  name: z.string().min(2),
  isActive: z.boolean().default(true),
  isTrending: z.boolean().default(false),
  hasNewArrivals: z.boolean().default(false),
})

export async function POST(request: NextRequest) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const body = await request.json()
    const parsed = categorySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }

    const slug = slugify(parsed.data.name)
    const category = await prisma.category.create({
      data: {
        name: parsed.data.name,
        slug,
        // El admin debe colocar el archivo en public/Imagenes/Lista de Animes/[slug].(png|webp)
        imageUrl: `/Imagenes/Lista de Animes/${slug}.png`,
        isActive: parsed.data.isActive,
        isTrending: parsed.data.isTrending,
        hasNewArrivals: parsed.data.hasNewArrivals,
      },
      include: { _count: { select: { products: true } } },
    })

    return NextResponse.json(transformCategory(category), { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json(
      { error: "Error al crear la categoría" },
      { status: 500 }
    )
  }
}
