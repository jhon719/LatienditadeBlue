"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2, PackageCheck, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

interface Batch {
  id: string
  name: string
  supplier: string | null
  trackingRef: string | null
  eta: string | null
  status: "IN_TRANSIT" | "RECEIVED"
  notes: string | null
  items: { id: string; name: string; quantity: number; unitCost: number | null }[]
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
  const [eta, setEta] = useState("")
  const [notes, setNotes] = useState("")
  const [saving, setSaving] = useState(false)
  const [receiving, setReceiving] = useState(false)
  const [saved, setSaved] = useState(false)

  const load = () => {
    fetch(`/api/admin/batches/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((b: Batch | null) => {
        if (!b) return setNotFound(true)
        setBatch(b)
        setName(b.name)
        setSupplier(b.supplier ?? "")
        setTrackingRef(b.trackingRef ?? "")
        setEta(b.eta ? b.eta.slice(0, 10) : "")
        setNotes(b.notes ?? "")
      })
      .catch(() => setNotFound(true))
  }

  useEffect(load, [id])

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
          eta: eta ? new Date(eta).toISOString() : null,
          notes: notes || null,
        }),
      })
      setSaved(true)
    } finally {
      setSaving(false)
    }
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
              <Label>Proveedor</Label>
              <Input value={supplier} onChange={(e) => setSupplier(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Guía / referencia</Label>
              <Input value={trackingRef} onChange={(e) => setTrackingRef(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>ETA</Label>
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
        </CardHeader>
        <CardContent className="space-y-2">
          {batch.items.map((it) => (
            <div
              key={it.id}
              className="flex items-center justify-between rounded-lg border p-2 text-sm"
            >
              <span>{it.name}</span>
              <span className="text-muted-foreground">
                {it.quantity} uds{it.unitCost ? ` · S/ ${it.unitCost.toFixed(2)} c/u` : ""}
              </span>
            </div>
          ))}
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
