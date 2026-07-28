import { prisma } from "@/lib/prisma"
import {
  transformCategory,
  transformLine,
  transformProduct,
  transformReview,
} from "@/lib/transformers"
import { getActiveDiscountRules, getActiveBanners } from "@/lib/campaigns"
import { getRandomActiveProductIds, fetchProductsByIds } from "@/lib/home-products"
import { HeroBanner } from "@/components/home/HeroBanner"
import { QuickAccessPanel } from "@/components/home/QuickAccessPanel"
import { CategoryTrends } from "@/components/home/CategoryTrends"
import { BenefitsMarquee } from "@/components/home/BenefitsMarquee"
import { StatsBand } from "@/components/home/StatsBand"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { CategoryShowcase } from "@/components/home/CategoryShowcase"
import { LinesSection } from "@/components/home/LinesSection"
import { ReviewsSection } from "@/components/home/ReviewsSection"
import { FollowUs } from "@/components/home/FollowUs"
import { StoreLocations } from "@/components/home/StoreLocations"
import { BuyMeACoffee } from "@/components/home/BuyMeACoffee"
import { BluetBubble } from "@/components/layout/BluetBubble"
import { TopBar } from "@/components/layout/TopBar"

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
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.review.findMany({
      include: { user: { select: { username: true, avatarFileName: true } } },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ])

  // Solo animes marcados como Tendencia desde admin/categorías tienen su
  // propia sección con productos aleatorios en el home.
  const trendingCategories = categories.filter((c) => c.isTrending)

  const [
    rules,
    banners,
    productCount,
    reviewCount,
    catalogPreviewIds,
    categorySectionIdLists,
  ] = await Promise.all([
    getActiveDiscountRules(),
    getActiveBanners(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.review.count(),
    getRandomActiveProductIds(14),
    Promise.all(trendingCategories.map((c) => getRandomActiveProductIds(8, c.id))),
  ])

  const [catalogPreviewRows, ...categoryProductRows] = await Promise.all([
    fetchProductsByIds(catalogPreviewIds),
    ...categorySectionIdLists.map((ids) => fetchProductsByIds(ids)),
  ])

  const catalogPreview = catalogPreviewRows.map((p) => transformProduct(p, rules))
  const categorySections = trendingCategories
    .map((cat, index) => ({
      category: transformCategory(cat),
      products: categoryProductRows[index].map((p) => transformProduct(p, rules)),
    }))
    .filter((section) => section.products.length > 0)

  return (
    <>
      <HeroBanner
        banners={banners.map((b) => ({
          id: b.id,
          title: b.title,
          subtitle: b.subtitle ?? undefined,
          imageUrl: b.imageUrl,
          ctaLabel: b.ctaLabel ?? undefined,
          ctaUrl: b.ctaUrl ?? undefined,
        }))}
        featuredProducts={featured.map((p) => transformProduct(p, rules))}
      />
      {/* QuickAccessPanel se monta sobre el hero (-mt-8), así que la tira de
          beneficios va después para no quedar tapada. */}
      <QuickAccessPanel />
      <TopBar />
      <CategoryTrends categories={categories.map(transformCategory)} />
      <BenefitsMarquee />
      <StatsBand
        products={productCount}
        animes={categories.length}
        lines={lines.length}
        reviews={reviewCount}
      />
      <FeaturedProducts products={catalogPreview} />
      <CategoryShowcase sections={categorySections} />
      <LinesSection lines={lines.map(transformLine)} />
      <ReviewsSection reviews={reviews.map((r) => transformReview(r, true))} />
      <StoreLocations />
      <FollowUs />
      <BuyMeACoffee />
      <BluetBubble />
    </>
  )
}
