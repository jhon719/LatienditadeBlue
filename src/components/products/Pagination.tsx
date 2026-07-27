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

  // 40px de lado en móvil (mínimo táctil cómodo), 32px desde sm
  const control = "h-10 w-10 sm:h-8 sm:w-8"

  return (
    <nav
      aria-label="Paginación del catálogo"
      className="mt-8 flex flex-col items-center gap-2"
    >
      <div className="flex items-center justify-center gap-1.5 sm:gap-1">
        <Button
          variant="outline"
          size="icon-sm"
          className={control}
          onClick={() => goTo(page - 1)}
          disabled={page === 1}
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {buildPageList(page, totalPages).map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-sm text-muted-foreground sm:px-2">
              …
            </span>
          ) : (
            <Button
              key={p}
              variant={p === page ? "default" : "outline"}
              size="icon-sm"
              onClick={() => goTo(p)}
              aria-current={p === page ? "page" : undefined}
              className={cn(control, "min-w-10 sm:min-w-8", p === page && "pointer-events-none")}
            >
              {p}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="icon-sm"
          className={control}
          onClick={() => goTo(page + 1)}
          disabled={page === totalPages}
          aria-label="Página siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-xs font-semibold text-muted-foreground">
        Pagina {page} de {totalPages}
      </p>
    </nav>
  )
}
