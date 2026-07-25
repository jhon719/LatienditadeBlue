import { v2 as cloudinary } from "cloudinary"
import { unlink } from "node:fs/promises"
import path from "node:path"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Sin credenciales reales, /api/upload guarda los archivos en public/uploads/
export function isCloudinaryEnabled(): boolean {
  const name = process.env.CLOUDINARY_CLOUD_NAME
  return !!name && name !== "your_cloud_name"
}

// Deriva el public_id de Cloudinary a partir de una secure_url de entrega. Las
// subidas de /api/upload aplican la transformación al guardar, así que la URL no
// trae segmentos de transformación:
//   https://res.cloudinary.com/<cloud>/image/upload/v123/latiendita/products/x.jpg
//   -> latiendita/products/x
export function extractPublicId(url: string): string | null {
  const m = url.match(/\/upload\/(?:v\d+\/)?(.+)$/)
  if (!m) return null
  return m[1].replace(/\.[^/.]+$/, "") // quita la extensión
}

// Elimina una imagen por su URL, ya sea de Cloudinary o un archivo local en
// public/uploads/. Nunca lanza: se usa como limpieza best-effort al borrar un
// recurso, y no debe bloquear el borrado en la BD si la imagen ya no existe.
export async function deleteImageByUrl(url: string): Promise<void> {
  try {
    if (url.includes("res.cloudinary.com")) {
      if (!isCloudinaryEnabled()) return
      const publicId = extractPublicId(url)
      if (publicId) await cloudinary.uploader.destroy(publicId)
    } else if (url.startsWith("/uploads/")) {
      const relative = url.slice("/uploads/".length)
      const uploadsRoot = path.join(process.cwd(), "public", "uploads")
      const target = path.join(uploadsRoot, relative)
      // Evita path traversal fuera de public/uploads
      if (target.startsWith(uploadsRoot)) await unlink(target).catch(() => {})
    }
  } catch (error) {
    console.error("Error eliminando imagen:", error)
  }
}

export { cloudinary }
