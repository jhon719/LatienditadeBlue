"use client"

import * as React from "react"
import Link from "next/link"
import { Heart, Menu, Package, ShoppingBag, Sparkles, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const links = [
  { name: "Figuras en Stock", href: "/products?status=stock", icon: Package },
  { name: "Preventa", href: "/products?status=preventa", icon: Sparkles },
  { name: "Online", href: "/products?status=online", icon: ShoppingBag },
  { name: "Peluches", href: "/products?category=peluches", icon: Heart },
  { name: "Mangas", href: "/products?category=mangas", icon: Package },
  { name: "Merch", href: "/products?category=merch", icon: ShoppingBag },
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
      <SheetContent side="left" className="w-[320px] bg-white">
        <SheetHeader>
          <SheetTitle className="text-left font-display text-4xl text-[#142F5C]">La Tiendita de Blue</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-5">
          <Link onClick={() => setOpen(false)} href="/profile" className="flex items-center gap-3 rounded-3xl bg-[#F2F2F2] px-4 py-3 font-bold text-[#142F5C]">
            <User className="h-5 w-5" /> Mi cuenta
          </Link>
          <Separator />
          <div className="space-y-2">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-extrabold text-[#142F5C] transition hover:bg-[#F2F2F2]"
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
