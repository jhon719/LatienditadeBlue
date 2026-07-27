import {
  LayoutDashboard,
  Package,
  Inbox,
  ClipboardList,
  Megaphone,
  Tags,
  Users,
  Settings,
  Boxes,
  FileText,
  MessageSquare,
  Sticker,
} from "lucide-react"

// Navegación del panel compartida por el sidebar de escritorio y el drawer
// móvil, para que no se desincronicen al agregar secciones.
export const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Bandeja POS", href: "/admin/manual-payments", icon: Inbox },
  { name: "Órdenes", href: "/admin/orders", icon: ClipboardList },
  { name: "Logística", href: "/admin/logistics", icon: Boxes },
  { name: "Productos", href: "/admin/products", icon: Package },
  { name: "Campañas", href: "/admin/campaigns", icon: Megaphone },
  { name: "Categorías y Líneas", href: "/admin/categories", icon: Tags },
  { name: "Usuarios", href: "/admin/users", icon: Users },
  { name: "Mensajes", href: "/admin/messages", icon: MessageSquare },
  { name: "Stickers", href: "/admin/stickers", icon: Sticker },
  { name: "Reportes", href: "/admin/reports", icon: FileText },
  { name: "Configuración", href: "/admin/settings", icon: Settings },
]

export function isAdminRouteActive(pathname: string, href: string) {
  return href === "/admin"
    ? pathname === "/admin"
    : pathname === href || pathname.startsWith(`${href}/`)
}
