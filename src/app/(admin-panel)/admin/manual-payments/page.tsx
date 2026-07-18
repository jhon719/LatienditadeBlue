"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import {
  Inbox,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  UserRound,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface PosOrder {
  id: string
  processCode: string
  totalAmount: number
  shippingType: string
  receiverName: string
  receiverPhone: string
  deliveryAddress: string | null
  createdAt: string
  customer: {
    username: string
    email: string
    firstName: string | null
    lastName: string | null
    dni: string | null
    phone: string | null
  }
  items: { id: string; name: string; image: string | null; quantity: number; price: number }[]
  proof: {
    id: string
    imageUrl: string
    operationNumber: string
    status: string
    createdAt: string
  } | null
}

function timeAgo(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (minutes < 60) return `Hace ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `Hace ${hours} h`
  return `Hace ${Math.floor(hours / 24)} días`
}

// Bandeja POS (bóveda 05.02): validación de vouchers en dos columnas
export default function ManualPaymentsPage() {
  const [orders, setOrders] = useState<PosOrder[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [deciding, setDeciding] = useState(false)
  const [customerHistory, setCustomerHistory] = useState<Record<string, number>>({})

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/orders?status=VERIFYING_MANUAL&limit=100")
      if (res.ok) {
        const data = await res.json()
        // FIFO: el más antiguo primero (bóveda 05.02)
        const sorted = [...data.orders].sort(
          (a: PosOrder, b: PosOrder) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        setOrders(sorted)
        setSelectedId((prev) =>
          prev && sorted.some((o: PosOrder) => o.id === prev)
            ? prev
            : sorted[0]?.id ?? null
        )
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  // Nivel de confianza del cliente: cuántos pedidos completados tiene
  useEffect(() => {
    fetch("/api/admin/orders?status=COMPLETED&limit=500")
      .then((res) => (res.ok ? res.json() : { orders: [] }))
      .then((data) => {
        const counts: Record<string, number> = {}
        for (const order of data.orders as PosOrder[]) {
          counts[order.customer.email] = (counts[order.customer.email] ?? 0) + 1
        }
        setCustomerHistory(counts)
      })
      .catch(() => {})
  }, [])

  const selected = orders.find((o) => o.id === selectedId) ?? null

  const decide = async (action: "approve" | "reject") => {
    if (!selected?.proof) return
    setDeciding(true)
    try {
      const res = await fetch(`/api/admin/proofs/${selected.proof.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      if (res.ok) {
        await fetchOrders()
      }
    } finally {
      setDeciding(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bandeja POS</h1>
        <p className="text-muted-foreground">
          Valida los comprobantes de Yape, Plin y transferencias (los más antiguos primero)
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : orders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Inbox className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-medium">Bandeja limpia ✨</p>
            <p className="text-sm text-muted-foreground">
              No hay comprobantes pendientes de revisión.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* Columna izquierda: cola de trabajo FIFO */}
          <div className="space-y-3">
            {orders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedId(order.id)}
                className={`w-full rounded-2xl border-2 p-4 text-left transition-colors ${
                  selectedId === order.id
                    ? "border-primary bg-[#E1F0FF]/40 dark:bg-primary/10"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold">
                    {order.processCode}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {timeAgo(order.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  @{order.customer.username}
                </p>
                <p className="mt-1 text-lg font-bold text-primary">
                  S/ {order.totalAmount.toFixed(2)}
                </p>
              </button>
            ))}
          </div>

          {/* Columna derecha: panel de decisión */}
          {selected && (
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="font-mono text-xl font-bold">
                      {selected.processCode}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selected.createdAt).toLocaleString("es-PE")}
                    </p>
                  </div>
                  <Badge className="bg-[#E1F0FF] text-[#142F5C]">
                    Esperando verificación
                  </Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Visor del comprobante */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold uppercase tracking-wide">
                      Comprobante
                    </h3>
                    {selected.proof ? (
                      <>
                        <a
                          href={selected.proof.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="block overflow-hidden rounded-xl border bg-muted transition-opacity hover:opacity-90"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={selected.proof.imageUrl}
                            alt={`Voucher de ${selected.processCode}`}
                            className="max-h-80 w-full object-contain"
                          />
                        </a>
                        <p className="text-sm">
                          N° de operación:{" "}
                          <span className="font-mono font-bold">
                            {selected.proof.operationNumber}
                          </span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Haz clic en la imagen para verla en tamaño completo
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Sin comprobante adjunto
                      </p>
                    )}
                  </div>

                  {/* Resumen + CRM */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2 text-sm font-bold uppercase tracking-wide">
                        Resumen del carrito
                      </h3>
                      <div className="space-y-2">
                        {selected.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-2">
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                              <Image
                                src={item.image ?? "/Imagenes/Mascota BLUE.png"}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                            <p className="flex-1 text-xs">{item.name}</p>
                            <p className="text-xs font-semibold">
                              x{item.quantity} · S/ {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-3" />
                      <p className="text-right text-sm">
                        Total a verificar:{" "}
                        <span className="text-lg font-bold text-primary">
                          S/ {selected.totalAmount.toFixed(2)}
                        </span>
                      </p>
                    </div>

                    {/* Perfil rápido del cliente (CRM) */}
                    <div className="rounded-xl border bg-muted/40 p-3">
                      <h4 className="mb-2 flex items-center gap-1 text-xs font-bold uppercase tracking-wide">
                        <UserRound className="h-3.5 w-3.5" /> Cliente
                      </h4>
                      <p className="text-sm font-semibold">
                        {selected.customer.firstName || selected.customer.lastName
                          ? `${selected.customer.firstName ?? ""} ${selected.customer.lastName ?? ""}`.trim()
                          : `@${selected.customer.username}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selected.customer.email}
                        {selected.customer.dni ? ` · DNI ${selected.customer.dni}` : ""}
                        {selected.customer.phone ? ` · ${selected.customer.phone}` : ""}
                      </p>
                      {(customerHistory[selected.customer.email] ?? 0) > 0 ? (
                        <p className="mt-2 flex items-center gap-1 text-xs font-bold text-[#1E7E34]">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          Cliente recurrente ·{" "}
                          {customerHistory[selected.customer.email]} compras completadas
                        </p>
                      ) : (
                        <p className="mt-2 text-xs font-bold text-[#B08900]">
                          🟡 Usuario nuevo — revisar comprobante con atención
                        </p>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <p>Recibe: {selected.receiverName} · {selected.receiverPhone}</p>
                      {selected.deliveryAddress && <p>{selected.deliveryAddress}</p>}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Acciones */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={deciding || !selected.proof}
                    onClick={() => decide("approve")}
                  >
                    {deciding ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                    )}
                    Aprobar Pago
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    disabled={deciding || !selected.proof}
                    onClick={() => decide("reject")}
                  >
                    {deciding ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <XCircle className="mr-2 h-4 w-4" />
                    )}
                    Rechazar (libera stock)
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
