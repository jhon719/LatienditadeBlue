"use client"

import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import { ProductForm } from "@/components/admin/ProductForm"

// ProductForm lee `?batchId=` con useSearchParams, que exige un límite de
// Suspense en el App Router.
export default function NewProductPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <ProductForm />
    </Suspense>
  )
}
