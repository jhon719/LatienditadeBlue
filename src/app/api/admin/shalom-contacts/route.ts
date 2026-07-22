import { NextRequest, NextResponse } from "next/server"
import type { Prisma } from "@prisma/client"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

// Directorio de envíos Shalom (importado de ACCOUNTBILITY). GET lista+busca; POST crea.
export async function GET(request: NextRequest) {
  const { response } = await requireAdmin()
  if (response) return response

  const search = request.nextUrl.searchParams.get("search")?.trim()
  const where: Prisma.ShalomContactWhereInput = search
    ? {
        OR: [
          { fullName: { contains: search, mode: "insensitive" } },
          { tiktokUsername: { contains: search, mode: "insensitive" } },
          { shalomAddress: { contains: search, mode: "insensitive" } },
          { dni: { contains: search } },
          { phone: { contains: search } },
        ],
      }
    : {}

  const items = await prisma.shalomContact.findMany({
    where,
    orderBy: { fullName: "asc" },
  })
  return NextResponse.json(
    items.map((c) => ({
      id: c.id,
      tiktokUsername: c.tiktokUsername,
      fullName: c.fullName,
      dni: c.dni,
      phone: c.phone,
      shalomAddress: c.shalomAddress,
      notes: c.notes,
      submittedAt: c.submittedAt?.toISOString() ?? null,
    }))
  )
}

const schema = z.object({
  tiktokUsername: z.string().max(60).nullable().optional(),
  fullName: z.string().min(1, "El nombre es requerido").max(120),
  dni: z.string().max(15).nullable().optional(),
  phone: z.string().max(20).nullable().optional(),
  shalomAddress: z.string().max(500).nullable().optional(),
  notes: z.string().max(500).nullable().optional(),
})

export async function POST(request: NextRequest) {
  const { response } = await requireAdmin()
  if (response) return response

  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
      { status: 400 }
    )
  }
  const created = await prisma.shalomContact.create({
    data: {
      tiktokUsername: parsed.data.tiktokUsername || null,
      fullName: parsed.data.fullName,
      dni: parsed.data.dni || null,
      phone: parsed.data.phone || null,
      shalomAddress: parsed.data.shalomAddress || null,
      notes: parsed.data.notes || null,
    },
  })
  return NextResponse.json({ id: created.id }, { status: 201 })
}
