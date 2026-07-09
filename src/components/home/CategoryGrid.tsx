import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { categoryTiles } from "@/data/blue-store"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"

export function CategoryGrid() {
  return (
    <section className="blue-container py-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-extrabold uppercase text-[#4A80BE]">Compra por tipo</p>
          <h2 className="font-display text-5xl leading-none text-[#142F5C]">Categorias principales</h2>
        </div>
        <Link href="/products" className="hidden rounded-full bg-[#4A80BE] px-5 py-2 text-sm font-extrabold text-white md:inline-flex">
          Ver todo
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {categoryTiles.map((tile, index) => (
          <AnimatedContent key={tile.label} delay={index * 80}>
            <Link href={tile.href} className="group block">
              <div className="relative aspect-[1.2/1] overflow-hidden rounded-[32px] border-2 border-[#142F5C] bg-white solid-shadow-yellow transition group-hover:-translate-y-1">
                <Image src={tile.image} alt={tile.label} fill className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142F5C]/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-5 text-white">
                  <p className="font-display text-4xl leading-none">{tile.label}</p>
                  <span className="rounded-full bg-[#F5B400] p-2 text-[#142F5C]"><ArrowRight className="h-5 w-5" /></span>
                </div>
              </div>
            </Link>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
