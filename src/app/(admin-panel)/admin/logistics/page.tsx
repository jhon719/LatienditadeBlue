"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Plus,
  Loader2,
  Boxes,
  PackageCheck,
  Truck,
  Trash2,
  Pencil,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { SemaphoreBadge, ProgressBar, type SemaphoreLevel } from "@/components/admin/SeparationBits"
import { AcquisitionsTab } from "@/components/admin/AcquisitionsTab"
import { ShalomDirectoryTab } from "@/components/admin/ShalomDirectoryTab"

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
  product: { name: string; image: string | null }
  customer: { username: string; name: string | null }
}

interface Batch {
  id: string
  name: string
  supplier: string | null
  eta: string | null
  status: "IN_TRANSIT" | "RECEIVED"
  receivedAt: string | null
  preorderCount: number
  items: { id: string; name: string; quantity: number }[]
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Saldo pendiente",
  ARRIVED: "Llegó · cobrando saldo",
  COMPLETED: "Pagada 100%",
  CANCELLED: "Liberada",
}

function money(n: number) {
  return `S/ ${n.toFixed(2)}`
}

// ============ Separaciones ============
function SeparationsTab() {
  const [items, setItems] = useState<Separation[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("PENDING_BALANCE")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/separations?status=${filter}`)
      setItems(res.ok ? await res.json() : [])
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[220px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING_BALANCE">Pendientes de saldo</SelectItem>
            <SelectItem value="PENDING">En tránsito / stock</SelectItem>
            <SelectItem value="ARRIVED">Llegaron (cobrando saldo)</SelectItem>
            <SelectItem value="COMPLETED">Pagadas 100%</SelectItem>
            <SelectItem value="CANCELLED">Liberadas</SelectItem>
            <SelectItem value="all">Todas</SelectItem>
          </SelectContent>
        </Select>
        <Button asChild>
          <Link href="/admin/logistics/separations/new">
            <Plus className="mr-2 h-4 w-4" />
            Nueva separación
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No hay separaciones con este filtro.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Semáforo</TableHead>
                  <TableHead>Cliente / Producto</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="min-w-[160px]">Saldo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="w-[90px] text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <SemaphoreBadge level={s.semaphore.level} label={s.semaphore.label} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                          {s.product.image && (
                            <Image
                              src={s.product.image}
                              alt={s.product.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {s.customer.name ?? `@${s.customer.username}`}
                          </p>
                          <p className="max-w-[220px] truncate text-xs text-muted-foreground">
                            {s.product.name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {s.kind === "STOCK" ? "Stock" : "Preventa"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold">
                            {money(s.depositPaid)} / {money(s.totalPrice)}
                          </span>
                          <span className="text-muted-foreground">
                            falta {money(s.balance)}
                          </span>
                        </div>
                        <ProgressBar progress={s.progress} />
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      {STATUS_LABEL[s.status] ?? s.status}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild className="h-8">
                        <Link href={`/admin/logistics/separations/${s.id}`}>
                          <Pencil className="mr-1.5 h-3.5 w-3.5" />
                          Gestionar
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// ============ Lotes ============
function BatchesTab() {
  const [items, setItems] = useState<Batch[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/batches")
      setItems(res.ok ? await res.json() : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const receive = async (id: string) => {
    setBusy(id)
    try {
      await fetch(`/api/admin/batches/${id}/receive`, { method: "POST" })
      await load()
    } finally {
      setBusy(null)
    }
  }

  const remove = async (id: string) => {
    await fetch(`/api/admin/batches/${id}`, { method: "DELETE" })
    await load()
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/admin/logistics/batches/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo lote
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              Aún no hay lotes de importación. Crea uno para registrar stock en tránsito.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lote</TableHead>
                  <TableHead>Ítems</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="w-[220px] text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <p className="font-medium">{b.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {b.supplier ?? "Sin proveedor"} · {b.preorderCount} separación(es)
                      </p>
                    </TableCell>
                    <TableCell className="text-sm">
                      {b.items.reduce((a, i) => a + i.quantity, 0)} uds
                      <span className="text-muted-foreground"> ({b.items.length} SKU)</span>
                    </TableCell>
                    <TableCell className="text-xs">
                      {b.eta ? new Date(b.eta).toLocaleDateString("es-PE") : "—"}
                    </TableCell>
                    <TableCell>
                      {b.status === "RECEIVED" ? (
                        <Badge className="bg-[#E2FBE9] text-[#1E7E34]">Recibido</Badge>
                      ) : (
                        <Badge className="bg-[#FFF5D1] text-[#8a6d00]">
                          <Truck className="mr-1 h-3 w-3" /> En tránsito
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {b.status === "IN_TRANSIT" && (
                          <Button
                            size="sm"
                            className="h-8"
                            disabled={busy === b.id}
                            onClick={() => receive(b.id)}
                          >
                            {busy === b.id ? (
                              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <PackageCheck className="mr-1.5 h-3.5 w-3.5" />
                            )}
                            Recibir
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <Link href={`/admin/logistics/batches/${b.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        {b.preorderCount === 0 && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Eliminar lote</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Se eliminará &quot;{b.name}&quot; y sus ítems. Esta acción
                                  no se puede deshacer.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => remove(b.id)}>
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function LogisticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Boxes className="h-6 w-6 text-primary" /> Logística y Separaciones
        </h1>
        <p className="text-muted-foreground">
          Lotes de importación (stock en tránsito) y apartados con adelanto y saldo
          por cobrar (bóveda 05.03 / 05.06 / 05.07)
        </p>
      </div>

      <Tabs defaultValue="separations">
        <TabsList className="grid w-full max-w-3xl grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="separations">Separaciones</TabsTrigger>
          <TabsTrigger value="batches">Lotes en tránsito</TabsTrigger>
          <TabsTrigger value="acquisitions">Adquisiciones (costos)</TabsTrigger>
          <TabsTrigger value="shalom">Directorio Shalom</TabsTrigger>
        </TabsList>
        <TabsContent value="separations" className="mt-4">
          <Card className="mb-4 border-dashed">
            <CardHeader className="py-4">
              <CardTitle className="text-base">¿Cómo funciona?</CardTitle>
              <CardDescription>
                Cada abono aprobado resta del saldo. Al llegar al 100% la separación
                se marca como pagada. El semáforo alerta cuando el plazo está por
                vencer (🟡) o venció (🔴).
              </CardDescription>
            </CardHeader>
          </Card>
          <SeparationsTab />
        </TabsContent>
        <TabsContent value="batches" className="mt-4">
          <BatchesTab />
        </TabsContent>
        <TabsContent value="acquisitions" className="mt-4">
          <AcquisitionsTab />
        </TabsContent>
        <TabsContent value="shalom" className="mt-4">
          <ShalomDirectoryTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
