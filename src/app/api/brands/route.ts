import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { transformBrand } from "@/lib/transformers"
import { requireAdmin } from "@/lib/api-guards"
import { slugify } from "@/lib/utils"

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { products: { where: { isActive: true } } },
        },
      },
      orderBy: { name: "asc" },
    })

    return NextResponse.json(brands.map(transformBrand))
  } catch (error) {
    console.error("Error fetching brands:", error)
    return NextResponse.json(
      { error: "Error al obtener marcas" },
      { status: 500 }
    )
  }
}

const brandSchema = z.object({
  name: z.string().min(2),
  imageUrl: z.string().optional().nullable(),
})

export async function POST(request: NextRequest) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const body = await request.json()
    const parsed = brandSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }

    const brand = await prisma.brand.create({
      data: {
        name: parsed.data.name,
        slug: slugify(parsed.data.name),
        imageUrl: parsed.data.imageUrl ?? null,
      },
      include: { _count: { select: { products: true } } },
    })

    return NextResponse.json(transformBrand(brand), { status: 201 })
  } catch (error) {
    console.error("Error creating brand:", error)
    return NextResponse.json(
      { error: "Error al crear la marca" },
      { status: 500 }
    )
  }
}
