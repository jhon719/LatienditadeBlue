"use client"

import { useState } from "react"
import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  Check,
  Info,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Product } from "@/types"
import { useCartStore } from "@/stores/cart-store"

interface ProductDetailProps {
  product: Product
}

// Límite comercial en preventas para evitar acaparamiento (bóveda 02.02)
const PREORDER_LIMIT = 5

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const isPreOrder = product.status === "PREVENTA"
  const canBuy = isPreOrder || (product.status !== "AGOTADO" && product.stockQty > 0)
  const maxLimit = isPreOrder ? PREORDER_LIMIT : Math.min(product.stockQty, 10)
  const subtotal = product.price * quantity

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51997763962"
  const whatsappMessage = encodeURIComponent(
    `¡Hola! Tengo una duda sobre la figura *${product.name}*. ¿Me ayudas? ✨`
  )

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    if (quantity < maxLimit) setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Marca y línea */}
      <p className="text-sm font-bold uppercase tracking-wider text-primary">
        {product.brand.name}
        {product.line ? ` · ${product.line.name}` : ""}
      </p>

      <h1 className="font-display text-3xl uppercase tracking-wide sm:text-4xl">
        {product.name}
      </h1>

      {/* Badge de estado (bóveda 02.02 Bloque 2) */}
      <div className="flex items-center gap-2">
        {isPreOrder ? (
          <div className="flex flex-col gap-1">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-dashed border-[#F5B400] bg-[#FFF5D1] px-3 py-1 text-xs font-bold text-[#142F5C]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#F5B400]" />
              Preventa Asegurada
            </span>
            {product.expectedDate && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Info size={12} className="text-primary" />
                Llegada estimada:{" "}
                {new Date(product.expectedDate).toLocaleDateString("es-PE", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
        ) : product.stockQty > 0 ? (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#E2FBE9] px-3 py-1 text-xs font-bold text-[#1E7E34]">
            <span className="h-2 w-2 animate-ping rounded-full bg-[#1E7E34]" />
            En Stock - Envío Inmediato
          </span>
        ) : (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#FFEAEA] px-3 py-1 text-xs font-bold text-red-600">
            Agotado temporalmente
          </span>
        )}
      </div>

      {/* Rating */}
      {product.reviewCount > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount} {product.reviewCount === 1 ? "reseña" : "reseñas"})
          </span>
        </div>
      )}

      {/* Precio */}
      <div className="border-y border-border py-4">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-4xl tracking-wide text-foreground">
            S/ {product.price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">Impuestos incluidos</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      </div>

      {/* Cantidad + subtotal */}
      {canBuy && (
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-xs font-bold uppercase">Cantidad:</span>
          <div className="flex items-center overflow-hidden rounded-xl border-2 border-[#E1F0FF] bg-card">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 select-none text-center text-sm font-bold">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={increaseQuantity}
              disabled={quantity >= maxLimit}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="ml-auto text-xs text-muted-foreground">
            Subtotal:{" "}
            <strong className="text-sm text-foreground">
              S/ {subtotal.toFixed(2)}
            </strong>
          </span>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        {canBuy ? (
          <>
            <div className="flex gap-2">
              <Button
                className="flex-1 rounded-2xl border-2 border-dashed border-primary bg-[#E1F0FF]/60 font-bold text-[#142F5C] hover:bg-[#E1F0FF] dark:text-foreground"
                size="lg"
                variant="secondary"
                disabled={added}
                onClick={handleAddToCart}
              >
                {added ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Agregado
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Agregar al Carrito
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-2xl"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`h-4 w-4 transition-all duration-300 ${
                    isWishlisted ? "scale-110 fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
            </div>
          </>
        ) : (
          <Button disabled size="lg" className="w-full rounded-2xl">
            Temporalmente sin Stock
          </Button>
        )}

        <a
          href={`https://wa.me/${whatsappPhone}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 text-sm font-bold text-[#1E7E34] transition-colors hover:bg-[#25D366]/20"
        >
          <MessageSquare className="h-4 w-4" />
          ¿Dudas sobre esta figura? Escríbenos por WhatsApp
        </a>
      </div>

      <Separator />

      {/* Beneficios */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Envíos a todo el Perú</p>
            <p className="text-xs text-muted-foreground">Shalom, Olva o motorizado</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Compra protegida</p>
            <p className="text-xs text-muted-foreground">Boleta con código único</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium">Coordinación directa</p>
            <p className="text-xs text-muted-foreground">Atención por WhatsApp</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Ficha técnica */}
      <div>
        <h3 className="mb-3 font-semibold">Especificaciones</h3>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <dt className="text-muted-foreground">Anime / Serie</dt>
            <dd className="font-medium">{product.category.name}</dd>
          </div>
          <div className="flex flex-col">
            <dt className="text-muted-foreground">Fabricante</dt>
            <dd className="font-medium">{product.brand.name}</dd>
          </div>
          {product.line && (
            <div className="flex flex-col">
              <dt className="text-muted-foreground">Línea</dt>
              <dd className="font-medium">{product.line.name}</dd>
            </div>
          )}
          <div className="flex flex-col">
            <dt className="text-muted-foreground">Estado</dt>
            <dd className="font-medium">
              {isPreOrder ? "Preventa" : product.stockQty > 0 ? "Stock inmediato" : "Agotado"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
