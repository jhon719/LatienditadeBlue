"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X, AlertCircle } from "lucide-react"
import { useSession } from "next-auth/react"

const DISMISS_KEY = "completeProfileBannerDismissed"

// Aviso para completar el perfil (nombres, telefono, direccion) cuando falta
// algo. No se limita a cuentas nuevas: cualquier sesion con datos incompletos
// lo ve, porque son los campos que se usan para coordinar el envio.
// El cierre solo dura la sesion del navegador (sessionStorage): si el perfil
// sigue incompleto, vuelve a aparecer la proxima vez que entre.
export function CompleteProfileBanner() {
  const { data: session, status } = useSession()
  const [missingFields, setMissingFields] = useState<string[]>([])
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    if (status !== "authenticated" || !session?.user) {
      setMissingFields([])
      return
    }

    let cancelled = false

    fetch("/api/user/profile")
      .then((res) => (res.ok ? res.json() : null))
      .then((profile) => {
        if (cancelled || !profile) return

        const missing: string[] = []
        if (!profile.firstName || !profile.lastName) missing.push("Nombre")
        if (!profile.phone) missing.push("Telefono")
        if (!profile.address) missing.push("Direccion")

        setMissingFields(missing)
        setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1")
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [session?.user, status])

  if (dismissed || missingFields.length === 0) return null

  return (
    <div className="border-b border-[#4A80BE]/20 bg-gradient-to-r from-[#E1F0FF] to-[#FFF5D1] px-4 py-3">
      <div className="blue-container flex items-start justify-between gap-4">
        <div className="flex flex-1 gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#4A80BE]" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#142F5C]">Completa tu perfil</p>
            <p className="mt-0.5 text-xs text-[#142F5C]/80">
              Te falta: {missingFields.join(", ")} — lo usamos para coordinar tu envio.
            </p>
            <Link
              href="/profile/settings"
              className="mt-1.5 inline-flex text-xs font-bold text-[#4A80BE] underline hover:text-[#142F5C]"
            >
              Completar ahora →
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(DISMISS_KEY, "1")
            setDismissed(true)
          }}
          className="shrink-0 text-[#4A80BE]/60 transition hover:text-[#4A80BE]"
          aria-label="Cerrar aviso"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
