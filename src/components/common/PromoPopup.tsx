"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

interface PromoPopupProps {
  id: string
  imageUrl: string
  linkUrl: string | null
  altText: string
}

// Se muestra una vez por sesion del navegador. La clave incluye el id de la
// campana: si el admin publica un popup nuevo, vuelve a aparecer aunque el
// visitante ya hubiera cerrado el anterior.
const dismissKey = (id: string) => `popupDismissed:${id}`

const AUTO_OPEN_DELAY_MS = 2500

// No interrumpe al usuario mientras compra o gestiona su cuenta.
const NO_SHOW = ["/cart", "/checkout", "/profile", "/admin"]

export function PromoPopup({ id, imageUrl, linkUrl, altText }: PromoPopupProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const close = useCallback(() => {
    sessionStorage.setItem(dismissKey(id), "1")
    setOpen(false)
  }, [id])

  useEffect(() => {
    if (NO_SHOW.some((p) => pathname.startsWith(p))) return
    if (sessionStorage.getItem(dismissKey(id)) === "1") return

    const timer = setTimeout(() => setOpen(true), AUTO_OPEN_DELAY_MS)
    return () => clearTimeout(timer)
  }, [id, pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  if (!open) return null

  const image = (
    <Image
      src={imageUrl}
      alt={altText}
      width={900}
      height={900}
      priority
      className="h-auto max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
    />
  )

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={altText}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-300"
      onClick={close}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar promoción"
          className="absolute -right-3 -top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#142F5C] shadow-lg transition hover:scale-110 hover:bg-[#F5B400]"
        >
          <X className="h-5 w-5" />
        </button>

        {linkUrl ? (
          <Link href={linkUrl} onClick={close} className="block">
            {image}
          </Link>
        ) : (
          image
        )}
      </div>
    </div>
  )
}
