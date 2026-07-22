import { MapPin, MessageCircle, Music2 } from "lucide-react"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { SpotlightCard } from "@/components/react-bits/SpotlightCard"
import { SOCIAL_LINKS, whatsappChatUrl } from "@/lib/social"

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Feria+Grau+-+ex+carpa+grau/@-12.0599102,-77.0343483,17z/data=!3m1!4b1!4m6!3m5!1s0x9105c92bb159c6cb:0x1eba26681c201ad4!8m2!3d-12.0599102!4d-77.0343483!16s%2Fg%2F11v65432tz?entry=ttu&g_ep=EgoyMDI2MDcyMC4wIKXMDSoASAFQAw%3D%3D"

const quickLinks = [
  { title: "Ubicaciones", subtitle: "Feria Grau y Centro Civico", href: GOOGLE_MAPS_URL, icon: MapPin, shadow: "solid-shadow-yellow" },
  {
    title: "TikTok",
    subtitle: "Unboxings, lives y novedades",
    href: SOCIAL_LINKS.find((s) => s.label === "Blue Store")?.url ?? "https://www.tiktok.com/@blue.store.per",
    icon: Music2,
    shadow: "solid-shadow-blue",
  },
  {
    title: "WhatsApp",
    subtitle: "+51 997 763 962",
    href: whatsappChatUrl("51997763962", "¡Hola! Quiero más información sobre sus figuras. ✨"),
    icon: MessageCircle,
    shadow: "solid-shadow-yellow",
  },
]

export function QuickAccessPanel() {
  return (
    <section className="blue-container -mt-8 relative z-10">
      <div className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((item, index) => (
          <AnimatedContent key={item.title} delay={index * 90}>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              <SpotlightCard className={`rounded-[32px] border-2 border-[#142F5C] bg-white p-5 transition hover:-translate-y-1 ${item.shadow}`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#4A80BE] text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-display text-3xl leading-none text-[#142F5C]">{item.title}</p>
                    <p className="text-sm font-semibold text-muted-foreground">{item.subtitle}</p>
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
