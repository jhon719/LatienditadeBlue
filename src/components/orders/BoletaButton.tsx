"use client"

import { useState } from "react"
import { FileDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { downloadBoletaPdf, type BoletaOrder } from "@/lib/boleta-pdf"

// Botón cliente para descargar la boleta/comprobante de un pedido en PDF.
export function BoletaButton({
  order,
  size = "sm",
  variant = "outline",
}: {
  order: BoletaOrder
  size?: "sm" | "default"
  variant?: "outline" | "default" | "ghost"
}) {
  const [busy, setBusy] = useState(false)

  const handle = () => {
    setBusy(true)
    try {
      downloadBoletaPdf(order)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Button size={size} variant={variant} className="gap-2" onClick={handle} disabled={busy}>
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FileDown className="h-4 w-4" />
      )}
      Descargar boleta
    </Button>
  )
}
