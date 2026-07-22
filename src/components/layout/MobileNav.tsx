"use client"

import * as React from "react"
import Link from "next/link"
import { BookOpen, Heart, Menu, Package, Shirt, ShoppingBag, Sparkles, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

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

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full xl:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] bg-background">
        <SheetHeader>
          <SheetTitle className="text-left font-display text-4xl text-foreground">La Tiendita de Blue</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-5">
          <Link onClick={() => setOpen(false)} href="/profile" className="flex items-center gap-3 rounded-3xl bg-secondary px-4 py-3 font-bold text-foreground">
            <User className="h-5 w-5" /> Mi cuenta
          </Link>
          <Separator />
          <div className="space-y-2">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-extrabold text-foreground transition hover:bg-secondary"
              >
                <item.icon className="h-5 w-5 text-[#4A80BE]" />
                {item.name}
              </Link>
            ))}
          </div>
          <Link onClick={() => setOpen(false)} href="/products" className="block rounded-full bg-[#4A80BE] px-4 py-3 text-center font-extrabold text-white solid-shadow-yellow">
            Ver catalogo completo
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
