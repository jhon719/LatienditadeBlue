"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

// Genera la lista de páginas a mostrar con elipsis, ej: 1 … 4 [5] 6 … 28
function buildPageList(page: number, totalPages: number): (number | "...")[] {
  const pages = new Set<number>([1, totalPages, page, page - 1, page + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)

  const result: (number | "...")[] = []
  let prev = 0
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("...")
    result.push(p)
    prev = p
  }
  return result
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return
    onPageChange(p)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <nav
      aria-label="Paginación del catálogo"
      className="mt-8 flex items-center justify-center gap-1"
    >
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {buildPageList(page, totalPages).map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            size="icon-sm"
            onClick={() => goTo(p)}
            aria-current={p === page ? "page" : undefined}
            className={cn("min-w-8", p === page && "pointer-events-none")}
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        aria-label="Página siguiente"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}
