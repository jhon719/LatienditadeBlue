import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/api-guards"

// Bandeja del cliente: sus propios mensajes recibidos. Scope estricto por
// recipientId — un usuario nunca ve mensajes de otro.
export async function GET() {
  const { session, response } = await requireUser()
  if (response) return response

  const messages = await prisma.message.findMany({
    where: { recipientId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: { sticker: { select: { name: true, imageUrl: true } } },
  })

  return NextResponse.json(
    messages.map((m) => ({
      id: m.id,
      body: m.body,
      sticker: m.sticker,
      readAt: m.readAt?.toISOString() ?? null,
      createdAt: m.createdAt.toISOString(),
    }))
  )
}
