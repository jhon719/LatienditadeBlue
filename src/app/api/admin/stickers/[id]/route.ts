import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"
import { deleteImageByUrl } from "@/lib/cloudinary"

type Params = Promise<{ id: string }>

// Borra un sticker y su imagen. Los mensajes que lo usaron conservan su texto y
// quedan con stickerId = null (relación opcional → SetNull).
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { id } = await params
    const sticker = await prisma.sticker.findUnique({ where: { id } })
    if (!sticker) {
      return NextResponse.json({ error: "Sticker no encontrado" }, { status: 404 })
    }

    await prisma.sticker.delete({ where: { id } })
    await deleteImageByUrl(sticker.imageUrl)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting sticker:", error)
    return NextResponse.json({ error: "Error al eliminar el sticker" }, { status: 500 })
  }
}
