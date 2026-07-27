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
    <section className="blue-container py-10 sm:py-14">
      <div className="mb-5 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <h2 className="font-display text-4xl leading-none sm:text-5xl">
            <GradientText>Tendencias!</GradientText>
          </h2>
          <Flame className="h-6 w-6 shrink-0 fill-[#F5B400] text-[#F5B400] sm:h-8 sm:w-8" />
        </div>
        <Link
          href="/products"
          className="shrink-0 rounded-full bg-secondary px-4 py-2 text-xs font-extrabold text-foreground transition hover:bg-[#4A80BE] hover:text-white sm:text-sm"
        >
          Ver mas
        </Link>
      </div>

      <div className="flex snap-x gap-3 overflow-x-auto overflow-y-hidden pt-1 pb-4 sm:gap-4">
        {sorted.map((cat, index) => (
          <AnimatedContent key={cat.id} delay={index * 55} className="shrink-0 snap-start">
            <Link
              href={`/products?category=${cat.slug}`}
              className="group relative block h-28 w-52 overflow-hidden rounded-[1.5rem] border border-border bg-secondary shadow-sm sm:h-32 sm:w-64"
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
                sizes="(max-width: 640px) 208px, 256px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.srcset = ""
                  target.src = "/Imagenes/Mascota BLUE.png"
                }}
              />
            </Link>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
