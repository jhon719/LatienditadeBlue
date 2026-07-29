"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

interface CornerAdProps {
  id: string
  imageUrl: string
  linkUrl: string
  altText: string
}

// Se muestra una vez por sesion del navegador, igual que PromoPopup.
const dismissKey = (id: string) => `cornerAdDismissed:${id}`

// No interrumpe al usuario mientras compra o gestiona su cuenta.
const NO_SHOW = ["/cart", "/checkout", "/profile", "/admin"]

export function CornerAd({ id, imageUrl, linkUrl, altText }: CornerAdProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (NO_SHOW.some((p) => pathname.startsWith(p))) return
    if (sessionStorage.getItem(dismissKey(id)) === "1") return
    setOpen(true)
  }, [id, pathname])

  const close = () => {
    sessionStorage.setItem(dismissKey(id), "1")
    setOpen(false)
  }

  if (!open) return null

  const isExternal = /^https?:\/\//.test(linkUrl)

  const image = (
    <Image
      src={imageUrl}
      alt={altText}
      width={300}
      height={380}
      className="w-full rounded-xl object-cover shadow-2xl"
    />
  )

  return (
    <div
      // bottom-20 en movil deja libre el BackButton (bottom-5 right-5, lg:hidden);
      // desde lg vuelve a bottom-5 porque ese boton ya no existe.
      className="fixed bottom-20 right-4 z-40 w-32 animate-in slide-in-from-bottom-4 fade-in duration-300 sm:w-40 lg:bottom-5 lg:right-5 lg:w-48"
    >
      <div className="relative">
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar anuncio"
          className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#142F5C] shadow-lg transition hover:scale-110 hover:bg-[#F5B400]"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {isExternal ? (
          <a href={linkUrl} target="_blank" rel="noopener noreferrer" onClick={close}>
            {image}
          </a>
        ) : (
          <Link href={linkUrl} onClick={close}>
            {image}
          </Link>
        )}
      </div>
    </div>
  )
}
