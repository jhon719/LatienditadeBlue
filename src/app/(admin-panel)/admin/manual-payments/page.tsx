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
  PiggyBank,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ContactBadges } from "@/components/admin/ContactBadges"

interface PosCustomer {
  username: string
  email: string
  firstName: string | null
  lastName: string | null
  dni: string | null
  phone: string | null
  tiktokUsername: string | null
}

interface PosOrder {
  id: string
  processCode: string
  totalAmount: number
  shippingType: string
  receiverName: string
  receiverPhone: string
  deliveryAddress: string | null
  createdAt: string
  customer: PosCustomer
  items: { id: string; name: string; image: string | null; quantity: number; price: number }[]
  proof: {
    id: string
    imageUrl: string
    operationNumber: string
    status: string
    createdAt: string
  } | null
}

interface PosSeparationPayment {
  id: string
  reservationId: string
  amount: number
  operationNumber: string | null
  imageUrl: string | null
  note: string | null
  createdAt: string
  reservation: {
    kind: "STOCK" | "PREORDER"
    totalPrice: number
    approvedPaid: number
    balance: number
  }
  product: { name: string; image: string | null }
  customer: PosCustomer
}

// Cola unificada de la Bandeja POS: vouchers de órdenes + abonos de separación
interface QueueItem {
  kind: "order" | "separation"
  key: string // `${kind}:${id}` — selección única sin colisiones
  id: string
  decisionId: string | null // proof.id (orden) o payment.id (separación)
  reservationId?: string
  code: string
  amount: number
  createdAt: string
  imageUrl: string | null
  operationNumber: string | null
  customer: PosCustomer
  // Órdenes
  orderItems?: PosOrder["items"]
  receiverName?: string
  receiverPhone?: string
  deliveryAddress?: string | null
  // Separaciones
  productName?: string
  productImage?: string | null
  balance?: number
  sepKind?: "STOCK" | "PREORDER"
}

function fromOrder(o: PosOrder): QueueItem {
  return {
    kind: "order",
    key: `order:${o.id}`,
    id: o.id,
    decisionId: o.proof?.id ?? null,
    code: o.processCode,
    amount: o.totalAmount,
    createdAt: o.createdAt,
    imageUrl: o.proof?.imageUrl ?? null,
    operationNumber: o.proof?.operationNumber ?? null,
    customer: o.customer,
    orderItems: o.items,
    receiverName: o.receiverName,
    receiverPhone: o.receiverPhone,
    deliveryAddress: o.deliveryAddress,
  }
}

function fromSeparation(s: PosSeparationPayment): QueueItem {
  return {
    kind: "separation",
    key: `sep:${s.id}`,
    id: s.id,
    decisionId: s.id,
    reservationId: s.reservationId,
    code: "Abono de separación",
    amount: s.amount,
    createdAt: s.createdAt,
    imageUrl: s.imageUrl,
    operationNumber: s.operationNumber,
    customer: s.customer,
    productName: s.product.name,
    productImage: s.product.image,
    balance: s.reservation.balance,
    sepKind: s.reservation.kind,
  }
}

