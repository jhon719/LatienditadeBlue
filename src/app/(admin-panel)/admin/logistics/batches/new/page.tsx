"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2, Plus, Trash2 } from "lucide-react"
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

interface ProductOpt {
  id: string
  name: string
}

interface LineItem {
  productId: string
  quantity: number
  unitCost: string
}

export default function NewBatchPage() {
  const router = useRouter()
  const [products, setProducts] = useState<ProductOpt[]>([])
  const [name, setName] = useState("")
  const [supplier, setSupplier] = useState("")
  const [trackingRef, setTrackingRef] = useState("")
  const [eta, setEta] = useState("")
  const [notes, setNotes] = useState("")
  const [items, setItems] = useState<LineItem[]>([{ productId: "", quantity: 1, unitCost: "" }])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/products?limit=200")
      .then((r) => (r.ok ? r.json() : { products: [] }))
      .then((d) => setProducts(d.products ?? []))
  }, [])

  const updateItem = (i: number, patch: Partial<LineItem>) => {
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
  }
  const addItem = () => setItems((prev) => [...prev, { productId: "", quantity: 1, unitCost: "" }])
  const removeItem = (i: number) => setItems((prev) => prev.filter((_, idx) => idx !== i))

  const submit = async () => {
    if (!name.trim()) return setError("El nombre del lote es requerido")
    const validItems = items.filter((it) => it.productId && it.quantity > 0)
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
          eta: eta ? new Date(eta).toISOString() : null,
          notes: notes || null,
          items: validItems.map((it) => ({
            productId: it.productId,
            quantity: Number(it.quantity),
            unitCost: it.unitCost ? Number(it.unitCost) : null,
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
              <Label>Proveedor</Label>
              <Input
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                placeholder="Nin-Nin Game / AmiAmi"
              />
            </div>
            <div className="space-y-2">
              <Label>Guía / referencia aduanera</Label>
              <Input value={trackingRef} onChange={(e) => setTrackingRef(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>ETA (llegada estimada)</Label>
              <Input type="date" value={eta} onChange={(e) => setEta(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Notas</Label>
            <Textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Productos del lote</CardTitle>
          <CardDescription>Cantidad en tránsito y costo del proveedor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="flex-1 space-y-1">
                <Label className="text-xs">Producto</Label>
                <Select
                  value={it.productId}
                  onValueChange={(v) => updateItem(i, { productId: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
