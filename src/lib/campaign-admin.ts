import { z } from "zod"
import { prisma } from "@/lib/prisma"

// Configuración compartida del CRUD admin de campañas (bóveda 05.05).
// Un solo par de route handlers sirve los 4 tipos: banners, announcements,
// coupons y discount-rules.

const scheduling = {
  status: z.enum(["DRAFT", "ACTIVE", "SCHEDULED"]).default("DRAFT"),
  validFrom: z.string().datetime().nullable().optional(),
  validUntil: z.string().datetime().nullable().optional(),
}

const bannerSchema = z.object({
  title: z.string().min(2),
  subtitle: z.string().max(160).nullable().optional(),
  imageUrl: z.string().min(1),
  mobileImageUrl: z.string().nullable().optional(),
  ctaLabel: z.string().max(40).nullable().optional(),
  ctaUrl: z.string().max(200).nullable().optional(),
  sortOrder: z.number().int().min(0).default(0),
  ...scheduling,
})

const announcementSchema = z.object({
  text: z.string().min(2).max(200),
  linkUrl: z.string().max(200).nullable().optional(),
  bgColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#142F5C"),
  textColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#FFFFFF"),
  ...scheduling,
})

const couponSchema = z.object({
  code: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[A-Z0-9-]+$/i, "Solo letras, números y guiones")
    .transform((v) => v.toUpperCase()),
  description: z.string().max(160).nullable().optional(),
  type: z.enum(["PERCENTAGE", "FIXED_AMOUNT"]),
  value: z.number().positive(),
  minPurchase: z.number().min(0).default(0),
  maxUses: z.number().int().positive().nullable().optional(),
  ...scheduling,
})

const discountRuleSchema = z
  .object({
    name: z.string().min(2).max(80),
    type: z.enum(["PERCENTAGE", "FIXED_AMOUNT"]),
    value: z.number().positive(),
    scope: z.enum(["GLOBAL", "CATEGORY", "LINE"]).default("GLOBAL"),
    categoryId: z.string().nullable().optional(),
    lineId: z.string().nullable().optional(),
    ...scheduling,
  })
  .refine((d) => d.scope !== "CATEGORY" || !!d.categoryId, {
    message: "Selecciona la categoría para esta regla",
    path: ["categoryId"],
  })
  .refine((d) => d.scope !== "LINE" || !!d.lineId, {
    message: "Selecciona la línea para esta regla",
    path: ["lineId"],
  })

export const CAMPAIGN_TYPES = {
  banners: { schema: bannerSchema, orderBy: { sortOrder: "asc" as const } },
  announcements: { schema: announcementSchema, orderBy: { updatedAt: "desc" as const } },
  coupons: { schema: couponSchema, orderBy: { createdAt: "desc" as const } },
  "discount-rules": { schema: discountRuleSchema, orderBy: { createdAt: "desc" as const } },
} as const

export type CampaignType = keyof typeof CAMPAIGN_TYPES

export function isCampaignType(type: string): type is CampaignType {
  return type in CAMPAIGN_TYPES
}

// Delegado Prisma según tipo (tipado laxo a propósito: los schemas zod
// garantizan la forma correcta de los datos por tipo)
export function campaignModel(type: CampaignType) {
  switch (type) {
    case "banners":
      return prisma.banner
    case "announcements":
      return prisma.announcement
    case "coupons":
      return prisma.coupon
    case "discount-rules":
      return prisma.discountRule
  }
}

// Normaliza las fechas ISO del formulario a Date/null para Prisma
export function normalizeDates<T extends Record<string, unknown>>(data: T): T {
  const out: Record<string, unknown> = { ...data }
  for (const key of ["validFrom", "validUntil"]) {
    if (key in out) {
      out[key] = out[key] ? new Date(out[key] as string) : null
    }
  }
  return out as T
}