function timeAgo(iso: string): string {
  const minutes = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (minutes < 60) return `Hace ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `Hace ${hours} h`
  return `Hace ${Math.floor(hours / 24)} días`
}

function money(n: number) {
  return `S/ ${n.toFixed(2)}`
}

// Bandeja POS (bóveda 05.02 / 05.07): validación de vouchers de órdenes y abonos
// de separación en una sola cola FIFO (los más antiguos primero).
export default function ManualPaymentsPage() {
  const [items, setItems] = useState<QueueItem[]>([])
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [deciding, setDeciding] = useState(false)
  const [customerHistory, setCustomerHistory] = useState<Record<string, number>>({})

  const fetchQueue = useCallback(async () => {
    setLoading(true)
    try {
      const [ordersRes, sepsRes] = await Promise.all([
        fetch("/api/admin/orders?status=VERIFYING_MANUAL&limit=100"),
        fetch("/api/admin/separation-payments"),
      ])

      const orders: PosOrder[] = ordersRes.ok ? (await ordersRes.json()).orders : []
      const seps: PosSeparationPayment[] = sepsRes.ok ? await sepsRes.json() : []

      // FIFO: el más antiguo primero, mezclando ambos tipos (bóveda 05.02)
      const merged = [...orders.map(fromOrder), ...seps.map(fromSeparation)].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      setItems(merged)
      setSelectedKey((prev) =>
        prev && merged.some((i) => i.key === prev) ? prev : merged[0]?.key ?? null
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchQueue()
  }, [fetchQueue])

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

  const selected = items.find((i) => i.key === selectedKey) ?? null

  const decide = async (action: "approve" | "reject") => {
    if (!selected?.decisionId) return
    setDeciding(true)
    try {
      const isOrder = selected.kind === "order"
      const url = isOrder
        ? `/api/admin/proofs/${selected.decisionId}`
        : `/api/admin/separations/${selected.reservationId}/payments/${selected.decisionId}`
      const res = await fetch(url, {
        method: isOrder ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      if (res.ok) {
        await fetchQueue()
      }
    } finally {
      setDeciding(false)
    }
  }

  const customerName = (c: PosCustomer) =>
    c.firstName || c.lastName
      ? `${c.firstName ?? ""} ${c.lastName ?? ""}`.trim()
      : `@${c.username}`

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bandeja POS</h1>
        <p className="text-muted-foreground">
          Valida los comprobantes de órdenes y los abonos de separación (los más
          antiguos primero)
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Inbox className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-medium">Bandeja limpia ✨</p>
            <p className="text-sm text-muted-foreground">
              No hay comprobantes ni abonos pendientes de revisión.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          {/* Columna izquierda: cola de trabajo FIFO */}
          <div className="space-y-3">
            {items.map((item) => (
              <button
                key={item.key}
                onClick={() => setSelectedKey(item.key)}
                className={`w-full rounded-2xl border-2 p-4 text-left transition-colors ${
                  selectedKey === item.key
                    ? "border-primary bg-[#E1F0FF]/40 dark:bg-primary/10"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 truncate font-mono text-sm font-bold">
                    {item.kind === "separation" ? (
                      <Badge className="gap-1 bg-[#F3E8FF] px-1.5 py-0 text-[10px] text-[#742284] hover:bg-[#F3E8FF]">
                        <PiggyBank className="h-3 w-3" /> Abono
                      </Badge>
                    ) : (
                      item.code
                    )}
                  </span>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {timeAgo(item.createdAt)}
                  </span>
                </div>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {item.kind === "separation"
                    ? item.productName
                    : `@${item.customer.username}`}
                </p>
                <p className="mt-1 text-lg font-bold text-primary">
                  {money(item.amount)}
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
                    <h2 className="flex items-center gap-2 font-mono text-xl font-bold">
                      {selected.kind === "separation" ? (
                        <>
                          <PiggyBank className="h-5 w-5 text-[#742284]" />
                          Abono de separación
                        </>
                      ) : (
                        selected.code
                      )}
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
                    {selected.imageUrl ? (
                      <>
                        <a
                          href={selected.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="block overflow-hidden rounded-xl border bg-muted transition-opacity hover:opacity-90"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={selected.imageUrl}
                            alt={`Voucher de ${selected.code}`}
                            className="max-h-80 w-full object-contain"
                          />
                        </a>
                        {selected.operationNumber && (
                          <p className="text-sm">
                            N° de operación:{" "}
                            <span className="font-mono font-bold">
                              {selected.operationNumber}
                            </span>
                          </p>
                        )}
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
                        {selected.kind === "separation"
                          ? "Separación"
                          : "Resumen del carrito"}
                      </h3>

                      {selected.kind === "separation" ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                              <Image
                                src={selected.productImage ?? "/Imagenes/Mascota BLUE.png"}
                                alt={selected.productName ?? "Producto"}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                            <p className="flex-1 text-xs">{selected.productName}</p>
                            <Badge variant="secondary" className="text-[10px]">
                              {selected.sepKind === "STOCK" ? "Stock" : "Preventa"}
                            </Badge>
                          </div>
                          <Separator className="my-3" />
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between text-muted-foreground">
                              <span>Saldo actual</span>
                              <span>{money(selected.balance ?? 0)}</span>
                            </div>
                            <p className="text-right">
                              Este abono:{" "}
                              <span className="text-lg font-bold text-primary">
                                {money(selected.amount)}
                              </span>
                            </p>
                            <p className="rounded-md bg-[#E2FBE9] p-2 text-center text-xs text-[#1E7E34]">
                              Al aprobar, el saldo baja a{" "}
                              {money(Math.max(0, (selected.balance ?? 0) - selected.amount))}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-2">
                            {selected.orderItems?.map((item) => (
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
                                  x{item.quantity} · {money(item.price * item.quantity)}
                                </p>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-3" />
                          <p className="text-right text-sm">
                            Total a verificar:{" "}
                            <span className="text-lg font-bold text-primary">
                              {money(selected.amount)}
                            </span>
                          </p>
                        </>
                      )}
                    </div>

                    {/* Perfil rápido del cliente (CRM) */}
                    <div className="rounded-xl border bg-muted/40 p-3">
                      <h4 className="mb-2 flex items-center gap-1 text-xs font-bold uppercase tracking-wide">
                        <UserRound className="h-3.5 w-3.5" /> Cliente
                      </h4>
                      <p className="text-sm font-semibold">
                        {customerName(selected.customer)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selected.customer.email}
                        {selected.customer.dni ? ` · DNI ${selected.customer.dni}` : ""}
                      </p>
                      <ContactBadges
                        tiktokUsername={selected.customer.tiktokUsername}
                        phone={selected.customer.phone}
                        whatsappMessage={
                          selected.kind === "separation"
                            ? `¡Hola! Te escribo por tu abono de separación de *${selected.productName}* que estamos verificando. ✨`
                            : `¡Hola! Te escribo por tu pedido *${selected.code}* que estamos verificando. ✨`
                        }
                      />
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

                    {selected.kind === "order" && (
                      <div className="text-xs text-muted-foreground">
                        <p>
                          Recibe: {selected.receiverName} · {selected.receiverPhone}
                        </p>
                        {selected.deliveryAddress && <p>{selected.deliveryAddress}</p>}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Acciones */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={deciding || !selected.decisionId}
                    onClick={() => decide("approve")}
                  >
                    {deciding ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                    )}
                    {selected.kind === "separation" ? "Aprobar abono" : "Aprobar pago"}
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    disabled={deciding || !selected.decisionId}
                    onClick={() => decide("reject")}
                  >
                    {deciding ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <XCircle className="mr-2 h-4 w-4" />
                    )}
                    {selected.kind === "separation"
                      ? "Rechazar abono"
                      : "Rechazar (libera stock)"}
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
