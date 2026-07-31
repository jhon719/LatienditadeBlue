"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Loader2, Plus, Trash2 } from "lucide-react"
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
import { ProductPicker, type ProductOption } from "@/components/admin/ProductPicker"
import { ImageUpload } from "@/components/admin/ImageUpload"

interface UploadedImage {
  url: string
  publicId: string
}

interface LineItem {
  product: ProductOption | null
  quantity: number
  unitCost: string
  // Estado que tomará el producto en el catálogo al agregarlo al lote. La
  // mayoría de productos de un lote siguen en camino, así que por defecto es
  // PREVENTA; el admin cambia a STOCK si está registrando un lote ya recibido.
  status: "PREVENTA" | "STOCK"
}

// El ETA se autocalcula sumando este número de días a la fecha de envío
// (tiempo típico de tránsito internacional + aduanas hasta almacén).
const SHIP_TO_ETA_DAYS = 70

function addDaysAsInputDate(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default function NewBatchPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [supplier, setSupplier] = useState("")
  const [trackingRef, setTrackingRef] = useState("")
  const [shipDate, setShipDate] = useState("")
  const [eta, setEta] = useState("")
  const [notes, setNotes] = useState("")
  const [images, setImages] = useState<UploadedImage[]>([])
  const [items, setItems] = useState<LineItem[]>([
    { product: null, quantity: 1, unitCost: "", status: "PREVENTA" },
  ])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleShipDateChange = (value: string) => {
    setShipDate(value)
    setEta(value ? addDaysAsInputDate(value, SHIP_TO_ETA_DAYS) : "")
  }

  const updateItem = (i: number, patch: Partial<LineItem>) => {
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
  }
  const addItem = () =>
    setItems((prev) => [...prev, { product: null, quantity: 1, unitCost: "", status: "PREVENTA" }])
  const removeItem = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i))

  const trackingIsUrl = /^https?:\/\//i.test(trackingRef.trim())

  const submit = async () => {
    if (!name.trim()) return setError("El nombre del lote es requerido")
    const validItems = items.filter((it) => it.product && it.quantity > 0)
    if (validItems.length === 0) return setError("Agrega al menos un producto al lote")
    setError(null)
    setSaving(true)
    try {
      const res = await fetch("/api/admin/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          supplier: supplier || null,
          trackingRef: trackingRef || null,
          shipDate: shipDate ? new Date(shipDate).toISOString() : null,
          eta: eta ? new Date(eta).toISOString() : null,
          notes: notes || null,
          images: images.map((img) => img.url),
          items: validItems.map((it) => ({
            productId: it.product!.id,
            quantity: Number(it.quantity),
            unitCost: it.unitCost ? Number(it.unitCost) : null,
            status: it.status,
          })),
        }),
      })
      if (!res.ok) {
        const r = await res.json().catch(() => null)
        setError(r?.error ?? "Error al crear el lote")
        return
      }
      router.push("/admin/logistics")
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/logistics">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nuevo lote de importación</h1>
          <p className="text-muted-foreground">
            Stock en tránsito: invisible en la tienda hasta marcarlo como recibido
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Datos del lote</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nombre del lote</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Lote Julio - Banpresto"
              />
            </div>
            <div className="space-y-2">
              <Label>N° de Lote</Label>
              <Input
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                placeholder="BBHD501"
              />
            </div>
            <div className="space-y-2">
              <Label>Guía / referencia aduanera</Label>
              <Input
                value={trackingRef}
                onChange={(e) => setTrackingRef(e.target.value)}
                placeholder="Código o enlace de tracking"
              />
              {trackingIsUrl && (
                <a
                  href={trackingRef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  Abrir guía <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <div className="space-y-2">
              <Label>Fecha de envío</Label>
              <Input
                type="date"
                value={shipDate}
                onChange={(e) => handleShipDateChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>ETA (llegada estimada)</Label>
              <Input type="date" value={eta} onChange={(e) => setEta(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                Autocalculada: fecha de envío + {SHIP_TO_ETA_DAYS} días. Puedes ajustarla.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notas</Label>
            <Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Galería de imágenes</Label>
            <p className="text-xs text-muted-foreground">
              Fotos del packing list, unboxing o evidencia del envío. Sin límite de cantidad.
            </p>
            <ImageUpload value={images} onChange={setImages} folder="batches" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Productos del lote</CardTitle>
          <CardDescription>
            Cantidad en tránsito y costo del proveedor. El estado se aplica al producto del
            catálogo apenas se crea el lote.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="space-y-2 rounded-lg border p-3">
              <div className="space-y-1">
                <Label className="text-xs">Producto</Label>
                <ProductPicker
                  selected={it.product}
                  onSelect={(product) => updateItem(i, { product })}
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="w-20 space-y-1">
                  <Label className="text-xs">Cant.</Label>
                  <Input
                    type="number"
                    min={1}
                    value={it.quantity}
                    onChange={(e) => updateItem(i, { quantity: Number(e.target.value) })}
                  />
                </div>
                <div className="w-28 space-y-1">
                  <Label className="text-xs">Costo (S/)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={it.unitCost}
                    onChange={(e) => updateItem(i, { unitCost: e.target.value })}
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <Label className="text-xs">Estado</Label>
                  <Select
                    value={it.status}
                    onValueChange={(v) => updateItem(i, { status: v as LineItem["status"] })}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PREVENTA">Preventa</SelectItem>
                      <SelectItem value="STOCK">En stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground hover:text-destructive"
                  onClick={() => removeItem(i)}
                  disabled={items.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addItem}>
            <Plus className="mr-2 h-4 w-4" /> Agregar producto
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href="/admin/logistics">Cancelar</Link>
        </Button>
        <Button onClick={submit} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Crear lote
        </Button>
      </div>
    </div>
  )
}
