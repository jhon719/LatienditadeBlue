"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { CatalogEntryForm, type CatalogEntryType } from "@/components/admin/CatalogEntryForm"

// Página dedicada de creación (regla CLAUDE.md: sin modales)

function NewCatalogEntryContent() {
  const searchParams = useSearchParams()
  const initialType = searchParams.get("type") as CatalogEntryType | null
  const validTypes: CatalogEntryType[] = ["category", "line", "brand"]

  return (
    <CatalogEntryForm
      mode="create"
      initialType={initialType && validTypes.includes(initialType) ? initialType : "category"}
    />
  )
}

export default function NewCategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <NewCatalogEntryContent />
    </Suspense>
  )
}
