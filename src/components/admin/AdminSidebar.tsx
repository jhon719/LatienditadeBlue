"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Inbox,
  ClipboardList,
  Megaphone,
  Tags,
  Users,
  Settings,
  Store,
  Boxes,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Bandeja POS", href: "/admin/manual-payments", icon: Inbox },
  { name: "Órdenes", href: "/admin/orders", icon: ClipboardList },
  { name: "Logística", href: "/admin/logistics", icon: Boxes },
  { name: "Productos", href: "/admin/products", icon: Package },
  { name: "Campañas", href: "/admin/campaigns", icon: Megaphone },
  { name: "Categorías y Líneas", href: "/admin/categories", icon: Tags },
  { name: "Usuarios", href: "/admin/users", icon: Users },
  { name: "Reportes", href: "/admin/reports", icon: FileText },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r bg-card">
      {/* Logo */}
      <Link
        href="/"
        className="group flex h-16 items-center gap-2 border-b px-6 transition-colors hover:bg-muted/50"
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

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
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
