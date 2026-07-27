"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useNavigationStore } from "@/stores/navigation-store"

// Componente invisible: registra cada ruta visitada en useNavigationStore
// para que BackButton sepa a dónde volver. Vive en el root layout, así que
// cubre tienda, perfil, admin y auth con un solo montaje.
export function NavigationTracker() {
  const pathname = usePathname()
  const visit = useNavigationStore((state) => state.visit)

  useEffect(() => {
    visit(pathname)
  }, [pathname, visit])

  return null
}
