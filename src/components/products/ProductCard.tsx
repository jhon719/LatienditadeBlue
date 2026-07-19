"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star, Check, CalendarClock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Product } from "@/types"
import { useCartStore } from "@/stores/cart-store"

interface ProductCardProps {
  product: Product
}

const PLACEHOLDER_IMAGE = "/Imagenes/Mascota BLUE.png"

// Badge automático de oferta (bóveda 05.05 §2 "Badges")
function OfferBadge({ product }: { product: Product }) {
  if (product.salePrice === undefined) return null
  const percent = Math.round(
    ((product.price - product.salePrice) / product.price) * 100
  )
  return (
    <Badge className="bg-red-500 text-white shadow">-{percent}% OFF</Badge>
  )
}

// Badges de estado con colores pastel de la marca (bóveda 01.04 / 02.01)
function StatusBadge({ product }: { product: Product }) {
  switch (product.status) {
    case "PREVENTA":
      return (
        <Badge className="border border-dashed border-[#F5B400] bg-[#FFF5D1] text-[#142F5C]">
          Preventa
        </Badge>
      )
    case "STOCK":
      return <Badge className="bg-[#E2FBE9] text-[#1E7E34]">En Stock</Badge>
    case "ONLINE":
      return <Badge className="bg-[#E1F0FF] text-[#142F5C]">Online</Badge>
    case "AGOTADO":
      return <Badge className="bg-[#FFEAEA] text-red-600">Agotado</Badge>
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [added, setAdded] = useState(false)

  const productImage = product.images?.[0] || PLACEHOLDER_IMAGE
  const canBuy =
    product.status === "PREVENTA" ||
    (product.status !== "AGOTADO" && product.stockQty > 0)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          <StatusBadge product={product} />
          <OfferBadge product={product} />
        </div>

        <Link href={`/products/${product.slug}`}>
          <div className="relative h-full w-full">
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </Link>

        <div className="pointer-events-none absolute bottom-2 left-2 right-2 z-20 translate-y-full opacity-0 transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            className="w-full"
            size="sm"
            onClick={handleAddToCart}
            disabled={!canBuy}
            variant={added ? "secondary" : "default"}
          >
            {added ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Agregado
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar
              </>
            )}
          </Button>
        </div>
      </div>

      <CardContent className="p-3 sm:p-4">
        <p className="text-xs text-muted-foreground">
          {product.brand.name}
          {product.line ? ` · ${product.line.name}` : ""}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 font-medium leading-tight line-clamp-2 transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>

        {product.reviewCount > 0 && (
          <div className="mt-2 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
        )}

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">
            S/ {(product.salePrice ?? product.price).toFixed(2)}
          </span>
          {product.salePrice !== undefined && (
            <span className="text-sm text-muted-foreground line-through">
              S/ {product.price.toFixed(2)}
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          {product.status === "PREVENTA" && product.expectedDate ? (
            <span className="flex items-center gap-1 text-[#B08900]">
              <CalendarClock className="h-3 w-3" />
              Llega{" "}
              {new Date(product.expectedDate).toLocaleDateString("es-PE", {
                month: "long",
                year: "numeric",
              })}
            </span>
          ) : product.stockQty > 0 ? (
            <span className="text-green-600 dark:text-green-400">
              {product.stockQty} disponibles
            </span>
          ) : (
            <span className="text-destructive">Agotado</span>
          )}
        </p>
      </CardContent>
    </Card>
  )
}
