"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// Interruptor animado de modo claro/oscuro (aplica a toda la página vía
// next-themes, que alterna la clase .dark en <html>). Estilo píldora deslizante.
export function AnimatedThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const current = theme === "system" ? systemTheme : theme
  const isDark = current === "dark"

  if (!mounted) {
    return (
      <>
        <div className={cn("h-9 w-9 rounded-full bg-muted sm:hidden", className)} />
        <div className={cn("hidden h-8 w-[60px] rounded-full bg-muted sm:block", className)} />
      </>
    )
  }

  return (
    <>
      {/* Movil: boton compacto (mismo tamaño que el resto de accesos del
          header) — el switch tipo pildora de 60px no cabe junto al wordmark
          en pantallas angostas (~360px). */}
      <button
        type="button"
        aria-label="Cambiar modo claro/oscuro"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-500 sm:hidden",
          isDark
            ? "border-[#4A80BE]/40 bg-[#0f213e] text-[#F5B400]"
            : "border-[#F5B400]/50 bg-[#FFF5D1] text-[#F5B400]",
          className
        )}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>

      {/* Escritorio: switch deslizante animado */}
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label="Cambiar modo claro/oscuro"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "relative hidden h-8 w-[60px] items-center rounded-full border transition-colors duration-500 sm:inline-flex",
          isDark
            ? "border-[#4A80BE]/40 bg-[#0f213e]"
            : "border-[#F5B400]/50 bg-[#FFF5D1]",
          className
        )}
      >
        {/* Estrellas (modo oscuro) */}
        <span
          className={cn(
            "absolute right-2 top-1.5 h-1 w-1 rounded-full bg-white transition-opacity duration-500",
            isDark ? "opacity-80" : "opacity-0"
          )}
        />
        <span
          className={cn(
            "absolute right-4 top-3.5 h-0.5 w-0.5 rounded-full bg-white transition-opacity duration-700",
            isDark ? "opacity-60" : "opacity-0"
          )}
        />
        {/* Perilla deslizante con sol/luna */}
        <span
          className={cn(
            "z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
            isDark
              ? "translate-x-[30px] bg-[#142F5C] text-[#F5B400]"
              : "translate-x-[3px] bg-white text-[#F5B400]"
          )}
        >
          <Sun
            className={cn(
              "absolute h-3.5 w-3.5 transition-all duration-500",
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            )}
          />
          <Moon
            className={cn(
              "absolute h-3.5 w-3.5 transition-all duration-500",
              isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            )}
          />
        </span>
      </button>
    </>
  )
}
