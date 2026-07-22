"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { LogOut, Package, Search, Settings, ShoppingCart, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { UserAvatar } from "@/components/common/UserAvatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/stores/cart-store"
import { MobileNav } from "./MobileNav"
import { AnimatedThemeToggle } from "./AnimatedThemeToggle"

// Navegación por tipo de mercancía (estilo Homidori) + preventas y catálogo
const navLinks = [
  { label: "Figuras", href: "/products?type=figura" },
  { label: "Mangas", href: "/products?type=manga" },
  { label: "Peluches", href: "/products?type=peluche" },
  { label: "Merch", href: "/products?type=merch" },
  { label: "Preventas", href: "/products?status=preventa" },
  { label: "Catalogo", href: "/products" },
]

const subscribeToClient = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export function Header() {
  const mounted = useSyncExternalStore(subscribeToClient, getClientSnapshot, getServerSnapshot)
  const itemCount = useCartStore((state) => state.getItemCount())
  const { data: session, status } = useSession()
  const [avatarFileName, setAvatarFileName] = useState<string | null>(null)

  useEffect(() => {
    if (!session?.user?.id) return
    let cancelled = false
    fetch("/api/user/profile")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled) setAvatarFileName(data?.avatarFileName ?? null)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [session?.user?.id])

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-xl">
      <div className="blue-container">
        <div className="flex min-h-20 items-center gap-4 py-3">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-3xl solid-shadow-yellow">
              <Image
                src="/Imagenes/LOGO BLUE.jpeg"
                alt="La Tiendita de Blue"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div className="leading-none">
              <p className="font-display text-3xl text-foreground">La Tiendita</p>
              <p className="-mt-1 text-xs font-extrabold uppercase tracking-wide text-[#4A80BE]">de Blue</p>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-xs font-extrabold uppercase text-foreground transition hover:bg-secondary hover:text-[#4A80BE]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden max-w-xs flex-1 md:block xl:max-w-sm">
            <form action="/products" className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4A80BE]" />
              <Input
                name="search"
                className="h-11 rounded-full border-[#dbe3ee] pl-11 font-semibold"
                placeholder="Buscar anime, marca o producto"
              />
            </form>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <AnimatedThemeToggle className="mr-1" />
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative rounded-full">
                <ShoppingCart className="h-5 w-5" />
                {mounted && itemCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F5B400] p-0 text-xs text-[#142F5C]">
                    {itemCount > 9 ? "9+" : itemCount}
                  </Badge>
                )}
                <span className="sr-only">Carrito</span>
              </Button>
            </Link>

            {mounted && status !== "loading" && session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="group hidden items-center gap-2 rounded-full py-1 pl-1.5 pr-4 font-bold sm:flex">
                    <span className="flex h-6 w-6 shrink-0 rounded-full ring-2 ring-transparent transition-all duration-300 group-hover:scale-110 group-hover:ring-[#F5B400]">
                      <UserAvatar
                        username={session.user?.username ?? "usuario"}
                        avatarFileName={avatarFileName}
                        size={24}
                      />
                    </span>
                    {session.user?.name?.split(" ")[0] || "Cuenta"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/profile"><User className="mr-2 h-4 w-4" />Mi perfil</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/profile/orders"><Package className="mr-2 h-4 w-4" />Pedidos</Link></DropdownMenuItem>
                  {session.user?.role === "ADMIN" && <DropdownMenuItem asChild><Link href="/admin"><Settings className="mr-2 h-4 w-4" />Admin</Link></DropdownMenuItem>}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}><LogOut className="mr-2 h-4 w-4" />Salir</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" className="hidden sm:block">
                <Button className="rounded-full bg-[#142F5C] font-extrabold text-white hover:bg-[#4A80BE]">Ingresar</Button>
              </Link>
            )}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
