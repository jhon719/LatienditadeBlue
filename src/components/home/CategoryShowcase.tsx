"use client"

import Link from "next/link"
import { ArrowRight, Flame } from "lucide-react"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { GradientText } from "@/components/common/GradientText"
import { ProductCard } from "@/components/products/ProductCard"
import type { Category, Product } from "@/types"

export interface CategoryShowcaseSection {
  category: Category
  products: Product[]
}

// Una sección por cada anime marcado como Tendencia en admin/categorías, con
// una muestra aleatoria de sus productos y acceso directo al catálogo
// filtrado de ese anime (patrón "ver más" estilo Homidori).
export function CategoryShowcase({ sections }: { sections: CategoryShowcaseSection[] }) {
  if (sections.length === 0) return null

  return (
    <>
      {sections.map(({ category, products }) => (
        <section key={category.id} className="blue-container py-10 sm:py-14">
          <div className="mb-6 flex items-end justify-between gap-4 sm:mb-7">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-[#4A80BE] sm:text-sm">
                Tendencia <Flame className="h-3.5 w-3.5 fill-[#F5B400] text-[#F5B400]" />
              </p>
              <h2 className="font-display text-4xl leading-none sm:text-5xl">
                <GradientText>{category.name}</GradientText>
              </h2>
            </div>
            <Link
              href={`/products?category=${category.slug}`}
              className="hidden shrink-0 items-center gap-2 rounded-full bg-[#66D9A8] px-5 py-2 text-sm font-extrabold text-white transition hover:brightness-105 md:inline-flex"
            >
              Ver mas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {products.map((product, index) => (
              <AnimatedContent key={product.id} delay={index * 55}>
                <ProductCard product={product} />
              </AnimatedContent>
            ))}
          </div>
          <Link
            href={`/products?category=${category.slug}`}
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#66D9A8] px-5 py-3 text-sm font-extrabold text-white transition hover:brightness-105 md:hidden"
          >
            Ver todo de {category.name} <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      ))}
    </>
  )
}
