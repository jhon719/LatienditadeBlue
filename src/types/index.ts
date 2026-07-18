// Tipos de dominio de La Tiendita de Blue, alineados al schema de Prisma

export type ProductStatus = "STOCK" | "ONLINE" | "PREVENTA" | "AGOTADO"
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
  status: ProductStatus
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
  priceRange: [number, number]
  sortBy: "popular" | "price-asc" | "price-desc" | "newest" | "rating"
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
