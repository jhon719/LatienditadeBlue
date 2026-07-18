"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { UploadCloud, CheckCircle, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ManualPaymentSectionProps {
  voucherUrl: string | null
  onVoucherChange: (url: string | null) => void
  operationNumber: string
  onOperationNumberChange: (value: string) => void
}

// Plantilla de pago manual (bóveda 03.02): QRs de Yape/Plin y cuenta bancaria
// desde public/Imagenes/Pagos, con subida de voucher
export function ManualPaymentSection({
  voucherUrl,
  onVoucherChange,
  operationNumber,
  onOperationNumberChange,
}: ManualPaymentSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "vouchers")
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      if (!res.ok) {
        const result = await res.json().catch(() => null)
        setError(result?.error ?? "Error al subir el comprobante")
        return
      }
      const result = await res.json()
      onVoucherChange(result.url)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
      <div className="text-center">
        <h3 className="font-bold text-lg">Pago por Transferencia / Billetera Digital</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Escanea el código QR desde tu app o transfiere a la cuenta indicada.
          Luego sube la captura de tu comprobante.
        </p>
      </div>

      {/* QRs locales (bóveda 03.02) */}
      <div className="flex flex-col justify-center gap-6 py-2 sm:flex-row">
        <div className="space-y-2 text-center">
          <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-xl border-2 border-[#742284]">
            <Image
              src="/Imagenes/Pagos/YAPE QR.jpeg"
              alt="QR Yape"
              fill
              className="object-cover"
              sizes="144px"
            />
          </div>
          <span className="block text-sm font-bold text-[#742284]">Yape</span>
        </div>

        <div className="space-y-2 text-center">
          <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-xl border-2 border-[#00B4D8]">
            <Image
              src="/Imagenes/Pagos/PLIN QR.jpeg"
              alt="QR Plin"
              fill
              className="object-cover"
              sizes="144px"
            />
          </div>
          <span className="block text-sm font-bold text-[#00B4D8]">Plin</span>
        </div>

        <div className="space-y-2 text-center">
          <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-xl border-2 border-border">
            <Image
              src="/Imagenes/Pagos/NRO Banco.jpg"
              alt="Cuenta bancaria"
              fill
              className="object-contain bg-white"
              sizes="144px"
            />
          </div>
          <span className="block text-sm font-bold text-muted-foreground">
            Transferencia bancaria
          </span>
        </div>
      </div>

      {/* Número de operación */}
      <div className="space-y-2">
        <Label htmlFor="operationNumber">Número de operación</Label>
        <Input
          id="operationNumber"
          placeholder="Ej. 00123456"
          value={operationNumber}
          onChange={(e) => onOperationNumberChange(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Lo encuentras en el detalle de tu transferencia o pago QR.
        </p>
      </div>

      {/* Subida del voucher */}
      <div className="border-t border-border pt-5">
        <h4 className="mb-3 text-sm font-bold">Sube tu comprobante de pago</h4>

        {!voucherUrl ? (
          <>
            <button
              type="button"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-6 font-medium text-muted-foreground transition-colors hover:border-primary hover:bg-secondary/50"
            >
              {uploading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <UploadCloud size={20} />
              )}
              <span>{uploading ? "Subiendo..." : "Adjuntar Captura o Foto"}</span>
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFile(file)
                e.target.value = ""
              }}
            />
          </>
        ) : (
          <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <CheckCircle size={20} />
              <span className="text-sm font-semibold">
                Comprobante adjuntado con éxito
              </span>
            </div>
            <button
              type="button"
              onClick={() => onVoucherChange(null)}
              className="text-xs font-medium text-red-500 hover:underline"
            >
              Reemplazar
            </button>
          </div>
        )}
        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </div>
    </div>
  )
}
