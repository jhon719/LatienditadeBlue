"use client"

import { useState } from "react"
import Image from "next/image"
import { ZoomIn } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ImageLightboxProps {
  src: string
  alt: string
  // Texto bajo la imagen ampliada (por defecto usa alt)
  caption?: string
  // Clases del contenedor del disparador (define tamaño/borde)
  className?: string
  // Clases de la imagen en miniatura (object-cover, object-contain, etc.)
  imgClassName?: string
  sizes?: string
}

// Miniatura clickeable que abre la imagen ampliada en un visor.
// Usado para los QRs de pago del checkout (pedido del usuario: poder verlos en grande).
export function ImageLightbox({
  src,
  alt,
  caption,
  className,
  imgClassName,
  sizes = "144px",
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative block cursor-zoom-in overflow-hidden",
          className
        )}
        aria-label={`Ampliar ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("transition-transform duration-300 group-hover:scale-105", imgClassName)}
          sizes={sizes}
        />
        {/* Indicación de zoom al pasar el mouse */}
        <span className="absolute inset-0 flex items-center justify-center bg-[#142F5C]/0 opacity-0 transition-all duration-200 group-hover:bg-[#142F5C]/35 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#142F5C] shadow">
            <ZoomIn className="h-3.5 w-3.5" />
            Ampliar
          </span>
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(92vw,640px)] border-none bg-transparent p-0 shadow-none sm:max-w-[min(90vw,640px)]">
          <DialogTitle className="sr-only">{caption ?? alt}</DialogTitle>
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-card">
            <div className="relative h-[min(75vh,560px)] w-full">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain p-3"
                sizes="90vw"
                priority
              />
            </div>
            <p className="border-t border-border bg-secondary/50 px-4 py-3 text-center text-sm font-semibold">
              {caption ?? alt}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
