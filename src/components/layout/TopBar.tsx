import { BadgePercent, MessageCircle, ReceiptText, Truck } from "lucide-react"

const benefits = [
  { icon: Truck, title: "Envio a todo el Peru", subtitle: "Desde S/ 9 soles" },
  { icon: BadgePercent, title: "Ofertas todos los dias", subtitle: "En varias figuras por tiempo limitado" },
  { icon: MessageCircle, title: "Estamos para ti", subtitle: "Atencion 24/7 por WhatsApp" },
  { icon: ReceiptText, title: "Pagos seguros", subtitle: "Yape, transferencias y tarjetas" },
]

// Tira de beneficios. Vive bajo el Hero de la home (no en el layout global)
// para que en móvil el banner sea lo primero que se ve.
// Móvil: 2x2 compacto sin subtítulos · Escritorio: 4 columnas con subtítulo.
export function TopBar() {
  return (
    <div className="border-b bg-white dark:bg-card">
      <div className="blue-container py-3 sm:py-4">
        <div className="grid grid-cols-2 gap-2 rounded-2xl border bg-white px-2 py-3 sm:gap-3 sm:px-4 lg:grid-cols-4 dark:bg-card">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-2 text-[#142F5C] sm:gap-3 lg:justify-center dark:text-foreground"
            >
              <item.icon className="h-5 w-5 shrink-0 sm:h-7 sm:w-7" />
              <div className="min-w-0 leading-tight">
                <p className="text-[11px] font-extrabold sm:text-sm">{item.title}</p>
                <p className="hidden text-xs text-muted-foreground sm:block">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
