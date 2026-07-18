import { v2 as cloudinary } from "cloudinary"

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

export { cloudinary }
