import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"
import { MONTH_ORDER } from "@/lib/acquisitions"

// Resumen del dashboard de logística: costos, IGV/aduanas y utilidad por mes
export async function GET() {
  const { response } = await requireAdmin()
  if (response) return response

  const grouped = await prisma.acquisition.groupBy({
    by: ["month"],
    _count: true,
    _sum: {
      totalSoles: true,
      igv: true,
      revenue: true,
      approxRevenue: true,
    },
  })

  const byMonth = grouped
    .map((g) => {
      const preTaxSoles = Number(g._sum.totalSoles ?? 0) // SOLES (antes de aduanas)
      const landed = Number(g._sum.igv ?? 0) // (+SUNAT): costo real invertido
      return {
        month: g.month,
        count: g._count,
        // "Invertido" = costo real en soles con impuestos incluidos (+SUNAT)
        invested: landed,
        // Solo la porción de IGV/aduanas
        igvAduanas: landed - preTaxSoles,
        // Base convertida antes de impuestos (referencia)
        totalSoles: preTaxSoles,
        revenue: Number(g._sum.revenue ?? 0),
        approxRevenue: Number(g._sum.approxRevenue ?? 0),
      }
    })
    .sort((a, b) => (MONTH_ORDER[a.month] ?? 99) - (MONTH_ORDER[b.month] ?? 99))

  const totals = byMonth.reduce(
    (acc, m) => ({
      count: acc.count + m.count,
      invested: acc.invested + m.invested,
      igvAduanas: acc.igvAduanas + m.igvAduanas,
      totalSoles: acc.totalSoles + m.totalSoles,
      revenue: acc.revenue + m.revenue,
      approxRevenue: acc.approxRevenue + m.approxRevenue,
    }),
    { count: 0, invested: 0, igvAduanas: 0, totalSoles: 0, revenue: 0, approxRevenue: 0 }
  )

  // Próximas llegadas: lotes operativos aún en tránsito (ImportBatch)
  const incomingBatches = await prisma.importBatch.count({
    where: { status: "IN_TRANSIT" },
  })

  return NextResponse.json({ byMonth, totals, incomingBatches })
}
