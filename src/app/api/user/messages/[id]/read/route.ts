import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/api-guards"

type Params = Promise<{ id: string }>

// Marca un mensaje como leído. Valida que el mensaje pertenezca al usuario.
export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  const { session, response } = await requireUser()
  if (response) return response

  const { id } = await params
  const message = await prisma.message.findUnique({
    where: { id },
    select: { recipientId: true, readAt: true },
  })
  if (!message || message.recipientId !== session!.user.id) {
    return NextResponse.json({ error: "Mensaje no encontrado" }, { status: 404 })
  }

  if (!message.readAt) {
    await prisma.message.update({ where: { id }, data: { readAt: new Date() } })
  }
  return NextResponse.json({ success: true })
}
