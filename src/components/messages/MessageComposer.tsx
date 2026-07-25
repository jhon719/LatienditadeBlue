"use client"

import { useRef } from "react"
import { Bold, Italic, Strikethrough } from "lucide-react"
import { Button } from "@/components/ui/button"

// Área de texto con barra B/I/S. Envuelve la selección con marcadores seguros
// (**  *  ~~). Guarda texto plano; el render lo hace <MessageBody/>.
export function MessageComposer({
  value,
  onChange,
  placeholder = "Escribe tu mensaje…",
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  const ref = useRef<HTMLTextAreaElement>(null)

  const wrap = (marker: string) => {
    const el = ref.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end) || "texto"
    const next = value.slice(0, start) + marker + selected + marker + value.slice(end)
    onChange(next)
    // Re-selecciona el contenido envuelto para seguir editando
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + marker.length, start + marker.length + selected.length)
    })
  }

  return (
    <div className="rounded-md border bg-background focus-within:ring-2 focus-within:ring-ring/40">
      <div className="flex items-center gap-1 border-b p-1.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => wrap("**")}
          title="Negrita"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => wrap("*")}
          title="Cursiva"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => wrap("~~")}
          title="Tachado"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        <span className="ml-auto pr-2 text-[11px] text-muted-foreground">
          **negrita** · *cursiva* · ~~tachado~~
        </span>
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        placeholder={placeholder}
        className="w-full resize-y bg-transparent p-3 text-sm outline-none"
      />
    </div>
  )
}
