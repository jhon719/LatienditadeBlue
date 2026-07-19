import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guards"
import {
  CAMPAIGN_TYPES,
  campaignModel,
  isCampaignType,
  normalizeDates,
} from "@/lib/campaign-admin"

type Params = Promise<{ type: string }>

// CRUD unificado de campañas (bóveda 05.05):
// /api/admin/campaigns/{banners|announcements|coupons|discount-rules}
export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  const { type } = await params
  if (!isCampaignType(type)) {
    return NextResponse.json({ error: "Tipo no válido" }, { status: 404 })
  }

  const items = await (campaignModel(type) as never as {
    findMany: (args: object) => Promise<unknown[]>
  }).findMany({ orderBy: CAMPAIGN_TYPES[type].orderBy })

  return NextResponse.json(items)
}

export async function POST(request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  const { type } = await params
  if (!isCampaignType(type)) {
    return NextResponse.json({ error: "Tipo no válido" }, { status: 404 })
  }

  try {
    const body = await request.json()
    const parsed = CAMPAIGN_TYPES[type].schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }

    const created = await (campaignModel(type) as never as {
      create: (args: { data: object }) => Promise<unknown>
    }).create({ data: normalizeDates(parsed.data) })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    // Código de cupón duplicado
    if ((error as { code?: string })?.code === "P2002") {
      return NextResponse.json(
        { error: "Ya existe un cupón con ese código" },
        { status: 400 }
      )
    }
    console.error(`Error creating ${type}:`, error)
    return NextResponse.json({ error: "Error al crear" }, { status: 500 })
  }
}
