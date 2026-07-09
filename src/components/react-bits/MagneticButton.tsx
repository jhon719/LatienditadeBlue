"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number
}

export function MagneticButton({
  children,
  className,
  strength = 0.25,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <button
      ref={ref}
      className={cn("transition-transform duration-200 ease-out", className)}
      onMouseMove={(event) => {
        const node = ref.current
        if (node) {
          const rect = node.getBoundingClientRect()
          const x = (event.clientX - rect.left - rect.width / 2) * strength
          const y = (event.clientY - rect.top - rect.height / 2) * strength
          node.style.transform = `translate(${x}px, ${y}px)`
        }
        onMouseMove?.(event)
      }}
      onMouseLeave={(event) => {
        if (ref.current) ref.current.style.transform = "translate(0, 0)"
        onMouseLeave?.(event)
      }}
      {...props}
    >
      {children}
    </button>
  )
}
