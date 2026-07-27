import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/api-guards"

// Registra la aceptación explícita de Términos y Condiciones (bóveda 07.01).
// Se llama una sola vez desde /accept-terms; el middleware deja de redirigir
// ahí en cuanto termsAcceptedAt queda seteado.
export async function POST() {
  const { session, response } = await requireUser()
  if (response) return response

  await prisma.user.update({
    where: { id: session!.user.id },
    data: {
      termsAcceptedAt: new Date(),
      justRegistered: false, // Ya no mostrar /accept-terms en próximos logins
    },
  })

  return NextResponse.json({ success: true })
}
