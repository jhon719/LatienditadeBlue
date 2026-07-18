"use client"

import Link from "next/link"
import Image from "next/image"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import type { Line } from "@/types"

// Líneas de figuras con sus imágenes locales (public/Imagenes/Lineas de figuras)
export function LinesSection({ lines }: { lines: Line[] }) {
  const active = lines.filter((line) => line.isActive)
  if (active.length === 0) return null

  return (
    <section className="bg-[#EAF0F6] py-12 dark:bg-secondary/40">
      <div className="blue-container">
        <div className="mb-7">
          <p className="text-sm font-extrabold uppercase text-[#4A80BE]">
            Busca por colección
          </p>
          <h2 className="font-display text-5xl leading-none text-[#142F5C] dark:text-foreground">
            Líneas de figuras
          </h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-3">
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
