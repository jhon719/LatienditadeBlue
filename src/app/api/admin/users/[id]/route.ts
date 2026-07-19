import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

// Ficha 360° del cliente (bóveda 05.04 §3): nivel de fidelidad y notas internas
const crmSchema = z.object({
  loyaltyTier: z.enum(["NUEVO", "FRECUENTE", "VIP", "EN_RIESGO"]).optional(),
  adminNotes: z.string().max(2000).nullable().optional(),
})

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const body = await request.json().catch(() => null)
    const parsed = crmSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Datos no válidos" }, { status: 400 })
    }

    const user = await prisma.user.update({
      where: { id },
      data: parsed.data,
      select: { id: true, loyaltyTier: true, adminNotes: true },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error updating CRM data:", error)
    return NextResponse.json(
      { error: "Error al actualizar la ficha" },
      { status: 500 }
    )
  }
}
