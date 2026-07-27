"use client"

import Link from "next/link"
import Image from "next/image"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { GradientText } from "@/components/common/GradientText"
import type { Line } from "@/types"

// Líneas de figuras con sus imágenes locales (public/Imagenes/Lineas de figuras)
export function LinesSection({ lines }: { lines: Line[] }) {
  const active = lines.filter((line) => line.isActive)
  if (active.length === 0) return null

  return (
    <section className="bg-[#EAF0F6] py-10 sm:py-14 dark:bg-secondary/40">
      <div className="blue-container">
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-7">
          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase text-[#4A80BE] sm:text-sm">
              Busca por colección
            </p>
            <h2 className="font-display text-4xl leading-none sm:text-5xl">
              <GradientText>Líneas de figuras</GradientText>
            </h2>
          </div>
          <Link
            href="/products"
            className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#142F5C] transition hover:bg-[#4A80BE] hover:text-white sm:text-sm dark:bg-card dark:text-foreground"
          >
            Ver mas
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-auto overflow-y-hidden pt-1 pb-3">
          {active.map((line, index) => (
            <AnimatedContent key={line.id} delay={index * 45} className="shrink-0">
              <Link
                href={`/products?line=${line.slug}`}
                className="group flex w-28 flex-col items-center gap-3 text-center sm:w-32"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-full border-4 border-white bg-white shadow-lg transition group-hover:-translate-y-1 group-hover:scale-105">
                  <Image
                    src={line.imageUrl ?? "/Imagenes/Mascota BLUE.png"}
                    alt={line.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.srcset = ""
                      target.src = "/Imagenes/Mascota BLUE.png"
                    }}
                  />
                </div>
                <span className="text-xs font-extrabold uppercase text-[#142F5C] dark:text-foreground">
                  {line.name}
                </span>
              </Link>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}
