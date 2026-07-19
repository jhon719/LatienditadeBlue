"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { CheckCircle2, PackageOpen, Truck, XCircle } from "lucide-react"
import type { LogisticsSlice } from "@/lib/analytics"

// Donut de estado logístico (bóveda 05.01 Flujo 3).
// Colores de estado validados (todos los checks pasan en light y dark):
// 🟢 entregado · 🟡 pendiente · 🔵 en tránsito · 🔴 cancelado
const SLICE_STYLE: Record<
  LogisticsSlice["key"],
  { color: string; icon: typeof CheckCircle2 }
> = {
  delivered: { color: "#1E7E34", icon: CheckCircle2 },
  pending: { color: "#B08900", icon: PackageOpen },
  transit: { color: "#4A80BE", icon: Truck },
  cancelled: { color: "#DC2626", icon: XCircle },
}

interface DonutTooltipPayload {
  payload?: LogisticsSlice
}

function DonutTooltip({
  active,
  payload,
  total,
}: {
  active?: boolean
  payload?: DonutTooltipPayload[]
  total: number
}) {
  const slice = payload?.[0]?.payload
  if (!active || !slice) return null
  const percent = total > 0 ? Math.round((slice.count / total) * 100) : 0
  return (
    <div className="rounded-xl border bg-card px-3 py-2 text-xs shadow-md">
      <p className="font-bold text-foreground">{slice.label}</p>
      <p className="text-muted-foreground">
        {slice.count} {slice.count === 1 ? "pedido" : "pedidos"} ·{" "}
        <span className="font-semibold text-foreground">{percent}%</span>
      </p>
    </div>
  )
}

export function LogisticsDonut({ data }: { data: LogisticsSlice[] }) {
  const total = data.reduce((acc, s) => acc + s.count, 0)
  const visible = data.filter((s) => s.count > 0)

  if (total === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Aún no hay órdenes registradas
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative h-52 w-52 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={visible}
              dataKey="count"
              nameKey="label"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={2}
              strokeWidth={0}
            >
              {visible.map((slice) => (
                <Cell key={slice.key} fill={SLICE_STYLE[slice.key].color} />
              ))}
            </Pie>
            <Tooltip content={<DonutTooltip total={total} />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Número héroe en el centro */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl leading-none text-foreground">
            {total}
          </span>
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
            órdenes
          </span>
        </div>
      </div>

      {/* Leyenda con icono + etiqueta + conteo (nunca color solo) */}
      <ul className="w-full space-y-2">
        {data.map((slice) => {
          const style = SLICE_STYLE[slice.key]
          const Icon = style.icon
          const percent = total > 0 ? Math.round((slice.count / total) * 100) : 0
          return (
            <li key={slice.key} className="flex items-center gap-2 text-sm">
              <Icon className="h-4 w-4 shrink-0" style={{ color: style.color }} />
              <span className="flex-1 text-muted-foreground">{slice.label}</span>
              <span className="font-semibold text-foreground">{slice.count}</span>
              <span className="w-9 text-right text-xs text-muted-foreground">
                {percent}%
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
