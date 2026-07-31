import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

// Reporte de productos sin lote asociado (solo ADMIN): productos activos del
// catálogo que nunca pasaron por un ImportBatchItem — altas manuales de stock
// sin trazabilidad a una importación (bóveda 05.03 §7-9).

export async function GET() {
  const { response } = await requireAdmin()
  if (response) return response

  const products = await prisma.product.findMany({
    where: { isActive: true, batchItems: { none: {} } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      status: true,
      stockQty: true,
      price: true,
      createdAt: true,
      category: { select: { name: true } },
      brand: { select: { name: true } },
    },
  })

  const rows = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    status: p.status,
    stockQty: p.stockQty,
    price: Number(p.price),
    category: p.category.name,
    brand: p.brand.name,
    createdAt: p.createdAt.toISOString(),
  }))

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    count: rows.length,
    products: rows,
  })
}
