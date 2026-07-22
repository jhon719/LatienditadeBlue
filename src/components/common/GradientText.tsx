import { cn } from "@/lib/utils"

// Texto con degradado de marca animado (estilo react-bits GradientText).
// Envuelve el contenido en un span con clip de degradado en movimiento.
export function GradientText({
  children,
  className,
  animate = true,
}: {
  children: React.ReactNode
  className?: string
  animate?: boolean
}) {
  return (
    <span
      className={cn(
        "text-gradient-brand",
        animate && "animate-gradient-text",
        className
      )}
    >
      {children}
    </span>
  )
}
