import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/api-guards"
import {
  CAMPAIGN_TYPES,
  campaignModel,
  isCampaignType,
  normalizeDates,
} from "@/lib/campaign-admin"

type Params = Promise<{ type: string; id: string }>

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  const { type, id } = await params
  if (!isCampaignType(type)) {
    return NextResponse.json({ error: "Tipo no válido" }, { status: 404 })
  }

  try {
    const body = await request.json()
    // Partial: el admin puede cambiar solo el estado, el orden, etc.
    const parsed = CAMPAIGN_TYPES[type].schema.partial().safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }

    const updated = await (campaignModel(type) as never as {
      update: (args: { where: { id: string }; data: object }) => Promise<unknown>
    }).update({ where: { id }, data: normalizeDates(parsed.data) })

    return NextResponse.json(updated)
  } catch (error) {
    console.error(`Error updating ${type}:`, error)
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  const { type, id } = await params
  if (!isCampaignType(type)) {
    return NextResponse.json({ error: "Tipo no válido" }, { status: 404 })
  }

  try {
    await (campaignModel(type) as never as {
      delete: (args: { where: { id: string } }) => Promise<unknown>
    }).delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    // Cupón con órdenes asociadas: la FK lo protege → desactivar en su lugar
    if ((error as { code?: string })?.code === "P2003") {
      await (campaignModel(type) as never as {
        update: (args: { where: { id: string }; data: object }) => Promise<unknown>
      }).update({ where: { id }, data: { status: "DRAFT" } })
      return NextResponse.json({ success: true, deactivated: true })
    }
    console.error(`Error deleting ${type}:`, error)
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 })
  }
}
