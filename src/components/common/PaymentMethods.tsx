import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { PAYMENT_METHODS } from "@/lib/payment-methods"

/**
 * Tira de métodos de pago aceptados.
 * `variant="dark"` para fondos oscuros (footer), `"light"` para el resto.
 */
export function PaymentMethods({
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
        <ShieldCheck className="h-4 w-4 shrink-0 text-[#F5B400]" />
        Metodos de pago aceptados
      </p>

      <ul className="mt-3 flex flex-wrap gap-2">
        {PAYMENT_METHODS.map((method) => (
          <li
            key={method.id}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-3 py-2",
              isDark ? "border-white/15 bg-white/10" : "border-border bg-card"
            )}
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white"
              style={{ backgroundColor: method.accent }}
            >
              <method.icon className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span
                className={cn(
                  "block text-xs font-extrabold",
                  isDark ? "text-white" : "text-foreground"
                )}
              >
                {method.name}
              </span>
              <span
                className={cn(
                  "block text-[10px]",
                  isDark ? "text-white/60" : "text-muted-foreground"
                )}
              >
                {method.detail}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
