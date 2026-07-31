"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Search, ChevronDown, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface ProductOption {
  id: string
  name: string
  image: string | null
}

interface ProductsApiResponse {
  products: { id: string; name: string; images: string[] }[]
}

// Selector de producto con búsqueda server-side (no carga todo el catálogo:
// a medida que crece, un <select> con todos los productos se vuelve
// impráctico). Muestra miniatura + nombre en cada resultado.
export function ProductPicker({
  selected,
  onSelect,
  placeholder = "Buscar producto...",
}: {
  selected: ProductOption | null
  onSelect: (product: ProductOption) => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<ProductOption[]>([])
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => {
      setLoading(true)
      const params = new URLSearchParams({ limit: "20", sortBy: "newest" })
      if (query.trim()) params.set("search", query.trim())
      fetch(`/api/products?${params.toString()}`)
        .then((r) => (r.ok ? r.json() : { products: [] }))
        .then((d: ProductsApiResponse) => {
          setResults(
            (d.products ?? []).map((p) => ({
              id: p.id,
              name: p.name,
              image: p.images?.[0] ?? null,
            }))
          )
        })
        .finally(() => setLoading(false))
    }, 250)
    return () => clearTimeout(timer)
  }, [query, open])

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [open])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs",
          "hover:bg-accent/50"
        )}
      >
        {selected ? (
          <>
            <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded bg-muted">
              {selected.image && (
                <Image src={selected.image} alt="" fill className="object-cover" sizes="20px" />
              )}
            </div>
            <span className="flex-1 truncate text-left">{selected.name}</span>
          </>
        ) : (
          <>
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="flex-1 truncate text-left text-muted-foreground">
              {placeholder}
            </span>
          </>
        )}
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full min-w-[260px] rounded-md border bg-popover shadow-md">
          <div className="p-2">
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Escribe el nombre del producto..."
              className="h-8"
            />
          </div>
          <div className="max-h-64 overflow-y-auto border-t">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : results.length === 0 ? (
              <p className="py-4 text-center text-xs text-muted-foreground">
                Sin resultados
              </p>
            ) : (
              results.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onSelect(p)
                    setOpen(false)
                    setQuery("")
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
                >
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded bg-muted">
                    {p.image && (
                      <Image src={p.image} alt="" fill className="object-cover" sizes="32px" />
                    )}
                  </div>
                  <span className="truncate">{p.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
