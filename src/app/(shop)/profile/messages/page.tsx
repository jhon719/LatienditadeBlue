"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { Loader2, MessageSquare, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MessageBody } from "@/components/messages/MessageBody"
import { previewText } from "@/lib/rich-text"

interface Msg {
  id: string
  body: string
  sticker: { name: string; imageUrl: string } | null
  readAt: string | null
  createdAt: string
}

export default function ProfileMessagesPage() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [loading, setLoading] = useState(true)
  const [openId, setOpenId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/user/messages")
      setMessages(res.ok ? await res.json() : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const toggle = async (m: Msg) => {
    const next = openId === m.id ? null : m.id
    setOpenId(next)
    if (next && !m.readAt) {
      // Marca leído al abrir y refresca el badge del header
      await fetch(`/api/user/messages/${m.id}/read`, { method: "PATCH" }).catch(() => {})
      setMessages((prev) =>
        prev.map((x) =>
          x.id === m.id ? { ...x, readAt: new Date().toISOString() } : x
        )
      )
      window.dispatchEvent(new Event("messages:updated"))
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold">Mensajes</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : messages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="font-medium">No tienes mensajes</p>
            <p className="text-sm text-muted-foreground">
              Aquí verás los mensajes del equipo de La Tiendita 💙
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => {
            const unread = !m.readAt
            const isOpen = openId === m.id
            return (
              <Card
                key={m.id}
                className={cn(
                  "overflow-hidden transition-colors",
                  unread && "border-primary/40 bg-[#E1F0FF]/30 dark:bg-primary/5"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(m)}
                  className="flex w-full items-center gap-3 p-4 text-left"
                >
                  {unread && (
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4A80BE] opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#4A80BE]" />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className={cn("truncate text-sm", unread ? "font-bold" : "font-medium")}>
                      {previewText(m.body)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(m.createdAt).toLocaleString("es-PE")}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="border-t px-4 pb-4 pt-3">
                    <MessageBody text={m.body} />
                    {m.sticker && (
                      <div className="relative mt-3 h-24 w-24">
                        <Image
                          src={m.sticker.imageUrl}
                          alt={m.sticker.name}
                          fill
                          className="object-contain"
                          sizes="96px"
                        />
                      </div>
                    )}
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
