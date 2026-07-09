import { HeroBanner } from "@/components/home/HeroBanner"
import { QuickAccessPanel } from "@/components/home/QuickAccessPanel"
import { TrendsSection } from "@/components/home/TrendsSection"
import { CategoryGrid } from "@/components/home/CategoryGrid"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { BrandSection } from "@/components/home/BrandSection"
import { AnimeSeriesSection } from "@/components/home/AnimeSeriesSection"
import { ReviewsSection } from "@/components/home/ReviewsSection"

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <QuickAccessPanel />
      <TrendsSection />
      <FeaturedProducts />
      <BrandSection />
      <AnimeSeriesSection />
      <CategoryGrid />
      <ReviewsSection />
    </>
  )
}
