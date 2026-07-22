"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  ChevronLeft,
  Store,
  Truck,
  MapPin,
  Loader2,
  CreditCard,
  QrCode,
  ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { OrderSummary } from "@/components/checkout/OrderSummary"
import { ManualPaymentSection } from "@/components/checkout/ManualPaymentSection"
import { CouponInput, type AppliedCoupon } from "@/components/checkout/CouponInput"
import { WhatsappIcon } from "@/components/common/WhatsappIcon"
import { useCartStore } from "@/stores/cart-store"
import { calculateBundleDiscount, effectivePrice } from "@/lib/pricing"

// Modalidades de envío (bóveda 03.03)
const SHIPPING_OPTIONS = [
  {
    value: "PICKUP",
    label: "Recojo en Tienda",
    description: "Gratis · Coordinamos punto y horario por WhatsApp",
    cost: 0,
    icon: Store,
  },
  {
    value: "LOCAL_DELIVERY",
    label: "Motorizado (Lima)",
    description: "S/ 10.00 · Entrega express en Lima Metropolitana",
    cost: 10,
    icon: Truck,
  },
  {
    value: "NATIONAL_COURIER",
    label: "Envío a Provincia",
    description: "Olva / Shalom · Pago del envío en destino",
    cost: 0,
    icon: MapPin,
  },
] as const

