"use client"

import Link from "next/link"
import { Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CartItem } from "@/types"

interface CartSummaryProps {
  items: CartItem[]
}

export function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold">Resumen del Pedido</h2>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>S/ {subtotal.toFixed(2)}</span>
        </div>

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
          <span className="text-lg text-primary">S/ {subtotal.toFixed(2)}</span>
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
