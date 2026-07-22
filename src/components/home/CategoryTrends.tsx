"use client"

import Link from "next/link"
import Image from "next/image"
import { Flame } from "lucide-react"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { GradientText } from "@/components/common/GradientText"
import type { Category } from "@/types"

// Fila horizontal de categorías (animes) con imágenes locales y badge
// de TENDENCIA amarillo neón (bóveda 02.05). Las tendencias van primero.
export function CategoryTrends({ categories }: { categories: Category[] }) {
  const sorted = [...categories]
    .filter((cat) => cat.isActive)
    .sort((a, b) => Number(b.isTrending) - Number(a.isTrending))

  if (sorted.length === 0) return null

  return (
    <section className="blue-container py-8">
      <div className="mb-5 flex items-center gap-2">
        <h2 className="font-display text-5xl leading-none">
          <GradientText>Tendencias!</GradientText>
        </h2>
        <Flame className="h-8 w-8 fill-[#F5B400] text-[#F5B400]" />
      </div>

      <div className="flex snap-x gap-4 overflow-x-auto overflow-y-hidden pt-1 pb-4">
        {sorted.map((cat, index) => (
          <AnimatedContent key={cat.id} delay={index * 55} className="shrink-0 snap-start">
            <Link
              href={`/products?category=${cat.slug}`}
              className="group relative block h-32 w-64 overflow-hidden rounded-[1.5rem] border border-border bg-secondary shadow-sm"
            >
              {cat.isTrending && (
                <span className="absolute left-3 top-3 z-10 animate-pulse rounded-full bg-[#CCFF00] px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-black shadow-md">
                  TENDENCIA
                </span>
              )}

              <Image
                src={cat.imageUrl ?? "/Imagenes/Mascota BLUE.png"}
                alt={cat.name}
                fill
                sizes="256px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.srcset = ""
                  target.src = "/Imagenes/Mascota BLUE.png"
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <span className="absolute bottom-3 left-4 text-sm font-bold tracking-wide text-white transition-colors group-hover:text-[#CCFF00]">
                {cat.name}
              </span>
            </Link>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
