import { prisma } from "@/lib/prisma"
import {
  transformCategory,
  transformLine,
  transformProduct,
  transformReview,
} from "@/lib/transformers"
import { HeroBanner } from "@/components/home/HeroBanner"
import { QuickAccessPanel } from "@/components/home/QuickAccessPanel"
import { CategoryTrends } from "@/components/home/CategoryTrends"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { LinesSection } from "@/components/home/LinesSection"
import { ReviewsSection } from "@/components/home/ReviewsSection"
import { BluetBubble } from "@/components/layout/BluetBubble"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [categories, lines, featured, reviews] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      include: { _count: { select: { products: { where: { isActive: true } } } } },
      orderBy: [{ isTrending: "desc" }, { name: "asc" }],
    }),
    prisma.line.findMany({
      where: { isActive: true },
      include: { _count: { select: { products: { where: { isActive: true } } } } },
      orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
    }),
    prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: {
        category: true,
        line: true,
        brand: true,
        reviews: { select: { rating: true } },
      },
      take: 8,
      orderBy: { createdAt: "desc" },
    }),
    prisma.review.findMany({
      include: { user: { select: { username: true, avatarFileName: true } } },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ])

  return (
    <>
      <HeroBanner />
      <QuickAccessPanel />
      <CategoryTrends categories={categories.map(transformCategory)} />
      <FeaturedProducts products={featured.map(transformProduct)} />
      <LinesSection lines={lines.map(transformLine)} />
      <ReviewsSection reviews={reviews.map((r) => transformReview(r, true))} />
      <BluetBubble />
    </>
  )
}
