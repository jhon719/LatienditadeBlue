"use client"

import { Sparkles, Tv, Layers, Star } from "lucide-react"
import { CountUp } from "@/components/common/CountUp"

// Cinta de cifras reales de la tienda (para clientes), con números animados.
export function StatsBand({
  products,
  animes,
  lines,
  reviews,
}: {
  products: number
  animes: number
  lines: number
  reviews: number
}) {
  const stats = [
    { icon: Sparkles, value: products, suffix: "+", label: "Figuras y merch" },
    { icon: Tv, value: animes, label: "Animes en catálogo" },
    { icon: Layers, value: lines, label: "Líneas de figuras" },
    { icon: Star, value: reviews, label: "Reseñas de la comunidad" },
  ]

  return (
    <section className="blue-container py-5 sm:py-6">
      <div className="grid grid-cols-2 gap-3 rounded-3xl bg-gradient-to-r from-[#142F5C] to-[#4A80BE] p-4 text-white sm:grid-cols-4 sm:gap-4 sm:p-6">
        {stats.map(({ icon: Icon, value, suffix, label }) => (
          <div key={label} className="flex flex-col items-center gap-0.5 text-center sm:gap-1">
            <Icon className="h-4 w-4 text-[#F5B400] sm:h-5 sm:w-5" />
            <CountUp
              value={value}
              suffix={suffix ?? ""}
              className="font-display text-3xl leading-none sm:text-5xl"
            />
            <span className="text-[11px] font-medium leading-tight text-white/80 sm:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
