"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { MagneticButton } from "@/components/react-bits/MagneticButton"

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#142F5C] text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1800&h=900&fit=crop"
          alt="Figuras anime coleccionables"
          fill
          priority
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[#142F5C]/60" />
      </div>
      <div className="blue-container relative grid min-h-[520px] items-center gap-10 py-16 lg:grid-cols-[1fr_420px]">
        <AnimatedContent className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-extrabold backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#F5B400]" /> Stock, preventas y pedidos online
          </div>
          <h1 className="mt-6 font-display text-7xl leading-[0.9] text-white sm:text-8xl lg:text-9xl">
            La Tiendita de Blue
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium text-white/85">
            Figuras, peluches, mangas y merch anime con una experiencia visual pensada para coleccionistas. Filtra por anime, marca o estado y arma tu vitrina ideal.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/products">
              <MagneticButton className="inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#F5B400] px-7 font-extrabold text-[#142F5C] solid-shadow-blue">
                Explorar catalogo <ArrowRight className="h-5 w-5" />
              </MagneticButton>
            </Link>
            <Link href="/products?status=preventa" className="inline-flex h-13 items-center justify-center rounded-full border border-white/40 px-7 font-extrabold text-white transition hover:bg-white hover:text-[#142F5C]">
              Ver preventas
            </Link>
          </div>
        </AnimatedContent>
        <AnimatedContent delay={180} className="hidden lg:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] border-4 border-white bg-white solid-shadow-yellow animate-float-soft">
            <Image
              src="https://images.unsplash.com/photo-1563089145-599997674d42?w=800&h=1000&fit=crop"
              alt="Figura anime destacada"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/92 p-4 text-[#142F5C] backdrop-blur">
              <p className="text-xs font-extrabold uppercase text-[#4A80BE]">Drop destacado</p>
              <p className="font-display text-3xl leading-none">Gear 5 Ichiban Kuji</p>
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}
