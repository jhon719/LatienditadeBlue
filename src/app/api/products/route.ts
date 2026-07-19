import { NextRequest, NextResponse } from "next/server"
import type { Prisma } from "@prisma/client"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { transformProduct } from "@/lib/transformers"
import { requireAdmin } from "@/lib/api-guards"
import { slugify } from "@/lib/utils"
import { getActiveDiscountRules } from "@/lib/campaigns"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const category = searchParams.get("category")
    const line = searchParams.get("line")
    const brand = searchParams.get("brand")
    const status = searchParams.get("status")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const sortBy = searchParams.get("sortBy") || "newest"
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")
    const search = searchParams.get("search")

    const where: Prisma.ProductWhereInput = { isActive: true }

    if (category) where.category = { slug: category }
    if (line) where.line = { slug: line }
    if (brand) where.brand = { slug: brand }
    if (status && ["STOCK", "PREVENTA", "AGOTADO", "ONLINE"].includes(status)) {
      where.status = status as Prisma.ProductWhereInput["status"]
    }

    if (minPrice || maxPrice) {
      where.price = {
        ...(minPrice ? { gte: Number(minPrice) } : {}),
        ...(maxPrice ? { lte: Number(maxPrice) } : {}),
      }
    }

    if (featured === "true") where.isFeatured = true

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { category: { name: { contains: search, mode: "insensitive" } } },
      ]
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" }
    switch (sortBy) {
      case "price-asc":
        orderBy = { price: "asc" }
        break
      case "price-desc":
        orderBy = { price: "desc" }
        break
      case "popular":
        orderBy = { reviews: { _count: "desc" } }
        break
    }

    const [dbProducts, total, rules] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        include: {
          category: true,
          line: true,
          brand: true,
          reviews: { select: { rating: true } },
        },
        take: limit ? Number(limit) : undefined,
        skip: offset ? Number(offset) : undefined,
      }),
      prisma.product.count({ where }),
      getActiveDiscountRules(),
    ])

    return NextResponse.json({
      products: dbProducts.map((p) => transformProduct(p, rules)),
      total,
      limit: limit ? Number(limit) : null,
      offset: offset ? Number(offset) : 0,
    })
  } catch (error) {
    console.error("Error in products API route:", error)
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    )
  }
}

const createProductSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  status: z.enum(["STOCK", "PREVENTA", "AGOTADO", "ONLINE"]).default("STOCK"),
  expectedDate: z.string().datetime().optional().nullable(),
  stockQty: z.number().int().min(0).default(0),
  images: z.array(z.string()).default([]),
  isFeatured: z.boolean().default(false),
  categoryId: z.string().min(1),
  lineId: z.string().optional().nullable(),
  brandId: z.string().min(1),
})

export async function POST(request: NextRequest) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const body = await request.json()
    const parsed = createProductSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }

    const data = parsed.data
    const baseSlug = slugify(data.name)
    let slug = baseSlug
    let suffix = 0
    while (await prisma.product.findUnique({ where: { slug } })) {
      suffix += 1
      slug = `${baseSlug}-${suffix}`
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        price: data.price,
        status: data.status,
        expectedDate: data.expectedDate ? new Date(data.expectedDate) : null,
        stockQty: data.stockQty,
        images: data.images,
        isFeatured: data.isFeatured,
        categoryId: data.categoryId,
        lineId: data.lineId || null,
        brandId: data.brandId,
      },
      include: {
        category: true,
        line: true,
        brand: true,
        reviews: { select: { rating: true } },
      },
    })

    return NextResponse.json(transformProduct(product), { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 }
    )
  }
}
