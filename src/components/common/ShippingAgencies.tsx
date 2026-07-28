import Image from "next/image"
import { Truck } from "lucide-react"
import { cn } from "@/lib/utils"

// Agencias de envio a provincia (bóveda: NATIONAL_COURIER). Mismo patrón de
// chip fijo + object-contain que PaymentMethods para que ambos logos midan
// igual sin importar la resolucion original del archivo.
const SHIPPING_LOGOS = [
  { name: "Shalom", src: "/Imagenes/Pagos/shalom.svg" },
  { name: "Olva", src: "/Imagenes/Pagos/OLVA.jpg" },
]

/**
 * Tira de agencias de envio a provincia.
 * `variant="dark"` para fondos oscuros (footer), `"light"` para el resto.
 */
export function ShippingAgencies({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark"
  className?: string
}) {
  const isDark = variant === "dark"

  return (
    <div className={className}>
      <p
        className={cn(
          "flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide",
          isDark ? "text-white/70" : "text-muted-foreground"
        )}
      >
        <Truck className="h-4 w-4 shrink-0 text-[#F5B400]" />
        Envios a provincia por agencia
      </p>

      <ul className="mt-3 flex flex-wrap gap-2">
        {SHIPPING_LOGOS.map((logo) => (
          <li
            key={logo.name}
            title={logo.name}
            className={cn(
              "flex h-11 w-16 shrink-0 items-center justify-center rounded-xl border bg-white p-2",
              isDark ? "border-white/15" : "border-border"
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain"
                sizes="64px"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
