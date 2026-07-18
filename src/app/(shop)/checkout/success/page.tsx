"use client"

import { Suspense, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  MessageSquare,
  Store,
  Truck,
  MapPin,
  ArrowRight,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCartStore } from "@/stores/cart-store"

// Etiquetas de envío para el mensaje de WhatsApp (bóveda 03.03)
const shippingLabels: Record<string, string> = {
  PICKUP: "Recojo en Tienda",
  LOCAL_DELIVERY: "Envío Express en Lima",
  NATIONAL_COURIER: "Envío a Provincia (Olva/Shalom)",
}

const shippingIcons: Record<string, typeof Store> = {
  PICKUP: Store,
  LOCAL_DELIVERY: Truck,
  NATIONAL_COURIER: MapPin,
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const processCode = searchParams.get("code")
  const shippingType = searchParams.get("type") ?? "LOCAL_DELIVERY"
  const isPending = searchParams.get("pending") === "1"
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51997763962"
  const shippingLabel = shippingLabels[shippingType] ?? shippingType
  const ShippingIcon = shippingIcons[shippingType] ?? Truck
  const message = `¡Hola! Acabo de realizar un pedido en La Tiendita de Blue. Mi código de orden es *${processCode ?? ""}*. Elegí la modalidad de *${shippingLabel}*. Quedo atento para coordinar los detalles de la entrega. ✨`
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <div className="container mx-auto max-w-xl px-4 py-12">
      <Card className="text-center">
        <CardHeader className="pb-4">
          {/* Bluet celebra la compra (bóveda 01.04) */}
          <div className="relative mx-auto mb-2 h-24 w-24 animate-float-soft">
            <Image
              src="/Imagenes/Mascota BLUE.png"
              alt="Bluet"
              fill
              className="object-contain"
            />
          </div>
          <CardTitle className="font-display text-3xl uppercase tracking-wide">
            ¡Gracias por tu compra! 🎉
          </CardTitle>
          <CardDescription>
            {isPending
              ? "Estamos verificando tu pago con el banco, te avisaremos en breve."
              : "Tu pedido fue registrado correctamente."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {processCode && (
            <div className="rounded-2xl bg-muted p-4">
              <p className="text-xs uppercase text-muted-foreground">
                Código de proceso
              </p>
              <p className="mt-1 font-mono text-2xl font-bold text-primary">
                {processCode}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Guárdalo: es tu comprobante de trazabilidad ante cualquier consulta.
              </p>
            </div>
          )}

          {/* Modalidad elegida */}
          <div className="flex items-center gap-4 rounded-2xl border border-[#E1F0FF] bg-[#E1F0FF]/20 p-4 text-left">
            <div className="rounded-xl bg-card p-3 text-primary shadow-sm">
              <ShippingIcon size={20} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Modalidad elegida
              </h4>
              <p className="text-sm font-semibold text-muted-foreground">
                {shippingLabel}
              </p>
            </div>
          </div>

          {/* CTA principal: coordinación por WhatsApp (bóveda 03.03) */}
          <div className="space-y-4 rounded-2xl border border-amber-100 bg-amber-50/50 p-5 text-sm text-muted-foreground dark:border-amber-900 dark:bg-amber-950/30">
            <p className="leading-relaxed">
              Para coordinar el horario de entrega o el número de seguimiento de
              tu encomienda, dale clic al botón de abajo.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-colors hover:bg-[#20ba5a]"
            >
              <MessageSquare size={18} className="fill-white" />
              Coordinar Envío por WhatsApp
            </a>
          </div>

          <div className="space-y-3">
            <Button asChild variant="outline" className="w-full">
              <Link href="/profile/orders">
                Ver mis pedidos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full">
              <Link href="/products">Seguir comprando</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SuccessSkeleton() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-12">
      <Card className="text-center">
        <CardContent className="py-12">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<SuccessSkeleton />}>
      <SuccessContent />
    </Suspense>
  )
}
