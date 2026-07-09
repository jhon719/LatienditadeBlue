import Link from "next/link"
import { brandButtons } from "@/data/blue-store"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"

export function BrandSection() {
  return (
    <section className="bg-[#EAF0F6] py-12">
      <div className="blue-container">
        <div className="mb-7">
          <p className="text-sm font-extrabold uppercase text-[#4A80BE]">Busqueda por marcas</p>
          <h2 className="font-display text-5xl leading-none text-[#142F5C]">Lineas de figuras anime</h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-3">
          {brandButtons.map((brand, index) => (
            <AnimatedContent key={brand.name} delay={index * 60} className="shrink-0">
              <Link href={brand.href} className="group flex w-28 flex-col items-center gap-3 text-center sm:w-32">
                <div className={`flex aspect-square w-full items-center justify-center rounded-full border-4 border-white text-xl font-black text-[#142F5C] shadow-lg transition group-hover:-translate-y-1 group-hover:scale-105 ${brand.color}`}>
                  {brand.short}
                </div>
                <span className="text-xs font-extrabold uppercase text-[#142F5C]">{brand.name}</span>
              </Link>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}
