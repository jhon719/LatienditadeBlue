"use client"

import { useEffect, useMemo, useState } from "react"
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

interface UserOpt {
  id: string
  username: string
  email: string
}
interface ProductOpt {
  id: string
  name: string
  price: number
  type: string
}
interface BatchOpt {
  id: string
  name: string
  status: string
}

const MIN_DEPOSIT = 10

export default function NewSeparationPage() {
  const router = useRouter()
  const [users, setUsers] = useState<UserOpt[]>([])
  const [products, setProducts] = useState<ProductOpt[]>([])
  const [batches, setBatches] = useState<BatchOpt[]>([])

  const [userId, setUserId] = useState("")
  const [productId, setProductId] = useState("")
  const [kind, setKind] = useState<"STOCK" | "PREORDER">("PREORDER")
  const [batchId, setBatchId] = useState("")
  const [totalPrice, setTotalPrice] = useState("")
  const [initialDeposit, setInitialDeposit] = useState("10")
  const [dueDate, setDueDate] = useState("")
  const [notes, setNotes] = useState("")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/users?role=customer")
      .then((r) => (r.ok ? r.json() : []))
      .then(setUsers)
    fetch("/api/products?limit=200")
      .then((r) => (r.ok ? r.json() : { products: [] }))
      .then((d) => setProducts(d.products ?? []))
    fetch("/api/admin/batches")
      .then((r) => (r.ok ? r.json() : []))
      .then((d: BatchOpt[]) => setBatches(d.filter((b) => b.status === "IN_TRANSIT")))
  }, [])

  // Autocompletar el precio total al elegir producto
  const selectedProduct = useMemo(
    () => products.find((p) => p.id === productId),
    [products, productId]
  )
  useEffect(() => {
    if (selectedProduct && !totalPrice) {
      setTotalPrice(String(selectedProduct.price))
    }
  }, [selectedProduct, totalPrice])

  const submit = async () => {
    if (!userId) return setError("Selecciona el cliente")
    if (!productId) return setError("Selecciona el producto")
    const total = Number(totalPrice)
    const deposit = Number(initialDeposit)
    if (!total || total <= 0) return setError("Ingresa el precio total")
    if (deposit < MIN_DEPOSIT) return setError(`El adelanto mínimo es S/ ${MIN_DEPOSIT}`)
    if (deposit > total) return setError("El adelanto no puede superar el total")

    setError(null)
    setSaving(true)
    try {
      const res = await fetch("/api/admin/separations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId,
          kind,
          batchId: kind === "PREORDER" && batchId ? batchId : null,
          totalPrice: total,
          initialDeposit: deposit,
          dueDate: dueDate ? new Date(dueDate).toISOString() : null,
          notes: notes || null,
        }),
      })
      if (!res.ok) {
        const r = await res.json().catch(() => null)
        setError(r?.error ?? "Error al crear la separación")
        return
      }
      router.push("/admin/logistics")
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  const balancePreview = Number(totalPrice || 0) - Number(initialDeposit || 0)

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/logistics">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nueva separación</h1>
          <p className="text-muted-foreground">
            Aparta un producto con adelanto mínimo de S/ {MIN_DEPOSIT} (bóveda 05.06)
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cliente y producto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label>Cliente</Label>
            <Select value={userId} onValueChange={setUserId}>
              <SelectTrigger>
                <SelectValue placeholder="Busca el cliente" />
              </SelectTrigger>
              <SelectContent>
                {users.map((u) => (
                  <SelectItem key={u.id} value={u.id}>
                    @{u.username} · {u.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Producto</Label>
            <Select value={productId} onValueChange={setProductId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el producto" />
              </SelectTrigger>
              <SelectContent>
                {products.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name} — S/ {Number(p.price).toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tipo y montos</CardTitle>
          <CardDescription>
            Stock: saldo a la quincena/fin de mes. Preventa: 50% a fin de mes, 50% al
            llegar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Tipo de separación</Label>
              <Select value={kind} onValueChange={(v) => setKind(v as "STOCK" | "PREORDER")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STOCK">Stock físico (reserva 1 unidad)</SelectItem>
                  <SelectItem value="PREORDER">Preventa (en tránsito)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {kind === "PREORDER" && (
              <div className="space-y-2">
                <Label>Lote de importación (opcional)</Label>
                <Select value={batchId || "none"} onValueChange={(v) => setBatchId(v === "none" ? "" : v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sin lote" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Sin lote</SelectItem>
                    {batches.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label>Precio total (S/)</Label>
              <Input
                type="number"
                step="0.01"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Adelanto inicial (S/)</Label>
              <Input
                type="number"
                step="0.01"
                min={MIN_DEPOSIT}
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Fecha límite (opcional)</Label>
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              <p className="text-xs text-muted-foreground">
                Si lo dejas vacío se calcula automáticamente según el tipo.
              </p>
            </div>
          </div>

          {Number(totalPrice) > 0 && (
            <div className="rounded-xl bg-secondary/50 p-3 text-sm">
              Saldo pendiente tras el adelanto:{" "}
              <strong>S/ {Math.max(0, balancePreview).toFixed(2)}</strong>
            </div>
          )}

          <div className="space-y-2">
            <Label>Notas internas</Label>
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
          Crear separación
        </Button>
      </div>
    </div>
  )
}
