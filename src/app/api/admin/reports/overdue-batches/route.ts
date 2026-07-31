import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

// Reporte de lotes atrasados (solo ADMIN): lotes IN_TRANSIT cuyo ETA ya venció.
// Mismo espíritu que las alertas de bajo stock del dashboard (bóveda 05.03 §5),
// pero para la línea de tiempo de importación en vez del stock físico.

const DAY_MS = 24 * 60 * 60 * 1000

type Severity = "LEVE" | "MODERADO" | "CRITICO"

function severityOf(daysOverdue: number): Severity {
  if (daysOverdue > 30) return "CRITICO"
  if (daysOverdue > 14) return "MODERADO"
  return "LEVE"
}

export async function GET() {
  const { response } = await requireAdmin()
  if (response) return response

  const now = new Date()
  const batches = await prisma.importBatch.findMany({
    where: { status: "IN_TRANSIT", eta: { lt: now } },
    orderBy: { eta: "asc" },
    include: {
      items: { select: { quantity: true } },
      preorders: { select: { status: true } },
    },
  })

  const rows = batches.map((b) => {
    const daysOverdue = Math.floor((now.getTime() - b.eta!.getTime()) / DAY_MS)
    return {
      id: b.id,
      name: b.name,
      supplier: b.supplier,
      trackingRef: b.trackingRef,
      eta: b.eta!.toISOString(),
      daysOverdue,
      severity: severityOf(daysOverdue),
      itemsCount: b.items.length,
      totalUnits: b.items.reduce((acc, it) => acc + it.quantity, 0),
      pendingPreorders: b.preorders.filter((p) =>
        ["PENDING", "ARRIVED"].includes(p.status)
      ).length,
    }
  })

  const summary = {
    total: rows.length,
    leve: rows.filter((r) => r.severity === "LEVE").length,
    moderado: rows.filter((r) => r.severity === "MODERADO").length,
    critico: rows.filter((r) => r.severity === "CRITICO").length,
  }

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    summary,
    batches: rows,
  })
}
