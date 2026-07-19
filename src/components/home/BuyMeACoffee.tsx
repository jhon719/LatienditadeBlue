"use client"

import { useState } from "react"
import Image from "next/image"
import { Coffee, ChevronDown } from "lucide-react"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"

// Sección de apoyo/donaciones (bóveda 02.01): "invítale un café a Blue"
// usando el QR de Yape local de public/Imagenes/Pagos
export function BuyMeACoffee() {
  const [open, setOpen] = useState(false)

  return (
    <section className="blue-container py-10">
      <AnimatedContent>
        <div className="overflow-hidden rounded-[2rem] border-2 border-[#142F5C] bg-gradient-to-r from-[#FFF5D1] to-[#E1F0FF] solid-shadow-soft dark:from-[#FFF5D1]/10 dark:to-[#E1F0FF]/10">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex w-full items-center gap-4 p-6 text-left"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-[#F5B400] text-[#142F5C]">
              <Coffee className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <p className="font-display text-3xl leading-none text-[#142F5C] dark:text-foreground">
                ¿Te gusta La Tiendita? ¡Invítale un café a Blue! ☕
              </p>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">
                Tu apoyo ayuda a traer más figuras y mantener los lives. Cualquier
                monto por Yape suma.
              </p>
            </div>
            <ChevronDown
              className={`h-6 w-6 shrink-0 text-[#142F5C] transition-transform dark:text-foreground ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="flex flex-col items-center gap-3 border-t-2 border-dashed border-[#142F5C]/20 p-6">
              <div className="relative h-44 w-44 overflow-hidden rounded-2xl border-2 border-[#742284] bg-white">
                <Image
                  src="/Imagenes/Pagos/YAPE QR.jpeg"
                  alt="QR de Yape para donaciones"
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>
              <p className="text-xs font-bold text-[#742284]">
                Escanea con Yape · ¡Gracias por el cafecito! ✨
              </p>
            </div>
          )}
        </div>
      </AnimatedContent>
    </section>
  )
}
