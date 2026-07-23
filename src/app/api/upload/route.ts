import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir, unlink } from "node:fs/promises"
import path from "node:path"
import crypto from "node:crypto"
import { auth } from "@/lib/auth"
import { cloudinary, isCloudinaryEnabled } from "@/lib/cloudinary"
import { IMAGE_EXT, sniffImageType } from "@/lib/image-validation"

const MAX_SIZE = 5 * 1024 * 1024

// Carpetas que puede usar cualquier usuario autenticado (checkout/preventas) vs.
// carpetas del catálogo/marketing reservadas a ADMIN. Sin esta separación, un
// cliente podía subir a `banners`, `products`, etc. con solo estar logueado.
const USER_FOLDERS = ["vouchers", "reviews"]
const ADMIN_FOLDERS = [
  "products",
  "banners",
  "categories",
  "lines",
  "brands",
  "acquisitions",
]

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    // Subcarpeta lógica: vouchers/reviews (usuario) | products/banners/... (admin)
    const folder = (formData.get("folder") as string | null) ?? "products"
    if (![...USER_FOLDERS, ...ADMIN_FOLDERS].includes(folder)) {
      return NextResponse.json({ error: "Carpeta no válida" }, { status: 400 })
    }
    if (ADMIN_FOLDERS.includes(folder) && session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Acceso restringido" }, { status: 403 })
    }

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. Máximo 5MB" },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Validación real por contenido, no por el Content-Type declarado
    const mime = sniffImageType(buffer)
    if (!mime) {
      return NextResponse.json(
        { error: "El archivo no es una imagen válida (solo JPG, PNG o WebP)" },
        { status: 400 }
      )
    }

    if (isCloudinaryEnabled()) {
      const result = await new Promise<{ secure_url: string; public_id: string }>(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: `latiendita/${folder}`,
                resource_type: "image",
                transformation: [
                  { width: 1200, height: 1200, crop: "limit" },
                  { quality: "auto" },
                  { fetch_format: "auto" },
                ],
              },
              (error, result) => {
                if (error) reject(error)
                else resolve(result as { secure_url: string; public_id: string })
              }
            )
            .end(buffer)
        }
      )

      return NextResponse.json({
        url: result.secure_url,
        publicId: result.public_id,
      })
    }

    // Fallback local: sin credenciales de Cloudinary se guarda en public/uploads/
    const ext = IMAGE_EXT[mime]
    const fileName = `${crypto.randomUUID()}.${ext}`
    const dir = path.join(process.cwd(), "public", "uploads", folder)
    await mkdir(dir, { recursive: true })
    await writeFile(path.join(dir, fileName), buffer)

    return NextResponse.json({
      url: `/uploads/${folder}/${fileName}`,
      publicId: `local:${folder}/${fileName}`,
    })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json(
      { error: "Error al subir la imagen" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const publicId = searchParams.get("publicId")

    if (!publicId) {
      return NextResponse.json(
        { error: "Se requiere el publicId" },
        { status: 400 }
      )
    }

    if (publicId.startsWith("local:")) {
      const relative = publicId.slice("local:".length)
      // Evitar path traversal fuera de public/uploads
      const target = path.join(process.cwd(), "public", "uploads", relative)
      const uploadsRoot = path.join(process.cwd(), "public", "uploads")
      if (!target.startsWith(uploadsRoot)) {
        return NextResponse.json({ error: "Ruta no válida" }, { status: 400 })
      }
      await unlink(target).catch(() => {})
    } else {
      await cloudinary.uploader.destroy(publicId)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting image:", error)
    return NextResponse.json(
      { error: "Error al eliminar la imagen" },
      { status: 500 }
    )
  }
}
