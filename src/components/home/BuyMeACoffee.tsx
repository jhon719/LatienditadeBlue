"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, ChevronDown, Coffee, Copy } from "lucide-react"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"

// Sección de apoyo/donaciones (bóveda 02.01): "invítale un café a Blue"
// usando el QR de Yape local de public/Imagenes/Pagos.
// En móvil escanear el QR desde la misma pantalla es imposible, así que se
// muestran también el número y el titular, con copiado al toque.
const DONATION = {
  phone: "915194685",
  phoneDisplay: "915 194 685",
  holder: "JHON ABAD",
}

export function BuyMeACoffee() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(DONATION.phone)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // El navegador puede bloquear el portapapeles sin gesto de usuario o
      // fuera de HTTPS; el número igual queda visible para copiarlo a mano.
    }
  }

  return (
    <section className="blue-container py-8 sm:py-10">
      <AnimatedContent>
        <div className="overflow-hidden rounded-3xl border-2 border-[#142F5C] bg-gradient-to-r from-[#FFF5D1] to-[#E1F0FF] solid-shadow-soft sm:rounded-[2rem] dark:from-[#FFF5D1]/10 dark:to-[#E1F0FF]/10">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex w-full items-center gap-3 p-4 text-left sm:gap-4 sm:p-6"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F5B400] text-[#142F5C] sm:h-14 sm:w-14 sm:rounded-3xl">
              <Coffee className="h-5 w-5 sm:h-7 sm:w-7" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl leading-tight text-[#142F5C] sm:text-3xl sm:leading-none dark:text-foreground">
                ¿Te gusta La Tiendita? ¡Invítale un café a Blue! ☕
              </p>
              <p className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">
                Tu apoyo ayuda a traer más figuras y mantener los lives. Cualquier
                monto por Yape suma.
              </p>
            </div>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-[#142F5C] transition-transform sm:h-6 sm:w-6 dark:text-foreground ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="grid gap-5 border-t-2 border-dashed border-[#142F5C]/20 p-4 sm:p-6 md:grid-cols-[auto_1fr] md:items-center">
              {/* QR: cómodo en escritorio, secundario en móvil */}
              <div className="mx-auto w-fit">
                <div className="relative h-36 w-36 overflow-hidden rounded-2xl border-2 border-[#742284] bg-white sm:h-44 sm:w-44">
                  <Image
                    src="/Imagenes/Pagos/QR YAPE DESARROLLADOR.jpeg"
                    alt="QR de Yape para donaciones"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 144px, 176px"
                  />
                </div>
                <p className="mt-2 text-center text-[11px] font-bold text-[#742284]">
                  Escanea con Yape
                </p>
              </div>

              {/* Datos para yapear desde el mismo teléfono */}
              <div className="rounded-2xl border border-[#742284]/25 bg-white/70 p-4 dark:bg-white/5">
                <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#742284]">
                  O yapea directo a
                </p>

                <button
                  type="button"
                  onClick={copyPhone}
                  className="mt-2 flex w-full items-center justify-between gap-3 rounded-xl border-2 border-dashed border-[#742284]/40 bg-white px-3 py-2.5 text-left transition hover:border-[#742284] dark:bg-white/10"
                  aria-label={`Copiar numero ${DONATION.phoneDisplay}`}
                >
                  <span className="font-display text-2xl leading-none tracking-wide text-[#142F5C] dark:text-foreground">
                    {DONATION.phoneDisplay}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-xs font-extrabold text-[#742284]">
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" /> Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> Copiar
                      </>
                    )}
                  </span>
                </button>

                <p className="mt-3 text-xs text-muted-foreground">
                  A nombre de{" "}
                  <span className="font-extrabold text-[#142F5C] dark:text-foreground">
                    {DONATION.holder}
                  </span>
                </p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  ¡Gracias por el cafecito! ✨
                </p>
              </div>
            </div>
          )}
        </div>
      </AnimatedContent>
    </section>
  )
}
