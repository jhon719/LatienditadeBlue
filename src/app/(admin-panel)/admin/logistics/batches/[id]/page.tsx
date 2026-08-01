"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  ExternalLink,
  Loader2,
  PackageCheck,
  Plus,
  Save,
  Sparkles,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
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
import { ProductPicker, type ProductOption } from "@/components/admin/ProductPicker"

interface UploadedImage {
  url: string
  publicId: string
}

interface Batch {
  id: string
  name: string
  supplier: string | null
  trackingRef: string | null
  shipDate: string | null
  eta: string | null
  status: "IN_TRANSIT" | "RECEIVED"
  notes: string | null
  images: string[]
  items: {
    id: string
    name: string
    image: string | null
    productStatus: "ONLINE" | "STOCK" | "PREVENTA" | "AGOTADO"
    quantity: number
    unitCost: number | null
  }[]
}

const PRODUCT_STATUS_LABEL: Record<Batch["items"][number]["productStatus"], string> = {
  ONLINE: "Online",
  STOCK: "En stock",
  PREVENTA: "Preventa",
  AGOTADO: "Agotado",
}

// El ETA se autocalcula sumando este número de días a la fecha de envío
// (tiempo típico de tránsito internacional + aduanas hasta almacén).
const SHIP_TO_ETA_DAYS = 70

