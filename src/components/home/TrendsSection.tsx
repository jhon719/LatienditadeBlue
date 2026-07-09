import Image from "next/image"
import Link from "next/link"
import { Flame } from "lucide-react"
import { trendBanners } from "@/data/blue-store"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"

export function TrendsSection() {
  return (
    <section className="blue-container py-12">
      <div className="mb-5 flex items-center gap-2">
        <h2 className="font-display text-5xl leading-none text-[#142F5C]">Tendencias</h2>
        <Flame className="h-8 w-8 fill-[#F5B400] text-[#F5B400]" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {trendBanners.map((trend, index) => (
          <AnimatedContent key={trend.title} delay={index * 80}>
            <Link href={trend.href} className="group block">
              <div className="relative aspect-[2/1] overflow-hidden rounded-[24px] bg-[#F2F2F2] solid-shadow-soft transition group-hover:-translate-y-1">
                <Image src={trend.image} alt={trend.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                <div className={`absolute inset-0 bg-gradient-to-r ${trend.tone}`} />
                <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                  <p className="font-display text-4xl leading-none drop-shadow">{trend.title}</p>
                  <p className="text-sm font-bold text-white/85">{trend.subtitle}</p>
                </div>
              </div>
            </Link>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
