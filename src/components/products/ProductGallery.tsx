"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

const PLACEHOLDER_IMAGE = "/Imagenes/Mascota BLUE.png"
const HOVER_ZOOM = 2.2
const LIGHTBOX_ZOOM = 2.5

// En escritorio el arrastre del carrusel pelearía con el zoom por hover: allí
// se navega con las miniaturas o abriendo el visor. En móvil se desliza.
const EMBLA_BREAKPOINTS = { "(min-width: 1024px)": { watchDrag: false } }

// Posición del cursor dentro de un elemento, en % (origen del zoom)
function originFromEvent(e: React.MouseEvent<HTMLElement>): string {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  return `${x}% ${y}%`
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  // Un producto sin fotos no debe romper la ficha (mismo fallback que ProductCard)
  const gallery = images.length > 0 ? images : [PLACEHOLDER_IMAGE]
  const hasMany = gallery.length > 1

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [zoomOrigin, setZoomOrigin] = useState<string | null>(null)
  const [canHover, setCanHover] = useState(false)

  // El zoom por hover solo tiene sentido con mouse: en táctil se usa el visor
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    setCanHover(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: hasMany,
    breakpoints: EMBLA_BREAKPOINTS,
  })

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi])

  const goTo = useCallback(
    (index: number) => {
      setSelectedIndex(index)
      emblaApi?.scrollTo(index)
    },
    [emblaApi]
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen principal: aspecto fijo 4:5 (las figuras son verticales) con
          object-contain, así nunca se recorta y el layout no salta al cargar. */}
      <div className="relative overflow-hidden rounded-lg bg-muted">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {gallery.map((image, index) => (
              <div key={`${image}-${index}`} className="min-w-0 shrink-0 grow-0 basis-full">
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Ampliar imagen ${index + 1} de ${productName}`}
                  onClick={() => setLightboxOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setLightboxOpen(true)
                    }
                  }}
                  onMouseMove={(e) => canHover && setZoomOrigin(originFromEvent(e))}
                  onMouseLeave={() => setZoomOrigin(null)}
                  className="relative block aspect-[4/5] w-full cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Image
                    src={image}
                    alt={`${productName} - imagen ${index + 1}`}
                    fill
                    className="object-contain transition-transform duration-200 ease-out"
                    style={
                      zoomOrigin && index === selectedIndex
                        ? { transform: `scale(${HOVER_ZOOM})`, transformOrigin: zoomOrigin }
                        : undefined
                    }
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pista de la lupa (se oculta mientras se está haciendo zoom) */}
        <span
          className={cn(
            "pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-background/85 px-2.5 py-1.5 text-xs font-bold text-foreground shadow-sm backdrop-blur transition-opacity",
            zoomOrigin ? "opacity-0" : "opacity-100"
          )}
        >
          <Expand className="h-3.5 w-3.5 text-[#4A80BE]" />
          <span className="hidden sm:inline">Ampliar</span>
        </span>

        {hasMany && (
          <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/85 px-2.5 py-1 text-xs font-bold tabular-nums text-foreground shadow-sm backdrop-blur lg:hidden">
            {selectedIndex + 1} / {gallery.length}
          </span>
        )}
      </div>

      {/* Miniaturas: también object-contain para no recortar la figura */}
      {hasMany && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {gallery.map((image, index) => (
            <button
              key={`thumb-${image}-${index}`}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ver imagen ${index + 1}`}
              aria-current={selectedIndex === index}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 bg-muted p-1 transition-colors",
                selectedIndex === index
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground/50"
              )}
            >
              <Image
                src={image}
                alt={`${productName} - miniatura ${index + 1}`}
                fill
                className="object-contain"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          showCloseButton
          className="max-w-[calc(100%-1rem)] gap-3 p-3 sm:max-w-4xl sm:p-5"
        >
          <DialogTitle className="sr-only">
            Galería de {productName}
          </DialogTitle>
          <LightboxContent
            images={gallery}
            productName={productName}
            startIndex={selectedIndex}
            canHover={canHover}
            onIndexChange={goTo}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Se monta al abrir el visor (Radix desmonta el contenido al cerrar), así que
// `startIndex` siempre arranca en la imagen que se estaba viendo.
function LightboxContent({
  images,
  productName,
  startIndex,
  canHover,
  onIndexChange,
}: {
  images: string[]
  productName: string
  startIndex: number
  canHover: boolean
  onIndexChange: (index: number) => void
}) {
  const hasMany = images.length > 1
  const [index, setIndex] = useState(startIndex)
  const [zoomed, setZoomed] = useState(false)
  const [origin, setOrigin] = useState("50% 50%")

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: hasMany,
    startIndex,
    breakpoints: EMBLA_BREAKPOINTS,
  })

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      const next = emblaApi.selectedScrollSnap()
      setIndex(next)
      setZoomed(false)
      onIndexChange(next)
    }
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, onIndexChange])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  // Flechas del teclado (Escape ya lo maneja Radix)
  useEffect(() => {
    if (!hasMany) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollPrev()
      if (e.key === "ArrowRight") scrollNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [hasMany, scrollPrev, scrollNext])

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden rounded-lg bg-muted">
          <div className="flex">
            {images.map((image, i) => (
              <div key={`lb-${image}-${i}`} className="min-w-0 shrink-0 grow-0 basis-full">
                <div
                  onClick={() => canHover && setZoomed((z) => !z)}
                  onMouseMove={(e) => {
                    if (canHover && zoomed) setOrigin(originFromEvent(e))
                  }}
                  className={cn(
                    "relative h-[60vh] w-full sm:h-[68vh]",
                    canHover && (zoomed ? "cursor-zoom-out" : "cursor-zoom-in")
                  )}
                >
                  <Image
                    src={image}
                    alt={`${productName} - imagen ${i + 1}`}
                    fill
                    className="object-contain transition-transform duration-200 ease-out"
                    style={
                      zoomed && i === index
                        ? { transform: `scale(${LIGHTBOX_ZOOM})`, transformOrigin: origin }
                        : undefined
                    }
                    sizes="(max-width: 640px) 100vw, 80vw"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {hasMany && (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow-md backdrop-blur transition hover:bg-background"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-foreground shadow-md backdrop-blur transition hover:bg-background"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/85 px-3 py-1 text-xs font-bold tabular-nums text-foreground shadow-sm backdrop-blur">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {hasMany && (
        <div className="flex justify-center gap-2 overflow-x-auto">
          {images.map((image, i) => (
            <button
              key={`lb-thumb-${image}-${i}`}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={index === i}
              className={cn(
                "relative h-14 w-14 shrink-0 overflow-hidden rounded-md border-2 bg-muted p-1 transition-colors",
                index === i
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground/50"
              )}
            >
              <Image
                src={image}
                alt={`${productName} - miniatura ${i + 1}`}
                fill
                className="object-contain"
                sizes="56px"
              />
            </button>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground">
        {canHover
          ? "Haz clic en la imagen para acercar o alejar"
          : "Desliza para ver las demas imagenes"}
      </p>
    </div>
  )
}
