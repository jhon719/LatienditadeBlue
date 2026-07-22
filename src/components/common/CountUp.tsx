"use client"

import { useEffect, useRef, useState } from "react"

// Anima un número de 0 → value cuando entra en viewport (estilo react-bits CountUp).
// Respeta prefers-reduced-motion (muestra el valor final sin animar).
interface CountUpProps {
  value: number
  duration?: number // ms
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export function CountUp({
  value,
  duration = 1100,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CountUpProps) {
  const [display, setDisplay] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  const format = (n: number) =>
    `${prefix}${n.toLocaleString("es-PE", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      setDisplay(value)
      return
    }

    const node = ref.current
    if (!node) {
      setDisplay(value)
      return
    }

    let raf = 0
    const run = () => {
      if (started.current) return
      started.current = true
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1)
        setDisplay(value * easeOutCubic(p))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run()
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(node)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <span ref={ref} className={className}>
      {format(display)}
    </span>
  )
}
