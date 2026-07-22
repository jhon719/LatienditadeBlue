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
    <section className="blue-container py-6">
      <div className="grid grid-cols-2 gap-3 rounded-3xl bg-gradient-to-r from-[#142F5C] to-[#4A80BE] p-5 text-white sm:grid-cols-4 sm:gap-4 sm:p-6">
        {stats.map(({ icon: Icon, value, suffix, label }) => (
          <div key={label} className="flex flex-col items-center gap-1 text-center">
            <Icon className="h-5 w-5 text-[#F5B400]" />
            <CountUp
              value={value}
              suffix={suffix ?? ""}
              className="font-display text-4xl leading-none sm:text-5xl"
            />
            <span className="text-xs font-medium text-white/80">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
