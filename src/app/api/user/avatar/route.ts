import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir, unlink } from "node:fs/promises"
import path from "node:path"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/api-guards"
import { cloudinary, isCloudinaryEnabled } from "@/lib/cloudinary"
import { IMAGE_EXT, sniffImageType } from "@/lib/image-validation"

// Avatares de usuario (bóveda 02.04).
// Con Cloudinary configurado se suben a `latiendita/avatars` (carpeta aislada
// de products/vouchers/reviews) usando el userId como public_id, de modo que
// cambiar la foto SOBRESCRIBE la anterior en lugar de acumular archivos.
// Sin credenciales, cae al disco local en public/Imagenes/avatar/.
const AVATAR_DIR = path.join(process.cwd(), "public", "Imagenes", "avatar")
const CLOUD_FOLDER = "latiendita/avatars"

const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  const { session, response } = await requireUser()
  if (response) return response

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No se envió ningún archivo" }, { status: 400 })
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "El archivo no puede superar 5MB. Comprime la imagen e intenta de nuevo." },
        { status: 400 }
      )
    }

    const userId = session!.user.id
    const previous = await prisma.user.findUnique({
      where: { id: userId },
      select: { avatarFileName: true },
    })
    const buffer = Buffer.from(await file.arrayBuffer())

    // Validación real por contenido, no por el Content-Type declarado
    const mime = sniffImageType(buffer)
    if (!mime) {
      return NextResponse.json(
        { error: "El archivo no es una imagen válida (solo JPG, PNG o WebP)" },
        { status: 400 }
      )
    }

    if (isCloudinaryEnabled()) {
      const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Timeout al conectar con Cloudinary (30s)"))
        }, 30000)

        const stream = cloudinary.uploader.upload_stream(
          {
            folder: CLOUD_FOLDER,
            public_id: userId,
            overwrite: true,
            invalidate: true,
            resource_type: "image",
            transformation: [
              { width: 400, height: 400, crop: "fill", gravity: "face" },
              { quality: "auto" },
              { fetch_format: "auto" },
            ],
          },
          (error, uploaded) => {
            clearTimeout(timeout)
            if (error) reject(error)
            else resolve(uploaded as { secure_url: string })
          }
        )

        stream.on("error", (error) => {
          clearTimeout(timeout)
          reject(error)
        })

        stream.end(buffer)
      })

      // Si antes tenía un archivo local, se limpia del disco
      if (previous?.avatarFileName && !previous.avatarFileName.startsWith("http")) {
        await unlink(path.join(AVATAR_DIR, previous.avatarFileName)).catch(() => {})
      }

      // El public_id es fijo, pero secure_url incluye el segmento de versión
      // (/v1234567/), que cambia en cada overwrite y rompe la caché por sí solo
      await prisma.user.update({
        where: { id: userId },
        data: { avatarFileName: result.secure_url },
      })

      return NextResponse.json({ avatarFileName: result.secure_url })
    }

    // Fallback local
    const ext = IMAGE_EXT[mime]
    const fileName = `${userId}.${ext}`
    await mkdir(AVATAR_DIR, { recursive: true })

    if (
      previous?.avatarFileName &&
      !previous.avatarFileName.startsWith("http") &&
      previous.avatarFileName !== fileName
    ) {
      await unlink(path.join(AVATAR_DIR, previous.avatarFileName)).catch(() => {})
    }

    await writeFile(path.join(AVATAR_DIR, fileName), buffer)
    await prisma.user.update({
      where: { id: userId },
      data: { avatarFileName: fileName },
    })

    return NextResponse.json({ avatarFileName: fileName })
  } catch (error) {
    console.error("Error uploading avatar:", error)
    const errorMsg = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { error: `Error al subir el avatar: ${errorMsg}` },
      { status: 500 }
    )
  }
}
