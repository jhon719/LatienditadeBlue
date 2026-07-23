// Verificación del tipo real de imagen por "magic bytes". El Content-Type que
// declara el navegador es manipulable por el cliente, así que para archivos que
// se persisten (vouchers, avatares, productos) confiamos solo en el contenido:
// esto evita subir un .html/.svg con scripts disfrazado de image/png.

export const IMAGE_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
}

export type SniffedImage = "image/jpeg" | "image/png" | "image/webp"

export function sniffImageType(buf: Buffer): SniffedImage | null {
  // JPEG: FF D8 FF
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "image/jpeg"
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return "image/png"
  }
  // WebP: "RIFF"...."WEBP"
  if (
    buf.length >= 12 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp"
  }
  return null
}
