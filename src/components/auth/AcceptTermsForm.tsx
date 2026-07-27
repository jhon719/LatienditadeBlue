"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, ScrollText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AcceptTermsForm({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onAccept = async () => {
    setError(null)
    setSubmitting(true)
    try {
      const response = await fetch("/api/user/accept-terms", { method: "POST" })
      if (!response.ok) {
        setError("No se pudo registrar tu aceptación. Intenta de nuevo.")
        return
      }
      router.push(callbackUrl)
      router.refresh()
    } catch {
      setError("No se pudo registrar tu aceptación. Intenta de nuevo.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-dashed border-primary/40 bg-[#E1F0FF]/30 p-4 text-sm text-muted-foreground dark:bg-primary/10">
        <p className="flex items-center gap-2 font-bold text-foreground">
          <ScrollText className="h-4 w-4 shrink-0 text-[#4A80BE]" /> Puntos clave
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Las preventas se reservan con un 15% no reembolsable.</li>
          <li>Los tiempos de envío y llegada de preventas son estimados.</li>
          <li>No se aceptan devoluciones de productos abiertos o manipulados.</li>
        </ul>
      </div>

      <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-[#4A80BE]"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span>
          He leído y acepto los{" "}
          <Link href="/terms" target="_blank" className="font-semibold text-primary underline">
            Términos y Condiciones
          </Link>{" "}
          completos de La Tiendita de Blue.
        </span>
      </label>

      <Button
        type="button"
        className="w-full"
        disabled={!checked || submitting}
        onClick={onAccept}
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Guardando...
          </>
        ) : (
          "Aceptar y continuar"
        )}
      </Button>
    </div>
  )
}
