"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Store } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NotificationBell } from "./NotificationBell"
import { adminNavigation, isAdminRouteActive } from "./admin-nav"

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r bg-card">
      {/* Logo + campana de notificaciones */}
      <div className="flex h-16 items-center gap-1 border-b px-4">
        <Link
          href="/"
          className="group flex flex-1 items-center gap-2 transition-colors hover:opacity-80"
        >
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Image
              src="/Imagenes/LOGO BLUE.jpeg"
              alt="La Tiendita de Blue"
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <span className="font-bold">La Tiendita de Blue</span>
        </Link>
        <NotificationBell />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {adminNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isAdminRouteActive(pathname, item.href)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Back to Store */}
      <div className="border-t p-4">
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/">
            <Store className="mr-2 h-4 w-4" />
            Volver a la Tienda
          </Link>
        </Button>
      </div>
    </aside>
  )
}
