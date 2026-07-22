"use client"

import { use, useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

interface OrderDetail {
  id: string
  processCode: string
  status: string
  paymentMethod: string
  totalAmount: number
  shippingCost: number
  couponDiscount: number
  couponCode: string | null
  shippingType: string
  shippingStatus: string
  receiverName: string
  receiverPhone: string
  deliveryAddress: string | null
  trackingNumber: string | null
  createdAt: string
  customer: {
    username: string
    email: string
    firstName: string | null
    lastName: string | null
    dni: string | null
    phone: string | null
  }
  items: {
    id: string
    name: string
    slug: string
    image: string | null
    quantity: number
    price: number
  }[]
  proof: {
    imageUrl: string
    operationNumber: string
    status: string
    createdAt: string
  } | null
}

const STATUS_OPTIONS = [
  { value: "PENDING_PAYMENT", label: "Pendiente de pago" },
  { value: "VERIFYING_MANUAL", label: "Verificando pago" },
  { value: "PAID_APPROVED", label: "Pagado (por despachar)" },
  { value: "COMPLETED", label: "Completado" },
  { value: "REJECTED", label: "Rechazado" },
  { value: "CANCELLED", label: "Cancelado" },
]

const STATUS_BADGE: Record<string, string> = {
  PENDING_PAYMENT: "bg-[#FFF5D1] text-[#8a6d00]",
  VERIFYING_MANUAL: "bg-[#E1F0FF] text-[#142F5C]",
  PAID_APPROVED: "bg-[#E2FBE9] text-[#1E7E34]",
  COMPLETED: "bg-[#E2FBE9] text-[#1E7E34]",
  REJECTED: "bg-[#FFEAEA] text-red-600",
  CANCELLED: "bg-[#FFEAEA] text-red-600",
}

const shippingLabels: Record<string, string> = {
  PICKUP: "Recojo en tienda",
  LOCAL_DELIVERY: "Motorizado (Lima)",
  NATIONAL_COURIER: "Courier a provincia",
}

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Campos editables
  const [status, setStatus] = useState("")
  const [receiverName, setReceiverName] = useState("")
  const [receiverPhone, setReceiverPhone] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [shippingStatus, setShippingStatus] = useState("")
  const [tracking, setTracking] = useState("")

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/orders/${id}`)
    if (!res.ok) {
      setNotFound(true)
      return
    }
    const data: OrderDetail = await res.json()
    setOrder(data)
    setStatus(data.status)
    setReceiverName(data.receiverName)
    setReceiverPhone(data.receiverPhone)
    setDeliveryAddress(data.deliveryAddress ?? "")
    setShippingStatus(data.shippingStatus)
    setTracking(data.trackingNumber ?? "")
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  const save = async () => {
    setSaving(true)
    setError(null)
    setSaved(false)
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          receiverName,
          receiverPhone,
          deliveryAddress: deliveryAddress || null,
          shippingStatus,
          trackingNumber: tracking || null,
        }),
      })
      if (!res.ok) {
        const result = await res.json().catch(() => null)
        setError(result?.error ?? "No se pudieron guardar los cambios")
        return
      }
      setSaved(true)
      await load()
    } finally {
      setSaving(false)
    }
  }

  const remove = async () => {
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/orders/${id}`, { method: "DELETE" })
      if (res.ok) {
        router.push("/admin/orders")
        router.refresh()
      } else {
        setError("No se pudo eliminar la orden")
        setDeleting(false)
      }
    } catch {
      setDeleting(false)
    }
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-muted-foreground">
          No encontramos esta orden. Puede que haya sido eliminada.
        </p>
        <Button asChild variant="outline">
          <Link href="/admin/orders">Volver a órdenes</Link>
        </Button>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const itemsTotal = order.items.reduce((a, i) => a + i.price * i.quantity, 0)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="flex items-center gap-3 text-2xl font-bold">
            <span className="font-mono">{order.processCode}</span>
            <Badge className={STATUS_BADGE[order.status] ?? ""}>
              {STATUS_OPTIONS.find((s) => s.value === order.status)?.label ??
                order.status}
            </Badge>
          </h1>
          <p className="text-muted-foreground">
            {new Date(order.createdAt).toLocaleString("es-PE")} ·{" "}
            {order.paymentMethod === "MANUAL_TRANSFER"
              ? "Pago manual"
              : "Mercado Pago"}
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Eliminar orden {order.processCode}</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Si la orden aún tenía stock
                reservado, se devolverá al inventario automáticamente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={remove} disabled={deleting}>
                {deleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Eliminando...
                  </>
                ) : (
                  "Eliminar orden"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
      {saved && (
        <div className="rounded-md bg-[#E2FBE9] p-3 text-sm font-semibold text-[#1E7E34]">
          Cambios guardados ✨
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Estado de la orden */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de la orden</CardTitle>
            <CardDescription>
              Cancelar o rechazar devuelve el stock al inventario.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Estado</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Estado de envío</Label>
              <Select value={shippingStatus} onValueChange={setShippingStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PREPARING">Preparando</SelectItem>
                  <SelectItem value="SHIPPED">Enviado</SelectItem>
                  <SelectItem value="DELIVERED">Entregado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>N° de guía / tracking</Label>
              <Input
                placeholder="Ej. OLVA-123456"
                value={tracking}
                onChange={(e) => setTracking(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Datos de entrega */}
        <Card>
          <CardHeader>
            <CardTitle>Datos de entrega</CardTitle>
            <CardDescription>
              {shippingLabels[order.shippingType] ?? order.shippingType}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre de quien recibe</Label>
              <Input
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp de contacto</Label>
              <Input
                value={receiverPhone}
                maxLength={9}
                inputMode="numeric"
                onChange={(e) => setReceiverPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Dirección / agencia</Label>
              <Input
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Av. Larco 1234, Miraflores"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cliente */}
      <Card>
        <CardHeader>
          <CardTitle>Cliente</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm sm:grid-cols-2">
          <p>
            <span className="text-muted-foreground">Usuario:</span> @
            {order.customer.username}
          </p>
          <p>
            <span className="text-muted-foreground">Email:</span>{" "}
            {order.customer.email}
          </p>
          <p>
            <span className="text-muted-foreground">Nombre:</span>{" "}
            {[order.customer.firstName, order.customer.lastName]
              .filter(Boolean)
              .join(" ") || "—"}
          </p>
          <p>
            <span className="text-muted-foreground">DNI:</span>{" "}
            {order.customer.dni ?? "—"}
          </p>
        </CardContent>
      </Card>

      {/* Productos */}
      <Card>
        <CardHeader>
          <CardTitle>Productos ({order.items.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                )}
              </div>
              <div className="flex-1">
                <Link
                  href={`/products/${item.slug}`}
                  className="text-sm font-medium hover:text-primary hover:underline"
                >
                  {item.name}
                </Link>
                <p className="text-xs text-muted-foreground">
                  {item.quantity} × S/ {item.price.toFixed(2)}
                </p>
              </div>
              <p className="text-sm font-semibold">
                S/ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="space-y-1 border-t pt-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal productos</span>
              <span>S/ {itemsTotal.toFixed(2)}</span>
            </div>
            {order.couponDiscount > 0 && (
              <div className="flex justify-between text-[#1E7E34]">
                <span>Cupón {order.couponCode ?? ""}</span>
                <span>− S/ {order.couponDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-muted-foreground">
              <span>Envío</span>
              <span>S/ {order.shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>S/ {order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comprobante de pago manual */}
      {order.proof && (
        <Card>
          <CardHeader>
            <CardTitle>Comprobante de pago</CardTitle>
            <CardDescription>
              N° de operación: {order.proof.operationNumber} · Estado:{" "}
              {order.proof.status}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImageLightbox
              src={order.proof.imageUrl}
              alt="Comprobante de pago"
              caption={`Comprobante · Op. ${order.proof.operationNumber}`}
              className="h-40 w-40 rounded-lg border"
              imgClassName="object-cover"
              sizes="160px"
            />
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end gap-3">
        <Button variant="outline" asChild>
          <Link href="/admin/orders">Volver</Link>
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
