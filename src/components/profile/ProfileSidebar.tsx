"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { User, Package, Settings, LogOut, PiggyBank } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { UserAvatar } from "@/components/common/UserAvatar"

const navigation = [
  { name: "Mi Perfil", href: "/profile", icon: User },
  { name: "Mis Pedidos", href: "/profile/orders", icon: Package },
  { name: "Mis Separaciones", href: "/profile/separations", icon: PiggyBank },
  { name: "Configuración", href: "/profile/settings", icon: Settings },
]

export function ProfileSidebar({
  avatarFileName = null,
}: {
  avatarFileName?: string | null
}) {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="space-y-6">
      {/* User Info */}
      <div className="group flex items-center gap-4">
        <div className="rounded-full ring-2 ring-transparent transition-all duration-300 group-hover:scale-105 group-hover:ring-[#F5B400]">
          <UserAvatar
            username={session?.user?.username ?? "usuario"}
            avatarFileName={avatarFileName}
            size={64}
          />
        </div>
        <div>
          <h2 className="font-semibold">@{session?.user?.username}</h2>
          <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
        </div>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
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

      <Separator />

      {/* Logout */}
      <Button
        variant="ghost"
        className="w-full justify-start text-muted-foreground hover:text-destructive"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        <LogOut className="mr-3 h-4 w-4" />
        Cerrar Sesión
      </Button>
    </aside>
  )
}
