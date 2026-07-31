"use client"

import { useCallback, useEffect, useState } from "react"
import {
  Download,
  Loader2,
  Users,
  Truck,
  RefreshCw,
  FileText,
  Store,
  Bike,
  Building2,
  Clock,
  TrendingUp,
  Ship,
  PackageSearch,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  downloadUsersPdf,
  downloadDeliveriesPdf,
  downloadOverdueBatchesPdf,
  downloadBatchMarginPdf,
  downloadTransitStockPdf,
  downloadProductsWithoutBatchPdf,
  type UserReportRow,
  type DeliveriesReport,
  type OverdueBatchesReport,
  type BatchMarginReport,
  type TransitStockReport,
  type ProductsWithoutBatchReport,
} from "@/lib/reports-pdf"
import { GradientText } from "@/components/common/GradientText"

interface UsersReport {
  generatedAt: string
  count: number
  users: UserReportRow[]
}

const S = (n: number) =>
  `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default function ReportsPage() {
  const [users, setUsers] = useState<UsersReport | null>(null)
  const [deliveries, setDeliveries] = useState<DeliveriesReport | null>(null)
  const [overdueBatches, setOverdueBatches] = useState<OverdueBatchesReport | null>(null)
  const [batchMargin, setBatchMargin] = useState<BatchMarginReport | null>(null)
  const [transitStock, setTransitStock] = useState<TransitStockReport | null>(null)
  const [productsWithoutBatch, setProductsWithoutBatch] =
    useState<ProductsWithoutBatchReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<
    "users" | "deliveries" | "overdue" | "margin" | "transit" | "noBatch" | null
  >(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [uRes, dRes, oRes, mRes, tRes, pRes] = await Promise.all([
        fetch("/api/admin/reports/users"),
        fetch("/api/admin/reports/deliveries"),
        fetch("/api/admin/reports/overdue-batches"),
        fetch("/api/admin/reports/batch-margin"),
        fetch("/api/admin/reports/transit-stock"),
        fetch("/api/admin/reports/products-without-batch"),
      ])
      setUsers(uRes.ok ? await uRes.json() : null)
      setDeliveries(dRes.ok ? await dRes.json() : null)
      setOverdueBatches(oRes.ok ? await oRes.json() : null)
      setBatchMargin(mRes.ok ? await mRes.json() : null)
      setTransitStock(tRes.ok ? await tRes.json() : null)
      setProductsWithoutBatch(pRes.ok ? await pRes.json() : null)
      if (![uRes, dRes, oRes, mRes, tRes, pRes].every((r) => r.ok)) {
        setError("No se pudo cargar parte de los datos.")
      }
    } catch {
      setError("Error de conexión al cargar los reportes.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const exportUsers = async () => {
    if (!users) return
    setBusy("users")
    try {
      downloadUsersPdf(users)
    } finally {
      setBusy(null)
    }
  }

  const exportDeliveries = async () => {
    if (!deliveries) return
    setBusy("deliveries")
    try {
      downloadDeliveriesPdf(deliveries)
    } finally {
      setBusy(null)
    }
  }

  const exportOverdueBatches = async () => {
    if (!overdueBatches) return
    setBusy("overdue")
    try {
      downloadOverdueBatchesPdf(overdueBatches)
    } finally {
      setBusy(null)
    }
  }

  const exportBatchMargin = async () => {
    if (!batchMargin) return
    setBusy("margin")
    try {
      downloadBatchMarginPdf(batchMargin)
    } finally {
      setBusy(null)
    }
  }

  const exportTransitStock = async () => {
    if (!transitStock) return
    setBusy("transit")
    try {
      downloadTransitStockPdf(transitStock)
    } finally {
      setBusy(null)
    }
  }

  const exportProductsWithoutBatch = async () => {
    if (!productsWithoutBatch) return
    setBusy("noBatch")
    try {
      downloadProductsWithoutBatchPdf(productsWithoutBatch)
    } finally {
      setBusy(null)
    }
  }

  const g = deliveries?.groups

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <FileText className="h-6 w-6 text-[#4A80BE]" />
            <GradientText>Reportes</GradientText>
          </h1>
          <p className="text-muted-foreground">
            Descarga resúmenes en PDF de usuarios y entregas por coordinar.
          </p>
        </div>
        <Button variant="outline" onClick={load} disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Actualizar
        </Button>
      </div>

      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Reporte de usuarios */}
        <Card className="overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#142F5C] to-[#4A80BE]" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#4A80BE]" />
              Usuarios
            </CardTitle>
            <CardDescription>
              Contacto, WhatsApp, identidad de TikTok, pedidos y total gastado.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {loading ? "—" : users?.count ?? 0}
              </span>
              <span className="text-sm text-muted-foreground">
                usuarios registrados
              </span>
            </div>
            <Button
              onClick={exportUsers}
              disabled={loading || !users || busy === "users"}
              className="w-full sm:w-auto"
            >
              {busy === "users" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Descargar PDF
            </Button>
          </CardContent>
        </Card>

        {/* Reporte de entregas */}
        <Card className="overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#8a6d00] to-[#F5B400]" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-[#8a6d00]" />
              Entregas disponibles
            </CardTitle>
            <CardDescription>
              Pedidos pagados por entregar, separados por presencial, motorizado y
              agencia (Shalom) con sus datos y direcciones.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-secondary/60 p-2">
                <Store className="mx-auto h-4 w-4 text-[#142F5C]" />
                <p className="mt-1 text-xl font-bold">
                  {loading ? "—" : g?.pickup.length ?? 0}
                </p>
                <p className="text-[10px] text-muted-foreground">Presencial</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2">
                <Bike className="mx-auto h-4 w-4 text-[#4A80BE]" />
                <p className="mt-1 text-xl font-bold">
                  {loading ? "—" : g?.local.length ?? 0}
                </p>
                <p className="text-[10px] text-muted-foreground">Motorizado</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2">
                <Building2 className="mx-auto h-4 w-4 text-[#8a6d00]" />
                <p className="mt-1 text-xl font-bold">
                  {loading ? "—" : g?.courier.length ?? 0}
                </p>
                <p className="text-[10px] text-muted-foreground">Agencia</p>
              </div>
            </div>
            <Button
              onClick={exportDeliveries}
              disabled={loading || !deliveries || busy === "deliveries"}
              className="w-full sm:w-auto"
            >
              {busy === "deliveries" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Descargar PDF
            </Button>
          </CardContent>
        </Card>

        {/* Reporte de lotes atrasados */}
        <Card className="overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#8a6d00] to-[#b41e1e]" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#b41e1e]" />
              Lotes atrasados
            </CardTitle>
            <CardDescription>
              Lotes en tránsito cuyo ETA ya venció, con severidad según días de atraso.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-[#FFF5D1] p-2">
                <p className="text-xl font-bold text-[#8a6d00]">
                  {loading ? "—" : overdueBatches?.summary.leve ?? 0}
                </p>
                <p className="text-[10px] text-muted-foreground">Leve</p>
              </div>
              <div className="rounded-lg bg-[#FFEAEA] p-2">
                <p className="text-xl font-bold text-[#cc6900]">
                  {loading ? "—" : overdueBatches?.summary.moderado ?? 0}
                </p>
                <p className="text-[10px] text-muted-foreground">Moderado</p>
              </div>
              <div className="rounded-lg bg-[#FFEAEA] p-2">
                <p className="text-xl font-bold text-[#b41e1e]">
                  {loading ? "—" : overdueBatches?.summary.critico ?? 0}
                </p>
                <p className="text-[10px] text-muted-foreground">Crítico</p>
              </div>
            </div>
            <Button
              onClick={exportOverdueBatches}
              disabled={loading || !overdueBatches || busy === "overdue"}
              className="w-full sm:w-auto"
            >
              {busy === "overdue" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Descargar PDF
            </Button>
          </CardContent>
        </Card>

        {/* Reporte de margen por lote */}
        <Card className="overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#142F5C] to-[#1E7E34]" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#1E7E34]" />
              Margen por lote
            </CardTitle>
            <CardDescription>
              Costo del proveedor vs. precio de venta actual de los productos de cada lote.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {loading ? "—" : S(batchMargin?.summary.margin ?? 0)}
              </span>
              <span className="text-sm text-muted-foreground">margen total</span>
            </div>
            {!loading && (batchMargin?.summary.incompleteCostCount ?? 0) > 0 && (
              <p className="text-xs text-muted-foreground">
                {batchMargin?.summary.incompleteCostCount} lote(s) con costo incompleto — el
                margen es un mínimo, no el real.
              </p>
            )}
            <Button
              onClick={exportBatchMargin}
              disabled={loading || !batchMargin || busy === "margin"}
              className="w-full sm:w-auto"
            >
              {busy === "margin" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Descargar PDF
            </Button>
          </CardContent>
        </Card>

        {/* Reporte de stock en tránsito agregado */}
        <Card className="overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#142F5C] to-[#4A80BE]" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ship className="h-5 w-5 text-[#4A80BE]" />
              Stock en tránsito
            </CardTitle>
            <CardDescription>
              Unidades en camino agrupadas por mes de ETA, línea y anime.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-secondary/60 p-2">
                <p className="text-xl font-bold">
                  {loading ? "—" : transitStock?.totalUnits ?? 0}
                </p>
                <p className="text-[10px] text-muted-foreground">Unidades</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2">
                <p className="text-xl font-bold">
                  {loading ? "—" : transitStock?.totalBatches ?? 0}
                </p>
                <p className="text-[10px] text-muted-foreground">Lotes</p>
              </div>
              <div className="rounded-lg bg-secondary/60 p-2">
                <p className="text-xl font-bold">
                  {loading ? "—" : transitStock?.totalSkus ?? 0}
                </p>
                <p className="text-[10px] text-muted-foreground">SKU</p>
              </div>
            </div>
            <Button
              onClick={exportTransitStock}
              disabled={loading || !transitStock || busy === "transit"}
              className="w-full sm:w-auto"
            >
              {busy === "transit" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Descargar PDF
            </Button>
          </CardContent>
        </Card>

        {/* Reporte de productos sin lote asociado */}
        <Card className="overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#4A80BE] to-[#142F5C]" />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackageSearch className="h-5 w-5 text-[#4A80BE]" />
              Productos sin lote
            </CardTitle>
            <CardDescription>
              Productos activos del catálogo sin ningún lote de importación asociado.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {loading ? "—" : productsWithoutBatch?.count ?? 0}
              </span>
              <span className="text-sm text-muted-foreground">productos sin trazabilidad</span>
            </div>
            <Button
              onClick={exportProductsWithoutBatch}
              disabled={loading || !productsWithoutBatch || busy === "noBatch"}
              className="w-full sm:w-auto"
            >
              {busy === "noBatch" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Descargar PDF
            </Button>
          </CardContent>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground">
        Los reportes incluyen datos privados de clientes (DNI, teléfono,
        direcciones). Compártelos solo con el equipo autorizado.
      </p>
    </div>
  )
}
