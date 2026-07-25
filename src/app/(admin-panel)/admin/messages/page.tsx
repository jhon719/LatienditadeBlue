"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Loader2, MessageSquare, Users, User, CheckCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { previewText } from "@/lib/rich-text"

interface SentGroup {
  key: string
  body: string
  stickerUrl: string | null
  createdAt: string
  isBroadcast: boolean
  recipients: number
  read: number
  sampleRecipient: string | null
}

export default function AdminMessagesPage() {
  const [groups, setGroups] = useState<SentGroup[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/messages")
      setGroups(res.ok ? await res.json() : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <MessageSquare className="h-6 w-6 text-primary" /> Mensajes
          </h1>
          <p className="text-muted-foreground">
            Mensajes internos enviados a tus clientes
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/messages/new">
            <Plus className="mr-2 h-4 w-4" /> Nuevo mensaje
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : groups.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-medium">Aún no enviaste mensajes</p>
              <p className="text-sm text-muted-foreground">
                Escribe a un cliente o difunde un anuncio a todos.
              </p>
            </div>
          ) : (
            <ul className="divide-y">
              {groups.map((g) => (
                <li key={g.key} className="flex items-start gap-4 p-4">
                  {g.stickerUrl ? (
                    <div className="relative h-12 w-12 shrink-0">
                      <Image
                        src={g.stickerUrl}
                        alt="sticker"
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted">
                      {g.isBroadcast ? (
                        <Users className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <User className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold">
                        {g.isBroadcast
                          ? `Difusión · ${g.recipients} clientes`
                          : `Para @${g.sampleRecipient}`}
                      </span>
                      <Badge variant="secondary" className="gap-1 text-[10px]">
                        <CheckCheck className="h-3 w-3" />
                        {g.read}/{g.recipients} leídos
                      </Badge>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {previewText(g.body)}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {new Date(g.createdAt).toLocaleString("es-PE")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
