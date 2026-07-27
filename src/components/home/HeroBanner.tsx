"use client"

import Image from "next/image"
import Link from "next/link"
import Autoplay from "embla-carousel-autoplay"
import { ArrowRight, Sparkles } from "lucide-react"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { MagneticButton } from "@/components/react-bits/MagneticButton"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { BannerView } from "@/types"

// Carrusel de Hero Banners administrables (bóveda 05.05 §2).
// Si el admin no ha activado ninguno, se muestra el hero estático de la marca.
export function HeroBanner({ banners = [] }: { banners?: BannerView[] }) {
  if (banners.length > 0) {
    return (
      <section className="relative">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 6000, stopOnInteraction: true })]}
        >
          <CarouselContent>
            {banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className="relative h-[300px] w-full overflow-hidden bg-[#142F5C] sm:h-[400px] lg:h-[480px]">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                  />
                  {/* En móvil el degradado va de abajo hacia arriba: el texto se
                      apoya en la parte baja y no tapa el centro de la imagen. */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#142F5C]/90 via-[#142F5C]/50 to-transparent sm:bg-gradient-to-r sm:from-[#142F5C]/80 sm:via-[#142F5C]/40 sm:to-transparent" />
                  <div className="blue-container relative flex h-full flex-col justify-end pb-8 sm:justify-center sm:pb-0">
                    <AnimatedContent className="max-w-2xl text-white">
                      <h2 className="font-display text-4xl leading-[0.95] drop-shadow sm:text-6xl lg:text-7xl">
                        {banner.title}
                      </h2>
                      {banner.subtitle && (
                        <p className="mt-3 max-w-xl text-sm font-semibold text-white/85 sm:mt-4 sm:text-lg">
                          {banner.subtitle}
                        </p>
                      )}
                      {banner.ctaLabel && banner.ctaUrl && (
                        <Link
                          href={banner.ctaUrl}
                          className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-[#F5B400] px-5 text-sm font-extrabold text-[#142F5C] solid-shadow-blue transition hover:brightness-105 sm:mt-7 sm:h-12 sm:px-7 sm:text-base"
                        >
                          {banner.ctaLabel} <ArrowRight className="h-5 w-5" />
                        </Link>
                      )}
                    </AnimatedContent>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* En móvil el carrusel se navega deslizando; las flechas taparían
              el texto del banner, así que solo aparecen desde sm. */}
          {banners.length > 1 && (
            <>
              <CarouselPrevious className="left-4 hidden sm:flex" />
              <CarouselNext className="right-4 hidden sm:flex" />
            </>
          )}
        </Carousel>
      </section>
    )
  }

  return (
    <section className="group relative overflow-hidden bg-[#142F5C] text-white">
      <div className="absolute inset-0">
        <Image
          src="/Imagenes/banner principal tienda.png"
          alt="Banner principal La Tiendita de Blue"
          fill
          priority
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[#142F5C]/70" />
      </div>
      <div className="blue-container relative grid min-h-[420px] items-center gap-10 py-12 sm:min-h-[480px] sm:py-14 lg:min-h-[520px] lg:grid-cols-[1fr_420px] lg:py-16">
        <AnimatedContent className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-extrabold backdrop-blur sm:px-4 sm:py-2 sm:text-sm">
            <Sparkles className="h-4 w-4 shrink-0 text-[#F5B400]" /> Stock, preventas y pedidos online
          </div>
          <h1 className="mt-4 font-display text-5xl leading-[0.9] text-white sm:mt-6 sm:text-7xl lg:text-8xl xl:text-9xl">
            La Tiendita de Blue
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium text-white/85 sm:mt-5 sm:text-lg">
            Figuras, peluches, mangas y merch anime con una experiencia visual pensada para coleccionistas. Filtra por anime, marca o estado y arma tu vitrina ideal.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link href="/products" className="w-full sm:w-auto">
              <MagneticButton className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#F5B400] px-7 font-extrabold text-[#142F5C] solid-shadow-blue sm:h-13 sm:w-auto">
                Explorar catalogo <ArrowRight className="h-5 w-5" />
              </MagneticButton>
            </Link>
            <Link href="/products?status=preventa" className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 px-7 font-extrabold text-white transition hover:bg-white hover:text-[#142F5C] sm:h-13">
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
