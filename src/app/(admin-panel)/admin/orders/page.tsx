"use client"

import { useCallback, useEffect, useState } from "react"
import { Loader2, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface AdminOrder {
  id: string
  processCode: string
  status: string
  paymentMethod: string
  totalAmount: number
  shippingType: string
  shippingStatus: string
  trackingNumber: string | null
  receiverName: string
  receiverPhone: string
  deliveryAddress: string | null
  createdAt: string
  customer: { username: string; email: string; phone: string | null }
}

const orderStatusBadge: Record<string, { label: string; className: string }> = {
  PENDING_PAYMENT: { label: "Pendiente pago", className: "bg-[#FFF5D1] text-[#8a6d00]" },
  VERIFYING_MANUAL: { label: "Verificando", className: "bg-[#E1F0FF] text-[#142F5C]" },
  PAID_APPROVED: { label: "Pagado", className: "bg-[#E2FBE9] text-[#1E7E34]" },
  REJECTED: { label: "Rechazado", className: "bg-[#FFEAEA] text-red-600" },
  CANCELLED: { label: "Cancelado", className: "bg-[#FFEAEA] text-red-600" },
  COMPLETED: { label: "Completado", className: "bg-[#E2FBE9] text-[#1E7E34]" },
}

const shippingLabels: Record<string, string> = {
  PICKUP: "Recojo",
  LOCAL_DELIVERY: "Motorizado",
  NATIONAL_COURIER: "Courier",
}

function ShippingEditor({
  order,
  onSaved,
}: {
  order: AdminOrder
  onSaved: () => void
}) {
  const [shippingStatus, setShippingStatus] = useState(order.shippingStatus)
  const [tracking, setTracking] = useState(order.trackingNumber ?? "")
  const [saving, setSaving] = useState(false)

  const dirty =
    shippingStatus !== order.shippingStatus ||
    tracking !== (order.trackingNumber ?? "")

  const save = async () => {
    setSaving(true)
    try {
      await fetch(`/api/admin/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shippingStatus,
          trackingNumber: tracking || null,
        }),
      })
      onSaved()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={shippingStatus} onValueChange={setShippingStatus}>
        <SelectTrigger className="h-8 w-[130px] text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PREPARING">Preparando</SelectItem>
          <SelectItem value="SHIPPED">Enviado</SelectItem>
          <SelectItem value="DELIVERED">Entregado</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="N° guía / tracking"
        value={tracking}
        onChange={(e) => setTracking(e.target.value)}
        className="h-8 w-36 text-xs"
      />
      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8"
        disabled={!dirty || saving}
        onClick={save}
      >
        {saving ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Save className="h-3.5 w-3.5" />
        )}
      </Button>
    </div>
  )
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/orders?status=${statusFilter}&limit=100`)
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders)
      }
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Órdenes</h1>
          <p className="text-muted-foreground">
            Control logístico global: estados de envío y números de guía
          </p>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="VERIFYING_MANUAL">Verificando pago</SelectItem>
            <SelectItem value="PAID_APPROVED">Pagadas (por despachar)</SelectItem>
            <SelectItem value="COMPLETED">Completadas</SelectItem>
            <SelectItem value="REJECTED">Rechazadas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Envío</TableHead>
                  <TableHead>Logística</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No hay órdenes con este filtro
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <p className="font-mono font-bold">{order.processCode}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("es-PE")}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium">
                          {order.receiverName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          @{order.customer.username} · {order.receiverPhone}
                        </p>
                      </TableCell>
                      <TableCell className="font-semibold">
                        S/ {order.totalAmount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            orderStatusBadge[order.status]?.className ?? ""
                          }
                        >
                          {orderStatusBadge[order.status]?.label ?? order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">
                          {shippingLabels[order.shippingType] ?? order.shippingType}
                        </p>
                        {order.deliveryAddress && (
                          <p className="max-w-[180px] truncate text-xs text-muted-foreground">
                            {order.deliveryAddress}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        {["PAID_APPROVED", "COMPLETED"].includes(order.status) ? (
                          <ShippingEditor order={order} onSaved={fetchOrders} />
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
