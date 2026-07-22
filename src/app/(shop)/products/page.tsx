"use client"

import { Suspense, useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FilterSidebar } from "@/components/products/FilterSidebar"
import { FilterMobile } from "@/components/products/FilterMobile"
import { ProductGrid } from "@/components/products/ProductGrid"
import {
  ManchasStoreBanner,
  ManchasStoreVerticals,
} from "@/components/products/ManchasStorePromo"
import { SortSelect } from "@/components/products/SortSelect"
import { Skeleton } from "@/components/ui/skeleton"
import { useProductsStore } from "@/stores/products-store"
import { FilterState, PRODUCT_TYPE_LABELS } from "@/types"

function ProductsContent() {
  const searchParams = useSearchParams()
  const { products, loading, filters, setFilters, setSearch, search, fetchProducts, fetchCatalogData } = useProductsStore()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Inicializar filtros desde la URL (?category=, ?line=, ?brand=, ?status=, ?type=, ?sortBy=)
  useEffect(() => {
    const category = searchParams.get("category")
    const line = searchParams.get("line")
    const brand = searchParams.get("brand")
    const status = searchParams.get("status")
    const type = searchParams.get("type")
    const sortBy = searchParams.get("sortBy")

    const initialFilters: Partial<FilterState> = {}
    if (category) initialFilters.categories = [category]
    if (line) initialFilters.lines = [line]
    if (brand) initialFilters.brands = [brand]
    if (status) {
      const normalized = status.toUpperCase()
      if (["STOCK", "PREVENTA", "ONLINE", "AGOTADO"].includes(normalized)) {
        initialFilters.status = [normalized as FilterState["status"][number]]
      }
    }
    if (type) {
      const normalized = type.toUpperCase()
      if (
        ["FIGURA", "MANGA", "PELUCHE", "LLAVERO", "ROPA", "MERCH"].includes(
          normalized
        )
      ) {
        initialFilters.types = [normalized as FilterState["types"][number]]
      }
    }
    if (
      sortBy &&
      ["popular", "price-asc", "price-desc", "newest", "rating"].includes(sortBy)
    ) {
      initialFilters.sortBy = sortBy as FilterState["sortBy"]
    }

    // Siempre re-sincronizar con la URL: los filtros que ya no están en la URL
    // vuelven a su valor por defecto (evita que un filtro previo quede pegado)
    setFilters({
      categories: initialFilters.categories ?? [],
      lines: initialFilters.lines ?? [],
      brands: initialFilters.brands ?? [],
      status: initialFilters.status ?? [],
      types: initialFilters.types ?? [],
      ...(initialFilters.sortBy ? { sortBy: initialFilters.sortBy } : {}),
    })
    setSearch(searchParams.get("search") ?? "")

    fetchCatalogData()
  }, [searchParams, setFilters, setSearch, fetchCatalogData])

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts()
  }, [filters, search, fetchProducts])

  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [setFilters])

  const activeFilterCount =
    filters.brands.length +
    filters.categories.length +
    filters.lines.length +
    filters.status.length +
    filters.types.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0)

  // Branding de Manchas Store en las secciones que no son figuras
  const isNonFiguraSection =
    filters.types.length === 1 && filters.types[0] !== "FIGURA"

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Productos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Results count and controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {filters.types.length === 1
              ? PRODUCT_TYPE_LABELS[filters.types[0]]
              : "Todos los Productos"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {loading ? "Cargando..." : `${products.length} productos encontrados`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <FilterMobile
            filters={filters}
            onFiltersChange={handleFiltersChange}
            activeFilterCount={activeFilterCount}
          />
          <SortSelect
            value={filters.sortBy}
            onChange={(sortBy) =>
              setFilters({ sortBy: sortBy as FilterState["sortBy"] })
            }
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-8">
        {/* Sidebar - Desktop */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <FilterSidebar filters={filters} onFiltersChange={handleFiltersChange} />
          </div>
        </aside>

        {/* Products */}
        <div className="min-w-0 flex-1">
          {isNonFiguraSection && (
            <>
              <ManchasStoreBanner />
              {/* Verticales en fila para móvil/tablet (el aside lateral es solo xl+) */}
              <div className="mb-6 xl:hidden">
                <ManchasStoreVerticals orientation="row" />
              </div>
            </>
          )}
          <ProductGrid
            products={products}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            loading={loading}
          />
        </div>

        {/* Aside derecho con banners verticales de Manchas Store (solo secciones no-figura) */}
        {isNonFiguraSection && (
          <aside className="hidden w-56 shrink-0 xl:block">
            <div className="sticky top-24">
              <ManchasStoreVerticals orientation="column" />
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

function ProductsPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Skeleton className="mb-6 h-6 w-48" />
      <div className="mb-6 flex justify-between">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="mt-2 h-4 w-32" />
        </div>
      </div>
      <div className="flex gap-8">
        <aside className="hidden w-64 lg:block">
          <Skeleton className="h-96" />
        </aside>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsContent />
    </Suspense>
  )
}
