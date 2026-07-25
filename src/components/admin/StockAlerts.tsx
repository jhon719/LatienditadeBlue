"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Pencil, Trash2, Loader2, PackageX } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export interface StockProduct {
  id: string
  name: string
  slug: string
  stockQty: number
  image: string | null
}

// Punto pulsante de "señal viva" para las advertencias (naranja = bajo, rojo = crítico)
function PulseDot({ tone }: { tone: "warning" | "critical" }) {
  const color = tone === "critical" ? "bg-red-500" : "bg-[#F5B400]"
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full ${color} opacity-75`}
      />
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${color}`} />
    </span>
  )
}

// Alertas de inventario del dashboard (bóveda 05.03): stock bajo (naranja, animado)
// y agotados (rojo, animado). Cada fila lleva a editar el producto; las agotadas
// ofrecen además eliminar (borra la fila y su imagen en Cloudinary/local).
export function StockAlerts({
  lowStock: initialLow,
  outOfStock: initialOut,
}: {
  lowStock: StockProduct[]
  outOfStock: StockProduct[]
}) {
  const router = useRouter()
  const [low, setLow] = useState(initialLow)
  const [out, setOut] = useState(initialOut)
  const [deleteTarget, setDeleteTarget] = useState<StockProduct | null>(null)
  const [deleting, setDeleting] = useState(false)

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/products/${deleteTarget.id}`, { method: "DELETE" })
      if (res.ok) {
        setOut((p) => p.filter((x) => x.id !== deleteTarget.id))
        setLow((p) => p.filter((x) => x.id !== deleteTarget.id))
        router.refresh()
      }
    } finally {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  if (low.length === 0 && out.length === 0) {
    return (
      <p className="py-6 text-center text-sm text-muted-foreground">
        Todo el inventario está saludable ✨
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {/* Agotados (crítico, rojo) */}
      {out.map((p) => (
        <div
          key={p.id}
          className="flex items-center gap-3 rounded-lg border border-red-300 bg-[#FFEAEA]/50 p-3 dark:border-red-500/40 dark:bg-red-500/10"
        >
          <PulseDot tone="critical" />
          <Link
            href={`/admin/products/${p.id}/edit`}
            className="flex flex-1 items-center gap-3 truncate"
          >
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-muted">
              {p.image && (
                <Image src={p.image} alt={p.name} fill className="object-cover" sizes="36px" />
              )}
            </div>
            <p className="truncate text-sm font-medium">{p.name}</p>
          </Link>
          <Badge className="shrink-0 animate-pulse bg-red-500 text-white hover:bg-red-500">
            <PackageX className="mr-1 h-3 w-3" /> Agotado
          </Badge>
          <div className="flex shrink-0 gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href={`/admin/products/${p.id}/edit`} title="Editar / agregar stock">
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              title="Eliminar producto"
              onClick={() => setDeleteTarget(p)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      {/* Stock bajo (advertencia, naranja) */}
      {low.map((p) => (
        <Link
          key={p.id}
          href={`/admin/products/${p.id}/edit`}
          className="flex items-center gap-3 rounded-lg border border-[#F5B400]/50 bg-[#FFF5D1]/40 p-3 transition-colors hover:bg-[#FFF5D1]/70 dark:bg-[#FFF5D1]/10"
        >
          <PulseDot tone="warning" />
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-muted">
            {p.image && (
              <Image src={p.image} alt={p.name} fill className="object-cover" sizes="36px" />
            )}
          </div>
          <p className="flex-1 truncate text-sm font-medium">{p.name}</p>
          <Badge className="shrink-0 animate-pulse bg-[#F5B400] text-[#142F5C] hover:bg-[#F5B400]">
            Quedan {p.stockQty}
          </Badge>
        </Link>
      ))}

      {/* Confirmación de borrado */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar producto agotado</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará &quot;{deleteTarget?.name}&quot; y su imagen. Si tiene ventas
              registradas se desactivará en lugar de borrarse. Esta acción no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                confirmDelete()
              }}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
