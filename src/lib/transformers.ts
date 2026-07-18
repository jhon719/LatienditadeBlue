import type { Product, Category, Line, Brand, ReviewItem, OrderView } from "@/types"
import type {
  Product as PrismaProduct,
  Category as PrismaCategory,
  Line as PrismaLine,
  Brand as PrismaBrand,
  Review as PrismaReview,
  Order as PrismaOrder,
  OrderItem as PrismaOrderItem,
} from "@prisma/client"

type ProductWithRelations = PrismaProduct & {
  category: PrismaCategory
  line: PrismaLine | null
  brand: PrismaBrand
  reviews?: { rating: number }[]
}

export function transformProduct(product: ProductWithRelations): Product {
  const ratings = product.reviews ?? []
  const rating =
    ratings.length > 0
      ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
      : 0

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: Number(product.price),
    status: product.status,
    expectedDate: product.expectedDate?.toISOString(),
    stockQty: product.stockQty,
    images: product.images,
    isFeatured: product.isFeatured,
    isActive: product.isActive,
    category: {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
    },
    line: product.line
      ? { id: product.line.id, name: product.line.name, slug: product.line.slug }
      : undefined,
    brand: {
      id: product.brand.id,
      name: product.brand.name,
      slug: product.brand.slug,
    },
    rating: Math.round(rating * 10) / 10,
    reviewCount: ratings.length,
  }
}

type WithCount = { _count?: { products: number } }

export function transformCategory(category: PrismaCategory & WithCount): Category {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    imageUrl: category.imageUrl ?? undefined,
    isActive: category.isActive,
    isTrending: category.isTrending,
    hasNewArrivals: category.hasNewArrivals,
    productCount: category._count?.products ?? 0,
  }
}

export function transformLine(line: PrismaLine & WithCount): Line {
  return {
    id: line.id,
    name: line.name,
    slug: line.slug,
    imageUrl: line.imageUrl ?? undefined,
    isActive: line.isActive,
    isFeatured: line.isFeatured,
    productCount: line._count?.products ?? 0,
  }
}

export function transformBrand(brand: PrismaBrand & WithCount): Brand {
  return {
    id: brand.id,
    name: brand.name,
    slug: brand.slug,
    imageUrl: brand.imageUrl ?? undefined,
    isActive: brand.isActive,
    productCount: brand._count?.products ?? 0,
  }
}

type ReviewWithUser = PrismaReview & {
  user: { username: string; avatarFileName: string | null }
}

export function transformReview(
  review: ReviewWithUser,
  verifiedPurchase: boolean
): ReviewItem {
  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    images: review.images,
    createdAt: review.createdAt.toISOString(),
    verifiedPurchase,
    user: {
      username: review.user.username,
      avatarFileName: review.user.avatarFileName,
    },
  }
}

type OrderWithItems = PrismaOrder & {
  items: (PrismaOrderItem & {
    product: { name: string; images: string[] }
  })[]
}

export function transformOrder(order: OrderWithItems): OrderView {
  return {
    id: order.id,
    processCode: order.processCode,
    totalAmount: Number(order.totalAmount),
    shippingCost: Number(order.shippingCost),
    shippingType: order.shippingType,
    shippingStatus: order.shippingStatus,
    receiverName: order.receiverName,
    receiverPhone: order.receiverPhone,
    deliveryAddress: order.deliveryAddress ?? undefined,
    trackingNumber: order.trackingNumber ?? undefined,
    paymentMethod: order.paymentMethod,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      name: item.product.name,
      image: item.product.images[0],
      quantity: item.quantity,
      price: Number(item.price),
    })),
  }
}
