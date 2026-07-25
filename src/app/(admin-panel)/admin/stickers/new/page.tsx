"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Loader2, Sticker as StickerIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/admin/ImageUpload"

const schema = z.object({
  name: z.string().min(1, "Ponle un nombre al sticker").max(40),
})
type FormValues = z.infer<typeof schema>

interface UploadedImage {
  url: string
  publicId: string
}

export default function NewStickerPage() {
  const router = useRouter()
  const [images, setImages] = useState<UploadedImage[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    if (images.length === 0) {
      setError("Sube la imagen del sticker (PNG)")
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/stickers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: values.name, imageUrl: images[0].url }),
      })
      if (!res.ok) {
        const r = await res.json().catch(() => null)
        setError(r?.error ?? "No se pudo crear el sticker")
        return
      }
      router.push("/admin/stickers")
      router.refresh()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/stickers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <StickerIcon className="h-6 w-6 text-primary" /> Crear sticker
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Nuevo sticker de la tienda</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Nombre del sticker</Label>
              <Input
                id="name"
                placeholder="Ej. Bluet feliz"
                {...register("name")}
                className="max-w-sm"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Imagen (PNG recomendado)</Label>
              <ImageUpload
                value={images}
                onChange={setImages}
                maxImages={1}
                folder="stickers"
              />
              <p className="text-xs text-muted-foreground">
                Ideal: PNG cuadrado con fondo transparente. Se mostrará pequeño en los
                mensajes.
              </p>
            </div>

            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <StickerIcon className="mr-2 h-4 w-4" />
                )}
                Crear sticker
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/stickers">Cancelar</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
