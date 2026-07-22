"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CatalogEntryForm,
  type CatalogEntryData,
  type CatalogEntryType,
} from "@/components/admin/CatalogEntryForm"

// Página dedicada de edición de Categoría/Línea/Marca (regla CLAUDE.md: sin modales)

const ENDPOINT: Record<string, string> = {
  category: "/api/categories",
  line: "/api/lines",
  brand: "/api/brands",
}

export default function EditCatalogEntryPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>
}) {
  const { type, id } = use(params)
  const [item, setItem] = useState<CatalogEntryData | null>(null)
  const [notFound, setNotFound] = useState(false)

  const validType = type === "category" || type === "line" || type === "brand"

  useEffect(() => {
    if (!validType) return
    fetch(`${ENDPOINT[type]}/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setItem(data)
        else setNotFound(true)
      })
      .catch(() => setNotFound(true))
  }, [type, id, validType])

  if (!validType || notFound) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-muted-foreground">
          No encontramos este registro. Puede que haya sido eliminado.
        </p>
        <Button asChild variant="outline">
          <Link href="/admin/categories">Volver</Link>
        </Button>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <CatalogEntryForm
      mode="edit"
      initialType={type as CatalogEntryType}
      editId={id}
      initialData={item}
    />
  )
}
