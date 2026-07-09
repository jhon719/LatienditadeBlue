import Image from "next/image"
import { Star } from "lucide-react"
import { customerReviews } from "@/data/blue-store"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { SpotlightCard } from "@/components/react-bits/SpotlightCard"

export function ReviewsSection() {
  return (
    <section className="blue-container py-12">
      <div className="mb-7">
        <p className="text-sm font-extrabold uppercase text-[#4A80BE]">Confianza coleccionista</p>
        <h2 className="font-display text-5xl leading-none text-[#142F5C]">Resenas de la comunidad</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {customerReviews.map((review, index) => (
          <AnimatedContent key={review.name} delay={index * 80}>
            <SpotlightCard className="h-full rounded-[32px] border-2 border-[#142F5C] bg-white p-5 solid-shadow-soft">
              <div className="flex items-center gap-3">
                <Image src={review.avatar} alt={review.name} width={52} height={52} className="h-13 w-13 rounded-full object-cover" />
                <div>
                  <p className="font-extrabold text-[#142F5C]">{review.name}</p>
                  <p className="text-xs font-semibold text-muted-foreground">{review.handle}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-[#F5B400] text-[#F5B400]" : "text-muted-foreground"}`} />
                ))}
              </div>
              <p className="mt-4 text-sm font-medium leading-relaxed text-[#142F5C]/80">{review.comment}</p>
            </SpotlightCard>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
