import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import crypto from "node:crypto"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// Flujo "Cambio por Solicitud de Soporte" (bóveda 02.03.01):
// el admin genera una clave temporal, se la pasa al cliente por WhatsApp
// y el sistema fuerza el cambio en el siguiente inicio de sesión.
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 })
  }

  const { id } = await params

  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
  }

  const tempPassword = `Blue-Temp-${crypto.randomInt(1000, 9999)}`
  const passwordHash = await bcrypt.hash(tempPassword, 10)

  await prisma.user.update({
    where: { id },
    data: { passwordHash, mustChangePassword: true },
  })

  // La clave temporal solo se muestra una vez al admin
  return NextResponse.json({ success: true, tempPassword })
}
