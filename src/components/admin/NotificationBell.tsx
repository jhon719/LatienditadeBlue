"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NotifItem {
  key: string
  label: string
  count: number
  href: string
  tone: "warning" | "critical" | "info"
}

const DOT: Record<NotifItem["tone"], string> = {
  warning: "bg-[#F5B400]",
  critical: "bg-red-500",
  info: "bg-[#4A80BE]",
}

// Campana de notificaciones del admin: conteos en vivo (polling ~30 s) de la cola
// de validación, despachos y alertas de stock. Los datos vienen de
// /api/admin/notifications (derivados, sin tabla propia).
export function NotificationBell() {
  const [items, setItems] = useState<NotifItem[]>([])
  const [badge, setBadge] = useState(0)
  // El botón "Actualizar" incrementa esta llave para re-ejecutar el effect
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let active = true
    // La descarga se define dentro del effect (evita setState de un callback
    // externo en el cuerpo del effect) y solo aplica si el componente sigue vivo.
    const run = async () => {
      try {
        const res = await fetch("/api/admin/notifications")
        if (!active || !res.ok) return
        const data = await res.json()
        setItems(data.items ?? [])
        setBadge(data.badgeCount ?? 0)
      } catch {
        // silencioso: la campana no debe romper el header
      }
    }
    run()
    const timer = setInterval(run, 30000)
    const onFocus = () => run()
    window.addEventListener("focus", onFocus)
    return () => {
      active = false
      clearInterval(timer)
      window.removeEventListener("focus", onFocus)
    }
  }, [refreshKey])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {badge > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 animate-pulse items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
              {badge > 99 ? "99+" : badge}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notificaciones
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setRefreshKey((k) => k + 1)
            }}
            className="text-xs font-normal text-muted-foreground hover:text-foreground"
          >
            Actualizar
          </button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.length === 0 ? (
          <div className="px-2 py-6 text-center text-sm text-muted-foreground">
            Todo al día ✨
          </div>
        ) : (
          items.map((i) => (
            <DropdownMenuItem key={i.key} asChild className="cursor-pointer">
              <Link href={i.href} className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full ${DOT[i.tone]} opacity-75`}
                  />
                  <span
                    className={`relative inline-flex h-2.5 w-2.5 rounded-full ${DOT[i.tone]}`}
                  />
                </span>
                <span className="flex-1 text-sm">{i.label}</span>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-bold">
                  {i.count}
                </span>
              </Link>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
