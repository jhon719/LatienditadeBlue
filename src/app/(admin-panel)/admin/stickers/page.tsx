"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Loader2, Trash2, Sticker as StickerIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

interface Sticker {
  id: string
  name: string
  imageUrl: string
}

export default function StickersPage() {
  const [stickers, setStickers] = useState<Sticker[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Sticker | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/stickers")
      setStickers(res.ok ? await res.json() : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/stickers/${deleteTarget.id}`, { method: "DELETE" })
      if (res.ok) setStickers((s) => s.filter((x) => x.id !== deleteTarget.id))
    } finally {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <StickerIcon className="h-6 w-6 text-primary" /> Stickers
          </h1>
          <p className="text-muted-foreground">
            Stickers de la tienda para usar en los mensajes a clientes
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/stickers/new">
            <Plus className="mr-2 h-4 w-4" /> Crear sticker
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : stickers.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <StickerIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-medium">Aún no hay stickers</p>
              <p className="text-sm text-muted-foreground">
                Crea el primero para animar tus mensajes ✨
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {stickers.map((s) => (
                <div
                  key={s.id}
                  className="group relative flex flex-col items-center gap-2 rounded-xl border bg-card p-3"
                >
                  <div className="relative h-24 w-24">
                    <Image
                      src={s.imageUrl}
                      alt={s.name}
                      fill
                      className="object-contain"
                      sizes="96px"
                    />
                  </div>
                  <p className="max-w-full truncate text-xs font-medium">{s.name}</p>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(s)}
                    className="absolute right-1.5 top-1.5 rounded-full bg-destructive p-1 text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                    title="Eliminar sticker"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar sticker</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará &quot;{deleteTarget?.name}&quot; y su imagen. Los mensajes que
              ya lo usaron conservarán su texto. Esta acción no se puede deshacer.
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
              {deleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
