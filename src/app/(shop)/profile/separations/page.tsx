"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  PiggyBank,
  Loader2,
  UploadCloud,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SemaphoreBadge, ProgressBar, type SemaphoreLevel } from "@/components/admin/SeparationBits"

interface Payment {
  id: string
  amount: number
  status: "PENDING" | "APPROVED" | "REJECTED"
  createdAt: string
}
interface Separation {
  id: string
  kind: "STOCK" | "PREORDER"
  status: string
  totalPrice: number
  depositPaid: number
  balance: number
  progress: number
  dueDate: string | null
  semaphore: { level: SemaphoreLevel; label: string }
  product: { name: string; slug: string; image: string | null }
  payments: Payment[]
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Saldo pendiente",
  ARRIVED: "¡Llegó! Completa tu saldo",
  COMPLETED: "Pagada al 100%",
  CANCELLED: "Liberada",
}

function money(n: number) {
  return `S/ ${n.toFixed(2)}`
}

// Flujo inline de "Pagar Saldo" (bóveda 05.06 §4): abono con voucher a Cloudinary
function PaySaldoForm({
  separation,
  onDone,
}: {
  separation: Separation
  onDone: () => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [amount, setAmount] = useState(separation.balance.toFixed(2))
  const [operationNumber, setOperationNumber] = useState("")
  const [voucherUrl, setVoucherUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadVoucher = async (file: File) => {
    setUploading(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("folder", "vouchers")
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      const r = await res.json().catch(() => null)
      if (!res.ok) {
        setError(r?.error ?? "Error al subir el comprobante")
        return
      }
      setVoucherUrl(r.url)
    } finally {
      setUploading(false)
    }
  }

  const submit = async () => {
    if (!voucherUrl) return setError("Adjunta el comprobante de tu abono")
    if (operationNumber.trim().length < 3) return setError("Ingresa el número de operación")
    const amt = Number(amount)
    if (!amt || amt <= 0) return setError("Ingresa un monto válido")
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch(`/api/separations/${separation.id}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amt, operationNumber, imageUrl: voucherUrl }),
      })
      const r = await res.json().catch(() => null)
      if (!res.ok) {
        setError(r?.error ?? "No se pudo registrar tu abono")
        return
      }
      onDone()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-4 space-y-3 rounded-xl border border-dashed border-primary/40 bg-secondary/40 p-4">
      <p className="text-sm font-semibold">Pagar saldo (S/ {separation.balance.toFixed(2)})</p>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs">Monto a abonar (S/)</Label>
          <Input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">N° de operación</Label>
          <Input value={operationNumber} onChange={(e) => setOperationNumber(e.target.value)} />
        </div>
      </div>

      {!voucherUrl ? (
        <>
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-4 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-secondary/50"
          >
            {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <UploadCloud className="h-5 w-5" />}
            {uploading ? "Subiendo..." : "Adjuntar comprobante"}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) uploadVoucher(f)
              e.target.value = ""
            }}
          />
        </>
      ) : (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-400">
          <CheckCircle className="h-4 w-4" /> Comprobante adjuntado
          <button
            type="button"
            className="ml-auto text-xs text-red-500 hover:underline"
            onClick={() => setVoucherUrl(null)}
          >
            Reemplazar
          </button>
        </div>
      )}

      <Button onClick={submit} disabled={submitting} className="w-full">
        {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Enviar abono para validación
      </Button>
    </div>
  )
}

function SeparationCard({ sep, onChanged }: { sep: Separation; onChanged: () => void }) {
  const [paying, setPaying] = useState(false)
  const isActive = sep.status === "PENDING" || sep.status === "ARRIVED"
  const hasPending = sep.payments.some((p) => p.status === "PENDING")

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
            {sep.product.image && (
              <Image
                src={sep.product.image}
                alt={sep.product.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <Link
              href={`/products/${sep.product.slug}`}
              className="font-semibold hover:text-primary hover:underline"
            >
              {sep.product.name}
            </Link>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{sep.kind === "STOCK" ? "Stock" : "Preventa"}</Badge>
              <SemaphoreBadge level={sep.semaphore.level} label={sep.semaphore.label} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {STATUS_LABEL[sep.status] ?? sep.status}
              {sep.dueDate && isActive
                ? ` · Vence ${new Date(sep.dueDate).toLocaleDateString("es-PE")}`
                : ""}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-[#1E7E34]">Abonado {money(sep.depositPaid)}</span>
            <span className="font-semibold">Saldo {money(sep.balance)}</span>
          </div>
          <ProgressBar progress={sep.progress} />
          <p className="text-right text-xs text-muted-foreground">
            {sep.progress}% de {money(sep.totalPrice)}
          </p>
        </div>

        {hasPending && (
          <div className="flex items-center gap-2 rounded-lg bg-[#FFF5D1] p-2 text-xs font-medium text-[#8a6d00]">
            <Clock className="h-4 w-4" /> Tienes un abono en revisión.
          </div>
        )}

        {isActive && sep.balance > 0 && (
          <>
            {!paying ? (
              <Button onClick={() => setPaying(true)} className="w-full">
                <PiggyBank className="mr-2 h-4 w-4" /> Pagar saldo
              </Button>
            ) : (
              <PaySaldoForm
                separation={sep}
                onDone={() => {
                  setPaying(false)
                  onChanged()
                }}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default function ClientSeparationsPage() {
  const [items, setItems] = useState<Separation[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/separations")
      setItems(res.ok ? await res.json() : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <PiggyBank className="h-5 w-5 text-primary" /> Mis Separaciones
        </h2>
        <p className="text-sm text-muted-foreground">
          Aparta tus figuras con un adelanto y completa el saldo a tu ritmo.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <PiggyBank className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Aún no tienes separaciones. Coordina un apartado por WhatsApp para
              asegurar tu figura con un adelanto.
            </p>
            <Button asChild variant="outline">
              <Link href="/products">Explorar productos</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((s) => (
            <SeparationCard key={s.id} sep={s} onChanged={load} />
          ))}
        </div>
      )}
    </div>
  )
}
