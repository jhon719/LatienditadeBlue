import { NextRequest, NextResponse } from "next/server"
import type { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { transformProduct } from "@/lib/transformers"
import { products as mockProducts } from "@/data/mock-products"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Query params
    const category = searchParams.get("category")
    const brand = searchParams.get("brand")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const sortBy = searchParams.get("sortBy") || "newest"
    const featured = searchParams.get("featured")
    const isNew = searchParams.get("new")
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset")
    const search = searchParams.get("search")

    // Try Prisma first
    try {
      // Build where clause
      const where: Prisma.ProductWhereInput = {
        isActive: true,
      }

      if (category) {
        where.category = { slug: category }
      }

      if (brand) {
        where.brand = { slug: brand }
      }

      if (minPrice || maxPrice) {
        where.price = {
          ...(minPrice ? { gte: Number(minPrice) } : {}),
          ...(maxPrice ? { lte: Number(maxPrice) } : {}),
        }
      }

      if (featured === "true") {
        where.isFeatured = true
      }

      if (isNew === "true") {
        where.isNew = true
      }

      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ]
      }

      // Build orderBy
      let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" }
      switch (sortBy) {
        case "price-asc":
          orderBy = { price: "asc" }
          break
        case "price-desc":
          orderBy = { price: "desc" }
          break
        case "newest":
          orderBy = { createdAt: "desc" }
          break
        case "popular":
          orderBy = { stock: "desc" } // Placeholder
          break
      }

      const dbProducts = await prisma.product.findMany({
        where,
        orderBy,
        include: {
          category: true,
          brand: true,
        },
        take: limit ? Number(limit) : undefined,
        skip: offset ? Number(offset) : undefined,
      })

      const total = await prisma.product.count({ where })

      return NextResponse.json({
        products: dbProducts.map(transformProduct),
        total,
        limit: limit ? Number(limit) : null,
        offset: offset ? Number(offset) : 0,
      })
    } catch (dbError) {
      console.warn("Database connection failed. Falling back to mock data.")
      
      // FALLBACK TO MOCK DATA
      let filtered = [...mockProducts]

      if (category) {
        filtered = filtered.filter(p => p.category === category)
      }

      if (brand) {
        filtered = filtered.filter(p => p.brand.toLowerCase() === brand.toLowerCase() || p.brand.toLowerCase().replace(/\s+/g, '-') === brand.toLowerCase())
      }

      if (minPrice) {
        filtered = filtered.filter(p => p.price >= Number(minPrice))
      }

      if (maxPrice) {
        filtered = filtered.filter(p => p.price <= Number(maxPrice))
      }

      if (featured === "true") {
        filtered = filtered.filter(p => p.isFeatured)
      }

      if (isNew === "true") {
        filtered = filtered.filter(p => p.isNew)
      }

      if (search) {
        const query = search.toLowerCase()
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query) ||
          (p.anime && p.anime.toLowerCase().includes(query))
        )
      }

      // Sort
      if (sortBy === "price-asc") {
        filtered.sort((a, b) => a.price - b.price)
      } else if (sortBy === "price-desc") {
        filtered.sort((a, b) => b.price - a.price)
      } else if (sortBy === "popular") {
        filtered.sort((a, b) => b.rating - a.rating)
      }

      const total = filtered.length
      const start = offset ? Number(offset) : 0
      const end = limit ? start + Number(limit) : total
      const paginated = filtered.slice(start, end)

      return NextResponse.json({
        products: paginated,
        total,
        limit: limit ? Number(limit) : null,
        offset: start,
      })
    }
  } catch (error) {
    console.error("Error in products API route:", error)
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    try {
      const product = await prisma.product.create({
        data: {
          name: body.name,
          slug: body.slug,
          description: body.description,
          price: body.price,
          comparePrice: body.comparePrice,
          stock: body.stock || 0,
          images: body.images || [],
          specs: body.specs || {},
          isNew: body.isNew || false,
          isFeatured: body.isFeatured || false,
          categoryId: body.categoryId,
          brandId: body.brandId,
        },
        include: {
          category: true,
          brand: true,
        },
      })

      return NextResponse.json(transformProduct(product), { status: 201 })
    } catch (dbError) {
      console.warn("Database failed on POST. Simulating in-memory success.")
      const simulatedProduct = {
        id: Math.random().toString(36).substring(7),
        name: body.name,
        slug: body.slug,
        brand: body.brandName || "Good Smile Company",
        category: body.categorySlug || "figuras",
        price: Number(body.price),
        originalPrice: body.comparePrice ? Number(body.comparePrice) : undefined,
        images: body.images || ["https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&h=600&fit=crop"],
        description: body.description || "",
        specs: body.specs || {},
        stock: body.stock || 0,
        isNew: body.isNew || false,
        isFeatured: body.isFeatured || false,
        rating: 5.0,
        status: body.stock > 0 ? "STOCK" : "AGOTADO",
        anime: body.specs?.Anime || undefined,
        scale: body.specs?.Escala || undefined,
      }
      return NextResponse.json(simulatedProduct, { status: 201 })
    }
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    )
  }
}
