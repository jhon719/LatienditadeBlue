"use client"

import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/types"

interface OrderSummaryProps {
  items: CartItem[]
  shippingCost: number
}

export function OrderSummary({ items, shippingCost }: OrderSummaryProps) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const total = subtotal + shippingCost

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
                S/ {item.product.price.toFixed(2)} c/u
              </p>
            </div>
            <p className="self-center text-sm font-semibold">
              S/ {(item.product.price * item.quantity).toFixed(2)}
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
