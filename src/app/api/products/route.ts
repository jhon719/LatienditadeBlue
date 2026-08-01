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
    // status/type se aceptan sin distinguir mayúsculas (los links usan minúsculas)
    const status = searchParams.get("status")?.toUpperCase()
    const type = searchParams.get("type")?.toUpperCase()
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const sortBy = searchParams.get("sortBy") || "newest"
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")

    // Paginación con límites de seguridad (DoS, memoria)
    const MAX_LIMIT = 100
    const MAX_OFFSET = 100000
    const limit = Math.min(
      Math.max(1, parseInt(searchParams.get("limit") || "12", 10)),
      MAX_LIMIT
    )
    const offset = Math.min(
      Math.max(0, parseInt(searchParams.get("offset") || "0", 10)),
      MAX_OFFSET
    )

    const where: Prisma.ProductWhereInput = { isActive: true }

    if (category) where.category = { slug: category }
    if (line) where.line = { slug: line }
    if (brand) where.brand = { slug: brand }
    if (status && ["STOCK", "PREVENTA", "AGOTADO", "ONLINE"].includes(status)) {
      where.status = status as Prisma.ProductWhereInput["status"]
    }
    if (
      type &&
      ["FIGURA", "MANGA", "PELUCHE", "LLAVERO", "ROPA", "MERCH"].includes(type)
    ) {
      where.type = type as Prisma.ProductWhereInput["type"]
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
        take: limit,
        skip: offset,
      }),
      prisma.product.count({ where }),
      getActiveDiscountRules(),
    ])

    return NextResponse.json({
      products: dbProducts.map((p) => transformProduct(p, rules)),
      total,
      limit,
      offset,
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
  type: z
    .enum(["FIGURA", "MANGA", "PELUCHE", "LLAVERO", "ROPA", "MERCH"])
    .default("FIGURA"),
  expectedDate: z.string().datetime().optional().nullable(),
  stockQty: z.number().int().min(0).default(0),
  images: z.array(z.string()).default([]),
  specs: z
    .array(z.object({ label: z.string().min(1), value: z.string().min(1) }))
    .default([]),
  isFeatured: z.boolean().default(false),
  categoryId: z.string().min(1),
  lineId: z.string().optional().nullable(),
  brandId: z.string().min(1),
  // Vínculo opcional con un lote de importación: da de alta el producto y, en la
  // misma operación, lo registra como contenido del lote (bóveda 05.03 §11).
  batch: z
    .object({
      batchId: z.string().min(1),
      quantity: z.number().int().positive().default(1),
      unitCost: z.number().nonnegative().optional().nullable(),
    })
    .optional()
    .nullable(),
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

    // Si viene vinculado a un lote, el ETA del lote sirve de fecha estimada de
    // llegada cuando el admin no puso una explícita.
    const linkedBatch = data.batch
      ? await prisma.importBatch.findUnique({
          where: { id: data.batch.batchId },
          select: { id: true, eta: true },
        })
      : null
    if (data.batch && !linkedBatch) {
      return NextResponse.json({ error: "El lote indicado no existe" }, { status: 400 })
    }

    const explicitExpected = data.expectedDate ? new Date(data.expectedDate) : null
    const expectedDate =
      explicitExpected ?? (data.status === "PREVENTA" ? linkedBatch?.eta ?? null : null)

    const product = await prisma.$transaction(async (tx) => {
      const created = await tx.product.create({
        data: {
          name: data.name,
          slug,
          description: data.description,
          price: data.price,
          status: data.status,
          type: data.type,
          expectedDate,
          stockQty: data.stockQty,
          images: data.images,
          specs: data.specs,
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

      if (data.batch && linkedBatch) {
        await tx.importBatchItem.create({
          data: {
            batchId: linkedBatch.id,
            productId: created.id,
            quantity: data.batch.quantity,
            unitCost: data.batch.unitCost ?? null,
          },
        })
      }

      return created
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
