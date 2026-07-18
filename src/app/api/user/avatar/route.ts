import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir, unlink } from "node:fs/promises"
import path from "node:path"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/api-guards"

// Avatares almacenados localmente en public/Imagenes/avatar/ (bóveda 02.04)
const AVATAR_DIR = path.join(process.cwd(), "public", "Imagenes", "avatar")

const VALID_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}
const MAX_SIZE = 2 * 1024 * 1024 // 2MB

export async function POST(request: NextRequest) {
  const { session, response } = await requireUser()
  if (response) return response

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No se envió ningún archivo" }, { status: 400 })
    }
    if (!VALID_TYPES[file.type]) {
      return NextResponse.json(
        { error: "Solo se permiten imágenes JPG, PNG o WebP" },
        { status: 400 }
      )
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "El avatar no puede superar 2MB" },
        { status: 400 }
      )
    }

    const userId = session!.user.id
    const ext = VALID_TYPES[file.type]
    const fileName = `${userId}.${ext}`

    await mkdir(AVATAR_DIR, { recursive: true })

    // Borrar avatares anteriores con otra extensión
    const previous = await prisma.user.findUnique({
      where: { id: userId },
      select: { avatarFileName: true },
    })
    if (previous?.avatarFileName && previous.avatarFileName !== fileName) {
      await unlink(path.join(AVATAR_DIR, previous.avatarFileName)).catch(() => {})
    }

    const bytes = Buffer.from(await file.arrayBuffer())
    await writeFile(path.join(AVATAR_DIR, fileName), bytes)

    await prisma.user.update({
      where: { id: userId },
      data: { avatarFileName: fileName },
    })

    return NextResponse.json({ avatarFileName: fileName })
  } catch (error) {
    console.error("Error uploading avatar:", error)
    return NextResponse.json(
      { error: "Error al subir el avatar" },
      { status: 500 }
    )
  }
}
