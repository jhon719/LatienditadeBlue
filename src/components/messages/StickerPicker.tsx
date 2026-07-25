"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Loader2, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface StickerItem {
  id: string
  name: string
  imageUrl: string
}

// Panel de stickers de la tienda. Al hacer clic se adjunta/quita un sticker del
// mensaje (uno por mensaje). Enlaza a crear sticker si faltan.
export function StickerPicker({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (sticker: StickerItem | null) => void
}) {
  const [stickers, setStickers] = useState<StickerItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/stickers")
      .then((r) => (r.ok ? r.json() : []))
      .then(setStickers)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="rounded-md border p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Stickers
        </p>
        <Link
          href="/admin/stickers/new"
          target="_blank"
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          <Plus className="h-3 w-3" /> Crear sticker
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-6">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : stickers.length === 0 ? (
        <p className="py-4 text-center text-xs text-muted-foreground">
          Aún no hay stickers. Crea el primero ✨
        </p>
      ) : (
        <div className="grid max-h-48 grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-5">
          {stickers.map((s) => {
            const active = s.id === selectedId
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelect(active ? null : s)}
                title={s.name}
                className={cn(
                  "relative aspect-square rounded-lg border-2 p-1 transition-colors",
                  active
                    ? "border-primary bg-primary/10"
                    : "border-transparent hover:border-primary/40"
                )}
              >
                <div className="relative h-full w-full">
                  <Image
                    src={s.imageUrl}
                    alt={s.name}
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                {active && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <X className="h-3 w-3" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
