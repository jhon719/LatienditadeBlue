"use client"

import * as React from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import {
  BookOpen,
  Heart,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  Shirt,
  ShoppingBag,
  Sparkles,
  Tag,
  User,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { UserAvatar } from "@/components/common/UserAvatar"

// Navegación por tipo de mercancía (estilo Homidori) + preventas
const links = [
  { name: "Figuras", href: "/products?type=figura", icon: Package },
  { name: "Mangas", href: "/products?type=manga", icon: BookOpen },
  { name: "Peluches", href: "/products?type=peluche", icon: Heart },
  { name: "Llaveros", href: "/products?type=llavero", icon: Tag },
  { name: "Ropa", href: "/products?type=ropa", icon: Shirt },
  { name: "Merch", href: "/products?type=merch", icon: ShoppingBag },
  { name: "Preventas", href: "/products?status=preventa", icon: Sparkles },
]

const itemClass =
  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-extrabold text-foreground transition hover:bg-secondary"

export function MobileNav({ avatarFileName }: { avatarFileName?: string | null }) {
  const [open, setOpen] = React.useState(false)
  const { data: session, status } = useSession()
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full xl:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      {/* flex + overflow interno: con sesión abierta la lista supera la altura
          de un teléfono, así que el cuerpo scrollea y el header queda fijo. */}
      <SheetContent side="left" className="flex w-[min(20rem,88vw)] flex-col gap-0 bg-background p-0">
        <SheetHeader className="shrink-0 border-b px-5 py-4">
          <SheetTitle className="text-left font-display text-3xl text-foreground">
            La Tiendita de Blue
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          {/* Buscador: en móvil el del Header está oculto, este lo reemplaza */}
          <form action="/products" onSubmit={close} className="relative mb-5">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4A80BE]" />
            <Input
              name="search"
              className="h-11 rounded-full border-[#dbe3ee] pl-11 font-semibold"
              placeholder="Buscar anime o producto"
            />
          </form>

          {/* Bloque de cuenta */}
          {status !== "loading" && session ? (
            <div className="space-y-2">
              <div className="flex items-center gap-3 rounded-3xl bg-secondary px-4 py-3">
                <span className="flex h-10 w-10 shrink-0">
                  <UserAvatar
                    username={session.user?.username ?? "usuario"}
                    avatarFileName={avatarFileName ?? null}
                    size={40}
                  />
                </span>
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-sm font-extrabold text-foreground">
                    {session.user?.name?.split(" ")[0] || session.user?.username || "Cuenta"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{session.user?.email}</p>
                </div>
              </div>
              <Link href="/profile" onClick={close} className={itemClass}>
                <User className="h-5 w-5 text-[#4A80BE]" /> Mi perfil
              </Link>
              <Link href="/profile/orders" onClick={close} className={itemClass}>
                <Package className="h-5 w-5 text-[#4A80BE]" /> Mis pedidos
              </Link>
              {session.user?.role === "ADMIN" && (
                <Link href="/admin" onClick={close} className={itemClass}>
                  <Settings className="h-5 w-5 text-[#4A80BE]" /> Panel admin
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  close()
                  signOut({ callbackUrl: "/" })
                }}
                className={`${itemClass} w-full text-left text-destructive hover:bg-destructive/10`}
              >
                <LogOut className="h-5 w-5" /> Cerrar sesion
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                href="/login"
                onClick={close}
                className="flex items-center justify-center gap-2 rounded-full bg-[#142F5C] px-4 py-3 font-extrabold text-white transition hover:bg-[#4A80BE]"
              >
                <User className="h-5 w-5" /> Ingresar
              </Link>
              <Link href="/register" onClick={close} className={itemClass}>
                <UserPlus className="h-5 w-5 text-[#4A80BE]" /> Crear cuenta
              </Link>
            </div>
          )}

          <Separator className="my-5" />

          <div className="space-y-1">
            {links.map((item) => (
              <Link key={item.href} href={item.href} onClick={close} className={itemClass}>
                <item.icon className="h-5 w-5 text-[#4A80BE]" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="shrink-0 border-t px-5 py-4">
          <Link
            href="/products"
            onClick={close}
            className="block rounded-full bg-[#4A80BE] px-4 py-3 text-center font-extrabold text-white solid-shadow-yellow"
          >
            Ver catalogo completo
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
