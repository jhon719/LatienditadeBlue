"use client"

import Image from "next/image"
import { Sparkles } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/types"
import { calculateBundleDiscount, effectivePrice } from "@/lib/pricing"

interface OrderSummaryProps {
  items: CartItem[]
  shippingCost: number
  // Cupón validado en el checkout (bóveda 05.05)
  couponDiscount?: number
  couponCode?: string
}

export function OrderSummary({
  items,
  shippingCost,
  couponDiscount = 0,
  couponCode,
}: OrderSummaryProps) {
  const subtotal = items.reduce(
    (acc, item) => acc + effectivePrice(item.product) * item.quantity,
    0
  )

  // Descuento "Combina y Ahorra" (bóveda 02.02): mismo cálculo que el servidor
  const { discount } = calculateBundleDiscount(
    items.map((item) => ({
      categoryId: item.product.category.id,
      price: effectivePrice(item.product),
      quantity: item.quantity,
    }))
  )

  const total = subtotal - discount - couponDiscount + shippingCost

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold">Resumen del Pedido</h2>

      {/* Items */}
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
              <Image
                src={item.product.images[0] ?? "/Imagenes/Mascota BLUE.png"}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="64px"
              />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {item.quantity}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <p className="line-clamp-2 text-sm font-medium">
                {item.product.name}
              </p>
              <p className="text-xs text-muted-foreground">
                S/ {effectivePrice(item.product).toFixed(2)} c/u
              </p>
            </div>
            <p className="self-center text-sm font-semibold">
              S/ {(effectivePrice(item.product) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>S/ {subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-[#1E7E34]">
            <span className="flex items-center gap-1 font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Descuento por set
            </span>
            <span className="font-semibold">- S/ {discount.toFixed(2)}</span>
          </div>
        )}
        {couponDiscount > 0 && (
          <div className="flex justify-between text-[#1E7E34]">
            <span className="flex items-center gap-1 font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Cupón {couponCode}
            </span>
            <span className="font-semibold">- S/ {couponDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Envío</span>
          <span>
            {shippingCost === 0 ? "Por coordinar / Gratis" : `S/ ${shippingCost.toFixed(2)}`}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <span className="text-lg text-primary">S/ {total.toFixed(2)}</span>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        Impuestos incluidos. El envío a provincia se paga en destino.
      </p>
    </div>
  )
}
