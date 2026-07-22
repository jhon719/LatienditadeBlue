import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

const schema = z.object({
  tiktokUsername: z.string().max(60).nullable().optional(),
  fullName: z.string().min(1).max(120),
  dni: z.string().max(15).nullable().optional(),
  phone: z.string().max(20).nullable().optional(),
  shalomAddress: z.string().max(500).nullable().optional(),
  notes: z.string().max(500).nullable().optional(),
})

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response } = await requireAdmin()
  if (response) return response
  const { id } = await params
  const c = await prisma.shalomContact.findUnique({ where: { id } })
  if (!c) return NextResponse.json({ error: "No encontrado" }, { status: 404 })
  return NextResponse.json({
    id: c.id,
    tiktokUsername: c.tiktokUsername,
    fullName: c.fullName,
    dni: c.dni,
    phone: c.phone,
    shalomAddress: c.shalomAddress,
    notes: c.notes,
    submittedAt: c.submittedAt?.toISOString() ?? null,
  })
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response } = await requireAdmin()
  if (response) return response
  const { id } = await params
  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
      { status: 400 }
    )
  }
  await prisma.shalomContact.update({
    where: { id },
    data: {
      tiktokUsername: parsed.data.tiktokUsername || null,
      fullName: parsed.data.fullName,
      dni: parsed.data.dni || null,
      phone: parsed.data.phone || null,
      shalomAddress: parsed.data.shalomAddress || null,
      notes: parsed.data.notes || null,
    },
  })
  return NextResponse.json({ ok: true })
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { response } = await requireAdmin()
  if (response) return response
  const { id } = await params
  await prisma.shalomContact.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
