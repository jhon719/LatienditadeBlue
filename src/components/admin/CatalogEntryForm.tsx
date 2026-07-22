"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "@/components/admin/ImageUpload"

// Formulario compartido de Categoría / Línea / Marca (bóveda 02.05).
// Sirve para crear y editar; las imágenes se alojan en Cloudinary
// (regla CLAUDE.md: página dedicada, sin modales).

export type CatalogEntryType = "category" | "line" | "brand"

const TYPE_OPTIONS: { value: CatalogEntryType; label: string }[] = [
  { value: "category", label: "Categoría (Anime)" },
  { value: "line", label: "Línea de figuras" },
  { value: "brand", label: "Marca (Fabricante)" },
]

const ENDPOINT: Record<CatalogEntryType, string> = {
  category: "/api/categories",
  line: "/api/lines",
  brand: "/api/brands",
}

const UPLOAD_FOLDER: Record<CatalogEntryType, string> = {
  category: "categories",
  line: "lines",
  brand: "brands",
}

interface BrandOption {
  id: string
  name: string
}

export interface CatalogEntryData {
  id?: string
  name: string
  imageUrl?: string
  isActive: boolean
  isTrending?: boolean
  hasNewArrivals?: boolean
  isFeatured?: boolean
  brand?: { id: string; name: string }
}

interface CatalogEntryFormProps {
  mode: "create" | "edit"
  initialType?: CatalogEntryType
  editId?: string
  initialData?: CatalogEntryData | null
}

export function CatalogEntryForm({
  mode,
  initialType = "category",
  editId,
  initialData,
}: CatalogEntryFormProps) {
  const router = useRouter()
  const data = initialData

  const [type, setType] = useState<CatalogEntryType>(initialType)
  const [name, setName] = useState(data?.name ?? "")
  const [images, setImages] = useState<{ url: string; publicId: string }[]>(
    data?.imageUrl ? [{ url: data.imageUrl, publicId: "" }] : []
  )
  const [isActive, setIsActive] = useState(data?.isActive ?? true)
  const [isTrending, setIsTrending] = useState(data?.isTrending ?? false)
  const [hasNewArrivals, setHasNewArrivals] = useState(data?.hasNewArrivals ?? false)
  const [isFeatured, setIsFeatured] = useState(data?.isFeatured ?? false)
  const [brandId, setBrandId] = useState(data?.brand?.id ?? "")
  const [brands, setBrands] = useState<BrandOption[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (type !== "line") return
    fetch("/api/brands?all=true")
      .then((r) => (r.ok ? r.json() : []))
      .then(setBrands)
  }, [type])

  const submit = async () => {
    if (!name.trim()) {
      setError("El nombre es requerido")
      return
    }
    setError(null)
    setSaving(true)
    try {
      const payload: Record<string, unknown> = {
        name,
        imageUrl: images[0]?.url ?? null,
        isActive,
      }
      if (type === "category") {
        payload.isTrending = isTrending
        payload.hasNewArrivals = hasNewArrivals
      }
      if (type === "line") {
        payload.isFeatured = isFeatured
        payload.brandId = brandId || null
      }

      const url = mode === "edit" ? `${ENDPOINT[type]}/${editId}` : ENDPOINT[type]
      const res = await fetch(url, {
        method: mode === "edit" ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const result = await res.json().catch(() => null)
        setError(result?.error ?? "Error al guardar")
        return
      }

      router.push("/admin/categories")
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  const typeLabel = TYPE_OPTIONS.find((t) => t.value === type)?.label ?? ""

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/categories">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {mode === "edit" ? `Editar ${typeLabel}` : "Nueva Categoría / Línea / Marca"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "edit"
              ? "Actualiza el nombre, la imagen o los indicadores"
              : "Agrega un anime, una línea de figuras o un fabricante"}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Datos del registro</CardTitle>
          <CardDescription>
            La imagen se aloja en Cloudinary al subirla
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {mode === "create" && (
            <RadioGroup
              value={type}
              onValueChange={(v) => setType(v as CatalogEntryType)}
              className="grid grid-cols-3 gap-2"
            >
              {TYPE_OPTIONS.map((t) => (
                <Label
                  key={t.value}
                  htmlFor={`type-${t.value}`}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border-2 p-3 text-sm ${
                    type === t.value ? "border-primary bg-[#E1F0FF]/40" : "border-border"
                  }`}
                >
                  <RadioGroupItem value={t.value} id={`type-${t.value}`} />
                  {t.label}
                </Label>
              ))}
            </RadioGroup>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              placeholder={
                type === "category"
                  ? "Chainsaw Man"
                  : type === "line"
                    ? "Pop Up Parade"
                    : "Good Smile Company"
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Imagen</Label>
            <ImageUpload
              value={images}
              onChange={setImages}
              maxImages={1}
              folder={UPLOAD_FOLDER[type]}
            />
          </div>

          {type === "line" && (
            <div className="space-y-2">
              <Label>Marca fabricante (opcional)</Label>
              <Select
                value={brandId || "none"}
                onValueChange={(v) => setBrandId(v === "none" ? "" : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sin marca asignada</SelectItem>
                  {brands.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                La mayoría de líneas pertenecen a un fabricante (ej. Grandista → Banpresto)
              </p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Checkbox
              id="isActive"
              checked={isActive}
              onCheckedChange={(v) => setIsActive(v === true)}
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Activa (visible en la tienda)
            </Label>
          </div>

          {type === "category" && (
            <>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="isTrending"
                  checked={isTrending}
                  onCheckedChange={(v) => setIsTrending(v === true)}
                />
                <Label htmlFor="isTrending" className="cursor-pointer">
                  Marcar como TENDENCIA 🔥 (aparece primero en el Home)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="hasNewArrivals"
                  checked={hasNewArrivals}
                  onCheckedChange={(v) => setHasNewArrivals(v === true)}
                />
                <Label htmlFor="hasNewArrivals" className="cursor-pointer">
                  Tiene ingresos nuevos
                </Label>
              </div>
            </>
          )}

          {type === "line" && (
            <div className="flex items-center gap-3">
              <Checkbox
                id="isFeatured"
                checked={isFeatured}
                onCheckedChange={(v) => setIsFeatured(v === true)}
              />
              <Label htmlFor="isFeatured" className="cursor-pointer">
                Línea destacada (aparece primero en filtros)
              </Label>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/categories">Cancelar</Link>
            </Button>
            <Button onClick={submit} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === "edit" ? "Guardar cambios" : "Crear"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
