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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "@/components/admin/ImageUpload"

// Formulario compartido de campañas (bóveda 05.05; regla CLAUDE.md: páginas
// dedicadas, sin modales). Sirve para crear y para editar.

export type CampaignType = "banners" | "announcements" | "coupons" | "discount-rules"

export const CAMPAIGN_TYPE_OPTIONS: { value: CampaignType; label: string }[] = [
  { value: "banners", label: "Hero Banner (carrusel principal)" },
  { value: "announcements", label: "Cinta de anuncios (Top Bar)" },
  { value: "coupons", label: "Cupón de descuento" },
  { value: "discount-rules", label: "Regla de precio (precios tachados)" },
]

interface Option {
  id: string
  name: string
}

// Datos crudos de la campaña tal como los devuelve el GET por id
export type CampaignData = Record<string, unknown>

interface CampaignFormProps {
  mode: "create" | "edit"
  initialType?: CampaignType
  editId?: string
  initialData?: CampaignData | null
}

const str = (v: unknown): string => (typeof v === "string" ? v : "")
const numStr = (v: unknown): string =>
  v === null || v === undefined ? "" : String(v)

// ISO UTC → valor local para <input type="datetime-local">
function toLocalInput(v: unknown): string {
  if (typeof v !== "string" || !v) return ""
  const d = new Date(v)
  if (isNaN(d.getTime())) return ""
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function CampaignForm({
  mode,
  initialType,
  editId,
  initialData,
}: CampaignFormProps) {
  const router = useRouter()
  const data = initialData ?? {}

  const [type, setType] = useState<CampaignType>(initialType ?? "banners")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Campos comunes de scheduling
  const [status, setStatus] = useState(str(data.status) || "ACTIVE")
  const [validFrom, setValidFrom] = useState(toLocalInput(data.validFrom))
  const [validUntil, setValidUntil] = useState(toLocalInput(data.validUntil))

  // Banner
  const [bannerImages, setBannerImages] = useState<{ url: string; publicId: string }[]>(
    str(data.imageUrl) ? [{ url: str(data.imageUrl), publicId: "" }] : []
  )
  const [title, setTitle] = useState(str(data.title))
  const [subtitle, setSubtitle] = useState(str(data.subtitle))
  const [ctaLabel, setCtaLabel] = useState(str(data.ctaLabel))
  const [ctaUrl, setCtaUrl] = useState(str(data.ctaUrl))

  // Announcement
  const [text, setText] = useState(str(data.text))
  const [linkUrl, setLinkUrl] = useState(str(data.linkUrl))
  const [bgColor, setBgColor] = useState(str(data.bgColor) || "#142F5C")
  const [textColor, setTextColor] = useState(str(data.textColor) || "#FFFFFF")

  // Coupon / Rule
  const [code, setCode] = useState(str(data.code))
  const [description, setDescription] = useState(str(data.description))
  const [discountType, setDiscountType] = useState(str(data.type) || "PERCENTAGE")
  const [value, setValue] = useState(numStr(data.value))
  const [minPurchase, setMinPurchase] = useState(
    data.minPurchase && Number(data.minPurchase) > 0 ? numStr(data.minPurchase) : ""
  )
  const [maxUses, setMaxUses] = useState(numStr(data.maxUses))
  const [name, setName] = useState(str(data.name))
  const [scope, setScope] = useState(str(data.scope) || "GLOBAL")
  const [categoryId, setCategoryId] = useState(str(data.categoryId))
  const [lineId, setLineId] = useState(str(data.lineId))
  const [categories, setCategories] = useState<Option[]>([])
  const [lines, setLines] = useState<Option[]>([])

  useEffect(() => {
    if (type !== "discount-rules") return
    Promise.all([
      fetch("/api/categories?all=true").then((r) => (r.ok ? r.json() : [])),
      fetch("/api/lines?all=true").then((r) => (r.ok ? r.json() : [])),
    ]).then(([cats, lns]) => {
      setCategories(cats)
      setLines(lns)
    })
  }, [type])

  const buildPayload = (): Record<string, unknown> | { error: string } => {
    const scheduling = {
      status,
      validFrom: validFrom ? new Date(validFrom).toISOString() : null,
      validUntil: validUntil ? new Date(validUntil).toISOString() : null,
    }
    if (status === "SCHEDULED" && !validFrom && !validUntil) {
      return { error: "Una campaña programada necesita fechas de vigencia" }
    }

    switch (type) {
      case "banners":
        if (!title.trim()) return { error: "El título es requerido" }
        if (bannerImages.length === 0) return { error: "Sube la imagen del banner" }
        return {
          title,
          subtitle: subtitle || null,
          imageUrl: bannerImages[0].url,
          ctaLabel: ctaLabel || null,
          ctaUrl: ctaUrl || null,
          ...(mode === "create" ? { sortOrder: 0 } : {}),
          ...scheduling,
        }
      case "announcements":
        if (!text.trim()) return { error: "El texto de la cinta es requerido" }
        return { text, linkUrl: linkUrl || null, bgColor, textColor, ...scheduling }
      case "coupons":
        if (!code.trim() || !value) return { error: "Código y valor son requeridos" }
        return {
          code,
          description: description || null,
          type: discountType,
          value: Number(value),
          minPurchase: minPurchase ? Number(minPurchase) : 0,
          maxUses: maxUses ? Number(maxUses) : null,
          ...scheduling,
        }
      case "discount-rules":
        if (!name.trim() || !value) return { error: "Nombre y valor son requeridos" }
        return {
          name,
          type: discountType,
          value: Number(value),
          scope,
          categoryId: scope === "CATEGORY" ? categoryId || null : null,
          lineId: scope === "LINE" ? lineId || null : null,
          ...scheduling,
        }
    }
  }

  const submit = async () => {
    const payload = buildPayload()
    if ("error" in payload && typeof payload.error === "string") {
      setError(payload.error)
      return
    }
    setError(null)
    setSaving(true)
    try {
      const url =
        mode === "edit"
          ? `/api/admin/campaigns/${type}/${editId}`
          : `/api/admin/campaigns/${type}`
      const res = await fetch(url, {
        method: mode === "edit" ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const result = await res.json().catch(() => null)
        setError(
          result?.error ??
            (mode === "edit" ? "Error al guardar los cambios" : "Error al crear la campaña")
        )
        return
      }
      router.push("/admin/campaigns")
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/campaigns">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {mode === "edit" ? "Editar campaña" : "Nueva campaña"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "edit"
              ? "Modifica el contenido, valores o programación"
              : "Configura el espacio publicitario o la regla de descuento"}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tipo de campaña</CardTitle>
          {mode === "edit" && (
            <CardDescription>
              El tipo no se puede cambiar al editar. Si necesitas otro tipo, crea
              una campaña nueva.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <Select
            value={type}
            onValueChange={(v) => setType(v as CampaignType)}
            disabled={mode === "edit"}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CAMPAIGN_TYPE_OPTIONS.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contenido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {type === "banners" && (
            <>
              <div className="space-y-2">
                <Label>Imagen del banner (escritorio)</Label>
                <ImageUpload
                  value={bannerImages}
                  onChange={setBannerImages}
                  maxImages={1}
                  folder="banners"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Título superpuesto</Label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Cyber Days Anime" />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo</Label>
                  <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Hasta 30% en figuras seleccionadas" />
                </div>
                <div className="space-y-2">
                  <Label>Texto del botón (CTA)</Label>
                  <Input value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} placeholder="Ver colección" />
                </div>
                <div className="space-y-2">
                  <Label>URL destino</Label>
                  <Input value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} placeholder="/products?category=one-piece" />
                </div>
              </div>
            </>
          )}

          {type === "announcements" && (
            <>
              <div className="space-y-2">
                <Label>Texto de la cinta</Label>
                <Textarea
                  rows={2}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="🚚 Envío gratis en Lima por compras mayores a S/ 200"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Enlace (opcional)</Label>
                  <Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="/products?status=preventa" />
                </div>
                <div className="space-y-2">
                  <Label>Color de fondo</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-9 w-12 cursor-pointer rounded border"
                    />
                    <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Color del texto</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="h-9 w-12 cursor-pointer rounded border"
                    />
                    <Input value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                  </div>
                </div>
              </div>
            </>
          )}

          {type === "coupons" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Código</Label>
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="BLUE10"
                  className="uppercase"
                />
              </div>
              <div className="space-y-2">
                <Label>Descripción interna</Label>
                <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Lanzamiento de la web" />
              </div>
              <div className="space-y-2">
                <Label>Tipo de descuento</Label>
                <Select value={discountType} onValueChange={setDiscountType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Porcentaje (%)</SelectItem>
                    <SelectItem value="FIXED_AMOUNT">Monto fijo (S/)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{discountType === "PERCENTAGE" ? "Porcentaje" : "Monto (S/)"}</Label>
                <Input type="number" step="0.01" value={value} onChange={(e) => setValue(e.target.value)} placeholder={discountType === "PERCENTAGE" ? "10" : "20.00"} />
              </div>
              <div className="space-y-2">
                <Label>Compra mínima (S/, opcional)</Label>
                <Input type="number" step="0.01" value={minPurchase} onChange={(e) => setMinPurchase(e.target.value)} placeholder="100.00" />
              </div>
              <div className="space-y-2">
                <Label>Límite de usos (opcional)</Label>
                <Input type="number" value={maxUses} onChange={(e) => setMaxUses(e.target.value)} placeholder="50 primeros" />
              </div>
            </div>
          )}

          {type === "discount-rules" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label>Nombre interno</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Cyber Days Dragon Ball" />
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={discountType} onValueChange={setDiscountType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Porcentaje (%)</SelectItem>
                    <SelectItem value="FIXED_AMOUNT">Monto fijo (S/)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{discountType === "PERCENTAGE" ? "Porcentaje" : "Monto (S/)"}</Label>
                <Input type="number" step="0.01" value={value} onChange={(e) => setValue(e.target.value)} placeholder="15" />
              </div>
              <div className="space-y-2">
                <Label>Alcance</Label>
                <Select value={scope} onValueChange={setScope}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GLOBAL">Toda la tienda</SelectItem>
                    <SelectItem value="CATEGORY">Por anime/categoría</SelectItem>
                    <SelectItem value="LINE">Por línea de figura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {scope === "CATEGORY" && (
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
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
                </div>
              )}
              {scope === "LINE" && (
                <div className="space-y-2">
                  <Label>Línea</Label>
                  <Select value={lineId} onValueChange={setLineId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      {lines.map((l) => (
                        <SelectItem key={l.id} value={l.id}>
                          {l.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Máquina de estados de tiempo (bóveda 05.05 §3) */}
      <Card>
        <CardHeader>
          <CardTitle>Programación</CardTitle>
          <CardDescription>
            Borrador (invisible) · Activa (permanente) · Programada (ventana de fechas)
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>Estado</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Borrador</SelectItem>
                <SelectItem value="ACTIVE">Activa (permanente)</SelectItem>
                <SelectItem value="SCHEDULED">Programada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {status === "SCHEDULED" && (
            <>
              <div className="space-y-2">
                <Label>Desde</Label>
                <Input
                  type="datetime-local"
                  value={validFrom}
                  onChange={(e) => setValidFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Hasta</Label>
                <Input
                  type="datetime-local"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href="/admin/campaigns">Cancelar</Link>
        </Button>
        <Button onClick={submit} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === "edit" ? "Guardar cambios" : "Crear campaña"}
        </Button>
      </div>
    </div>
  )
}
