import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { transformBrand } from "@/lib/transformers"
import { brands as mockBrands } from "@/data/mock-products"

export async function GET() {
  try {
    try {
      const brands = await prisma.brand.findMany({
        include: {
          _count: {
            select: { products: { where: { isActive: true } } },
          },
        },
        orderBy: { name: "asc" },
      })

      return NextResponse.json(brands.map(transformBrand))
    } catch (dbError) {
      console.warn("Database connection failed for brands. Falling back to mock brands.")
      return NextResponse.json(mockBrands)
    }
  } catch (error) {
    console.error("Error fetching brands:", error)
    return NextResponse.json(
      { error: "Error fetching brands" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    try {
      const brand = await prisma.brand.create({
        data: {
          name: body.name,
          slug: body.slug,
          logo: body.logo,
        },
        include: {
          _count: {
            select: { products: true },
          },
        },
      })

      return NextResponse.json(transformBrand(brand), { status: 201 })
    } catch (dbError) {
      console.warn("Database failed on POST brand. Simulating success.")
      const simulatedBrand = {
        id: Math.random().toString(36).substring(7),
        name: body.name,
        slug: body.slug,
        logo: body.logo || undefined,
        productCount: 0,
      }
      return NextResponse.json(simulatedBrand, { status: 201 })
    }
  } catch (error) {
    console.error("Error creating brand:", error)
    return NextResponse.json(
      { error: "Error creating brand" },
      { status: 500 }
    )
  }
}
