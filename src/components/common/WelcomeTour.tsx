"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import useEmblaCarousel from "embla-carousel-react"
import {
  ArrowRight,
  CalendarClock,
  PiggyBank,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PaymentMethods } from "@/components/common/PaymentMethods"
import { ShippingAgencies } from "@/components/common/ShippingAgencies"
import { useOnboardingStore } from "@/stores/onboarding-store"
import { MIN_DEPOSIT } from "@/lib/separations"
import { cn } from "@/lib/utils"

// Espera a que la pagina pinte antes de aparecer: abrirlo de golpe sobre una
// pantalla a medio cargar se siente como un popup de spam.
const AUTO_OPEN_DELAY_MS = 1500

// Nunca se abre solo mientras el usuario esta comprando o gestionando su
// cuenta: ahi el tour estorba en vez de ayudar. Desde el footer si se puede.
const NO_AUTO_OPEN = ["/cart", "/checkout", "/profile"]

export function WelcomeTour() {
  const { seen, open, openTour, closeTour } = useOnboardingStore()
  const pathname = usePathname()
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: true })
  const [index, setIndex] = useState(0)

  const slides = buildSlides()
  const lastIndex = slides.length - 1

  // Primera visita: se abre solo una vez. Despues solo desde el footer.
  useEffect(() => {
    if (seen) return
    if (NO_AUTO_OPEN.some((p) => pathname.startsWith(p))) return
    const id = setTimeout(openTour, AUTO_OPEN_DELAY_MS)
    return () => clearTimeout(id)
  }, [seen, pathname, openTour])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi])

  // Al reabrirlo desde el footer arranca de nuevo en el primer paso
  useEffect(() => {
    if (open) emblaApi?.scrollTo(0, true)
  }, [open, emblaApi])

  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeTour()}>
      <DialogContent className="max-w-[calc(100%-1.5rem)] gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogTitle className="sr-only">
          Como funciona La Tiendita de Blue
        </DialogTitle>

        {/* Cabecera con Bluet */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-[#E1F0FF] to-[#FFF5D1] px-5 pb-4 pt-5">
          <div className="relative h-14 w-14 shrink-0 animate-float-soft">
            <Image
              src="/Imagenes/Mascota BLUE.png"
              alt="Bluet"
              fill
              className="object-contain drop-shadow"
            />
          </div>
          <div className="min-w-0">
            <p className="font-display text-2xl leading-none text-[#142F5C]">
              ¡Hola! Soy Bluet
            </p>
            <p className="mt-1 text-xs font-semibold text-[#142F5C]/70">
              Te muestro como funciona la tienda en 30 segundos
            </p>
          </div>
        </div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {slides.map((slide) => (
              <div
                key={slide.title}
                className="min-w-0 shrink-0 grow-0 basis-full px-5 py-5"
              >
                <div className="flex min-h-[210px] flex-col gap-3 sm:min-h-[195px]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E1F0FF] text-[#4A80BE]">
                    <slide.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-2xl leading-none text-foreground">
                    {slide.title}
                  </h3>
                  <div className="text-sm leading-relaxed text-muted-foreground">
                    {slide.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t px-5 py-4">
          <div className="flex gap-1.5" aria-hidden>
            {slides.map((slide, i) => (
              <span
                key={slide.title}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-5 bg-[#4A80BE]" : "w-1.5 bg-muted-foreground/30"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {index < lastIndex ? (
              <>
                <Button variant="ghost" size="sm" onClick={closeTour}>
                  Saltar
                </Button>
                <Button size="sm" onClick={next}>
                  Siguiente <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button size="sm" asChild onClick={closeTour}>
                <Link href="/products">
                  Ver el catalogo <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function buildSlides() {
  return [
    {
      icon: Sparkles,
      title: "Figuras originales de anime",
      body: (
        <p>
          Traemos figuras y merch de tus series favoritas, organizados por{" "}
          <strong className="text-foreground">anime</strong>,{" "}
          <strong className="text-foreground">linea</strong> (Ichiban Kuji,
          Grandista, Luminasta...) y{" "}
          <strong className="text-foreground">fabricante</strong> (Banpresto,
          Bandai, Sega...). Usa el buscador o los filtros del catalogo para
          encontrar la tuya.
        </p>
      ),
    },
    {
      icon: CalendarClock,
      title: "Mira el estado de cada figura",
      body: (
        <ul className="space-y-2">
          <li>
            <span className="mr-1.5 rounded-full bg-[#E2FBE9] px-2 py-0.5 text-xs font-bold text-[#1E7E34]">
              En Stock
            </span>
            Esta con nosotros, sale apenas confirmes tu pago.
          </li>
          <li>
            <span className="mr-1.5 rounded-full border border-dashed border-[#F5B400] bg-[#FFF5D1] px-2 py-0.5 text-xs font-bold text-[#142F5C]">
              Preventa
            </span>
            Aun no sale de fabrica. La aseguras hoy y te llega en la fecha
            estimada que aparece en su ficha.
          </li>
          <li>
            <span className="mr-1.5 rounded-full bg-[#E1F0FF] px-2 py-0.5 text-xs font-bold text-[#142F5C]">
              Online
            </span>
            La pedimos a tu nombre bajo encargo.
          </li>
        </ul>
      ),
    },
    {
      icon: PiggyBank,
      title: `Apartala desde S/ ${MIN_DEPOSIT}`,
      body: (
        <p>
          ¿No puedes pagarla completa hoy? Dale a{" "}
          <strong className="text-foreground">Apartar con adelanto</strong> en
          la ficha del producto: con S/ {MIN_DEPOSIT} la reservamos a tu nombre
          y vas abonando por partes hasta completarla. En tu perfil ves cuanto
          llevas pagado y cuanto falta.
        </p>
      ),
    },
    {
      icon: ShieldCheck,
      title: "Paga como te quede comodo",
      body: (
        <div className="space-y-3">
          <p>
            Con <strong className="text-foreground">Yape, Plin o
            transferencia</strong> subes tu voucher y lo validamos a mano, o
            paga con <strong className="text-foreground">tarjeta</strong> por
            Mercado Pago. Cada pedido tiene un codigo unico para que puedas
            seguirlo.
          </p>
          <PaymentMethods />
        </div>
      ),
    },
    {
      icon: Truck,
      title: "Recibela donde estes",
      body: (
        <div className="space-y-3">
          <p>
            <strong className="text-foreground">Recojo</strong> en nuestros
            puntos, <strong className="text-foreground">motorizado</strong> en
            Lima, o <strong className="text-foreground">agencia</strong> a
            provincia. Todo lo coordinamos contigo por WhatsApp.
          </p>
          <ShippingAgencies />
        </div>
      ),
    },
  ]
}
