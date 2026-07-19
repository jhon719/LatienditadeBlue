import type { Product } from "@/types"

// Precio real de venta: el rebajado por campaña si existe (bóveda 05.05)
export function effectivePrice(product: Pick<Product, "price" | "salePrice">): number {
  return product.salePrice ?? product.price
}

// Lógica "Combina y Ahorra" (bóveda 02.02, bloque 3):
// 2 unidades del mismo set (anime/categoría) → 5% de descuento en ese grupo,
// 3 o más → 10%. Se usa tanto en el cliente (resumen) como en el servidor (orden).

export interface PricingItem {
  categoryId: string
  price: number
  quantity: number
}

export interface BundleDiscount {
  discount: number
  // Grupos que activaron descuento, para mostrar el detalle en la UI
  groups: { categoryId: string; units: number; percent: number; amount: number }[]
}

export function calculateBundleDiscount(items: PricingItem[]): BundleDiscount {
  const byCategory = new Map<string, { units: number; subtotal: number }>()

  for (const item of items) {
    const group = byCategory.get(item.categoryId) ?? { units: 0, subtotal: 0 }
    group.units += item.quantity
    group.subtotal += item.price * item.quantity
    byCategory.set(item.categoryId, group)
  }

  let discount = 0
  const groups: BundleDiscount["groups"] = []

  for (const [categoryId, group] of byCategory) {
    const percent = group.units >= 3 ? 10 : group.units >= 2 ? 5 : 0
    if (percent > 0) {
      const amount = Math.round(group.subtotal * percent) / 100
      discount += amount
      groups.push({ categoryId, units: group.units, percent, amount })
    }
  }

  return { discount: Math.round(discount * 100) / 100, groups }
}
