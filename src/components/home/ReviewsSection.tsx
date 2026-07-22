import { Star, BadgeCheck } from "lucide-react"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { SpotlightCard } from "@/components/react-bits/SpotlightCard"
import { GradientText } from "@/components/common/GradientText"
import { UserAvatar } from "@/components/common/UserAvatar"
import type { ReviewItem } from "@/types"

export function ReviewsSection({ reviews }: { reviews: ReviewItem[] }) {
  if (reviews.length === 0) return null

  return (
    <section className="blue-container py-12">
      <div className="mb-7">
        <p className="text-sm font-extrabold uppercase text-[#4A80BE]">
          Confianza coleccionista
        </p>
        <h2 className="font-display text-5xl leading-none">
          <GradientText>Reseñas de la comunidad</GradientText>
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {reviews.map((review, index) => (
          <AnimatedContent key={review.id} delay={index * 80}>
            <SpotlightCard className="h-full rounded-[32px] border-2 border-[#142F5C] bg-card p-5 solid-shadow-soft">
              <div className="flex items-center gap-3">
                <UserAvatar
                  username={review.user.username}
                  avatarFileName={review.user.avatarFileName}
                  size={52}
                />
                <div>
                  <p className="font-extrabold text-[#142F5C] dark:text-foreground">
                    @{review.user.username}
                  </p>
                  {review.verifiedPurchase && (
                    <p className="flex items-center gap-1 text-xs font-semibold text-[#1E7E34]">
                      <BadgeCheck className="h-3.5 w-3.5" /> Compra verificada
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-[#F5B400] text-[#F5B400]" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm font-medium leading-relaxed text-[#142F5C]/80 dark:text-foreground/80">
                {review.comment}
              </p>
            </SpotlightCard>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
