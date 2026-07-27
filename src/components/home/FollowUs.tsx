"use client"

import { ArrowUpRight } from "lucide-react"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { GradientText } from "@/components/common/GradientText"
import { SocialIcon, SOCIAL_BG } from "@/components/common/SocialIcon"
import { SOCIAL_LINKS } from "@/lib/social"

// Sección "Síguenos": redes oficiales con tarjetas animadas (hover lift + shine).
export function FollowUs() {
  return (
    <section className="blue-container py-10 sm:py-14">
      <div className="mb-6 text-center sm:mb-7">
        <p className="text-xs font-extrabold uppercase text-[#4A80BE] sm:text-sm">
          No te pierdas nada
        </p>
        <h2 className="font-display text-4xl leading-none sm:text-5xl">
          <GradientText>Síguenos en redes</GradientText>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Preventas, sorteos y llegadas nuevas primero en nuestras redes.
        </p>
      </div>

      {/* Móvil: fila con scroll horizontal y snap (ahorra alto de pantalla,
          como CategoryTrends/LinesSection). Desde sm vuelve a ser grilla. */}
      <div className="flex snap-x gap-3 overflow-x-auto overflow-y-hidden pb-2 pt-1 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:pb-0 lg:grid-cols-5">
        {SOCIAL_LINKS.map((s, i) => (
          <AnimatedContent
            key={s.url}
            delay={i * 60}
            className="w-28 shrink-0 snap-start sm:w-auto sm:shrink"
          >
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full flex-col items-center gap-2 overflow-hidden rounded-2xl border border-border bg-card p-3.5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:gap-3 sm:rounded-3xl sm:p-5"
            >
              <span className="card-shine z-10" />
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl ${SOCIAL_BG[s.platform]}`}
              >
                <SocialIcon platform={s.platform} className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <div className="min-w-0 max-w-full">
                <p className="truncate text-xs font-bold text-foreground sm:text-sm">{s.label}</p>
                <p className="truncate text-[10px] text-muted-foreground sm:text-xs">
                  {s.handle}
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A80BE] opacity-0 transition-opacity group-hover:opacity-100">
                Visitar <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
