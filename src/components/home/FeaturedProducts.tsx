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
    <section className="blue-container py-12">
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold uppercase text-[#4A80BE]">
            Novedades seleccionadas
          </p>
          <h2 className="font-display text-5xl leading-none">
            <GradientText>Figuras destacadas</GradientText>
          </h2>
        </div>
        <Link
          href="/products"
          className="hidden items-center gap-2 rounded-full bg-[#66D9A8] px-5 py-2 text-sm font-extrabold text-white md:inline-flex"
        >
          Ver mas <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <AnimatedContent key={product.id} delay={index * 55}>
            <ProductCard product={product} />
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
