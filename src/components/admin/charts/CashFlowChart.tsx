"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import type { CashFlowPoint } from "@/lib/analytics"

// Flujo de caja (bóveda 05.01 Flujo 2): dos áreas suavizadas —
// azul = ventas de stock, morado = preventas.
// Paleta validada (CVD ΔE 9.4 deutan, contraste ≥3:1 en light y dark).
const COLOR_STOCK = "#4A80BE"
const COLOR_PREVENTA = "#8B5CF6"

interface TooltipPayload {
  dataKey?: string
  value?: number | string
}

function CashFlowTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border bg-card px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-bold text-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="flex items-center gap-2 text-muted-foreground">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor:
                entry.dataKey === "stock" ? COLOR_STOCK : COLOR_PREVENTA,
            }}
          />
          {entry.dataKey === "stock" ? "Ventas de stock" : "Preventas"}:{" "}
          <span className="font-semibold text-foreground">
            S/ {Number(entry.value).toFixed(2)}
          </span>
        </p>
      ))}
    </div>
  )
}

export function CashFlowChart({ data }: { data: CashFlowPoint[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Sin ventas registradas en este rango
      </div>
    )
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fillStock" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLOR_STOCK} stopOpacity={0.25} />
              <stop offset="100%" stopColor={COLOR_STOCK} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="fillPreventa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLOR_PREVENTA} stopOpacity={0.25} />
              <stop offset="100%" stopColor={COLOR_PREVENTA} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke="currentColor"
            className="text-border"
            strokeOpacity={0.4}
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 11, fill: "var(--muted-foreground, #6b7280)" }}
            minTickGap={24}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={52}
            tick={{ fontSize: 11, fill: "var(--muted-foreground, #6b7280)" }}
            tickFormatter={(v: number) => `S/${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`}
          />
          <Tooltip
            content={<CashFlowTooltip />}
            cursor={{ stroke: "currentColor", strokeOpacity: 0.2 }}
          />
          <Area
            type="monotone"
            dataKey="stock"
            stroke={COLOR_STOCK}
            strokeWidth={2}
            fill="url(#fillStock)"
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Area
            type="monotone"
            dataKey="preventa"
            stroke={COLOR_PREVENTA}
            strokeWidth={2}
            fill="url(#fillPreventa)"
            dot={false}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Leyenda (identidad nunca solo por color) */}
      <div className="mt-2 flex justify-center gap-6 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLOR_STOCK }} />
          Ventas de stock
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLOR_PREVENTA }} />
          Preventas
        </span>
      </div>
    </div>
  )
}
