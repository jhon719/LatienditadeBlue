"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Store } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NotificationBell } from "./NotificationBell"
import { adminNavigation, isAdminRouteActive } from "./admin-nav"

// Barra superior del panel para móvil/tablet. El AdminSidebar es `lg:flex`,
// así que por debajo de lg no había ninguna forma de navegar el panel.
export function AdminMobileBar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  const current = adminNavigation.find((item) => isAdminRouteActive(pathname, item.href))

  return (
    <div className="sticky top-0 z-40 flex h-16 items-center gap-2 border-b bg-card px-4 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu del panel</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex w-[min(18rem,85vw)] flex-col gap-0 p-0">
          <SheetHeader className="shrink-0 border-b px-4 py-4">
            <SheetTitle className="flex items-center gap-2 text-left">
              <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src="/Imagenes/LOGO BLUE.jpeg"
                  alt="La Tiendita de Blue"
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </span>
              <span className="truncate text-base">Panel admin</span>
            </SheetTitle>
          </SheetHeader>

          <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain p-4">
            {adminNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
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

          <div className="shrink-0 border-t p-4">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/" onClick={() => setOpen(false)}>
                <Store className="mr-2 h-4 w-4" />
                Volver a la Tienda
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <p className="min-w-0 flex-1 truncate font-bold">{current?.name ?? "Panel admin"}</p>
      <NotificationBell />
    </div>
  )
}
