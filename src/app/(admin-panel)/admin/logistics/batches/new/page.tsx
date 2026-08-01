"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/admin/ImageUpload"

interface UploadedImage {
  url: string
  publicId: string
}

// El ETA se autocalcula sumando este número de días a la fecha de envío
// (tiempo típico de tránsito internacional + aduanas hasta almacén).
const SHIP_TO_ETA_DAYS = 70

function addDaysAsInputDate(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00`)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

// Paso 1 de 2: se registra el lote (guía, ETA, fotos). Los productos se cargan
// después desde la ficha del lote, donde se puede dar de alta una figura nueva
// con el formulario completo del catálogo. Antes este formulario exigía elegir
// un producto ya existente, lo que obligaba a inventar productos ficticios para
// lotes cuyo contenido todavía no está en el catálogo (bóveda 05.03 §11).
export default function NewBatchPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [supplier, setSupplier] = useState("")
  const [trackingRef, setTrackingRef] = useState("")
  const [shipDate, setShipDate] = useState("")
  const [eta, setEta] = useState("")
  const [notes, setNotes] = useState("")
  const [images, setImages] = useState<UploadedImage[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleShipDateChange = (value: string) => {
    setShipDate(value)
    setEta(value ? addDaysAsInputDate(value, SHIP_TO_ETA_DAYS) : "")
  }

  const trackingIsUrl = /^https?:\/\//i.test(trackingRef.trim())

  const submit = async () => {
    if (!name.trim()) return setError("El nombre del lote es requerido")
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
          items: [],
        }),
      })
      if (!res.ok) {
        const r = await res.json().catch(() => null)
        setError(r?.error ?? "Error al crear el lote")
        return
      }
      const created = await res.json()
      // Continuar en la ficha del lote para cargar sus productos
      router.push(`/admin/logistics/batches/${created.id}`)
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
            Paso 1 de 2: datos del envío. Los productos se cargan después.
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

      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href="/admin/logistics">Cancelar</Link>
        </Button>
        <Button onClick={submit} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Crear y agregar productos
        </Button>
      </div>
    </div>
  )
}
