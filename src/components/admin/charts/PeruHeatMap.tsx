"use client"

import { useMemo, useState } from "react"
import { geoMercator, geoPath } from "d3-geo"
import type { FeatureCollection, Feature, Geometry } from "geojson"
import { MapPin } from "lucide-react"
import peruGeo from "@/data/peru-departments.json"
import { departmentLabel } from "@/lib/peru"
import type { DepartmentStat } from "@/lib/analytics"

// Mapa de calor nacional (bóveda 05.01 Flujo 4): cada departamento se tiñe
// según la cantidad de clientes registrados en esa zona.
// Escala secuencial de UN solo matiz (azul de marca), claro → oscuro,
// con lightness monotónica; sin datos = gris claro.
const SEQUENTIAL_BLUE = ["#DBEAFE", "#93C5FD", "#5A96D6", "#2F6CB3", "#142F5C"]
const NO_DATA_LIGHT = "var(--map-empty, #E5E7EB)"

interface DeptFeatureProps {
  NOMBDEP: string
}

const geo = peruGeo as unknown as FeatureCollection<Geometry, DeptFeatureProps>

function colorFor(customers: number, max: number): string {
  if (customers <= 0) return NO_DATA_LIGHT
  if (max <= 1) return SEQUENTIAL_BLUE[2]
  const t = customers / max
  const idx = Math.min(
    SEQUENTIAL_BLUE.length - 1,
    Math.floor(t * SEQUENTIAL_BLUE.length)
  )
  return SEQUENTIAL_BLUE[idx]
}

const WIDTH = 420
const HEIGHT = 520

export function PeruHeatMap({ stats }: { stats: DepartmentStat[] }) {
  const [hovered, setHovered] = useState<{
    code: string
    x: number
    y: number
  } | null>(null)

  const byCode = useMemo(
    () => new Map(stats.map((s) => [s.code, s])),
    [stats]
  )
  const max = stats.reduce((acc, s) => Math.max(acc, s.customers), 0)

  const paths = useMemo(() => {
    const projection = geoMercator().fitSize([WIDTH, HEIGHT], geo)
    const pathGen = geoPath(projection)
    return geo.features.map((feature: Feature<Geometry, DeptFeatureProps>) => ({
      code: feature.properties.NOMBDEP,
      d: pathGen(feature) ?? "",
    }))
  }, [])

  const hoveredStat = hovered ? byCode.get(hovered.code) : null
  const top5 = stats.slice(0, 5)

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Mapa vectorial */}
      <div className="relative mx-auto w-full max-w-[340px] shrink-0">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          role="img"
          aria-label="Mapa del Perú con clientes por departamento"
          className="h-auto w-full"
          onMouseLeave={() => setHovered(null)}
        >
          {paths.map((p) => {
            const stat = byCode.get(p.code)
            const isHovered = hovered?.code === p.code
            return (
              <path
                key={p.code}
                d={p.d}
                fill={colorFor(stat?.customers ?? 0, max)}
                stroke="var(--card, #fff)"
                strokeWidth={isHovered ? 2.5 : 1}
                className="cursor-pointer transition-[stroke-width] duration-150"
                style={isHovered ? { filter: "brightness(1.08)" } : undefined}
                onMouseMove={(e) => {
                  const rect = (
                    e.currentTarget.ownerSVGElement as SVGSVGElement
                  ).getBoundingClientRect()
                  setHovered({
                    code: p.code,
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  })
                }}
              />
            )
          })}
        </svg>

        {/* Tooltip flotante */}
        {hovered && (
          <div
            className="pointer-events-none absolute z-10 rounded-xl border bg-card px-3 py-2 text-xs shadow-md"
            style={{
              left: Math.min(hovered.x + 12, 220),
              top: hovered.y - 8,
            }}
          >
            <p className="font-bold text-foreground">
              {departmentLabel(hovered.code)}
            </p>
            {hoveredStat ? (
              <>
                <p className="text-muted-foreground">
                  {hoveredStat.customers}{" "}
                  {hoveredStat.customers === 1 ? "cliente" : "clientes"}
                </p>
                <p className="text-muted-foreground">
                  Compras:{" "}
                  <span className="font-semibold text-foreground">
                    S/ {hoveredStat.totalSpent.toFixed(2)}
                  </span>
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">Sin clientes aún</p>
            )}
          </div>
        )}

        {/* Escala de la secuencia */}
        <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
          <span>0</span>
          {SEQUENTIAL_BLUE.map((c) => (
            <span key={c} className="h-2.5 w-6 rounded-sm" style={{ backgroundColor: c }} />
          ))}
          <span>{max || "—"} clientes</span>
        </div>
      </div>

      {/* Ranking Top 5 (bóveda 05.01) */}
      <div className="flex-1">
        <h4 className="mb-3 flex items-center gap-1.5 text-sm font-bold">
          <MapPin className="h-4 w-4 text-primary" /> Top regiones con más clientes
        </h4>
        {top5.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Aún no hay clientes con departamento registrado. Los clientes lo
            eligen en su perfil → Configuración.
          </p>
        ) : (
          <ol className="space-y-2">
            {top5.map((stat, index) => (
              <li
                key={stat.code}
                className="flex items-center gap-3 rounded-xl border p-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E1F0FF] font-display text-sm text-[#142F5C] dark:bg-primary/20 dark:text-foreground">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {departmentLabel(stat.code)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.customers}{" "}
                    {stat.customers === 1 ? "cliente" : "clientes"}
                  </p>
                </div>
                <span className="text-sm font-bold text-primary">
                  S/ {stat.totalSpent.toFixed(2)}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
