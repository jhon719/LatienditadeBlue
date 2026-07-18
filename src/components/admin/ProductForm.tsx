"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "@/components/admin/ImageUpload"
import type { Product } from "@/types"

interface UploadedImage {
  url: string
  publicId: string
}

const productSchema = z.object({
  name: z.string().min(3, "El nombre es requerido"),
  description: z.string().min(10, "La descripción es requerida (mín. 10 caracteres)"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  status: z.enum(["STOCK", "PREVENTA", "ONLINE", "AGOTADO"]),
  expectedDate: z.string().optional(),
  stockQty: z.number().int().min(0, "El stock debe ser 0 o más"),
  categoryId: z.string().min(1, "La categoría (anime) es requerida"),
  lineId: z.string().optional(),
  brandId: z.string().min(1, "La marca es requerida"),
  isFeatured: z.boolean(),
})

type ProductFormData = z.infer<typeof productSchema>

interface Option {
  id: string
  name: string
}

interface ProductFormProps {
  product?: Product // undefined = crear nuevo
}

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const [categories, setCategories] = useState<Option[]>([])
  const [lines, setLines] = useState<Option[]>([])
  const [brands, setBrands] = useState<Option[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [images, setImages] = useState<UploadedImage[]>(
    product?.images.map((url) => ({ url, publicId: "" })) ?? []
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          status: product.status,
          expectedDate: product.expectedDate
            ? product.expectedDate.slice(0, 10)
            : "",
          stockQty: product.stockQty,
          categoryId: product.category.id,
          lineId: product.line?.id ?? "",
          brandId: product.brand.id,
          isFeatured: product.isFeatured,
        }
      : {
          status: "STOCK",
          stockQty: 0,
          isFeatured: false,
        },
  })

  const status = watch("status")

  useEffect(() => {
    Promise.all([
      fetch("/api/categories?all=true").then((r) => (r.ok ? r.json() : [])),
      fetch("/api/lines?all=true").then((r) => (r.ok ? r.json() : [])),
      fetch("/api/brands").then((r) => (r.ok ? r.json() : [])),
    ]).then(([cats, lns, brs]) => {
      setCategories(cats)
      setLines(lns)
      setBrands(brs)
    })
  }, [])

  const onSubmit = async (data: ProductFormData) => {
    if (images.length === 0) {
      setError("Sube al menos una imagen del producto")
      return
    }
    setError(null)
    setSaving(true)
    try {
      const payload = {
        name: data.name,
        description: data.description,
        price: data.price,
        status: data.status,
        expectedDate:
          data.status === "PREVENTA" && data.expectedDate
            ? new Date(data.expectedDate).toISOString()
            : null,
        stockQty: data.stockQty,
        categoryId: data.categoryId,
        lineId: data.lineId || null,
        brandId: data.brandId,
        isFeatured: data.isFeatured,
        images: images.map((img) => img.url),
      }

      const res = await fetch(
        product ? `/api/products/${product.id}` : "/api/products",
        {
          method: product ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) {
        const result = await res.json().catch(() => null)
        setError(result?.error ?? "Error al guardar el producto")
        return
      }

      router.push("/admin/products")
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {product ? "Editar Producto" : "Nuevo Producto"}
          </h1>
          <p className="text-muted-foreground">
            {product
              ? `Editando "${product.name}"`
              : "Registra una nueva figura en el catálogo"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Información básica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                placeholder="Monkey D. Luffy Gear 5 - Masterlise"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Material, altura, línea, detalles de la caja..."
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Precio (S/)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                  <p className="text-xs text-destructive">{errors.price.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="stockQty">Stock</Label>
                <Input
                  id="stockQty"
                  type="number"
                  {...register("stockQty", { valueAsNumber: true })}
                />
                {errors.stockQty && (
                  <p className="text-xs text-destructive">
                    {errors.stockQty.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Estado</Label>
                <Select
                  value={status}
                  onValueChange={(v) =>
                    setValue("status", v as ProductFormData["status"])
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STOCK">En Stock</SelectItem>
                    <SelectItem value="PREVENTA">Preventa</SelectItem>
                    <SelectItem value="ONLINE">Online</SelectItem>
                    <SelectItem value="AGOTADO">Agotado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {status === "PREVENTA" && (
              <div className="space-y-2">
                <Label htmlFor="expectedDate">
                  Fecha estimada de llegada (preventa)
                </Label>
                <Input id="expectedDate" type="date" {...register("expectedDate")} />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clasificación</CardTitle>
            <CardDescription>
              Anime, línea de figura y fabricante (bóveda 02.05)
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Anime / Serie</Label>
              <Select
                value={watch("categoryId") ?? ""}
                onValueChange={(v) => setValue("categoryId", v, { shouldValidate: true })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && (
                <p className="text-xs text-destructive">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Línea (opcional)</Label>
              <Select
                value={watch("lineId") ?? ""}
                onValueChange={(v) => setValue("lineId", v === "none" ? "" : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin línea</SelectItem>
                  {lines.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Marca / Fabricante</Label>
              <Select
                value={watch("brandId") ?? ""}
                onValueChange={(v) => setValue("brandId", v, { shouldValidate: true })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.brandId && (
                <p className="text-xs text-destructive">{errors.brandId.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Galería de imágenes</CardTitle>
            <CardDescription>
              La primera imagen es la portada de la tarjeta del producto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload value={images} onChange={setImages} maxImages={6} />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 pt-6">
            <Checkbox
              id="isFeatured"
              checked={watch("isFeatured")}
              onCheckedChange={(v) => setValue("isFeatured", v === true)}
            />
            <Label htmlFor="isFeatured" className="cursor-pointer">
              Destacar en la portada (carrusel de destacados)
            </Label>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/products">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {product ? "Guardar cambios" : "Crear producto"}
          </Button>
        </div>
      </form>
    </div>
  )
}
