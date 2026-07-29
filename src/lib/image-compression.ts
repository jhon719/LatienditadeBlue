// Comprimir imagen si pesa > 1MB (límite de Next.js App Router en dev)
// Devuelve el archivo original si ya está comprimido, o una versión JPG 80% si no
export async function compressImageIfNeeded(file: File): Promise<File> {
  if (file.size <= 1024 * 1024) return file // < 1MB, no comprimir

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new window.Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")!
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob!], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            })
            resolve(compressedFile)
          },
          "image/jpeg",
          0.8 // 80% quality
        )
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  })
}
