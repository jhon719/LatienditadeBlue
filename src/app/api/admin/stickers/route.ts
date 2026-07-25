import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

// Catálogo de stickers de la tienda (PNG en Cloudinary/uploads) para mensajería.

export async function GET() {
  const { response } = await requireAdmin()
  if (response) return response

  const stickers = await prisma.sticker.findMany({ orderBy: { createdAt: "desc" } })
  return NextResponse.json(stickers)
}

const createSchema = z.object({
  name: z.string().min(1, "Ponle un nombre al sticker").max(40),
  imageUrl: z
    .string()
    .min(1)
    .max(500)
    .refine(
      (v) => v.startsWith("http") || v.startsWith("/uploads/"),
      "URL de imagen no válida"
    ),
})

export async function POST(request: NextRequest) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const body = await request.json()
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }
    const sticker = await prisma.sticker.create({ data: parsed.data })
    return NextResponse.json(sticker, { status: 201 })
  } catch (error) {
    console.error("Error creating sticker:", error)
    return NextResponse.json({ error: "Error al crear el sticker" }, { status: 500 })
  }
}
