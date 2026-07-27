"use client"

import { SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FilterSidebar } from "./FilterSidebar"
import { FilterState } from "@/types"

interface FilterMobileProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  activeFilterCount: number
}

export function FilterMobile({
  filters,
  onFiltersChange,
  activeFilterCount,
}: FilterMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filtros
          {activeFilterCount > 0 && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      {/* Ancho relativo al viewport y cuerpo con scroll: la lista de animes
          y líneas es larga y no cabe entera en un teléfono. */}
      <SheetContent side="left" className="flex w-[min(22rem,88vw)] flex-col gap-0 p-0">
        <SheetHeader className="shrink-0 border-b px-5 py-4">
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          <FilterSidebar filters={filters} onFiltersChange={onFiltersChange} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
