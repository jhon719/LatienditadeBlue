"use client"

import { useState } from "react"
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
import {
  ACQUISITION_MONTHS,
  computeAcquisition,
  igvAmount,
  yen,
  soles,
} from "@/lib/acquisitions"

export type AcquisitionData = Record<string, unknown>

const num = (v: unknown) => (v === null || v === undefined ? "" : String(v))

export function AcquisitionForm({
  mode,
  editId,
  initialData,
}: {
  mode: "create" | "edit"
  editId?: string
  initialData?: AcquisitionData | null
}) {
  const router = useRouter()
  const d = initialData ?? {}

  const [month, setMonth] = useState((d.month as string) || "OCTUBRE")
  const [type, setType] = useState((d.type as string) || "NEW")
  const [lote, setLote] = useState(num(d.lote))
  const [weight, setWeight] = useState(num(d.weight))
  const [commission, setCommission] = useState(num(d.commission) || "0")
  const [cost, setCost] = useState(num(d.cost) || "0")
  const [shippingNac, setShippingNac] = useState(num(d.shippingNac) || "0")
  const [shippingInt, setShippingInt] = useState(num(d.shippingInt) || "0")
  const [exchangeRate, setExchangeRate] = useState(num(d.exchangeRate))
  const [igv, setIgv] = useState(num(d.igv) || "0")
  const [approxRevenue, setApproxRevenue] = useState(num(d.approxRevenue) || "0")
  const [boxNumber, setBoxNumber] = useState(num(d.boxNumber))
  const [shipmentNumber, setShipmentNumber] = useState(num(d.shipmentNumber))
  const [code, setCode] = useState((d.code as string) || "")
  const [purchaseDate, setPurchaseDate] = useState(
    d.purchaseDate ? String(d.purchaseDate).slice(0, 10) : ""
  )
  const [notes, setNotes] = useState((d.notes as string) || "")
  const [images, setImages] = useState<{ url: string; publicId: string }[]>(
    d.imageUrl ? [{ url: d.imageUrl as string, publicId: "" }] : []
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Vista previa de los derivados (mismas fórmulas del Excel)
  const preview = computeAcquisition({
    commission: Number(commission) || 0,
    cost: Number(cost) || 0,
    shippingNac: Number(shippingNac) || 0,
    shippingInt: Number(shippingInt) || 0,
    exchangeRate: exchangeRate ? Number(exchangeRate) : null,
    igv: Number(igv) || 0,
    approxRevenue: Number(approxRevenue) || 0,
  })

  const submit = async () => {
    if (!month) return setError("El mes es requerido")
    setError(null)
    setSaving(true)
    try {
      const payload = {
        month,
        type,
        lote: lote ? Number(lote) : null,
        weight: weight ? Number(weight) : null,
        commission: Number(commission) || 0,
        cost: Number(cost) || 0,
        shippingNac: Number(shippingNac) || 0,
        shippingInt: Number(shippingInt) || 0,
        exchangeRate: exchangeRate ? Number(exchangeRate) : null,
        igv: Number(igv) || 0,
        approxRevenue: Number(approxRevenue) || 0,
        boxNumber: boxNumber ? Number(boxNumber) : null,
        shipmentNumber: shipmentNumber ? Number(shipmentNumber) : null,
        code: code || null,
        purchaseDate: purchaseDate ? new Date(purchaseDate).toISOString() : null,
        imageUrl: images[0]?.url ?? null,
        notes: notes || null,
      }
      const url =
        mode === "edit"
          ? `/api/admin/acquisitions/${editId}`
          : "/api/admin/acquisitions"
      const res = await fetch(url, {
        method: mode === "edit" ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const r = await res.json().catch(() => null)
        setError(r?.error ?? "Error al guardar")
        return
      }
      router.push("/admin/logistics")
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/logistics">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {mode === "edit" ? "Editar adquisición" : "Nueva adquisición"}
          </h1>
          <p className="text-muted-foreground">
            Registro de costos de importación (lote, envío, IGV/aduanas)
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Identificación del lote</CardTitle>
          <CardDescription>Código, mes, tipo y foto del lote comprado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Mes</Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ACQUISITION_MONTHS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Input value={type} onChange={(e) => setType(e.target.value.toUpperCase())} placeholder="NEW / JUNK / GACHA" />
            </div>
            <div className="space-y-2">
              <Label>Código interno</Label>
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="LOTE-2026-09" />
            </div>
            <div className="space-y-2">
              <Label>N° de lote</Label>
              <Input type="number" value={lote} onChange={(e) => setLote(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Fecha de compra</Label>
              <Input type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Peso (g)</Label>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Foto del lote (Cloudinary)</Label>
            <ImageUpload value={images} onChange={setImages} maxImages={1} folder="acquisitions" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Costos y logística</CardTitle>
          <CardDescription>
            Los totales se calculan solos con las fórmulas del Excel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="rounded-md bg-[#FFF7E6] px-3 py-2 text-xs text-[#8a6d00] dark:bg-[#3a2f00]/40 dark:text-[#F5B400]">
            💴 Comisión, costo y envíos van en <b>YENES (¥)</b> (como en el Excel).
            Los importes convertidos e impuestos se muestran en soles.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Comisión (¥)</Label>
              <Input type="number" step="0.01" value={commission} onChange={(e) => setCommission(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Costo (¥)</Label>
              <Input type="number" step="0.01" value={cost} onChange={(e) => setCost(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Envío nacional (¥)</Label>
              <Input type="number" step="0.01" value={shippingNac} onChange={(e) => setShippingNac(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Envío internacional (¥)</Label>
              <Input type="number" step="0.01" value={shippingInt} onChange={(e) => setShippingInt(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Tipo de cambio (¥→S/)</Label>
              <Input type="number" step="0.00000001" value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)} placeholder="0.024" />
            </div>
            <div className="space-y-2">
              <Label>Costo con impuestos +SUNAT (S/)</Label>
              <Input type="number" step="0.01" value={igv} onChange={(e) => setIgv(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Venta estimada / APROX (S/)</Label>
              <Input type="number" step="0.01" value={approxRevenue} onChange={(e) => setApproxRevenue(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>N° de caja</Label>
              <Input type="number" value={boxNumber} onChange={(e) => setBoxNumber(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>N° de envío</Label>
              <Input type="number" value={shipmentNumber} onChange={(e) => setShipmentNumber(e.target.value)} />
            </div>
          </div>

          {/* Vista previa de derivados (fórmulas del Excel) */}
          <div className="grid gap-3 rounded-xl bg-secondary/50 p-4 sm:grid-cols-3 lg:grid-cols-5">
            <div>
              <p className="text-xs text-muted-foreground">Total (¥)</p>
              <p className="text-lg font-bold text-[#B45309]">{yen(preview.total)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">SOLES (antes de aduanas)</p>
              <p className="text-lg font-bold text-[#4A80BE]">{soles(preview.totalSoles)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Invertido +SUNAT</p>
              <p className="text-lg font-bold text-[#142F5C] dark:text-[#7FB3E8]">
                {soles(Number(igv) || 0)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">IGV / Aduanas</p>
              <p className="text-lg font-bold text-[#8a6d00]">
                {soles(igvAmount(Number(igv) || 0, preview.totalSoles))}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Utilidad</p>
              <p className={`text-lg font-bold ${preview.revenue >= 0 ? "text-[#1E7E34]" : "text-red-600"}`}>
                {soles(preview.revenue)}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notas</Label>
            <Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href="/admin/logistics">Cancelar</Link>
        </Button>
        <Button onClick={submit} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === "edit" ? "Guardar cambios" : "Crear adquisición"}
        </Button>
      </div>
    </div>
  )
}
