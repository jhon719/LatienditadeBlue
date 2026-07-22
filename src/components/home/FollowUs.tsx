"use client"

import { ArrowUpRight } from "lucide-react"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { GradientText } from "@/components/common/GradientText"
import { SocialIcon, SOCIAL_BG } from "@/components/common/SocialIcon"
import { SOCIAL_LINKS } from "@/lib/social"

// Sección "Síguenos": redes oficiales con tarjetas animadas (hover lift + shine).
export function FollowUs() {
  return (
    <section className="blue-container py-12">
      <div className="mb-7 text-center">
        <p className="text-sm font-extrabold uppercase text-[#4A80BE]">
          No te pierdas nada
        </p>
        <h2 className="font-display text-5xl leading-none">
          <GradientText>Síguenos en redes</GradientText>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Preventas, sorteos y llegadas nuevas primero en nuestras redes.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {SOCIAL_LINKS.map((s, i) => (
          <AnimatedContent key={s.url} delay={i * 60}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-3xl border border-border bg-card p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="card-shine z-10" />
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${SOCIAL_BG[s.platform]}`}
              >
                <SocialIcon platform={s.platform} className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">{s.label}</p>
                <p className="max-w-[9rem] truncate text-xs text-muted-foreground">
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