const checkoutSchema = z
  .object({
    receiverName: z.string().min(3, "Ingresa el nombre de quien recibe"),
    receiverPhone: z
      .string()
      .regex(/^\d{9}$/, "El teléfono debe tener 9 dígitos"),
    shippingType: z.enum(["PICKUP", "LOCAL_DELIVERY", "NATIONAL_COURIER"]),
    deliveryAddress: z.string().optional(),
    paymentMethod: z.enum(["MANUAL_TRANSFER", "MERCADO_PAGO"]),
    // Check-box obligatorio del marco legal (bóveda 07.01 §5)
    acceptTerms: z.boolean().refine((v) => v === true, {
      message: "Debes aceptar los términos y condiciones para continuar",
    }),
  })
  .refine(
    (data) => data.shippingType === "PICKUP" || !!data.deliveryAddress?.trim(),
    {
      message: "Indica la dirección de entrega o la agencia destino",
      path: ["deliveryAddress"],
    }
  )

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()

  // Idempotency key generada al montar el checkout (bóveda 04.01)
  const [idempotencyKey] = useState(() => crypto.randomUUID())
  const [mpEnabled, setMpEnabled] = useState(false)
  const [voucherUrl, setVoucherUrl] = useState<string | null>(null)
  const [operationNumber, setOperationNumber] = useState("")
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [coupon, setCoupon] = useState<AppliedCoupon | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shippingType: "LOCAL_DELIVERY",
      paymentMethod: "MANUAL_TRANSFER",
      acceptTerms: false,
    },
  })

  const shippingType = watch("shippingType")
  const paymentMethod = watch("paymentMethod")
  const shippingCost =
    SHIPPING_OPTIONS.find((o) => o.value === shippingType)?.cost ?? 0

  // Subtotal tras "Combina y Ahorra": base sobre la que se valida el cupón
  const subtotal = items.reduce(
    (acc, item) => acc + effectivePrice(item.product) * item.quantity,
    0
  )
  const { discount: bundleDiscount } = calculateBundleDiscount(
    items.map((item) => ({
      categoryId: item.product.category.id,
      price: effectivePrice(item.product),
      quantity: item.quantity,
    }))
  )
  const couponBase = subtotal - bundleDiscount

  useEffect(() => {
    fetch("/api/payments/mercadopago")
      .then((res) => (res.ok ? res.json() : { enabled: false }))
      .then((data) => setMpEnabled(!!data.enabled))
      .catch(() => setMpEnabled(false))
  }, [])

  const onSubmit = async (data: CheckoutFormData) => {
    setSubmitError(null)

    if (data.paymentMethod === "MANUAL_TRANSFER") {
      if (!voucherUrl) {
        setSubmitError("Adjunta la captura de tu comprobante de pago")
        return
      }
      if (operationNumber.trim().length < 4) {
        setSubmitError("Ingresa el número de operación de tu pago")
        return
      }
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idempotencyKey,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        shippingType: data.shippingType,
        receiverName: data.receiverName,
        receiverPhone: data.receiverPhone,
        deliveryAddress: data.deliveryAddress,
        paymentMethod: data.paymentMethod,
        ...(coupon ? { couponCode: coupon.code } : {}),
        ...(data.paymentMethod === "MANUAL_TRANSFER"
          ? { proof: { imageUrl: voucherUrl, operationNumber } }
          : {}),
      }),
    })

    const result = await res.json().catch(() => null)

    if (!res.ok) {
      setSubmitError(result?.error ?? "No se pudo procesar el pedido")
      return
    }

    if (data.paymentMethod === "MERCADO_PAGO") {
      // Redirigir al Checkout Pro de Mercado Pago
      const mpRes = await fetch("/api/payments/mercadopago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: result.id }),
      })
      const mpResult = await mpRes.json().catch(() => null)
      if (!mpRes.ok || !mpResult?.initPoint) {
        setSubmitError(mpResult?.error ?? "No se pudo iniciar el pago con Mercado Pago")
        return
      }
      clearCart()
      window.location.href = mpResult.initPoint
      return
    }

    clearCart()
    router.push(
      `/checkout/success?code=${result.processCode}&type=${result.shippingType}`
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">No hay nada que pagar</h1>
          <p className="mt-2 text-muted-foreground">
            Tu carrito está vacío. Agrega algunas figuras primero.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">Explorar Productos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <Button variant="ghost" asChild className="-ml-2 mb-4">
          <Link href="/cart">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Volver al Carrito
          </Link>
        </Button>
        <h1 className="font-display text-4xl uppercase tracking-wide">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Paso 1: Datos del receptor */}
            <section className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">1. Datos de entrega</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="receiverName">Nombre de quien recibe</Label>
                  <Input
                    id="receiverName"
                    placeholder="Nombre y apellido"
                    {...register("receiverName")}
                  />
                  {errors.receiverName && (
                    <p className="text-xs text-destructive">
                      {errors.receiverName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiverPhone" className="flex items-center gap-1.5">
                    <WhatsappIcon className="h-4 w-4 text-[#25D366]" />
                    Número de WhatsApp
                  </Label>
                  <div className="relative">
                    <WhatsappIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#25D366]" />
                    <Input
                      id="receiverPhone"
                      placeholder="999888777"
                      maxLength={9}
                      inputMode="numeric"
                      className="pl-10"
                      {...register("receiverPhone")}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Solo WhatsApp: coordinamos la entrega por este número.
                  </p>
                  {errors.receiverPhone && (
                    <p className="text-xs text-destructive">
                      {errors.receiverPhone.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Paso 2: Tipo de envío (bóveda 03.03) */}
            <section className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">2. Modalidad de envío</h2>
              <RadioGroup
                value={shippingType}
                onValueChange={(value) =>
                  setValue("shippingType", value as CheckoutFormData["shippingType"])
                }
                className="grid gap-3"
              >
                {SHIPPING_OPTIONS.map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={`ship-${option.value}`}
                    className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-colors ${
                      shippingType === option.value
                        ? "border-primary bg-[#E1F0FF]/40 dark:bg-primary/10"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <RadioGroupItem value={option.value} id={`ship-${option.value}`} />
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-card text-primary shadow-sm">
                      <option.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">{option.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </Label>
                ))}
              </RadioGroup>

              {shippingType !== "PICKUP" && (
                <div className="mt-4 space-y-2">
                  <Label htmlFor="deliveryAddress">
                    {shippingType === "NATIONAL_COURIER"
                      ? "Agencia destino y ciudad (Olva/Shalom)"
                      : "Dirección de entrega"}
                  </Label>
                  <Input
                    id="deliveryAddress"
                    placeholder={
                      shippingType === "NATIONAL_COURIER"
                        ? "Ej. Shalom Av. Ejército 123, Arequipa"
                        : "Av. Larco 1234, Miraflores, Lima"
                    }
                    {...register("deliveryAddress")}
                  />
                  {errors.deliveryAddress && (
                    <p className="text-xs text-destructive">
                      {errors.deliveryAddress.message}
                    </p>
                  )}
                </div>
              )}
            </section>

            {/* Paso 3: Método de pago dual (bóveda 03.01 / 03.02) */}
            <section className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">3. Método de pago</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) =>
                  setValue("paymentMethod", value as CheckoutFormData["paymentMethod"])
                }
                className="grid gap-3 sm:grid-cols-2"
              >
                <Label
                  htmlFor="pay-manual"
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-colors ${
                    paymentMethod === "MANUAL_TRANSFER"
                      ? "border-primary bg-[#E1F0FF]/40 dark:bg-primary/10"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <RadioGroupItem value="MANUAL_TRANSFER" id="pay-manual" />
                  <QrCode size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-bold">Yape / Plin / Transferencia</p>
                    <p className="text-xs text-muted-foreground">
                      Sube tu voucher y lo validamos
                    </p>
                  </div>
                </Label>

                {mpEnabled && (
                  <Label
                    htmlFor="pay-mp"
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition-colors ${
                      paymentMethod === "MERCADO_PAGO"
                        ? "border-primary bg-[#E1F0FF]/40 dark:bg-primary/10"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <RadioGroupItem value="MERCADO_PAGO" id="pay-mp" />
                    <CreditCard size={20} className="text-primary" />
                    <div>
                      <p className="text-sm font-bold">Mercado Pago</p>
                      <p className="text-xs text-muted-foreground">
                        Tarjeta o billetera, aprobación instantánea
                      </p>
                    </div>
                  </Label>
                )}
              </RadioGroup>

              {paymentMethod === "MANUAL_TRANSFER" && (
                <div className="mt-4">
                  <ManualPaymentSection
                    voucherUrl={voucherUrl}
                    onVoucherChange={setVoucherUrl}
                    operationNumber={operationNumber}
                    onOperationNumberChange={setOperationNumber}
                  />
                </div>
              )}
            </section>
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <OrderSummary
                items={items}
                shippingCost={shippingCost}
                couponDiscount={coupon?.discount ?? 0}
                couponCode={coupon?.code}
              />

              {/* Código de descuento (bóveda 06.01 Fase 1) */}
              <CouponInput
                subtotal={couponBase}
                applied={coupon}
                onApply={setCoupon}
              />

              {/* Aceptación obligatoria del marco legal (bóveda 07.01 §5) */}
              <div className="rounded-xl border border-border bg-card p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-[#4A80BE]"
                    {...register("acceptTerms")}
                  />
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    He leído y acepto los{" "}
                    <Link
                      href="/terms"
                      target="_blank"
                      className="font-bold text-primary underline"
                    >
                      términos y condiciones de preventa y venta
                    </Link>{" "}
                    y la{" "}
                    <Link
                      href="/privacy"
                      target="_blank"
                      className="font-bold text-primary underline"
                    >
                      política de privacidad
                    </Link>
                    .
                  </span>
                </label>
                {errors.acceptTerms && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>

              {submitError && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {submitError}
                </div>
              )}

              {/* Botón con bloqueo anti doble clic (bóveda 04.01) */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : paymentMethod === "MERCADO_PAGO" ? (
                  "Pagar con Mercado Pago"
                ) : (
                  "Confirmar Pedido"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
