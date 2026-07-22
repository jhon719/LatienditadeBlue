import { cn } from "@/lib/utils"

export type SemaphoreLevel = "ok" | "warning" | "overdue" | "done"

const SEMAPHORE_STYLES: Record<SemaphoreLevel, { badge: string; dot: string }> = {
  ok: { badge: "bg-[#E2FBE9] text-[#1E7E34]", dot: "bg-[#1E7E34]" },
  warning: { badge: "bg-[#FFF5D1] text-[#8a6d00]", dot: "bg-[#F5B400]" },
  overdue: { badge: "bg-[#FFEAEA] text-red-600", dot: "bg-red-500" },
  done: { badge: "bg-[#E1F0FF] text-[#142F5C]", dot: "bg-[#4A80BE]" },
}

// Semáforo de cobranza (bóveda 05.06 §3): 🟢 en plazo · 🟡 por vencer · 🔴 vencido
export function SemaphoreBadge({
  level,
  label,
  className,
}: {
  level: SemaphoreLevel
  label: string
  className?: string
}) {
  const s = SEMAPHORE_STYLES[level]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        s.badge,
        className
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          s.dot,
          level === "warning" && "animate-pulse"
        )}
      />
      {label}
    </span>
  )
}

// Barra de progreso de pago de una separación
export function ProgressBar({
  progress,
  className,
}: {
  progress: number
  className?: string
}) {
  const done = progress >= 100
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
      <div
        className={cn(
          "h-full rounded-full transition-all",
          done ? "bg-[#1E7E34]" : "bg-[#4A80BE]"
        )}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  )
}
