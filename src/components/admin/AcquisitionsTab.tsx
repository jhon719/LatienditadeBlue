"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import {
  Plus,
  Loader2,
  Trash2,
  Pencil,
  Coins,
  Landmark,
  TrendingUp,
  Package2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
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
import { ImageLightbox } from "@/components/common/ImageLightbox"
import { CountUp } from "@/components/common/CountUp"
import { MONTH_ORDER, yen, soles, igvAmount } from "@/lib/acquisitions"

interface Acquisition {
  id: string
  month: string
  type: string
  lote: number | null
  weight: number | null
  cost: number
  total: number
  shippingInt: number
  totalSoles: number
  igv: number
  approxRevenue: number
  revenue: number
  boxNumber: number | null
  shipmentNumber: number | null
  code: string | null
  imageUrl: string | null
}

interface MonthSummary {
  month: string
  count: number
  invested: number
  igvAduanas: number
  totalSoles: number
  revenue: number
}
interface Summary {
  byMonth: MonthSummary[]
  totals: {
    count: number
    invested: number
    igvAduanas: number
    totalSoles: number
    revenue: number
  }
  incomingBatches: number
}

const money = (n: number) => `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  gradient,
}: {
  icon: typeof Coins
  label: string
  value: React.ReactNode
  sub?: string
  gradient: string
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-4 text-white shadow-sm ${gradient}`}>
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-xs font-semibold opacity-90">
          <Icon className="h-4 w-4" /> {label}
        </div>
        <p className="mt-1 text-2xl font-bold">{value}</p>
        {sub && <p className="text-xs opacity-80">{sub}</p>}
      </div>
      <Icon className="absolute -right-3 -bottom-3 h-16 w-16 opacity-10" />
    </div>
  )
}

