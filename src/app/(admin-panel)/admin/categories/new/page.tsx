"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Loader2, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { slugify } from "@/lib/utils"

const schema = z.object({
  type: z.enum(["category", "line"]),
  name: z.string().min(2, "El nombre es requerido"),
  isTrending: z.boolean(),
  isFeatured: z.boolean(),
})

type FormData = z.infer<typeof schema>

// Página dedicada (regla CLAUDE.md: sin modales para crear datos)
export default function NewCategoryPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: "category", isTrending: false, isFeatured: false },
  })

  const type = watch("type")
  const name = watch("name") ?? ""
  const slug = slugify(name || "ejemplo")
  const folder =
    type === "category" ? "Lista de Animes" : "Lineas de figuras"

  const onSubmit = async (data: FormData) => {
    setError(null)
    const endpoint = data.type === "category" ? "/api/categories" : "/api/lines"
    const payload =
      data.type === "category"
        ? { name: data.name, isTrending: data.isTrending }
        : { name: data.name, isFeatured: data.isFeatured }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const result = await res.json().catch(() => null)
      setError(result?.error ?? "Error al crear el registro")
      return
    }

    router.push("/admin/categories")
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/categories">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nueva Categoría / Línea</h1>
          <p className="text-muted-foreground">
            Agrega un anime o una línea de figuras al catálogo
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Datos del registro</CardTitle>
            <CardDescription>
              El slug y la ruta de imagen se generan automáticamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <RadioGroup
              value={type}
              onValueChange={(v) => setValue("type", v as FormData["type"])}
              className="grid grid-cols-2 gap-3"
            >
              <Label
                htmlFor="type-category"
                className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 p-3 ${
                  type === "category" ? "border-primary bg-[#E1F0FF]/40" : "border-border"
                }`}
              >
                <RadioGroupItem value="category" id="type-category" />
                Categoría (Anime)
              </Label>
              <Label
                htmlFor="type-line"
                className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 p-3 ${
                  type === "line" ? "border-primary bg-[#E1F0FF]/40" : "border-border"
                }`}
              >
                <RadioGroupItem value="line" id="type-line" />
                Línea de figuras
              </Label>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                placeholder={type === "category" ? "Chainsaw Man" : "Pop Up Parade"}
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            {type === "category" ? (
              <div className="flex items-center gap-3">
                <Checkbox
                  id="isTrending"
                  checked={watch("isTrending")}
                  onCheckedChange={(v) => setValue("isTrending", v === true)}
                />
                <Label htmlFor="isTrending" className="cursor-pointer">
                  Marcar como TENDENCIA 🔥 (aparece primero en el Home)
                </Label>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Checkbox
                  id="isFeatured"
                  checked={watch("isFeatured")}
                  onCheckedChange={(v) => setValue("isFeatured", v === true)}
                />
                <Label htmlFor="isFeatured" className="cursor-pointer">
                  Línea destacada (aparece primero en filtros)
                </Label>
              </div>
            )}

            {/* Aviso de recurso local (bóveda 02.05 §4) */}
            {name.length >= 2 && (
              <div className="flex gap-3 rounded-xl border border-dashed border-[#F5B400] bg-[#FFF5D1]/50 p-4 text-sm dark:bg-[#FFF5D1]/10">
                <FolderOpen className="h-5 w-5 shrink-0 text-[#B08900]" />
                <p>
                  <strong>Aviso de Recurso Local:</strong> para completar la
                  visualización, guarda un archivo llamado{" "}
                  <code className="rounded bg-muted px-1 font-mono text-xs">
                    {slug}.png
                  </code>{" "}
                  dentro de{" "}
                  <code className="rounded bg-muted px-1 font-mono text-xs">
                    public/Imagenes/{folder}/
                  </code>
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/categories">Cancelar</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Crear
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
