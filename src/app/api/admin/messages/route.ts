import { NextRequest, NextResponse } from "next/server"
import crypto from "node:crypto"
import { z } from "zod"
import { LoyaltyTier } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

// Mensajería interna admin → cliente(s). Solo el admin envía (fan-out: una fila
// Message por destinatario, compartiendo batchId en las difusiones).

const schema = z.object({
  targetType: z.enum(["user", "all", "tier"]),
  userId: z.string().optional(),
  tier: z.nativeEnum(LoyaltyTier).optional(),
  body: z.string().min(1, "Escribe un mensaje").max(4000),
  stickerId: z.string().optional().nullable(),
})

export async function POST(request: NextRequest) {
  const { session, response } = await requireAdmin()
  if (response) return response

  try {
    const parsed = schema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }
    const d = parsed.data

    // Resolver destinatarios
    let recipientIds: string[] = []
    if (d.targetType === "user") {
      if (!d.userId) {
        return NextResponse.json({ error: "Falta el usuario destino" }, { status: 400 })
      }
      const user = await prisma.user.findUnique({ where: { id: d.userId }, select: { id: true } })
      if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
      recipientIds = [user.id]
    } else if (d.targetType === "all") {
      const users = await prisma.user.findMany({
        where: { role: "CUSTOMER" },
        select: { id: true },
      })
      recipientIds = users.map((u) => u.id)
    } else {
      if (!d.tier) {
        return NextResponse.json({ error: "Selecciona un tier" }, { status: 400 })
      }
      const users = await prisma.user.findMany({
        where: { role: "CUSTOMER", loyaltyTier: d.tier },
        select: { id: true },
      })
      recipientIds = users.map((u) => u.id)
    }

    if (recipientIds.length === 0) {
      return NextResponse.json(
        { error: "No hay destinatarios para ese criterio" },
        { status: 400 }
      )
    }

    // Validar sticker si se adjuntó
    if (d.stickerId) {
      const sticker = await prisma.sticker.findUnique({
        where: { id: d.stickerId },
        select: { id: true },
      })
      if (!sticker) {
        return NextResponse.json({ error: "El sticker no existe" }, { status: 400 })
      }
    }

    const batchId = recipientIds.length > 1 ? crypto.randomUUID() : null
    await prisma.message.createMany({
      data: recipientIds.map((rid) => ({
        recipientId: rid,
        senderId: session!.user.id,
        body: d.body,
        stickerId: d.stickerId || null,
        batchId,
      })),
    })

    return NextResponse.json({ success: true, count: recipientIds.length }, { status: 201 })
  } catch (error) {
    console.error("Error sending message:", error)
    return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 })
  }
}

// Bandeja del admin: mensajes enviados, agrupados por difusión (batchId) o
// individuales, con conteo de leídos.
export async function GET() {
  const { response } = await requireAdmin()
  if (response) return response

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    take: 300,
    include: {
      recipient: { select: { username: true } },
      sticker: { select: { imageUrl: true } },
    },
  })

  // Agrupar: difusiones por batchId, individuales por su propio id
  const groups = new Map<
    string,
    {
      key: string
      body: string
      stickerUrl: string | null
      createdAt: string
      isBroadcast: boolean
      recipients: number
      read: number
      sampleRecipient: string | null
    }
  >()

  for (const m of messages) {
    const key = m.batchId ?? m.id
    const g = groups.get(key)
    if (g) {
      g.recipients += 1
      if (m.readAt) g.read += 1
    } else {
      groups.set(key, {
        key,
        body: m.body,
        stickerUrl: m.sticker?.imageUrl ?? null,
        createdAt: m.createdAt.toISOString(),
        isBroadcast: !!m.batchId,
        recipients: 1,
        read: m.readAt ? 1 : 0,
        sampleRecipient: m.recipient.username,
      })
    }
  }

  return NextResponse.json(Array.from(groups.values()))
}
