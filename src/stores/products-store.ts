import { create } from "zustand"
import type { Product, Category, Line, Brand, FilterState } from "@/types"

const PAGE_SIZE = 12

interface ProductsState {
  products: Product[]
  categories: Category[]
  lines: Line[]
  brands: Brand[]
  featuredProducts: Product[]
  filters: FilterState
  search: string
  loading: boolean
  error: string | null

  // Paginación numerada del catálogo: el total viene del servidor, la página
  // vive en el store (y se refleja en la URL desde products/page.tsx)
  page: number
  pageSize: number
  total: number

  // Actions
  fetchProducts: (filters?: Partial<FilterState>) => Promise<void>
  fetchFeaturedProducts: () => Promise<void>
  fetchCatalogData: () => Promise<void>
  setFilters: (filters: Partial<FilterState>) => void
  setSearch: (search: string) => void
  setPage: (page: number) => void
  resetFilters: () => void
}

const defaultFilters: FilterState = {
  categories: [],
  lines: [],
  brands: [],
  status: [],
  types: [],
  priceRange: [0, 10000],
  sortBy: "newest",
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  categories: [],
  lines: [],
  brands: [],
  featuredProducts: [],
  filters: defaultFilters,
  search: "",
  loading: false,
  error: null,
  page: 1,
  pageSize: PAGE_SIZE,
  total: 0,

  fetchProducts: async (filterOverrides) => {
    set({ loading: true, error: null })
    try {
      const filters = { ...get().filters, ...filterOverrides }
      const { page, pageSize } = get()
      const params = new URLSearchParams()
      params.set("limit", String(pageSize))
      params.set("offset", String((page - 1) * pageSize))

      if (filters.categories.length === 1) {
        params.set("category", filters.categories[0])
      }
      if (filters.lines.length === 1) {
        params.set("line", filters.lines[0])
      }
      if (filters.brands.length === 1) {
        params.set("brand", filters.brands[0])
      }
      if (filters.status.length === 1) {
        params.set("status", filters.status[0])
      }
      if (filters.types.length === 1) {
        params.set("type", filters.types[0])
      }
      if (filters.priceRange[0] > 0) {
        params.set("minPrice", filters.priceRange[0].toString())
      }
      if (filters.priceRange[1] < 10000) {
        params.set("maxPrice", filters.priceRange[1].toString())
      }
      if (filters.sortBy) {
        params.set("sortBy", filters.sortBy)
      }
      const search = get().search
      if (search) {
        params.set("search", search)
      }

      const response = await fetch(`/api/products?${params.toString()}`)
      if (!response.ok) throw new Error("No se pudieron cargar los productos")

      const data = await response.json()
      set({ products: data.products, total: data.total ?? 0, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  fetchFeaturedProducts: async () => {
    try {
      const response = await fetch("/api/products?featured=true&limit=8")
      if (!response.ok) throw new Error("No se pudieron cargar los destacados")

      const data = await response.json()
      set({ featuredProducts: data.products })
    } catch (error) {
      console.error("Error fetching featured products:", error)
    }
  },

  fetchCatalogData: async () => {
    try {
      const [catRes, lineRes, brandRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/lines"),
        fetch("/api/brands"),
      ])
      const [categories, lines, brands] = await Promise.all([
        catRes.ok ? catRes.json() : [],
        lineRes.ok ? lineRes.json() : [],
        brandRes.ok ? brandRes.json() : [],
      ])
      set({ categories, lines, brands })
    } catch (error) {
      console.error("Error fetching catalog data:", error)
    }
  },

  setFilters: (newFilters) => {
    // Cambiar de filtro reinicia a la página 1: la página anterior podría
    // no existir para el nuevo conjunto de resultados
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      page: 1,
    }))
  },

  setSearch: (search) => {
    set({ search, page: 1 })
  },

  setPage: (page) => {
    set({ page })
  },

  resetFilters: () => {
    set({ filters: defaultFilters, page: 1 })
  },
}))
