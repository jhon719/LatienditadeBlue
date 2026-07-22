"use client"

import { use, useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Loader2,
  Plus,
  Check,
  X,
  CalendarClock,
  Unlock,
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ImageLightbox } from "@/components/common/ImageLightbox"
import { SemaphoreBadge, ProgressBar, type SemaphoreLevel } from "@/components/admin/SeparationBits"

interface Payment {
  id: string
  amount: number
  operationNumber: string | null
  imageUrl: string | null
  status: "PENDING" | "APPROVED" | "REJECTED"
  note: string | null
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
  notes: string | null
  semaphore: { level: SemaphoreLevel; label: string }
  product: { name: string; slug: string; image: string | null }
  customer: { username: string; name: string | null; email: string; phone: string | null }
  payments: Payment[]
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Saldo pendiente",
  ARRIVED: "Llegó · cobrando saldo",
  COMPLETED: "Pagada 100%",
  CANCELLED: "Liberada",
}

const PAY_BADGE: Record<string, string> = {
  PENDING: "bg-[#FFF5D1] text-[#8a6d00]",
  APPROVED: "bg-[#E2FBE9] text-[#1E7E34]",
  REJECTED: "bg-[#FFEAEA] text-red-600",
}

function money(n: number) {
  return `S/ ${n.toFixed(2)}`
}

export default function SeparationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [sep, setSep] = useState<Separation | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Nuevo abono
  const [amount, setAmount] = useState("")
  const [operationNumber, setOperationNumber] = useState("")
  const [addingPayment, setAddingPayment] = useState(false)

  // Extender plazo
  const [newDue, setNewDue] = useState("")
  const [extending, setExtending] = useState(false)

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/separations/${id}`)
    if (!res.ok) return setNotFound(true)
    const data: Separation = await res.json()
    setSep(data)
    setNewDue(data.dueDate ? data.dueDate.slice(0, 10) : "")
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  const addPayment = async () => {
    const amt = Number(amount)
    if (!amt || amt <= 0) return setError("Ingresa un monto válido")
    setError(null)
    setAddingPayment(true)
    try {
      const res = await fetch(`/api/admin/separations/${id}/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amt,
          operationNumber: operationNumber || null,
          approve: true,
        }),
      })
      if (!res.ok) {
        const r = await res.json().catch(() => null)
        setError(r?.error ?? "Error al registrar el abono")
        return
      }
      setAmount("")
      setOperationNumber("")
      await load()
    } finally {
      setAddingPayment(false)
    }
  }

  const decidePayment = async (paymentId: string, action: "approve" | "reject") => {
    await fetch(`/api/admin/separations/${id}/payments/${paymentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    })
    await load()
  }

  const extend = async () => {
    setExtending(true)
    try {
      await fetch(`/api/admin/separations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dueDate: newDue ? new Date(newDue).toISOString() : null }),
      })
      await load()
    } finally {
      setExtending(false)
    }
  }

  const release = async () => {
    const res = await fetch(`/api/admin/separations/${id}/release`, { method: "POST" })
    if (res.ok) await load()
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-muted-foreground">No encontramos esta separación.</p>
        <Button asChild variant="outline">
          <Link href="/admin/logistics">Volver</Link>
        </Button>
      </div>
    )
  }
  if (!sep) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const isClosed = sep.status === "COMPLETED" || sep.status === "CANCELLED"
  const pendingPayments = sep.payments.filter((p) => p.status === "PENDING")

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/logistics">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="flex flex-wrap items-center gap-3 text-2xl font-bold">
            Separación
            <SemaphoreBadge level={sep.semaphore.level} label={sep.semaphore.label} />
            <Badge variant="secondary">
              {sep.kind === "STOCK" ? "Stock" : "Preventa"}
            </Badge>
          </h1>
          <p className="text-muted-foreground">{STATUS_LABEL[sep.status] ?? sep.status}</p>
        </div>
        {!isClosed && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive">
                <Unlock className="mr-2 h-4 w-4" />
                Liberar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Liberar separación</AlertDialogTitle>
                <AlertDialogDescription>
                  El producto vuelve al inventario general y el adelanto pagado queda
                  retenido (no reembolsable). Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={release}>Liberar separación</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Producto + cliente */}
        <Card>
          <CardHeader>
            <CardTitle>Detalle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
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
              <div>
                <Link
                  href={`/products/${sep.product.slug}`}
                  className="font-medium hover:text-primary hover:underline"
                >
                  {sep.product.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {sep.customer.name ?? `@${sep.customer.username}`} · {sep.customer.email}
                </p>
                {sep.customer.phone && (
                  <p className="text-xs text-muted-foreground">WhatsApp: {sep.customer.phone}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estado de cuenta */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de cuenta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Precio total</span>
              <span className="font-semibold">{money(sep.totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm text-[#1E7E34]">
              <span>Abonado</span>
              <span className="font-semibold">{money(sep.depositPaid)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Saldo pendiente</span>
              <span className="font-bold">{money(sep.balance)}</span>
            </div>
            <ProgressBar progress={sep.progress} />
            <p className="text-center text-xs text-muted-foreground">
              {sep.progress}% pagado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Registrar abono + extender plazo */}
      {!isClosed && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Registrar abono</CardTitle>
              <CardDescription>Se aprueba y resta del saldo al instante</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Monto (S/)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={sep.balance.toFixed(2)}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">N° operación</Label>
                  <Input
                    value={operationNumber}
                    onChange={(e) => setOperationNumber(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={addPayment} disabled={addingPayment} className="w-full">
                {addingPayment ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Registrar abono
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Extender plazo</CardTitle>
              <CardDescription>Prórroga por acuerdo con el cliente (05.07)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs">Nueva fecha límite</Label>
                <Input type="date" value={newDue} onChange={(e) => setNewDue(e.target.value)} />
              </div>
              <Button
                variant="outline"
                onClick={extend}
                disabled={extending}
                className="w-full"
              >
                {extending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CalendarClock className="mr-2 h-4 w-4" />
                )}
                Actualizar plazo
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Historial de abonos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Historial de abonos ({sep.payments.length})
          </CardTitle>
          {pendingPayments.length > 0 && (
            <CardDescription className="text-[#8a6d00]">
              {pendingPayments.length} abono(s) del cliente esperando tu validación
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          {sep.payments.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">Sin abonos aún.</p>
          ) : (
            sep.payments.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-lg border p-3"
              >
                {p.imageUrl && (
                  <ImageLightbox
                    src={p.imageUrl}
                    alt="Voucher del abono"
                    caption={`Abono ${money(p.amount)}`}
                    className="h-12 w-12 shrink-0 rounded-md border"
                    imgClassName="object-cover"
                    sizes="48px"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm font-semibold">{money(p.amount)}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(p.createdAt).toLocaleString("es-PE")}
                    {p.operationNumber ? ` · Op. ${p.operationNumber}` : ""}
                    {p.note ? ` · ${p.note}` : ""}
                  </p>
                </div>
                <Badge className={PAY_BADGE[p.status]}>
                  {p.status === "PENDING"
                    ? "Por validar"
                    : p.status === "APPROVED"
                      ? "Aprobado"
                      : "Rechazado"}
                </Badge>
                {p.status === "PENDING" && (
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      className="h-8 w-8 bg-[#1E7E34] hover:bg-[#1E7E34]/90"
                      onClick={() => decidePayment(p.id, "approve")}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 text-destructive"
                      onClick={() => decidePayment(p.id, "reject")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
