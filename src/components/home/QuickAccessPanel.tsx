import { MapPin, MessageCircle, Music2 } from "lucide-react"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { SpotlightCard } from "@/components/react-bits/SpotlightCard"
import {
  SOCIAL_LINKS,
  STORE_WHATSAPP_DISPLAY,
  storeWhatsappUrl,
} from "@/lib/social"
import { PICKUP_POINTS } from "@/lib/locations"

const quickLinks = [
  {
    title: "Puntos de recojo",
    subtitle: PICKUP_POINTS.map((p) => p.name).join(" · "),
    href: PICKUP_POINTS[0].mapsUrl,
    icon: MapPin,
    shadow: "solid-shadow-yellow",
  },
  {
    title: "TikTok",
    subtitle: "Unboxings, lives y novedades",
    href: SOCIAL_LINKS.find((s) => s.label === "Blue Store")?.url ?? "https://www.tiktok.com/@blue.store.per",
    icon: Music2,
    shadow: "solid-shadow-blue",
  },
  {
    title: "WhatsApp",
    subtitle: STORE_WHATSAPP_DISPLAY,
    href: storeWhatsappUrl("¡Hola! Quiero más información sobre sus figuras. ✨"),
    icon: MessageCircle,
    shadow: "solid-shadow-yellow",
  },
]

export function QuickAccessPanel() {
  return (
    <section className="blue-container -mt-6 relative z-10 sm:-mt-8">
      <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
        {quickLinks.map((item, index) => (
          <AnimatedContent key={item.title} delay={index * 90}>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              <SpotlightCard className={`rounded-3xl border-2 border-[#142F5C] bg-white p-3.5 transition hover:-translate-y-1 sm:rounded-[32px] sm:p-5 ${item.shadow}`}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#4A80BE] text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 sm:h-14 sm:w-14 sm:rounded-3xl">
                    <item.icon className="h-5 w-5 sm:h-7 sm:w-7" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-2xl leading-none text-[#142F5C] sm:text-3xl">{item.title}</p>
                    <p className="truncate text-xs font-semibold text-muted-foreground sm:text-sm">{item.subtitle}</p>
                  </div>
                </div>
              </SpotlightCard>
            </a>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
