"use client"

import { useState } from "react"
import { Copy, Check, ExternalLink, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

const SHALOM_TRACK_URL = "https://shalom.com.pe/rastrea"

// Plantilla de rastreo Shalom. Shalom no tiene API oficial, así que guiamos al
// cliente: mostramos su guía, botón para copiarla y enlace a shalom.com.pe/rastrea.
export function ShalomTracker({
  trackingNumber,
  className,
}: {
  trackingNumber?: string | null
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    if (!trackingNumber) return
    try {
      await navigator.clipboard.writeText(trackingNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard no disponible */
    }
  }

  return (
    <div
      className={`rounded-2xl border border-[#4A80BE]/30 bg-[#E1F0FF]/40 p-4 dark:border-[#4A80BE]/40 dark:bg-[#101f38]/60 ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 text-sm font-bold text-[#142F5C] dark:text-[#7FB3E8]">
        <Truck className="h-4 w-4" />
        Rastreo de tu encomienda Shalom
      </div>

      {trackingNumber ? (
        <>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <code className="rounded-md bg-card px-2.5 py-1 font-mono text-sm font-semibold shadow-sm">
              {trackingNumber}
            </code>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-8 gap-1.5"
              onClick={copy}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#1E7E34]" /> Copiado
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copiar guía
                </>
              )}
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Pega este código en la página oficial de Shalom para ver el estado de
            tu envío.
          </p>
        </>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">
          Tu número de guía Shalom aparecerá aquí cuando despachemos tu pedido.
          Mientras tanto, coordinamos todo por WhatsApp.
        </p>
      )}

      <a
        href={SHALOM_TRACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#4A80BE] hover:underline"
      >
        Abrir rastreo en Shalom
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}
