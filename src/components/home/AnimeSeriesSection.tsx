import Link from "next/link"
import { animeButtons } from "@/data/blue-store"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"

export function AnimeSeriesSection() {
  return (
    <section className="bg-[#EAF0F6] py-12">
      <div className="blue-container">
        <div className="mb-7">
          <p className="text-sm font-extrabold uppercase text-[#4A80BE]">Filtros para futura DB</p>
          <h2 className="font-display text-5xl leading-none text-[#142F5C]">Series anime</h2>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-3">
          {animeButtons.map((anime, index) => (
            <AnimatedContent key={anime} delay={index * 60} className="shrink-0">
              <Link href={`/products?anime=${anime.toLowerCase().replaceAll(" ", "-")}`} className="group flex w-28 flex-col items-center gap-3 text-center sm:w-32">
                <div className="flex aspect-square w-full items-center justify-center rounded-full border-4 border-white bg-white px-3 text-center shadow-lg transition group-hover:-translate-y-1 group-hover:bg-[#F5B400]">
                  <span className="font-display text-3xl leading-none text-[#142F5C]">{anime}</span>
                </div>
              </Link>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  )
}
