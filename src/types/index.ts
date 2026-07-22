// Tipos de dominio de La Tiendita de Blue, alineados al schema de Prisma

export type ProductStatus = "STOCK" | "ONLINE" | "PREVENTA" | "AGOTADO"
export type ProductType =
  | "FIGURA"
  | "MANGA"
  | "PELUCHE"
  | "LLAVERO"
  | "ROPA"
  | "MERCH"
export type ShippingType = "PICKUP" | "LOCAL_DELIVERY" | "NATIONAL_COURIER"
export type ShippingStatus = "PREPARING" | "SHIPPED" | "DELIVERED"
export type PaymentMethodType = "MERCADO_PAGO" | "MANUAL_TRANSFER"
export type OrderStatusType =
  | "PENDING_PAYMENT"
  | "VERIFYING_MANUAL"
  | "PAID_APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED"
export type ProofStatusType = "PENDING" | "APPROVED" | "REJECTED"

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  // Precio rebajado por regla de campaña activa (bóveda 05.05); si existe,
  // es el precio real de venta y `price` se muestra tachado
  salePrice?: number
  discountRuleName?: string
  status: ProductStatus
  type: ProductType
  expectedDate?: string // ISO date (solo PREVENTA)
  stockQty: number
  images: string[]
  isFeatured: boolean
  isActive: boolean
  category: CategoryRef
  line?: CategoryRef
  brand: CategoryRef
  rating: number // Promedio de reseñas (0 si no tiene)
  reviewCount: number
}

// Referencia ligera a Category/Line/Brand dentro de un producto
export interface CategoryRef {
  id: string
  name: string
  slug: string
  imageUrl?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  imageUrl?: string
  isActive: boolean
  isTrending: boolean
  hasNewArrivals: boolean
  productCount: number
}

export interface Line {
  id: string
  name: string
  slug: string
  imageUrl?: string
  isActive: boolean
  isFeatured: boolean
  productCount: number
  // Fabricante de la línea (bóveda 02.05): la mayoría de líneas pertenecen a una marca
  brand?: CategoryRef
}

export interface Brand {
  id: string
  name: string
  slug: string
  imageUrl?: string
  isActive: boolean
  productCount: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface FilterState {
  categories: string[]
  lines: string[]
  brands: string[]
  status: ProductStatus[]
  types: ProductType[]
  priceRange: [number, number]
  sortBy: "popular" | "price-asc" | "price-desc" | "newest" | "rating"
}

// Etiquetas de tipo de producto (plural para nav/filtro, singular para el badge)
export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  FIGURA: "Figuras",
  MANGA: "Mangas",
  PELUCHE: "Peluches",
  LLAVERO: "Llaveros",
  ROPA: "Ropa",
  MERCH: "Merch",
}

// Contenido administrable del CMS de marketing (bóveda 05.05)
export interface BannerView {
  id: string
  title: string
  subtitle?: string
  imageUrl: string
  ctaLabel?: string
  ctaUrl?: string
}

export interface AnnouncementView {
  id: string
  text: string
  linkUrl?: string
  bgColor: string
  textColor: string
}

export interface ReviewItem {
  id: string
  rating: number
  comment: string
  images: string[]
  createdAt: string
  verifiedPurchase: boolean
  user: {
    username: string
    avatarFileName: string | null
  }
}

export interface OrderSummaryItem {
  id: string
  productId: string
  name: string
  image?: string
  quantity: number
  price: number
}

export interface OrderView {
  id: string
  processCode: string
  totalAmount: number
  shippingCost: number
  discountAmount: number
  couponDiscount: number
  couponCode?: string
  shippingType: ShippingType
  shippingStatus: ShippingStatus
  receiverName: string
  receiverPhone: string
  deliveryAddress?: string
  trackingNumber?: string
  paymentMethod: PaymentMethodType
  status: OrderStatusType
  createdAt: string
  items: OrderSummaryItem[]
}
