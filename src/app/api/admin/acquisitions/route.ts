import { NextRequest, NextResponse } from "next/server"
import type { Prisma } from "@prisma/client"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"
import { computeAcquisition, MONTH_ORDER } from "@/lib/acquisitions"

// Ledger de Adquisiciones (Excel ADQUISICIONES). GET lista con filtros; POST crea.
export async function GET(request: NextRequest) {
  const { response } = await requireAdmin()
  if (response) return response

  const { searchParams } = new URL(request.url)
  const month = searchParams.get("month")
  const type = searchParams.get("type")
  const box = searchParams.get("box")
  const search = searchParams.get("search")

  const where: Prisma.AcquisitionWhereInput = {}
  if (month && month !== "all") where.month = month
  if (type && type !== "all") where.type = type
  if (box) where.boxNumber = Number(box)
  if (search) {
    where.OR = [
      { code: { contains: search, mode: "insensitive" } },
      { type: { contains: search, mode: "insensitive" } },
    ]
  }

  const items = await prisma.acquisition.findMany({ where })

  // Orden cronológico del negocio (dic → oct), luego por caja
  items.sort((a, b) => {
    const ma = MONTH_ORDER[a.month] ?? 99
    const mb = MONTH_ORDER[b.month] ?? 99
    if (ma !== mb) return ma - mb
    return (a.boxNumber ?? 0) - (b.boxNumber ?? 0)
  })

  return NextResponse.json(
    items.map((a) => ({
      id: a.id,
      month: a.month,
      type: a.type,
      lote: a.lote,
      weight: a.weight,
      commission: Number(a.commission),
      cost: Number(a.cost),
      shippingNac: Number(a.shippingNac),
      shippingInt: Number(a.shippingInt),
      exchangeRate: a.exchangeRate,
      total: Number(a.total),
      totalSoles: Number(a.totalSoles),
      igv: Number(a.igv),
      approxRevenue: Number(a.approxRevenue),
      revenue: Number(a.revenue),
      boxNumber: a.boxNumber,
      shipmentNumber: a.shipmentNumber,
      code: a.code,
      purchaseDate: a.purchaseDate?.toISOString() ?? null,
      imageUrl: a.imageUrl,
      notes: a.notes,
    }))
  )
}

const createSchema = z.object({
  month: z.string().min(3),
  type: z.string().min(1).default("NEW"),
  lote: z.number().int().nullable().optional(),
  weight: z.number().nullable().optional(),
  commission: z.number().default(0),
  cost: z.number().default(0),
  shippingNac: z.number().default(0),
  shippingInt: z.number().default(0),
  exchangeRate: z.number().nullable().optional(),
  igv: z.number().default(0),
  approxRevenue: z.number().default(0),
  boxNumber: z.number().int().nullable().optional(),
  shipmentNumber: z.number().int().nullable().optional(),
  code: z.string().nullable().optional(),
  purchaseDate: z.string().datetime().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  notes: z.string().nullable().optional(),
})

export async function POST(request: NextRequest) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const body = await request.json()
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }
    const d = parsed.data
    const derived = computeAcquisition({
      commission: d.commission,
      cost: d.cost,
      shippingNac: d.shippingNac,
      shippingInt: d.shippingInt,
      exchangeRate: d.exchangeRate ?? null,
      igv: d.igv,
      approxRevenue: d.approxRevenue,
    })

    const created = await prisma.acquisition.create({
      data: {
        month: d.month.toUpperCase(),
        type: d.type.toUpperCase(),
        lote: d.lote ?? null,
        weight: d.weight ?? null,
        commission: d.commission,
        cost: d.cost,
        shippingNac: d.shippingNac,
        shippingInt: d.shippingInt,
        exchangeRate: d.exchangeRate ?? null,
        total: derived.total,
        totalSoles: derived.totalSoles,
        igv: d.igv,
        approxRevenue: d.approxRevenue,
        revenue: derived.revenue,
        boxNumber: d.boxNumber ?? null,
        shipmentNumber: d.shipmentNumber ?? null,
        code: d.code || null,
        purchaseDate: d.purchaseDate ? new Date(d.purchaseDate) : null,
        imageUrl: d.imageUrl || null,
        notes: d.notes || null,
      },
    })
    return NextResponse.json({ id: created.id }, { status: 201 })
  } catch (error) {
    console.error("Error creating acquisition:", error)
    return NextResponse.json({ error: "Error al crear la adquisición" }, { status: 500 })
  }
}
