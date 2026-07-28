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

// Campana del cliente en el header: mensajes sin leer + pedidos en proceso
// (derivados de /api/user/notifications). Se refresca por polling, al enfocar la
// pestaña y al marcar un mensaje como leído (evento "messages:updated").
export function UserNotificationBell() {
  const [items, setItems] = useState<NotifItem[]>([])
  const [badge, setBadge] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let active = true
    const run = async () => {
      try {
        const res = await fetch("/api/user/notifications")
        if (!active || !res.ok) return
        const data = await res.json()
        setItems(data.items ?? [])
        setBadge(data.badgeCount ?? 0)
      } catch {
        // silencioso
      }
    }
    run()
    const timer = setInterval(run, 30000)
    const onFocus = () => run()
    const onMessages = () => run()
    window.addEventListener("focus", onFocus)
    window.addEventListener("messages:updated", onMessages)
    return () => {
      active = false
      clearInterval(timer)
      window.removeEventListener("focus", onFocus)
      window.removeEventListener("messages:updated", onMessages)
    }
  }, [refreshKey])

  return (
    // modal={false} por el mismo motivo que en Header: el scroll-lock de Radix
    // rompe el `sticky` del header (ver comentario allí).
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {badge > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 animate-pulse items-center justify-center rounded-full bg-[#F5B400] px-1 text-[10px] font-bold text-[#142F5C]">
              {badge > 9 ? "9+" : badge}
            </span>
          )}
          <span className="sr-only">Notificaciones</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
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
            Estás al día ✨
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
