"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Loader2, Trash2, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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

// Panel CMS de Marketing (bóveda 05.05): banners, cinta, cupones y reglas

interface CampaignItem {
  id: string
  status: "DRAFT" | "ACTIVE" | "SCHEDULED"
  validFrom: string | null
  validUntil: string | null
  // banners
  title?: string
  imageUrl?: string
  sortOrder?: number
  // announcements
  text?: string
  bgColor?: string
  // coupons
  code?: string
  type?: "PERCENTAGE" | "FIXED_AMOUNT"
  value?: string | number
  usedCount?: number
  maxUses?: number | null
  // rules
  name?: string
  scope?: string
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  DRAFT: { label: "Borrador", className: "bg-muted text-muted-foreground" },
  ACTIVE: { label: "Activa", className: "bg-[#E2FBE9] text-[#1E7E34]" },
  SCHEDULED: { label: "Programada", className: "bg-[#E1F0FF] text-[#142F5C]" },
}

const TYPE_LABELS: Record<string, string> = {
  banners: "Banner",
  announcements: "Anuncio",
  coupons: "Cupón",
  "discount-rules": "Regla",
}

function formatWindow(item: CampaignItem): string {
  if (item.status !== "SCHEDULED") return "—"
  const from = item.validFrom
    ? new Date(item.validFrom).toLocaleDateString("es-PE")
    : "…"
  const until = item.validUntil
    ? new Date(item.validUntil).toLocaleDateString("es-PE")
    : "…"
  return `${from} → ${until}`
}

function CampaignTable({
  type,
  items,
  onChanged,
}: {
  type: string
  items: CampaignItem[]
  onChanged: () => void
}) {
  const patchStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/campaigns/${type}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    onChanged()
  }

  const remove = async (id: string) => {
    await fetch(`/api/admin/campaigns/${type}/${id}`, { method: "DELETE" })
    onChanged()
  }

  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Aún no hay {TYPE_LABELS[type]?.toLowerCase()}s creados. Usa el botón
        &quot;Nueva campaña&quot;.
      </p>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Detalle</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Vigencia</TableHead>
          <TableHead className="w-[60px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                {type === "banners" && item.imageUrl && (
                  <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={item.imageUrl}
                      alt={item.title ?? "banner"}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                )}
                {type === "announcements" && (
                  <span
                    className="h-6 w-6 shrink-0 rounded-full border"
                    style={{ backgroundColor: item.bgColor }}
                  />
                )}
                <div>
                  <p className="font-medium">
                    {item.title ?? item.text ?? item.code ?? item.name}
                  </p>
                  {type === "coupons" && (
                    <p className="text-xs text-muted-foreground">
                      Usos: {item.usedCount}
                      {item.maxUses ? ` / ${item.maxUses}` : " (ilimitado)"}
                    </p>
                  )}
                  {type === "discount-rules" && (
                    <p className="text-xs text-muted-foreground">
                      Alcance: {item.scope}
                    </p>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell className="text-sm">
              {item.value !== undefined
                ? item.type === "PERCENTAGE"
                  ? `${Number(item.value)}%`
                  : `S/ ${Number(item.value).toFixed(2)}`
                : "—"}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Badge className={STATUS_LABELS[item.status].className}>
                  {STATUS_LABELS[item.status].label}
                </Badge>
                <Select
                  value={item.status}
                  onValueChange={(v) => patchStatus(item.id, v)}
                >
                  <SelectTrigger className="h-7 w-[120px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Borrador</SelectItem>
                    <SelectItem value="ACTIVE">Activa</SelectItem>
                    <SelectItem value="SCHEDULED">Programada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TableCell>
            <TableCell className="text-xs text-muted-foreground">
              {formatWindow(item)}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => remove(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function CampaignsPage() {
  const [data, setData] = useState<Record<string, CampaignItem[]>>({})
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    const types = ["banners", "announcements", "coupons", "discount-rules"]
    const results = await Promise.all(
      types.map((t) =>
        fetch(`/api/admin/campaigns/${t}`).then((r) => (r.ok ? r.json() : []))
      )
    )
    setData(Object.fromEntries(types.map((t, i) => [t, results[i]])))
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Megaphone className="h-6 w-6 text-primary" /> Campañas y Marketing
          </h1>
          <p className="text-muted-foreground">
            Banners, cinta de anuncios, cupones y reglas de precio — sin tocar código
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            Nueva campaña
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
          <Tabs defaultValue="banners">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="banners">Hero Banners</TabsTrigger>
              <TabsTrigger value="announcements">Cinta superior</TabsTrigger>
              <TabsTrigger value="coupons">Cupones</TabsTrigger>
              <TabsTrigger value="discount-rules">Reglas de precio</TabsTrigger>
            </TabsList>
            {(["banners", "announcements", "coupons", "discount-rules"] as const).map(
              (t) => (
                <TabsContent key={t} value={t} className="mt-4">
                  <CampaignTable
                    type={t}
                    items={data[t] ?? []}
                    onChanged={fetchAll}
                  />
                </TabsContent>
              )
            )}
          </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
