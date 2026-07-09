import { BadgePercent, MessageCircle, ReceiptText, Truck } from "lucide-react"

const benefits = [
  { icon: Truck, title: "Envio a todo el Peru", subtitle: "Desde S/ 9 soles" },
  { icon: BadgePercent, title: "Ofertas todos los dias", subtitle: "En varias figuras por tiempo limitado" },
  { icon: MessageCircle, title: "Estamos para ti", subtitle: "Atencion 24/7 por WhatsApp" },
  { icon: ReceiptText, title: "Pagos seguros", subtitle: "Yape, transferencias y tarjetas" },
]

export function TopBar() {
  return (
    <div className="border-b bg-white">
      <div className="blue-container py-3">
        <div className="grid gap-3 rounded-2xl border bg-white px-4 py-3 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => (
            <div key={item.title} className="flex items-center justify-center gap-3 text-[#142F5C]">
              <item.icon className="h-7 w-7 shrink-0" />
              <div className="leading-tight">
                <p className="text-sm font-extrabold">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
