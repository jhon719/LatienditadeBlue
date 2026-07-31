"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  slug: string
  images: string[]
}

interface ProductsApiResponse {
  products: Product[]
}

// Buscador con autocomplete en el header: debounce 250ms, dropdown con miniaturas,
// navega a /products/[slug] al clickear resultado o a /products?search=... al presionar Enter.
export function SearchAutocomplete() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Debounce: buscar cada 250ms mientras hay texto
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setOpen(false)
      return
    }

    setOpen(true)
    const timer = setTimeout(() => {
      setLoading(true)
      const params = new URLSearchParams({ limit: "12", sortBy: "newest", search: query.trim() })
      fetch(`/api/products?${params.toString()}`)
        .then((r) => (r.ok ? r.json() : { products: [] }))
        .then((d: ProductsApiResponse) => setResults(d.products ?? []))
        .catch(() => setResults([]))
        .finally(() => setLoading(false))
    }, 250)

    return () => clearTimeout(timer)
  }, [query])

  // Click outside: cerrar dropdown
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (query.trim()) {
        setOpen(false)
        router.push(`/products?search=${encodeURIComponent(query.trim())}`)
      }
    }
  }

  const handleResultClick = (product: Product) => {
    setOpen(false)
    setQuery("")
    router.push(`/products/${product.slug}`)
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4A80BE]" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setOpen(true)}
          className="h-10 w-full rounded-full border-[#dbe3ee] pl-11 font-semibold"
          placeholder="Buscar anime, marca o producto"
        />
      </div>

      {open && (query.trim() || loading) && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-md border bg-popover shadow-lg">
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : results.length === 0 ? (
              <p className="py-4 text-center text-xs text-muted-foreground">
                Sin resultados para "{query.trim()}"
              </p>
            ) : (
              results.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleResultClick(product)}
                  className="flex w-full items-center gap-3 border-b px-4 py-3 text-left transition hover:bg-accent last:border-0"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-muted">
                    {product.images[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    )}
                  </div>
                  <span className="flex-1 truncate text-sm font-medium">{product.name}</span>
                </button>
              ))
            )}
          </div>

          {/* Footer con hint de "Ver todos los resultados" si presiona Enter */}
          {query.trim() && results.length > 0 && (
            <div className="border-t bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
              Presiona <span className="font-semibold">Enter</span> para ver todos los resultados
            </div>
          )}
        </div>
      )}
    </div>
  )
}
