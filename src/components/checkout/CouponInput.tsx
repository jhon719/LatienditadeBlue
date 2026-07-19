"use client"

import { useState } from "react"
import { Loader2, TicketPercent, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface AppliedCoupon {
  code: string
  discount: number
}

interface CouponInputProps {
  subtotal: number
  applied: AppliedCoupon | null
  onApply: (coupon: AppliedCoupon | null) => void
}

// Campo de código de descuento con validación en tiempo real
// (bóveda 06.01 Fase 1 + 05.05 §4)
export function CouponInput({ subtotal, applied, onApply }: CouponInputProps) {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validate = async () => {
    if (!code.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim(), subtotal }),
      })
      const result = await res.json().catch(() => null)
      if (!res.ok || !result?.valid) {
        setError(result?.error ?? "Cupón no válido")
        onApply(null)
        return
      }
      onApply({ code: result.code, discount: result.discount })
      setCode("")
    } finally {
      setLoading(false)
    }
  }

  if (applied) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-[#1E7E34]/30 bg-[#E2FBE9] p-3 dark:bg-[#E2FBE9]/10">
        <span className="flex items-center gap-2 text-sm font-bold text-[#1E7E34]">
          <TicketPercent className="h-4 w-4" />
          {applied.code} aplicado (- S/ {applied.discount.toFixed(2)})
        </span>
        <button
          type="button"
          onClick={() => onApply(null)}
          className="rounded-full p-1 text-[#1E7E34] hover:bg-[#1E7E34]/10"
          aria-label="Quitar cupón"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <TicketPercent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Código de descuento"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase())
              setError(null)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                validate()
              }
            }}
            className="pl-9 uppercase"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          disabled={loading || !code.trim()}
          onClick={validate}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Aplicar"}
        </Button>
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  )
}
