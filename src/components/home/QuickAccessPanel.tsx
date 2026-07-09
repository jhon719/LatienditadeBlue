import Link from "next/link"
import { MapPin, MessageCircle, Music2 } from "lucide-react"
import { AnimatedContent } from "@/components/react-bits/AnimatedContent"
import { SpotlightCard } from "@/components/react-bits/SpotlightCard"

const quickLinks = [
  { title: "Ubicaciones", subtitle: "Feria Grau y Centro Civico", href: "#ubicaciones", icon: MapPin, shadow: "solid-shadow-yellow" },
  { title: "TikTok", subtitle: "Unboxings, lives y novedades", href: "#tiktok", icon: Music2, shadow: "solid-shadow-blue" },
  { title: "WhatsApp", subtitle: "+51 999 888 777", href: "https://wa.me/51999888777", icon: MessageCircle, shadow: "solid-shadow-yellow" },
]

export function QuickAccessPanel() {
  return (
    <section className="blue-container -mt-8 relative z-10">
      <div className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((item, index) => (
          <AnimatedContent key={item.title} delay={index * 90}>
            <Link href={item.href}>
              <SpotlightCard className={`rounded-[32px] border-2 border-[#142F5C] bg-white p-5 transition hover:-translate-y-1 ${item.shadow}`}>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#4A80BE] text-white">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-display text-3xl leading-none text-[#142F5C]">{item.title}</p>
                    <p className="text-sm font-semibold text-muted-foreground">{item.subtitle}</p>
                  </div>
                </div>
              </SpotlightCard>
            </Link>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
