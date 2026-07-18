import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { transformLine } from "@/lib/transformers"
import { requireAdmin } from "@/lib/api-guards"
import { slugify } from "@/lib/utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get("all") === "true"

    const lines = await prisma.line.findMany({
      where: includeInactive ? undefined : { isActive: true },
      include: {
        _count: {
          select: { products: { where: { isActive: true } } },
        },
      },
      orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
    })

    return NextResponse.json(lines.map(transformLine))
  } catch (error) {
    console.error("Error fetching lines:", error)
    return NextResponse.json(
      { error: "Error al obtener líneas" },
      { status: 500 }
    )
  }
}

const lineSchema = z.object({
  name: z.string().min(2),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
})

export async function POST(request: NextRequest) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const body = await request.json()
    const parsed = lineSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }

    const slug = slugify(parsed.data.name)
    const line = await prisma.line.create({
      data: {
        name: parsed.data.name,
        slug,
        // El admin debe colocar el archivo en public/Imagenes/Lineas de figuras/[slug].(png|webp)
        imageUrl: `/Imagenes/Lineas de figuras/${slug}.png`,
        isActive: parsed.data.isActive,
        isFeatured: parsed.data.isFeatured,
      },
      include: { _count: { select: { products: true } } },
    })

    return NextResponse.json(transformLine(line), { status: 201 })
  } catch (error) {
    console.error("Error creating line:", error)
    return NextResponse.json(
      { error: "Error al crear la línea" },
      { status: 500 }
    )
  }
}
