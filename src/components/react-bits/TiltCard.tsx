"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  return (
    <div
      ref={ref}
      className={cn("transition-transform duration-200 ease-out", className)}
      onMouseMove={(event) => {
        const node = ref.current
        if (!node) return
        const rect = node.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width - 0.5
        const py = (event.clientY - rect.top) / rect.height - 0.5
        node.style.transform = `perspective(900px) rotateX(${-py * 5}deg) rotateY(${px * 5}deg) translateY(-3px)`
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)"
      }}
    >
      {children}
    </div>
  )
}
