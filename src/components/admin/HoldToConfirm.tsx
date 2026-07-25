"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Unlock, Loader2 } from "lucide-react"

// Botón "mantener presionado para confirmar": exige sostener ~2 s para disparar
// una acción irreversible (liberar separación). Un relleno crece de izquierda a
// derecha mientras se presiona; soltar antes del 100% cancela. Anti clic accidental.
export function HoldToConfirm({
  onConfirm,
  duration = 2000,
  label = "Mantén presionado para liberar",
  holdingLabel = "Sigue presionando",
  loading = false,
}: {
  onConfirm: () => void
  duration?: number
  label?: string
  holdingLabel?: string
  loading?: boolean
}) {
  const [progress, setProgress] = useState(0)
  const [holding, setHolding] = useState(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef(0)
  const firedRef = useRef(false)

  const clear = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }, [])

  const stop = useCallback(() => {
    clear()
    setHolding(false)
    if (!firedRef.current) setProgress(0)
  }, [clear])

  const start = useCallback(() => {
    if (loading || firedRef.current) return
    setHolding(true)
    startRef.current = performance.now()
    // Bucle de animación local y auto-recursivo (declaración hoisted → sin TDZ)
    function loop(now: number) {
      const pct = Math.min(100, ((now - startRef.current) / duration) * 100)
      setProgress(pct)
      if (pct >= 100) {
        firedRef.current = true
        setHolding(false)
        rafRef.current = null
        onConfirm()
        return
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
  }, [loading, duration, onConfirm])

  // Limpieza si el componente se desmonta a mitad de la pulsación
  useEffect(() => clear, [clear])

  const text = loading
    ? "Liberando…"
    : holding
      ? `${holdingLabel} ${Math.round(progress)}%`
      : label

  return (
    <button
      type="button"
      onPointerDown={start}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      disabled={loading}
      className="relative w-full touch-none select-none overflow-hidden rounded-md border-2 border-destructive bg-background px-4 py-3 text-sm font-bold text-destructive transition-colors disabled:opacity-70"
    >
      {/* Relleno de "carga" mientras se mantiene presionado */}
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 bg-destructive/15"
        style={{ width: `${progress}%` }}
      />
      {/* Barra sólida de progreso en el borde inferior */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-1 bg-destructive"
        style={{ width: `${progress}%` }}
      />
      <span className="relative flex items-center justify-center gap-2">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Unlock className="h-4 w-4" />
        )}
        {text}
      </span>
    </button>
  )
}
