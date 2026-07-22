"use client"

import { use, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { ChevronLeft, Loader2, PiggyBank, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ManualPaymentSection } from "@/components/checkout/ManualPaymentSection"
import type { Product } from "@/types"

const MIN_DEPOSIT = 10

export default function ApartarPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const { status: authStatus } = useSession()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [deposit, setDeposit] = useState(String(MIN_DEPOSIT))
  const [voucherUrl, setVoucherUrl] = useState<string | null>(null)
  const [operationNumber, setOperationNumber] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => setProduct(p))
      .finally(() => setLoading(false))
  }, [id])

  const total = useMemo(
    () => (product ? product.salePrice ?? product.price : 0),
    [product]
  )
  const depositNum = Number(deposit) || 0
  const balance = Math.max(0, total - depositNum)
  const isPreOrder = product?.status === "PREVENTA"

  const submit = async () => {
    if (!product) return
    if (depositNum < MIN_DEPOSIT) return setError(`El adelanto mínimo es S/ ${MIN_DEPOSIT}`)
    if (depositNum > total) return setError("El adelanto no puede superar el precio total")
    if (!voucherUrl) return setError("Adjunta la captura de tu adelanto")
    if (operationNumber.trim().length < 3)
      return setError("Ingresa el número de operación de tu pago")

    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch("/api/separations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          deposit: depositNum,
          operationNumber,
          imageUrl: voucherUrl,
        }),
      })
      const r = await res.json().catch(() => null)
      if (!res.ok) {
        setError(r?.error ?? "No se pudo registrar tu separación")
        return
      }
      router.push("/profile/separations")
      router.refresh()
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Producto no encontrado</h1>
        <Button asChild className="mt-4">
          <Link href="/products">Ver productos</Link>
        </Button>
      </div>
    )
  }

  if (product.status === "AGOTADO") {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Este producto está agotado</h1>
        <p className="mt-2 text-muted-foreground">No se puede apartar por ahora.</p>
        <Button asChild className="mt-4">
          <Link href={`/products/${product.slug}`}>Volver al producto</Link>
        </Button>
      </div>
    )
  }

  // Requiere sesión: invita a iniciar sesión conservando el destino
  if (authStatus === "unauthenticated") {
    return (
      <div className="container mx-auto max-w-md px-4 py-16 text-center">
        <PiggyBank className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-2xl font-bold">Inicia sesión para apartar</h1>
        <p className="mt-2 text-muted-foreground">
          Necesitas una cuenta para asegurar tu figura con un adelanto y seguir tu
          saldo.
        </p>
        <Button asChild className="mt-6">
          <Link href={`/login?callbackUrl=/products/${product.slug}/apartar`}>
            Iniciar sesión
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <Button variant="ghost" asChild className="-ml-2 mb-4">
        <Link href={`/products/${product.slug}`}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Volver al producto
        </Link>
      </Button>

      <h1 className="font-display text-4xl uppercase tracking-wide">Apartar figura</h1>
      <p className="mt-1 text-muted-foreground">
        Asegura tu figura con un adelanto desde S/ {MIN_DEPOSIT} y completa el saldo a
        tu ritmo.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Monto del adelanto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">1. Monto de tu adelanto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deposit">Adelanto (S/)</Label>
                <Input
                  id="deposit"
                  type="number"
                  step="0.01"
                  min={MIN_DEPOSIT}
                  max={total}
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                  className="max-w-[200px]"
                />
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Info className="h-3.5 w-3.5" />
                  Mínimo S/ {MIN_DEPOSIT}. El saldo restante lo pagas después desde
                  &quot;Mis Separaciones&quot;.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pago del adelanto */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">2. Paga tu adelanto</CardTitle>
            </CardHeader>
            <CardContent>
              <ManualPaymentSection
                voucherUrl={voucherUrl}
                onVoucherChange={setVoucherUrl}
                operationNumber={operationNumber}
                onOperationNumberChange={setOperationNumber}
              />
            </CardContent>
          </Card>
        </div>

        {/* Resumen */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <Card>
              <CardContent className="space-y-4 p-5">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight">{product.name}</p>
                    <Badge className="mt-1" variant="secondary">
                      {isPreOrder ? "Preventa" : "Stock físico"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1.5 border-t pt-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Precio total</span>
                    <span className="font-semibold">S/ {total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#1E7E34]">
                    <span>Tu adelanto</span>
                    <span className="font-semibold">S/ {depositNum.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1.5 text-base font-bold">
                    <span>Saldo pendiente</span>
                    <span>S/ {balance.toFixed(2)}</span>
                  </div>
                </div>

                {isPreOrder && product.expectedDate && (
                  <p className="rounded-lg bg-[#FFF5D1] p-2 text-xs text-[#8a6d00]">
                    Llegada estimada:{" "}
                    {new Date(product.expectedDate).toLocaleDateString("es-PE", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}

                {error && (
                  <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Button
                  onClick={submit}
                  disabled={submitting}
                  size="lg"
                  className="w-full"
                >
                  {submitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <PiggyBank className="mr-2 h-4 w-4" />
                  )}
                  Apartar con S/ {depositNum.toFixed(2)}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Validaremos tu adelanto y te confirmaremos la separación.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
