import { Fragment, type ReactNode } from "react"
import { cn } from "@/lib/utils"

// Renderiza el mini-formato de mensajes (**negrita** *cursiva* ~~tachado~~) como
// elementos React. NO usa dangerouslySetInnerHTML: todo el texto pasa por nodos
// React (auto-escapados), así que es seguro frente a XSS por construcción.

// Un token de formato no anidado por vez (suficiente para B/I/S)
const TOKEN = /(\*\*[^*\n]+\*\*|~~[^~\n]+~~|\*[^*\n]+\*)/g

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const re = new RegExp(TOKEN)
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      nodes.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>)
    }
    const tok = m[0]
    if (tok.startsWith("**")) {
      nodes.push(<strong key={key++}>{tok.slice(2, -2)}</strong>)
    } else if (tok.startsWith("~~")) {
      nodes.push(<s key={key++}>{tok.slice(2, -2)}</s>)
    } else {
      nodes.push(<em key={key++}>{tok.slice(1, -1)}</em>)
    }
    last = m.index + tok.length
  }
  if (last < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>)
  }
  return nodes
}

export function MessageBody({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const lines = text.split("\n")
  return (
    <div className={cn("space-y-1 whitespace-pre-wrap break-words text-sm", className)}>
      {lines.map((line, i) =>
        line.length === 0 ? (
          <div key={i} className="h-3" aria-hidden />
        ) : (
          <p key={i}>{renderInline(line)}</p>
        )
      )}
    </div>
  )
}
