"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import { useCoarsePointer } from "@/hooks/use-coarse-pointer"

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
}

export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  // En táctiles no hay cursor que seguir: ni handler ni overlay
  const isTouch = useCoarsePointer()

  return (
    <div
      ref={ref}
      className={cn("group relative overflow-hidden", className)}
      onMouseMove={
        isTouch
          ? undefined
          : (event) => {
              const node = ref.current
              if (!node) return
              const rect = node.getBoundingClientRect()
              node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`)
              node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`)
            }
      }
    >
      {!isTouch && (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(180px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(245,180,0,0.22), transparent 55%)" }} />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
