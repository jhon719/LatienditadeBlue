"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { Search, ChevronDown, Loader2, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface BatchOption {
  id: string
  name: string
  supplier: string | null // "N° de Lote" en el panel
  eta: string | null
  image: string | null
}

interface BatchApiResponse {
  id: string
  name: string
  supplier: string | null
  eta: string | null
  images?: string[]
}

// Selector de lote de importación. A diferencia de ProductPicker, filtra en el
// cliente: los lotes son pocas decenas, así que no vale la pena un round-trip
// por cada tecla.
export function BatchPicker({
  selected,
  onSelect,
  onClear,
  placeholder = "Sin lote asociado",
}: {
  selected: BatchOption | null
  onSelect: (batch: BatchOption) => void
  onClear?: () => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [batches, setBatches] = useState<BatchOption[]>([])
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open || loaded) return
    setLoading(true)
    fetch("/api/admin/batches")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: BatchApiResponse[]) => {
        setBatches(
          (data ?? []).map((b) => ({
            id: b.id,
            name: b.name,
            supplier: b.supplier,
            eta: b.eta,
            image: b.images?.[0] ?? null,
          }))
        )
        setLoaded(true)
      })
      .finally(() => setLoading(false))
  }, [open, loaded])

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

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return batches
    return batches.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        (b.supplier ?? "").toLowerCase().includes(q)
    )
  }, [batches, query])

  const label = (b: BatchOption) => (b.supplier ? `${b.name} · ${b.supplier}` : b.name)

  return (
    <div ref={containerRef} className="relative">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex h-9 flex-1 items-center gap-2 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs",
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
              <span className="flex-1 truncate text-left">{label(selected)}</span>
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
        {selected && onClear && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Quitar lote"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground transition hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full min-w-[280px] rounded-md border bg-popover shadow-md">
          <div className="p-2">
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nombre o N° de lote..."
              className="h-8"
            />
          </div>
          <div className="max-h-64 overflow-y-auto border-t">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : results.length === 0 ? (
              <p className="py-4 text-center text-xs text-muted-foreground">Sin resultados</p>
            ) : (
              results.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    onSelect(b)
                    setOpen(false)
                    setQuery("")
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-accent"
                >
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded bg-muted">
                    {b.image && (
                      <Image src={b.image} alt="" fill className="object-cover" sizes="32px" />
                    )}
                  </div>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate">{b.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {b.supplier ?? "Sin N° de lote"}
                      {b.eta ? ` · ETA ${new Date(b.eta).toLocaleDateString("es-PE")}` : ""}
                    </span>
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
