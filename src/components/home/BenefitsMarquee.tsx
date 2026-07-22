import {
  Wallet,
  CreditCard,
  Truck,
  Bike,
  Store,
  CalendarClock,
  MessageCircle,
  BadgeCheck,
} from "lucide-react"
import { Marquee } from "@/components/common/Marquee"

// Cinta de beneficios reales del negocio (bóveda 03.x): pagos, envíos y soporte.
const BENEFITS = [
  { icon: Wallet, label: "Yape · Plin · Transferencia" },
  { icon: CreditCard, label: "Mercado Pago disponible" },
  { icon: Truck, label: "Envíos a todo el Perú (Shalom · courier)" },
  { icon: Bike, label: "Motorizado en Lima" },
  { icon: Store, label: "Recojo en tienda" },
  { icon: CalendarClock, label: "Preventas de figuras exclusivas" },
  { icon: MessageCircle, label: "Coordinación por WhatsApp" },
  { icon: BadgeCheck, label: "Reseñas verificadas" },
]

export function BenefitsMarquee() {
  return (
    <section className="border-y border-border/60 bg-gradient-to-r from-[#E1F0FF] via-white to-[#FFF5D1] py-3 dark:from-[#101f38] dark:via-background dark:to-[#241d05]">
      <Marquee itemClassName="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-[#142F5C] dark:text-foreground/90">
        {BENEFITS.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-2">
            <Icon className="h-4 w-4 shrink-0 text-[#4A80BE]" />
            {label}
            <span className="ml-4 text-[#F5B400]">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  )
}
