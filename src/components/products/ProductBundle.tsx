"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Plus, Sparkles, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cart-store"
import { calculateBundleDiscount, effectivePrice } from "@/lib/pricing"
import type { Product } from "@/types"

interface ProductBundleProps {
  product: Product
}

// Bloque "Combina y Ahorra" (bóveda 02.02, bloque 3): sugiere figuras del
// mismo anime; 2 unidades = 5% dto., 3+ = 10% dto. en ese set
export function ProductBundle({ product }: ProductBundleProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [added, setAdded] = useState(false)

  useEffect(() => {
    fetch(`/api/products?category=${product.category.slug}&limit=6`)
      .then((res) => (res.ok ? res.json() : { products: [] }))
      .then((data) => {
        const others = (data.products as Product[]).filter(
          (p) =>
            p.id !== product.id &&
            p.status !== "AGOTADO" &&
            (p.status === "PREVENTA" || p.stockQty > 0)
        )
        const initial = others.slice(0, 2)
        setSuggestions(initial)
        // Preseleccionar la primera sugerencia (patrón de la bóveda)
        setSelectedIds(new Set(initial.slice(0, 1).map((p) => p.id)))
      })
      .catch(() => setSuggestions([]))
  }, [product.id, product.category.slug])

  if (suggestions.length === 0) return null

  const selected = suggestions.filter((p) => selectedIds.has(p.id))
  const bundleItems = [product, ...selected]
  const subtotal = bundleItems.reduce((acc, p) => acc + effectivePrice(p), 0)
  const { discount } = calculateBundleDiscount(
    bundleItems.map((p) => ({
      categoryId: p.category.id,
      price: effectivePrice(p),
      quantity: 1,
    }))
  )
  const percent = bundleItems.length >= 3 ? 10 : bundleItems.length >= 2 ? 5 : 0

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const addBundle = () => {
    for (const p of bundleItems) addItem(p, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <section className="mt-12 rounded-[2rem] border-2 border-dashed border-[#F5B400] bg-[#FFF5D1]/30 p-6 dark:bg-[#FFF5D1]/5">
      <div className="mb-5 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-[#F5B400]" />
        <h2 className="font-display text-2xl uppercase tracking-wide text-[#142F5C] dark:text-foreground">
          Combina y Ahorra — Set {product.category.name}
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Producto actual (fijo) */}
        <div className="w-36 rounded-2xl border-2 border-primary bg-card p-3 text-center">
          <div className="relative mx-auto mb-2 h-20 w-20 overflow-hidden rounded-xl bg-muted">
            <Image
              src={product.images[0] ?? "/Imagenes/Mascota BLUE.png"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <p className="line-clamp-2 text-xs font-semibold">{product.name}</p>
          <p className="mt-1 text-xs font-bold text-primary">
            S/ {effectivePrice(product).toFixed(2)}
          </p>
        </div>

        {suggestions.map((p) => {
          const isSelected = selectedIds.has(p.id)
          return (
            <div key={p.id} className="flex items-center gap-4">
              <Plus className="h-5 w-5 text-muted-foreground" />
              <button
                type="button"
                onClick={() => toggle(p.id)}
                className={`relative w-36 rounded-2xl border-2 bg-card p-3 text-center transition-all ${
                  isSelected
                    ? "border-[#F5B400] shadow-md"
                    : "border-border opacity-60 hover:opacity-100"
                }`}
              >
                {isSelected && (
                  <span className="absolute -right-2 -top-2 rounded-full bg-[#F5B400] p-1 text-[#142F5C]">
                    <Check className="h-3 w-3" />
                  </span>
                )}
                <div className="relative mx-auto mb-2 h-20 w-20 overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={p.images[0] ?? "/Imagenes/Mascota BLUE.png"}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <p className="line-clamp-2 text-xs font-semibold">{p.name}</p>
                <p className="mt-1 text-xs font-bold text-primary">
                  S/ {effectivePrice(p).toFixed(2)}
                </p>
              </button>
            </div>
          )
        })}

        {/* Total del set */}
        <div className="ml-auto min-w-[200px] space-y-2 rounded-2xl bg-card p-4 shadow-sm">
          {discount > 0 ? (
            <>
              <p className="text-xs text-muted-foreground line-through">
                S/ {subtotal.toFixed(2)}
              </p>
              <p className="font-display text-3xl leading-none text-[#142F5C] dark:text-foreground">
                S/ {(subtotal - discount).toFixed(2)}
              </p>
              <p className="text-xs font-bold text-[#1E7E34]">
                Ahorras S/ {discount.toFixed(2)} ({percent}% del set)
              </p>
            </>
          ) : (
            <p className="font-display text-3xl leading-none text-[#142F5C] dark:text-foreground">
              S/ {subtotal.toFixed(2)}
            </p>
          )}
          <Button
            size="sm"
            className="w-full"
            disabled={selected.length === 0 || added}
            onClick={addBundle}
          >
            {added ? (
              <>
                <Check className="mr-1 h-4 w-4" /> Set agregado
              </>
            ) : (
              <>
                <ShoppingCart className="mr-1 h-4 w-4" /> Agregar set (
                {bundleItems.length})
              </>
            )}
          </Button>
          <Link
            href={`/products?category=${product.category.slug}`}
            className="block text-center text-[10px] text-muted-foreground underline"
          >
            Ver más de {product.category.name}
          </Link>
        </div>
      </div>
    </section>
  )
}
