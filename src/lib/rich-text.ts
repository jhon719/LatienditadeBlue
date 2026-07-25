// Utilidades para el mini-formato de mensajes: **negrita** *cursiva* ~~tachado~~.
// El texto se guarda con estos marcadores (nunca HTML) y se renderiza con
// <MessageBody/>, que produce elementos React (auto-escapados) → sin XSS.

// Quita los marcadores para vistas de texto plano (previews de bandeja, badges,
// notificaciones). No interpreta el formato, solo lo limpia.
export function stripMarkers(text: string): string {
  return text
    .replace(/\*\*([^*\n]+)\*\*/g, "$1")
    .replace(/~~([^~\n]+)~~/g, "$1")
    .replace(/\*([^*\n]+)\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
}

// Recorte para snippets (lista de bandeja / dropdown de notificaciones)
export function previewText(text: string, max = 90): string {
  const plain = stripMarkers(text)
  return plain.length > max ? `${plain.slice(0, max).trimEnd()}…` : plain
}