// Dashboard propio de logística: costos, IGV/aduanas y utilidad por mes
function Dashboard({ summary }: { summary: Summary }) {
  const maxInvested = Math.max(...summary.byMonth.map((m) => m.invested), 1)
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Coins}
          label="Invertido (soles)"
          value={<CountUp value={summary.totals.invested} prefix="S/ " />}
          sub={`${summary.totals.count} adquisiciones · con impuestos`}
          gradient="bg-gradient-to-br from-[#142F5C] to-[#4A80BE]"
        />
        <StatCard
          icon={Landmark}
          label="IGV / Aduanas"
          value={<CountUp value={summary.totals.igvAduanas} prefix="S/ " />}
          sub="Solo impuestos (+SUNAT)"
          gradient="bg-gradient-to-br from-[#8a6d00] to-[#F5B400]"
        />
        <StatCard
          icon={TrendingUp}
          label="Utilidad estimada"
          value={<CountUp value={summary.totals.revenue} prefix="S/ " />}
          sub="Venta aprox. − costo"
          gradient="bg-gradient-to-br from-[#1E7E34] to-[#3fb85f]"
        />
        <StatCard
          icon={Package2}
          label="Lotes en tránsito"
          value={<CountUp value={summary.incomingBatches} />}
          sub="Por recibir"
          gradient="bg-gradient-to-br from-[#742284] to-[#a855c7]"
        />
      </div>

      {/* Desglose por mes */}
      <Card>
        <CardContent className="space-y-2 p-4">
          <p className="text-sm font-semibold">Inversión y utilidad por mes</p>
          {summary.byMonth.map((m) => (
            <div key={m.month} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-xs font-medium text-muted-foreground">
                {m.month}
              </span>
              <div className="flex-1">
                <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#142F5C] to-[#4A80BE]"
                    style={{ width: `${(m.invested / maxInvested) * 100}%` }}
                  />
                </div>
              </div>
              <span className="w-20 shrink-0 text-right text-xs font-semibold">
                {money(m.invested)}
              </span>
              <span
                className={`w-20 shrink-0 text-right text-xs font-semibold ${
                  m.revenue >= 0 ? "text-[#1E7E34]" : "text-red-600"
                }`}
              >
                {m.revenue >= 0 ? "+" : ""}
                {money(m.revenue)}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-3 pt-1 text-[10px] text-muted-foreground">
            <span className="w-24" />
            <span className="flex-1" />
            <span className="w-20 text-right">Invertido</span>
            <span className="w-20 text-right">Utilidad</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function AcquisitionsTab() {
  const [items, setItems] = useState<Acquisition[]>([])
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [month, setMonth] = useState("all")
  const [type, setType] = useState("all")
  const [search, setSearch] = useState("")

  const months = summary
    ? [...summary.byMonth.map((m) => m.month)].sort(
        (a, b) => (MONTH_ORDER[a] ?? 99) - (MONTH_ORDER[b] ?? 99)
      )
    : []
  const types = Array.from(new Set(items.map((i) => i.type))).sort()

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (month !== "all") params.set("month", month)
      if (type !== "all") params.set("type", type)
      if (search) params.set("search", search)
      const [listRes, sumRes] = await Promise.all([
        fetch(`/api/admin/acquisitions?${params}`),
        fetch("/api/admin/acquisitions/summary"),
      ])
      setItems(listRes.ok ? await listRes.json() : [])
      setSummary(sumRes.ok ? await sumRes.json() : null)
    } finally {
      setLoading(false)
    }
  }, [month, type, search])

  useEffect(() => {
    load()
  }, [load])

  const remove = async (id: string) => {
    await fetch(`/api/admin/acquisitions/${id}`, { method: "DELETE" })
    await load()
  }

  return (
    <div className="space-y-5">
      {summary && <Dashboard summary={summary} />}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los meses</SelectItem>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              {types.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Buscar código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[160px]"
          />
        </div>
        <Button asChild>
          <Link href="/admin/logistics/acquisitions/new">
            <Plus className="mr-2 h-4 w-4" />
            Nueva adquisición
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
              No hay adquisiciones con este filtro.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lote</TableHead>
                    <TableHead>Mes / Tipo</TableHead>
                    <TableHead>Caja/Env.</TableHead>
                    <TableHead className="text-right">Total ¥</TableHead>
                    <TableHead className="text-right">Env. int ¥</TableHead>
                    <TableHead className="text-right">Invertido S/</TableHead>
                    <TableHead className="text-right">IGV/Aduanas</TableHead>
                    <TableHead className="text-right">Utilidad</TableHead>
                    <TableHead className="w-[80px] text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {a.imageUrl ? (
                            <ImageLightbox
                              src={a.imageUrl}
                              alt={`Lote ${a.lote ?? ""}`}
                              caption={`${a.month} · Lote ${a.lote ?? "—"}`}
                              className="h-9 w-9 shrink-0 rounded-md border"
                              imgClassName="object-cover"
                              sizes="36px"
                            />
                          ) : (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted text-[10px] text-muted-foreground">
                              s/f
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium">#{a.lote ?? "—"}</p>
                            {a.code && (
                              <p className="text-[10px] text-muted-foreground">{a.code}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs font-medium">{a.month}</p>
                        <Badge variant="secondary" className="text-[10px]">
                          {a.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        C{a.boxNumber ?? "—"} / E{a.shipmentNumber ?? "—"}
                      </TableCell>
                      <TableCell className="text-right text-xs font-medium text-[#B45309]">
                        {yen(a.total)}
                      </TableCell>
                      <TableCell className="text-right text-xs text-[#B45309]">
                        {yen(a.shippingInt)}
                      </TableCell>
                      <TableCell className="text-right text-sm font-semibold">
                        {soles(a.igv)}
                      </TableCell>
                      <TableCell className="text-right text-xs text-[#8a6d00]">
                        {soles(igvAmount(a.igv, a.totalSoles))}
                      </TableCell>
                      <TableCell
                        className={`text-right text-sm font-semibold ${
                          a.revenue >= 0 ? "text-[#1E7E34]" : "text-red-600"
                        }`}
                      >
                        {soles(a.revenue)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <Link href={`/admin/logistics/acquisitions/${a.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
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
                                <AlertDialogTitle>Eliminar adquisición</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Se eliminará el registro del lote #{a.lote ?? "—"} ({a.month}).
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => remove(a.id)}>
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
