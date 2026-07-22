import { cn } from "@/lib/utils"

// Cinta horizontal infinita (estilo react-bits Marquee). Duplica los hijos para
// un loop continuo y se pausa al hover. Usa la keyframe global `marquee-slow`.
export function Marquee({
  children,
  className,
  itemClassName,
  pauseOnHover = true,
}: {
  children: React.ReactNode[]
  className?: string
  itemClassName?: string
  pauseOnHover?: boolean
}) {
  return (
    <div
      className={cn(
        "group/marquee relative flex overflow-hidden",
        // Difumina los bordes izquierdo/derecho
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-8 pr-8 animate-marquee-slow",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]"
        )}
        aria-hidden={false}
      >
        {children.map((c, i) => (
          <span key={i} className={itemClassName}>
            {c}
          </span>
        ))}
      </div>
      {/* Copia para el loop sin costuras */}
      <div
        className={cn(
          "flex shrink-0 items-center gap-8 pr-8 animate-marquee-slow",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]"
        )}
        aria-hidden
      >
        {children.map((c, i) => (
          <span key={i} className={itemClassName}>
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}
