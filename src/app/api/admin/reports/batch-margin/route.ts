import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

// Reporte de margen por lote (solo ADMIN): costo del proveedor (ImportBatchItem.unitCost)
// vs. precio de venta actual del catálogo para cada producto del lote. Sirve para ver
// qué tan rentable fue cada importación, no reemplaza al ledger de Adquisiciones
// (Excel ADQUISICIONES / modelo Acquisition, que lleva IGV, tipo de cambio, etc.)

export async function GET() {
  const { response } = await requireAdmin()
  if (response) return response

  const batches = await prisma.importBatch.findMany({
    where: { items: { some: {} } },
    orderBy: { createdAt: "desc" },
    include: {
      items: { include: { product: { select: { price: true } } } },
    },
  })

  const rows = batches.map((b) => {
    let costTotal = 0
    let revenueExpected = 0
    let costComplete = true

    for (const it of b.items) {
      if (it.unitCost == null) costComplete = false
      costTotal += Number(it.unitCost ?? 0) * it.quantity
      revenueExpected += Number(it.product.price) * it.quantity
    }

    const margin = revenueExpected - costTotal
    const marginPct = revenueExpected > 0 ? (margin / revenueExpected) * 100 : null

    return {
      id: b.id,
      name: b.name,
      supplier: b.supplier,
      status: b.status,
      eta: b.eta?.toISOString() ?? null,
      itemsCount: b.items.length,
      totalUnits: b.items.reduce((acc, it) => acc + it.quantity, 0),
      costTotal,
      revenueExpected,
      margin,
      marginPct,
      costComplete,
    }
  })

  const summary = {
    batchCount: rows.length,
    incompleteCostCount: rows.filter((r) => !r.costComplete).length,
    costTotal: rows.reduce((acc, r) => acc + r.costTotal, 0),
    revenueExpected: rows.reduce((acc, r) => acc + r.revenueExpected, 0),
    margin: rows.reduce((acc, r) => acc + r.margin, 0),
  }

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    summary,
    batches: rows,
  })
}
