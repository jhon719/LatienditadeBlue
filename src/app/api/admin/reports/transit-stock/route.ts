import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

// Reporte de stock en tránsito agregado (solo ADMIN): unidades de lotes IN_TRANSIT,
// resumidas por mes de ETA / línea / anime — vista panorámica de "qué viene" sin
// tener que abrir lote por lote (bóveda 05.03 §2, Stock en Tránsito).

const MES_LABEL = (d: Date) => {
  const s = d.toLocaleDateString("es-PE", { month: "long", year: "numeric" })
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export async function GET() {
  const { response } = await requireAdmin()
  if (response) return response

  const items = await prisma.importBatchItem.findMany({
    where: { batch: { status: "IN_TRANSIT" } },
    select: {
      quantity: true,
      productId: true,
      batch: { select: { id: true, eta: true } },
      product: {
        select: {
          category: { select: { name: true } },
          line: { select: { name: true } },
        },
      },
    },
  })

  const byMonth = new Map<string, { label: string; units: number; sortKey: string }>()
  const byLine = new Map<string, number>()
  const byCategory = new Map<string, number>()
  const batchIds = new Set<string>()
  const productIds = new Set<string>()

  for (const it of items) {
    batchIds.add(it.batch.id)
    productIds.add(it.productId)

    const monthKey = it.batch.eta
      ? `${it.batch.eta.getFullYear()}-${String(it.batch.eta.getMonth() + 1).padStart(2, "0")}`
      : "sin-eta"
    const monthLabel = it.batch.eta ? MES_LABEL(it.batch.eta) : "Sin ETA"
    const monthEntry = byMonth.get(monthKey) ?? { label: monthLabel, units: 0, sortKey: monthKey }
    monthEntry.units += it.quantity
    byMonth.set(monthKey, monthEntry)

    const lineName = it.product.line?.name ?? "Sin línea"
    byLine.set(lineName, (byLine.get(lineName) ?? 0) + it.quantity)

    const categoryName = it.product.category?.name ?? "Sin categoría"
    byCategory.set(categoryName, (byCategory.get(categoryName) ?? 0) + it.quantity)
  }

  const sortedMonths = [...byMonth.values()].sort((a, b) =>
    a.sortKey === "sin-eta" ? 1 : b.sortKey === "sin-eta" ? -1 : a.sortKey.localeCompare(b.sortKey)
  )
  const sortedLines = [...byLine.entries()]
    .map(([line, units]) => ({ line, units }))
    .sort((a, b) => b.units - a.units)
  const sortedCategories = [...byCategory.entries()]
    .map(([category, units]) => ({ category, units }))
    .sort((a, b) => b.units - a.units)

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    totalUnits: items.reduce((acc, it) => acc + it.quantity, 0),
    totalBatches: batchIds.size,
    totalSkus: productIds.size,
    byMonth: sortedMonths.map(({ label, units }) => ({ label, units })),
    byLine: sortedLines,
    byCategory: sortedCategories,
  })
}
