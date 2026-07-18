import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/api-guards"
import { transformReview } from "@/lib/transformers"

// Estados de orden que habilitan la insignia "Compra Verificada" (bóveda 02.04)
const VERIFIED_STATUSES = ["PAID_APPROVED", "COMPLETED"] as const

async function hasVerifiedPurchase(userId: string, productId: string) {
  const count = await prisma.order.count({
    where: {
      userId,
      status: { in: [...VERIFIED_STATUSES] },
      items: { some: { productId } },
    },
  })
  return count > 0
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")
    if (!productId) {
      return NextResponse.json({ error: "productId requerido" }, { status: 400 })
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        // Proyección Zero-Leak: solo datos públicos del usuario (bóveda 02.03)
        user: { select: { username: true, avatarFileName: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    const verified = await prisma.order.findMany({
      where: {
        status: { in: [...VERIFIED_STATUSES] },
        items: { some: { productId } },
      },
      select: { userId: true },
    })
    const verifiedUserIds = new Set(verified.map((o) => o.userId))

    return NextResponse.json(
      reviews.map((r) => transformReview(r, verifiedUserIds.has(r.userId)))
    )
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json(
      { error: "Error al obtener reseñas" },
      { status: 500 }
    )
  }
}

const reviewSchema = z.object({
  productId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5).max(500),
  images: z.array(z.string()).max(4).default([]),
})

export async function POST(request: NextRequest) {
  const { session, response } = await requireUser()
  if (response) return response

  try {
    const body = await request.json()
    const parsed = reviewSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }

    const { productId, rating, comment, images } = parsed.data
    const userId = session!.user.id

    // Solo compradores verificados pueden reseñar (bóveda 02.04)
    const verified = await hasVerifiedPurchase(userId, productId)
    if (!verified) {
      return NextResponse.json(
        { error: "Solo puedes reseñar productos que hayas comprado" },
        { status: 403 }
      )
    }

    // Una reseña por producto: si ya existe, se actualiza
    const review = await prisma.review.upsert({
      where: { productId_userId: { productId, userId } },
      create: { productId, userId, rating, comment, images },
      update: { rating, comment, images },
      include: {
        user: { select: { username: true, avatarFileName: true } },
      },
    })

    return NextResponse.json(transformReview(review, true), { status: 201 })
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json(
      { error: "Error al guardar la reseña" },
      { status: 500 }
    )
  }
}
