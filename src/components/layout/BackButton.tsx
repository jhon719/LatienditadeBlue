"use client"

import { ChevronLeft } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { adminNavigation } from "@/components/admin/admin-nav"
import { useNavigationStore } from "@/stores/navigation-store"

// A dónde volver cuando no hay una ruta previa registrada en esta sesión
// (llegada directa: enlace de Instagram/TikTok, refresh, nueva pestaña).
// No es "history.back()": es una ruta padre determinista por sección, para
// que el botón funcione igual sin importar cómo se llegó a la página.
function parentRoute(pathname: string): string {
  if (pathname === "/admin") return "/"
  if (pathname.startsWith("/admin/")) {
    const section = adminNavigation.find(
      (item) =>
        item.href !== "/admin" &&
        (pathname === item.href || pathname.startsWith(`${item.href}/`))
    )
    if (!section) return "/admin"
    return pathname === section.href ? "/admin" : section.href
  }

  if (pathname === "/profile") return "/"
  if (pathname.startsWith("/profile/")) return "/profile"

  if (pathname === "/products") return "/"
  const apartarMatch = pathname.match(/^\/products\/([^/]+)\/apartar$/)
  if (apartarMatch) return `/products/${apartarMatch[1]}`
  if (pathname.startsWith("/products/")) return "/products"

  if (pathname === "/cart") return "/products"
  if (pathname === "/checkout") return "/cart"
  if (pathname.startsWith("/checkout/")) return "/"

  return "/"
}

// Botón flotante de "volver" para móvil. Mucho tráfico llega desde
// navegadores embebidos (Instagram, TikTok, WhatsApp) que no siempre dan
// acceso rápido al atrás del navegador, así que el sitio provee el suyo.
// Prioriza la pila de rutas de useNavigationStore (vuelve a donde el
// usuario realmente estuvo); si no hay historial en esta sesión, cae a
// parentRoute(). En escritorio se oculta: ahí el atrás del navegador ya
// está siempre a la mano.
export function BackButton() {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === "/") return null

  const handleClick = () => {
    const previous = useNavigationStore.getState().popPrevious()
    router.push(previous ?? parentRoute(pathname))
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Volver"
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#142F5C] text-white shadow-lg transition hover:brightness-110 active:scale-95 lg:hidden"
    >
      <ChevronLeft className="h-6 w-6" />
    </button>
  )
}
