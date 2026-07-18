import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

// Guardas de sesión para route handlers (RBAC, bóveda 02.03)
export async function requireUser() {
  const session = await auth()
  if (!session?.user?.id) {
    return {
      session: null,
      response: NextResponse.json({ error: "No autorizado" }, { status: 401 }),
    }
  }
  return { session, response: null }
}

export async function requireAdmin() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") {
    return {
      session: null,
      response: NextResponse.json({ error: "Acceso restringido" }, { status: 403 }),
    }
  }
  return { session, response: null }
}
