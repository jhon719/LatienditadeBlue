"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { GradientText } from "@/components/common/GradientText"
import { ProductCard } from "@/components/products/ProductCard"
import type { Product } from "@/types"

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null

  return (
    <section className="blue-container py-10 sm:py-14">
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-7">
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase text-[#4A80BE] sm:text-sm">
            Novedades seleccionadas
          </p>
          <h2 className="font-display text-4xl leading-none sm:text-5xl">
            <GradientText>Figuras destacadas</GradientText>
          </h2>
        </div>
        {/* En escritorio el "Ver mas" va junto al título */}
        <Link
          href="/products"
          className="hidden shrink-0 items-center gap-2 rounded-full bg-[#66D9A8] px-5 py-2 text-sm font-extrabold text-white transition hover:brightness-105 md:inline-flex"
        >
          Ver mas <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <AnimatedContent key={product.id} delay={index * 55}>
            <ProductCard product={product} />
          </AnimatedContent>
        ))}
      </div>
      {/* En móvil no cabe arriba, así que cierra la sección a lo ancho
          (patrón de Homidori: cada sección termina en su "Ver mas") */}
      <Link
        href="/products"
        className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#66D9A8] px-5 py-3 text-sm font-extrabold text-white transition hover:brightness-105 md:hidden"
      >
        Ver todo el catalogo <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  )
}
