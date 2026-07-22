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

export interface ShalomContactData {
  tiktokUsername?: string | null
  fullName?: string | null
  dni?: string | null
  phone?: string | null
  shalomAddress?: string | null
  notes?: string | null
}

export function ShalomContactForm({
  mode,
  editId,
  initialData,
}: {
  mode: "create" | "edit"
  editId?: string
  initialData?: ShalomContactData | null
}) {
  const router = useRouter()
  const d = initialData ?? {}
  const [tiktokUsername, setTiktok] = useState(d.tiktokUsername ?? "")
  const [fullName, setFullName] = useState(d.fullName ?? "")
  const [dni, setDni] = useState(d.dni ?? "")
  const [phone, setPhone] = useState(d.phone ?? "")
  const [shalomAddress, setShalom] = useState(d.shalomAddress ?? "")
  const [notes, setNotes] = useState(d.notes ?? "")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async () => {
    if (!fullName.trim()) return setError("El nombre completo es requerido")
    setError(null)
    setSaving(true)
    try {
      const url =
        mode === "edit"
          ? `/api/admin/shalom-contacts/${editId}`
          : "/api/admin/shalom-contacts"
      const res = await fetch(url, {
        method: mode === "edit" ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tiktokUsername: tiktokUsername || null,
          fullName: fullName.trim(),
          dni: dni || null,
          phone: phone || null,
          shalomAddress: shalomAddress || null,
          notes: notes || null,
        }),
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
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/logistics">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {mode === "edit" ? "Editar contacto Shalom" : "Nuevo contacto Shalom"}
          </h1>
          <p className="text-muted-foreground">
            Cliente y su agencia Shalom más cercana para envíos a provincia
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
          <CardTitle>Datos del cliente</CardTitle>
          <CardDescription>El nombre completo es obligatorio; el resto es opcional</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Nombre completo *</Label>
              <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Usuario de TikTok</Label>
              <Input
                value={tiktokUsername}
                onChange={(e) => setTiktok(e.target.value)}
                placeholder="@usuario"
              />
            </div>
            <div className="space-y-2">
              <Label>DNI</Label>
              <Input value={dni} onChange={(e) => setDni(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="numeric" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Agencia Shalom más cercana / dirección destino</Label>
            <Textarea
              rows={2}
              value={shalomAddress}
              onChange={(e) => setShalom(e.target.value)}
              placeholder="Av. ... - Distrito - Provincia / Departamento"
            />
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
          {mode === "edit" ? "Guardar cambios" : "Crear contacto"}
        </Button>
      </div>
    </div>
  )
}
