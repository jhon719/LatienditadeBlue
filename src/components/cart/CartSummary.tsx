"use client"

import Link from "next/link"
import { Truck, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/types"
import { calculateBundleDiscount, effectivePrice } from "@/lib/pricing"

interface CartSummaryProps {
  items: CartItem[]
}

export function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce(
    (acc, item) => acc + effectivePrice(item.product) * item.quantity,
    0
  )

  // Descuento "Combina y Ahorra" (bóveda 02.02)
  const { discount } = calculateBundleDiscount(
    items.map((item) => ({
      categoryId: item.product.category.id,
      price: effectivePrice(item.product),
      quantity: item.quantity,
    }))
  )

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold">Resumen del Pedido</h2>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>S/ {subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-[#1E7E34]">
            <span className="flex items-center gap-1 font-semibold">
              <Sparkles className="h-3.5 w-3.5" /> Descuento por set
            </span>
            <span className="font-semibold">- S/ {discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex items-center gap-2 rounded-md bg-muted p-3 text-xs">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <span>
            El costo de envío se calcula en el checkout según la modalidad
            (recojo, motorizado o courier).
          </span>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold">
          <span>Total parcial</span>
          <span className="text-lg text-primary">
            S/ {(subtotal - discount).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <Button asChild className="w-full" size="lg">
          <Link href="/checkout">Proceder al Pago</Link>
        </Button>
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Paga con Yape, Plin o transferencia. Impuestos incluidos.
      </p>
    </div>
  )
}