function addDaysAsInputDate(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default function EditBatchPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [batch, setBatch] = useState<Batch | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [name, setName] = useState("")
  const [supplier, setSupplier] = useState("")
  const [trackingRef, setTrackingRef] = useState("")
  const [shipDate, setShipDate] = useState("")
  const [eta, setEta] = useState("")
  const [notes, setNotes] = useState("")
  const [images, setImages] = useState<UploadedImage[]>([])
  const [saving, setSaving] = useState(false)
  const [receiving, setReceiving] = useState(false)
  const [saved, setSaved] = useState(false)
  // Alta de un producto ya existente del catálogo dentro del lote
  const [addProduct, setAddProduct] = useState<ProductOption | null>(null)
  const [addQty, setAddQty] = useState("1")
  const [addCost, setAddCost] = useState("")
  const [addStatus, setAddStatus] = useState<"PREVENTA" | "STOCK">("PREVENTA")
  const [addBusy, setAddBusy] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)

  const load = () => {
    fetch(`/api/admin/batches/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((b: Batch | null) => {
        if (!b) return setNotFound(true)
        setBatch(b)
        setName(b.name)
        setSupplier(b.supplier ?? "")
        setTrackingRef(b.trackingRef ?? "")
        setShipDate(b.shipDate ? b.shipDate.slice(0, 10) : "")
        setEta(b.eta ? b.eta.slice(0, 10) : "")
        setNotes(b.notes ?? "")
        setImages(b.images.map((url) => ({ url, publicId: "" })))
      })
      .catch(() => setNotFound(true))
  }

  useEffect(load, [id])

  const handleShipDateChange = (value: string) => {
    setShipDate(value)
    setEta(value ? addDaysAsInputDate(value, SHIP_TO_ETA_DAYS) : "")
  }

  const trackingIsUrl = /^https?:\/\//i.test(trackingRef.trim())

  const save = async () => {
    setSaving(true)
    setSaved(false)
    try {
      await fetch(`/api/admin/batches/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          supplier: supplier || null,
          trackingRef: trackingRef || null,
          shipDate: shipDate ? new Date(shipDate).toISOString() : null,
          eta: eta ? new Date(eta).toISOString() : null,
          notes: notes || null,
          images: images.map((img) => img.url),
        }),
      })
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  const addItem = async () => {
    if (!addProduct) return setAddError("Elige un producto")
    setAddError(null)
    setAddBusy(true)
    try {
      const res = await fetch(`/api/admin/batches/${id}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: addProduct.id,
          quantity: Number(addQty) || 1,
          unitCost: addCost ? Number(addCost) : null,
          status: addStatus,
        }),
      })
      if (!res.ok) {
        const r = await res.json().catch(() => null)
        setAddError(r?.error ?? "No se pudo agregar el producto")
        return
      }
      setAddProduct(null)
      setAddQty("1")
      setAddCost("")
      load()
    } finally {
      setAddBusy(false)
    }
  }

  const removeItem = async (itemId: string) => {
    await fetch(`/api/admin/batches/${id}/items/${itemId}`, { method: "DELETE" })
    load()
  }

  const receive = async () => {
    setReceiving(true)
    try {
      await fetch(`/api/admin/batches/${id}/receive`, { method: "POST" })
      router.push("/admin/logistics")
      router.refresh()
    } finally {
      setReceiving(false)
    }
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-muted-foreground">No encontramos este lote.</p>
        <Button asChild variant="outline">
          <Link href="/admin/logistics">Volver</Link>
        </Button>
      </div>
    )
  }
  if (!batch) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/logistics">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            {batch.name}
            {batch.status === "RECEIVED" ? (
              <Badge className="bg-[#E2FBE9] text-[#1E7E34]">Recibido</Badge>
            ) : (
              <Badge className="bg-[#FFF5D1] text-[#8a6d00]">En tránsito</Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Editar datos y línea de tiempo (ETA)</p>
        </div>
        {batch.status === "IN_TRANSIT" && (
          <Button onClick={receive} disabled={receiving}>
            {receiving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PackageCheck className="mr-2 h-4 w-4" />
            )}
            Marcar recibido
          </Button>
        )}
      </div>

      {saved && (
        <div className="rounded-md bg-[#E2FBE9] p-3 text-sm font-semibold text-[#1E7E34]">
          Cambios guardados ✨
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Datos del lote</CardTitle>
          <CardDescription>
            Cambiar el ETA arrastra el plazo de las separaciones pendientes del lote
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>N° de Lote</Label>
              <Input value={supplier} onChange={(e) => setSupplier(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Guía / referencia</Label>
              <Input value={trackingRef} onChange={(e) => setTrackingRef(e.target.value)} />
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
              <Label>ETA</Label>
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
            Lo que trae este envío. Si la figura todavía no está en el catálogo, dala de alta
            con el formulario completo (fotos, precio, anime) y queda vinculada al lote.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {batch.items.length === 0 ? (
            <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
              Este lote todavía no tiene productos.
            </p>
          ) : (
            <div className="space-y-2">
              {batch.items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-3 rounded-lg border p-2 text-sm"
                >
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded bg-muted">
                    {it.image && (
                      <Image
                        src={it.image}
                        alt={it.name}
                        fill
                        className="object-cover"
                        sizes="36px"
                      />
                    )}
                  </div>
                  <span className="min-w-0 flex-1 truncate">{it.name}</span>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {PRODUCT_STATUS_LABEL[it.productStatus]}
                  </Badge>
                  <span className="shrink-0 text-muted-foreground">
                    {it.quantity} uds{it.unitCost ? ` · S/ ${it.unitCost.toFixed(2)} c/u` : ""}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(it.id)}
                    aria-label={`Quitar ${it.name} del lote`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-3 rounded-lg border bg-muted/30 p-3">
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              Agregar producto del catálogo
            </p>
            {addError && (
              <div className="rounded-md bg-destructive/15 p-2 text-xs text-destructive">
                {addError}
              </div>
            )}
            <ProductPicker selected={addProduct} onSelect={setAddProduct} />
            <div className="flex items-end gap-2">
              <div className="w-20 space-y-1">
                <Label className="text-xs">Cant.</Label>
                <Input
                  type="number"
                  min={1}
                  value={addQty}
                  onChange={(e) => setAddQty(e.target.value)}
                />
              </div>
              <div className="w-28 space-y-1">
                <Label className="text-xs">Costo (S/)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={addCost}
                  onChange={(e) => setAddCost(e.target.value)}
                />
              </div>
              <div className="flex-1 space-y-1">
                <Label className="text-xs">Estado</Label>
                <Select
                  value={addStatus}
                  onValueChange={(v) => setAddStatus(v as "PREVENTA" | "STOCK")}
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
              <Button onClick={addItem} disabled={addBusy || !addProduct} className="h-9">
                {addBusy ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Agregar
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border border-dashed p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              ¿La figura aún no existe en el catálogo?
            </p>
            <Button variant="outline" asChild>
              <Link href={`/admin/products/new?batchId=${batch.id}`}>
                <Sparkles className="mr-2 h-4 w-4" />
                Registrar producto nuevo
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href="/admin/logistics">Volver</Link>
        </Button>
        <Button onClick={save} disabled={saving}>
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Guardar cambios
        </Button>
      </div>
    </div>
  )
}
