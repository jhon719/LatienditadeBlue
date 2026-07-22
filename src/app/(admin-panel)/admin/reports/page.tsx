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
  type UserReportRow,
  type DeliveriesReport,
} from "@/lib/reports-pdf"
import { GradientText } from "@/components/common/GradientText"

interface UsersReport {
  generatedAt: string
  count: number
  users: UserReportRow[]
}

export default function ReportsPage() {
  const [users, setUsers] = useState<UsersReport | null>(null)
  const [deliveries, setDeliveries] = useState<DeliveriesReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<"users" | "deliveries" | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [uRes, dRes] = await Promise.all([
        fetch("/api/admin/reports/users"),
        fetch("/api/admin/reports/deliveries"),
      ])
      setUsers(uRes.ok ? await uRes.json() : null)
      setDeliveries(dRes.ok ? await dRes.json() : null)
      if (!uRes.ok || !dRes.ok) setError("No se pudo cargar parte de los datos.")
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
      </div>

      <p className="text-xs text-muted-foreground">
        Los reportes incluyen datos privados de clientes (DNI, teléfono,
        direcciones). Compártelos solo con el equipo autorizado.
      </p>
    </div>
  )
}
