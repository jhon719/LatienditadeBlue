"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Loader2, Boxes, ExternalLink, Plus, Trash2, Sparkles } from "lucide-react"
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
import { BatchPicker, type BatchOption } from "@/components/admin/BatchPicker"
import { ProductPicker, type ProductOption } from "@/components/admin/ProductPicker"
import type { Product } from "@/types"

interface UploadedImage {
  url: string
  publicId: string
}

// Lote al que pertenece un producto ya creado (vista de edición)
interface LinkedBatch {
  batchId: string
  name: string
  supplier: string | null
  eta: string | null
  status: "IN_TRANSIT" | "RECEIVED"
  image: string | null
  quantity: number
}

// Ficha técnica: pares etiqueta/valor con orden fijo, separados de la
// descripción narrativa (antes todo se amontonaba en `description`)
interface SpecRow {
  label: string
  value: string
}

// Sugerencias de etiqueta (no obligan a nada, solo agilizan la carga con un
// clic). Marca/Anime/Línea ya viven en sus propios selects, así que no se
// repiten aquí.
const SPEC_PRESETS = [
  "Personaje",
  "Transformación",
  "Altura",
  "Material",
  "Tipo de figura",
  "Articulación",
  "Contenido",
]

const productSchema = z.object({
  name: z.string().min(3, "El nombre es requerido"),
  description: z.string().min(10, "La descripción es requerida (mín. 10 caracteres)"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  status: z.enum(["STOCK", "PREVENTA", "ONLINE", "AGOTADO"]),
  type: z.enum(["FIGURA", "MANGA", "PELUCHE", "LLAVERO", "ROPA", "MERCH"]),
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
  const searchParams = useSearchParams()
  // Cuando se llega desde un lote ("Registrar producto nuevo"), el lote viene
  // preseleccionado por query param.
  const batchIdFromUrl = searchParams.get("batchId")
  const [categories, setCategories] = useState<Option[]>([])
  const [lines, setLines] = useState<Option[]>([])
  const [brands, setBrands] = useState<Option[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [images, setImages] = useState<UploadedImage[]>(
    product?.images.map((url) => ({ url, publicId: "" })) ?? []
  )
  const [specs, setSpecs] = useState<SpecRow[]>(
    product?.specs.map((s) => ({ label: s.label, value: s.value })) ?? []
  )
  const [batch, setBatch] = useState<BatchOption | null>(null)
  const [batchQty, setBatchQty] = useState("1")
  const [batchCost, setBatchCost] = useState("")
  const [linkedBatches, setLinkedBatches] = useState<LinkedBatch[]>([])
  const [bundlePicks, setBundlePicks] = useState<ProductOption[]>([])

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
          type: product.type,
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
          type: "FIGURA",
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

  // Alta desde un lote: preselecciona el lote y asume PREVENTA (el producto
  // viene en camino). El admin puede cambiarlo antes de guardar.
  useEffect(() => {
    if (product || !batchIdFromUrl) return
    let cancelled = false
    fetch("/api/admin/batches")
      .then((r) => (r.ok ? r.json() : []))
      .then((list: { id: string; name: string; supplier: string | null; eta: string | null; images?: string[] }[]) => {
        const found = list.find((b) => b.id === batchIdFromUrl)
        if (!found || cancelled) return
        setBatch({
          id: found.id,
          name: found.name,
          supplier: found.supplier,
          eta: found.eta,
          image: found.images?.[0] ?? null,
        })
        setValue("status", "PREVENTA")
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [product, batchIdFromUrl, setValue])

  // En edición, cargar la curaduría manual de "Combina y Ahorra"
  useEffect(() => {
    if (!product) return
    let cancelled = false
    fetch(`/api/admin/products/${product.id}/bundle`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: { id: string; name: string; image: string | null; categoryId: string; categoryName: string }[]) => {
        if (cancelled) return
        setBundlePicks(
          (data ?? []).map((d) => ({
            id: d.id,
            name: d.name,
            image: d.image,
            categoryId: d.categoryId,
            categoryName: d.categoryName,
          }))
        )
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [product])

  // En edición, mostrar de qué lote(s) vino el producto
  useEffect(() => {
    if (!product) return
    let cancelled = false
    fetch(`/api/admin/products/${product.id}/batches`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: LinkedBatch[]) => {
        if (!cancelled) setLinkedBatches(data ?? [])
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [product])

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
        type: data.type,
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
        specs: specs
          .map((s) => ({ label: s.label.trim(), value: s.value.trim() }))
          .filter((s) => s.label && s.value),
        // Solo al crear: vincula el producto al lote en la misma operación
        ...(!product && batch
          ? {
              batch: {
                batchId: batch.id,
                quantity: Number(batchQty) || 1,
                unitCost: batchCost ? Number(batchCost) : null,
              },
            }
          : {}),
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

      // La curaduría de "Combina y Ahorra" vive en su propia tabla, así que se
      // guarda aparte una vez que el producto existe (necesita su id). Guardar
      // una lista vacía es lo que devuelve el bloque al modo automático.
      const saved = await res.json().catch(() => null)
      const savedId = product?.id ?? saved?.id
      if (savedId && (bundlePicks.length > 0 || product)) {
        await fetch(`/api/admin/products/${savedId}/bundle`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ suggestedIds: bundlePicks.map((p) => p.id) }),
        }).catch(() => {})
      }

      // Si el alta salió de un lote, volver al lote para seguir cargándolo
      router.push(batchIdFromUrl ? `/admin/logistics/batches/${batchIdFromUrl}` : "/admin/products")
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
            <CardTitle>Ficha técnica (opcional)</CardTitle>
            <CardDescription>
              Atributos propios de esta figura (personaje, material, altura...). Se
              muestran en una tabla ordenada, separados de la descripción.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {specs.length > 0 && (
              <div className="space-y-2">
                {specs.map((row, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={row.label}
                      onChange={(e) =>
                        setSpecs((prev) =>
                          prev.map((r, idx) => (idx === i ? { ...r, label: e.target.value } : r))
                        )
                      }
                      placeholder="Etiqueta (ej. Personaje)"
                      className="w-40 shrink-0 sm:w-48"
                    />
                    <Input
                      value={row.value}
                      onChange={(e) =>
                        setSpecs((prev) =>
                          prev.map((r, idx) => (idx === i ? { ...r, value: e.target.value } : r))
                        )
                      }
                      placeholder="Valor (ej. Dabi)"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive"
                      onClick={() => setSpecs((prev) => prev.filter((_, idx) => idx !== i))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSpecs((prev) => [...prev, { label: "", value: "" }])}
              >
                <Plus className="mr-2 h-4 w-4" /> Agregar atributo
              </Button>
              {SPEC_PRESETS.filter((p) => !specs.some((s) => s.label === p)).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setSpecs((prev) => [...prev, { label: preset, value: "" }])}
                  className="rounded-full border border-dashed px-3 py-1 text-xs text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  + {preset}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clasificación</CardTitle>
            <CardDescription>
              Tipo de mercancía, anime, línea de figura y fabricante (bóveda 02.05)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de producto</Label>
              <Select
                value={watch("type") ?? "FIGURA"}
                onValueChange={(v) =>
                  setValue("type", v as ProductFormData["type"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FIGURA">Figura</SelectItem>
                  <SelectItem value="MANGA">Manga</SelectItem>
                  <SelectItem value="PELUCHE">Peluche</SelectItem>
                  <SelectItem value="LLAVERO">Llavero</SelectItem>
                  <SelectItem value="ROPA">Ropa</SelectItem>
                  <SelectItem value="MERCH">Merch (otros)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Define en qué sección del menú aparece (Figuras, Mangas, etc.).
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Boxes className="h-5 w-5 text-[#4A80BE]" />
              Lote de importación {product ? "" : "(opcional)"}
            </CardTitle>
            <CardDescription>
              {product
                ? "Lotes en los que llegó o viene este producto"
                : "Si esta figura viene en un lote en camino, indícalo para dejar la trazabilidad"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {product ? (
              linkedBatches.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Este producto no está asociado a ningún lote de importación.
                </p>
              ) : (
                <div className="space-y-2">
                  {linkedBatches.map((b) => (
                    <Link
                      key={b.batchId}
                      href={`/admin/logistics/batches/${b.batchId}`}
                      className="flex items-center gap-3 rounded-lg border p-2 text-sm transition hover:bg-accent"
                    >
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded bg-muted">
                        {b.image && (
                          <Image src={b.image} alt="" fill className="object-cover" sizes="36px" />
                        )}
                      </div>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium">{b.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {b.supplier ?? "Sin N° de lote"} · {b.quantity} uds
                          {b.eta ? ` · ETA ${new Date(b.eta).toLocaleDateString("es-PE")}` : ""}
                        </span>
                      </span>
                      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              )
            ) : (
              <>
                <div className="space-y-2">
                  <Label>N° de Lote / nombre del lote</Label>
                  <BatchPicker
                    selected={batch}
                    onSelect={setBatch}
                    onClear={() => setBatch(null)}
                  />
                </div>
                {batch && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="batchQty">Cantidad en el lote</Label>
                      <Input
                        id="batchQty"
                        type="number"
                        min={1}
                        value={batchQty}
                        onChange={(e) => setBatchQty(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="batchCost">Costo del proveedor (S/)</Label>
                      <Input
                        id="batchCost"
                        type="number"
                        step="0.01"
                        placeholder="Opcional"
                        value={batchCost}
                        onChange={(e) => setBatchCost(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#F5B400]" />
              Combina y Ahorra (opcional)
            </CardTitle>
            <CardDescription>
              Elige hasta 3 productos para sugerir junto a este. Si no eliges ninguno, se
              sugieren automáticamente otros del mismo anime.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {bundlePicks.length > 0 && (
              <div className="space-y-2">
                {bundlePicks.map((p) => {
                  const otherAnime =
                    !!p.categoryId &&
                    !!watch("categoryId") &&
                    p.categoryId !== watch("categoryId")
                  return (
                    <div key={p.id} className="flex items-center gap-3 rounded-lg border p-2">
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded bg-muted">
                        {p.image && (
                          <Image src={p.image} alt="" fill className="object-cover" sizes="36px" />
                        )}
                      </div>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm">{p.name}</span>
                        {otherAnime && (
                          <span className="block text-xs text-[#8a6d00]">
                            De otro anime ({p.categoryName}): este par no genera descuento
                          </span>
                        )}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          setBundlePicks((prev) => prev.filter((x) => x.id !== p.id))
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )
                })}
              </div>
            )}

            {bundlePicks.length < 3 ? (
              <ProductPicker
                selected={null}
                placeholder="Buscar producto para sugerir..."
                onSelect={(p) =>
                  setBundlePicks((prev) =>
                    prev.some((x) => x.id === p.id) || p.id === product?.id
                      ? prev
                      : [...prev, p]
                  )
                }
              />
            ) : (
              <p className="text-xs text-muted-foreground">
                Máximo de 3 sugerencias alcanzado.
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              El descuento (5% con 2, 10% con 3) se calcula entre productos del mismo anime,
              igual que en el carrito.
            </p>
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
