"use client"

import { use, useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { ProductForm } from "@/components/admin/ProductForm"
import type { Product } from "@/types"

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setProduct)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!product) {
    return (
      <p className="py-24 text-center text-muted-foreground">
        Producto no encontrado
      </p>
    )
  }

  return <ProductForm product={product} />
}
