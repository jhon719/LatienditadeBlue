"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

// Burbuja de bienvenida de Bluet (bóveda 02.01 §4): mascota flotante
// que invita a coordinar por WhatsApp
export function BluetBubble() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51997763962"
  const message = encodeURIComponent(
    "¡Hola! Estoy buscando una figura en especial, ¿me ayudas? ✨"
  )

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-end gap-2">
      <div className="relative h-16 w-16 animate-float-soft">
        <Image
          src="/Imagenes/Mascota BLUE.png"
          alt="Bluet"
          fill
          className="object-contain drop-shadow-lg"
        />
      </div>
      <div className="relative max-w-[210px] rounded-2xl rounded-bl-sm border-2 border-dashed border-primary bg-card p-3 shadow-lg">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute -right-2 -top-2 rounded-full border bg-card p-0.5 text-muted-foreground hover:text-foreground"
          aria-label="Cerrar"
        >
          <X className="h-3 w-3" />
        </button>
        <p className="text-xs font-semibold leading-snug text-foreground">
          ¡Hola! ¿Buscas alguna figura en especial?{" "}
          <a
            href={`https://wa.me/${phone}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            ¡Pregúntame!
          </a>
        </p>
      </div>
    </div>
  )
}
