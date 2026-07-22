import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"
import { computeAcquisition } from "@/lib/acquisitions"

type Params = Promise<{ id: string }>

export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  const { id } = await params
  const a = await prisma.acquisition.findUnique({ where: { id } })
  if (!a) return NextResponse.json({ error: "No encontrada" }, { status: 404 })

  return NextResponse.json({
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
  })
}

const updateSchema = z.object({
  month: z.string().min(3).optional(),
  type: z.string().min(1).optional(),
  lote: z.number().int().nullable().optional(),
  weight: z.number().nullable().optional(),
  commission: z.number().optional(),
  cost: z.number().optional(),
  shippingNac: z.number().optional(),
  shippingInt: z.number().optional(),
  exchangeRate: z.number().nullable().optional(),
  igv: z.number().optional(),
  approxRevenue: z.number().optional(),
  boxNumber: z.number().int().nullable().optional(),
  shipmentNumber: z.number().int().nullable().optional(),
  code: z.string().nullable().optional(),
  purchaseDate: z.string().datetime().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  notes: z.string().nullable().optional(),
})

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }
    const current = await prisma.acquisition.findUnique({ where: { id } })
    if (!current) return NextResponse.json({ error: "No encontrada" }, { status: 404 })

    const d = parsed.data
    // Recalcular derivados con los valores nuevos o los actuales
    const inputs = {
      commission: d.commission ?? Number(current.commission),
      cost: d.cost ?? Number(current.cost),
      shippingNac: d.shippingNac ?? Number(current.shippingNac),
      shippingInt: d.shippingInt ?? Number(current.shippingInt),
      exchangeRate: d.exchangeRate ?? current.exchangeRate,
      igv: d.igv ?? Number(current.igv),
      approxRevenue: d.approxRevenue ?? Number(current.approxRevenue),
    }
    const derived = computeAcquisition(inputs)

    await prisma.acquisition.update({
      where: { id },
      data: {
        ...(d.month ? { month: d.month.toUpperCase() } : {}),
        ...(d.type ? { type: d.type.toUpperCase() } : {}),
        ...(d.lote === undefined ? {} : { lote: d.lote }),
        ...(d.weight === undefined ? {} : { weight: d.weight }),
        commission: inputs.commission,
        cost: inputs.cost,
        shippingNac: inputs.shippingNac,
        shippingInt: inputs.shippingInt,
        exchangeRate: inputs.exchangeRate,
        igv: inputs.igv,
        approxRevenue: inputs.approxRevenue,
        total: derived.total,
        totalSoles: derived.totalSoles,
        revenue: derived.revenue,
        ...(d.boxNumber === undefined ? {} : { boxNumber: d.boxNumber }),
        ...(d.shipmentNumber === undefined ? {} : { shipmentNumber: d.shipmentNumber }),
        ...(d.code === undefined ? {} : { code: d.code || null }),
        ...(d.purchaseDate === undefined
          ? {}
          : { purchaseDate: d.purchaseDate ? new Date(d.purchaseDate) : null }),
        ...(d.imageUrl === undefined ? {} : { imageUrl: d.imageUrl || null }),
        ...(d.notes === undefined ? {} : { notes: d.notes || null }),
      },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating acquisition:", error)
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    await prisma.acquisition.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting acquisition:", error)
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 })
  }
}
