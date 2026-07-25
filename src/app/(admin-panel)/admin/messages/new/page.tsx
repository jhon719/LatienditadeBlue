"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Loader2, Send, Search, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MessageComposer } from "@/components/messages/MessageComposer"
import { MessageBody } from "@/components/messages/MessageBody"
import { StickerPicker, type StickerItem } from "@/components/messages/StickerPicker"

interface UserLite {
  id: string
  username: string
  email: string
  firstName: string | null
  lastName: string | null
  role: string
}

type TargetType = "user" | "all" | "tier"

const TIERS = [
  { value: "NUEVO", label: "Nuevos" },
  { value: "FRECUENTE", label: "Frecuentes" },
  { value: "VIP", label: "VIP" },
  { value: "EN_RIESGO", label: "En riesgo" },
]

export default function NewMessagePage() {
  const searchParams = useSearchParams()
  const prefillUserId = searchParams.get("userId")

  const [targetType, setTargetType] = useState<TargetType>("user")
  const [users, setUsers] = useState<UserLite[]>([])
  const [selectedUser, setSelectedUser] = useState<UserLite | null>(null)
  const [userSearch, setUserSearch] = useState("")
  const [tier, setTier] = useState("NUEVO")

  const [body, setBody] = useState("")
  const [sticker, setSticker] = useState<StickerItem | null>(null)

  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/users?role=customer")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: UserLite[]) => {
        setUsers(data)
        if (prefillUserId) {
          const u = data.find((x) => x.id === prefillUserId)
          if (u) {
            setSelectedUser(u)
            setTargetType("user")
          }
        }
      })
      .catch(() => {})
  }, [prefillUserId])

  const filteredUsers = useMemo(() => {
    const q = userSearch.trim().toLowerCase()
    if (!q) return users.slice(0, 8)
    return users
      .filter(
        (u) =>
          u.username.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          `${u.firstName ?? ""} ${u.lastName ?? ""}`.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [users, userSearch])

  const canSend =
    body.trim().length > 0 &&
    (targetType !== "user" || !!selectedUser)

  const send = async () => {
    setError(null)
    setSending(true)
    try {
      const res = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType,
          userId: targetType === "user" ? selectedUser?.id : undefined,
          tier: targetType === "tier" ? tier : undefined,
          body,
          stickerId: sticker?.id ?? null,
        }),
      })
      const r = await res.json().catch(() => null)
      if (!res.ok) {
        setError(r?.error ?? "No se pudo enviar el mensaje")
        return
      }
      setDone(r?.count ?? 1)
    } finally {
      setSending(false)
    }
  }

  const userLabel = (u: UserLite) =>
    u.firstName || u.lastName
      ? `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim()
      : `@${u.username}`

  if (done !== null) {
    return (
      <div className="mx-auto max-w-lg py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E2FBE9] text-[#1E7E34]">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold">Mensaje enviado</h1>
        <p className="mt-2 text-muted-foreground">
          Se entregó a {done} {done === 1 ? "usuario" : "usuarios"}.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild>
            <Link href="/admin/messages">Ver enviados</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setDone(null)
              setBody("")
              setSticker(null)
            }}
          >
            Enviar otro
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/messages">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Send className="h-6 w-6 text-primary" /> Nuevo mensaje
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Destinatario */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Para</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { v: "user", l: "Un usuario" },
                    { v: "all", l: "Todos los clientes" },
                    { v: "tier", l: "Por tier" },
                  ] as const
                ).map((opt) => (
                  <Button
                    key={opt.v}
                    type="button"
                    variant={targetType === opt.v ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTargetType(opt.v)}
                  >
                    {opt.l}
                  </Button>
                ))}
              </div>

              {targetType === "user" && (
                <div className="space-y-2">
                  {selectedUser ? (
                    <div className="flex items-center justify-between rounded-lg border bg-muted/40 p-3">
                      <div>
                        <p className="text-sm font-semibold">{userLabel(selectedUser)}</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedUser.email}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedUser(null)}
                      >
                        Cambiar
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Buscar por nombre, @usuario o email"
                          value={userSearch}
                          onChange={(e) => setUserSearch(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <div className="max-h-56 space-y-1 overflow-y-auto">
                        {filteredUsers.map((u) => (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => setSelectedUser(u)}
                            className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
                          >
                            <span className="font-medium">{userLabel(u)}</span>
                            <span className="text-xs text-muted-foreground">
                              {u.email}
                            </span>
                          </button>
                        ))}
                        {filteredUsers.length === 0 && (
                          <p className="px-3 py-2 text-sm text-muted-foreground">
                            Sin coincidencias
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {targetType === "all" && (
                <p className="rounded-md bg-[#FFF5D1]/40 p-3 text-sm text-[#8a6d00]">
                  Se enviará a <strong>todos los clientes</strong> registrados.
                </p>
              )}

              {targetType === "tier" && (
                <div className="space-y-1.5">
                  <Label className="text-xs">Segmento de lealtad</Label>
                  <Select value={tier} onValueChange={setTier}>
                    <SelectTrigger className="w-[220px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIERS.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mensaje */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mensaje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MessageComposer value={body} onChange={setBody} />
              <StickerPicker
                selectedId={sticker?.id ?? null}
                onSelect={setSticker}
              />
            </CardContent>
          </Card>
        </div>

        {/* Preview + enviar */}
        <div className="space-y-4">
          <Card className="lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle className="text-base">Vista previa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border bg-muted/30 p-4">
                {body.trim() ? (
                  <MessageBody text={body} />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Tu mensaje aparecerá aquí…
                  </p>
                )}
                {sticker && (
                  <div className="relative mt-3 h-20 w-20">
                    <Image
                      src={sticker.imageUrl}
                      alt={sticker.name}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <Button className="w-full" onClick={send} disabled={!canSend || sending}>
                {sending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Enviar mensaje
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
