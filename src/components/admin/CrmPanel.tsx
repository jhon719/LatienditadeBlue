"use client"

import { useState } from "react"
import { Loader2, Save, Copy, Check, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
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

// Panel editable de la Ficha 360° (bóveda 05.04 §3) + plantillas de
// mensajes con "Copiar Mensaje" (bóveda 06.02 §5)

const TIER_LABELS: Record<string, string> = {
  NUEVO: "🟡 Cliente nuevo",
  FRECUENTE: "🔵 Coleccionista frecuente",
  VIP: "🟢 Cliente VIP",
  EN_RIESGO: "🔴 Cliente en riesgo",
}

interface CrmPanelProps {
  userId: string
  username: string
  firstName: string | null
  phone: string | null
  initialTier: string
  initialNotes: string
}

export function CrmPanel({
  userId,
  username,
  firstName,
  phone,
  initialTier,
  initialNotes,
}: CrmPanelProps) {
  const [tier, setTier] = useState(initialTier)
  const [notes, setNotes] = useState(initialNotes)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null)

  const dirty = tier !== initialTier || notes !== (initialNotes ?? "")

  const save = async () => {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loyaltyTier: tier, adminNotes: notes || null }),
      })
      if (res.ok) setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  const displayName = firstName || `@${username}`
  const templates: { key: string; label: string; text: string }[] = [
    {
      key: "saludo",
      label: "Saludo / proforma",
      text: `¡Hola ${displayName}! 👋 Soy de La Tiendita de Blue. Aquí tienes el resumen de tu pedido. Cualquier duda me avisas. ✨`,
    },
    {
      key: "aprobado",
      label: "Pago aprobado",
      text: `¡Hola ${displayName}! 🎉 Tu pago fue verificado y aprobado. Ya estamos preparando tu pedido con mucho cuidado. Te aviso apenas salga en camino. 📦`,
    },
    {
      key: "enviado",
      label: "Pedido enviado",
      text: `¡Hola ${displayName}! 🚚 Tu pedido ya está en camino. Tu número de guía es: [GUÍA]. Puedes rastrearlo desde tu perfil en la web. ✨`,
    },
    {
      key: "entregado",
      label: "Post-entrega + reseña",
      text: `¡Hola ${displayName}! 😊 ¿Llegó todo bien con tu figura? Si te gustó, nos ayudaría muchísimo una reseña en la página del producto. ¡Gracias por confiar en La Tiendita de Blue! 💙`,
    },
    {
      key: "preventa",
      label: "Llegada de preventa",
      text: `¡Hola ${displayName}! 🎊 ¡Tu preventa ya llegó a nuestro almacén! Tienes 7 días hábiles para cancelar el saldo restante y coordinar la entrega. ¿Coordinamos?`,
    },
  ]

  const copyTemplate = (key: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedTemplate(key)
    setTimeout(() => setCopiedTemplate(null), 1500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ficha CRM</CardTitle>
          <CardDescription>
            Nivel de fidelidad y notas internas — solo visibles para ti
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {saved && (
            <div className="rounded-md bg-[#E2FBE9] p-3 text-sm font-semibold text-[#1E7E34]">
              Ficha actualizada ✨
            </div>
          )}
          <div className="space-y-2">
            <Label>Nivel de fidelidad</Label>
            <Select value={tier} onValueChange={setTier}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TIER_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Notas del admin</Label>
            <Textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder='Ej. "Prefiere que le escriban por WhatsApp antes de llamar"'
            />
          </div>
          <Button onClick={save} disabled={!dirty || saving} size="sm">
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Guardar ficha
          </Button>
        </CardContent>
      </Card>

      {/* Plantillas de mensajes (bóveda 06.02 §5) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#25D366]" />
            Plantillas de mensajes
          </CardTitle>
          <CardDescription>
            Copia y pega en WhatsApp{phone ? ` (${phone})` : ""} — sin redactar lo
            mismo cada vez
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {templates.map((tpl) => (
            <div
              key={tpl.key}
              className="flex items-center justify-between gap-3 rounded-xl border p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold">{tpl.label}</p>
                <p className="truncate text-xs text-muted-foreground">{tpl.text}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 gap-1 text-xs"
                onClick={() => copyTemplate(tpl.key, tpl.text)}
              >
                {copiedTemplate === tpl.key ? (
                  <Check className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                Copiar
              </Button>
            </div>
          ))}
          {phone && (
            <a
              href={`https://wa.me/51${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#20ba5a]"
            >
              <MessageSquare className="h-4 w-4" />
              Abrir chat de WhatsApp
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
