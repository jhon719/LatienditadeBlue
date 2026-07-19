import { prisma } from "@/lib/prisma"
import type {
  Banner,
  Announcement,
  Coupon,
  DiscountRule,
  Prisma,
} from "@prisma/client"

// ==================== Máquina de estados de tiempo (bóveda 05.05 §3) ====================
// ACTIVE = siempre visible · SCHEDULED = visible solo dentro de la ventana
// DRAFT = nunca visible

type Schedulable = {
  status: "DRAFT" | "ACTIVE" | "SCHEDULED"
  validFrom: Date | null
  validUntil: Date | null
}

export function isCampaignLive(item: Schedulable, now = new Date()): boolean {
  if (item.status === "ACTIVE") return true
  if (item.status !== "SCHEDULED") return false
  if (item.validFrom && now < item.validFrom) return false
  if (item.validUntil && now > item.validUntil) return false
  return true
}

// Filtro Prisma equivalente, para no traer campañas muertas de la DB
export function liveCampaignWhere(now = new Date()) {
  return {
    OR: [
      { status: "ACTIVE" as const },
      {
        status: "SCHEDULED" as const,
        AND: [
          { OR: [{ validFrom: null }, { validFrom: { lte: now } }] },
          { OR: [{ validUntil: null }, { validUntil: { gte: now } }] },
        ],
      },
    ],
  }
}

// ==================== Contenido visual activo ====================

export async function getActiveBanners(): Promise<Banner[]> {
  return prisma.banner.findMany({
    where: liveCampaignWhere(),
    orderBy: { sortOrder: "asc" },
  })
}

export async function getActiveAnnouncement(): Promise<Announcement | null> {
  return prisma.announcement.findFirst({
    where: liveCampaignWhere(),
    orderBy: { updatedAt: "desc" },
  })
}

// ==================== Motor de reglas de precio (bóveda 05.05 §4) ====================

export async function getActiveDiscountRules(): Promise<DiscountRule[]> {
  return prisma.discountRule.findMany({ where: liveCampaignWhere() })
}

interface PriceableProduct {
  price: Prisma.Decimal | number
  categoryId: string
  lineId: string | null
}

// Devuelve el precio rebajado según la mejor regla aplicable (o null si ninguna)
export function applyDiscountRules(
  product: PriceableProduct,
  rules: DiscountRule[]
): { salePrice: number; ruleName: string } | null {
  const price = Number(product.price)
  let best: { salePrice: number; ruleName: string } | null = null

  for (const rule of rules) {
    const applies =
      rule.scope === "GLOBAL" ||
      (rule.scope === "CATEGORY" && rule.categoryId === product.categoryId) ||
      (rule.scope === "LINE" && rule.lineId != null && rule.lineId === product.lineId)
    if (!applies) continue

    const value = Number(rule.value)
    const salePrice =
      rule.type === "PERCENTAGE"
        ? Math.round(price * (100 - value)) / 100
        : Math.max(0, Math.round((price - value) * 100) / 100)

    if (salePrice < price && (best === null || salePrice < best.salePrice)) {
      best = { salePrice, ruleName: rule.name }
    }
  }

  return best
}

// ==================== Cupones (bóveda 05.05 §4) ====================

export type CouponValidation =
  | { valid: true; coupon: Coupon; discount: number }
  | { valid: false; error: string }

export async function validateCoupon(
  code: string,
  subtotal: number
): Promise<CouponValidation> {
  const coupon = await prisma.coupon.findUnique({
    where: { code: code.trim().toUpperCase() },
  })

  if (!coupon || !isCampaignLive(coupon)) {
    return { valid: false, error: "El cupón no existe o ya expiró" }
  }
  if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
    return { valid: false, error: "Este cupón ya alcanzó su límite de usos" }
  }
  const minPurchase = Number(coupon.minPurchase)
  if (subtotal < minPurchase) {
    return {
      valid: false,
      error: `Este cupón requiere una compra mínima de S/ ${minPurchase.toFixed(2)}`,
    }
  }

  const value = Number(coupon.value)
  const discount =
    coupon.type === "PERCENTAGE"
      ? Math.round(subtotal * value) / 100
      : Math.min(value, subtotal)

  return { valid: true, coupon, discount: Math.round(discount * 100) / 100 }
}
