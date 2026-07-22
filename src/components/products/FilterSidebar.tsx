"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilterSection } from "./FilterSection"
import { PriceFilter } from "./PriceFilter"
import { useProductsStore } from "@/stores/products-store"
import { FilterState, ProductStatus, ProductType, PRODUCT_TYPE_LABELS } from "@/types"

interface FilterSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

const STATUS_OPTIONS = [
  { id: "stock", label: "En Stock", value: "STOCK" },
  { id: "preventa", label: "Preventa", value: "PREVENTA" },
  { id: "online", label: "Online", value: "ONLINE" },
  { id: "agotado", label: "Agotado", value: "AGOTADO" },
]

const TYPE_OPTIONS = (
  ["FIGURA", "MANGA", "PELUCHE", "LLAVERO", "ROPA", "MERCH"] as ProductType[]
).map((value) => ({ id: value.toLowerCase(), label: PRODUCT_TYPE_LABELS[value], value }))

export function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const { categories, lines, brands } = useProductsStore()

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.categories.length > 0 ||
    filters.lines.length > 0 ||
    filters.status.length > 0 ||
    filters.types.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 10000

  const handleClearFilters = () => {
    onFiltersChange({
      brands: [],
      categories: [],
      lines: [],
      status: [],
      types: [],
      priceRange: [0, 10000],
      sortBy: filters.sortBy,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtros</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-auto p-0 text-sm text-primary hover:text-primary/80"
          >
            Limpiar
            <X className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>

      <FilterSection
        title="Tipo de producto"
        options={TYPE_OPTIONS}
        selected={filters.types}
        onChange={(types) =>
          onFiltersChange({ ...filters, types: types as ProductType[] })
        }
      />

      <FilterSection
        title="Anime / Serie"
        options={categories.map((c) => ({
          id: c.id,
          label: c.name,
          value: c.slug,
          count: c.productCount,
        }))}
        selected={filters.categories}
        onChange={(categories) => onFiltersChange({ ...filters, categories })}
      />

      <FilterSection
        title="Línea de figura"
        options={lines.map((l) => ({
          id: l.id,
          label: l.name,
          value: l.slug,
          count: l.productCount,
        }))}
        selected={filters.lines}
        onChange={(lines) => onFiltersChange({ ...filters, lines })}
        defaultOpen={false}
      />

      <FilterSection
        title="Marca"
        options={brands.map((b) => ({
          id: b.id,
          label: b.name,
          value: b.slug,
          count: b.productCount,
        }))}
        selected={filters.brands}
        onChange={(brands) => onFiltersChange({ ...filters, brands })}
        defaultOpen={false}
      />

      <FilterSection
        title="Estado"
        options={STATUS_OPTIONS}
        selected={filters.status}
        onChange={(status) =>
          onFiltersChange({ ...filters, status: status as ProductStatus[] })
        }
      />

      <PriceFilter
        priceRange={filters.priceRange}
        onPriceChange={(priceRange) =>
          onFiltersChange({ ...filters, priceRange })
        }
        maxPrice={10000}
      />
    </div>
  )
}
