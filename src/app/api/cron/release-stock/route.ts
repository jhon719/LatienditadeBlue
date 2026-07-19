import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { releaseAbandonedStock } from "@/lib/release-stock"

// Cron de liberación de inventario "secuestrado" (bóveda 06.01 §4).
// En Vercel: configurar un Cron Job apuntando aquí con el header
// Authorization: Bearer ${CRON_SECRET}. También lo puede invocar el ADMIN.
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  const authHeader = request.headers.get("authorization")
  const isCron = !!cronSecret && authHeader === `Bearer ${cronSecret}`

  if (!isCron) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }
  }

  try {
    const result = await releaseAbandonedStock()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error releasing stock:", error)
    return NextResponse.json(
      { error: "Error al liberar stock" },
      { status: 500 }
    )
  }
}
