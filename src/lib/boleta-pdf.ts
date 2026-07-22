import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

// Boleta / comprobante interno descargable (jsPDF). SIN validez tributaria aún
// (facturación electrónica SUNAT pendiente) — es un comprobante de la tienda.

type RGB = [number, number, number]
const NAVY: RGB = [20, 47, 92]
const BLUE: RGB = [74, 128, 190]
const YELLOW: RGB = [245, 180, 0]
const GRAY: RGB = [110, 110, 110]

const S = (n: number) =>
  `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const SHIPPING_LABELS: Record<string, string> = {
  PICKUP: "Recojo en tienda",
  LOCAL_DELIVERY: "Motorizado (Lima)",
  NATIONAL_COURIER: "Courier a provincia (Shalom)",
}
const PAYMENT_LABELS: Record<string, string> = {
  MANUAL_TRANSFER: "Yape / Plin / Transferencia",
  MERCADO_PAGO: "Mercado Pago",
}
const STATUS_LABELS: Record<string, string> = {
  PENDING_PAYMENT: "Pendiente de pago",
  VERIFYING_MANUAL: "Verificando pago",
  PAID_APPROVED: "Pago aprobado",
  REJECTED: "Pago rechazado",
  CANCELLED: "Cancelado",
  COMPLETED: "Completado",
}

export interface BoletaOrder {
  processCode: string
  createdAt: string
  status: string
  paymentMethod: string
  shippingType: string
  shippingCost: number
  discountAmount: number
  couponDiscount: number
  couponCode?: string
  totalAmount: number
  receiverName: string
  receiverPhone: string
  deliveryAddress?: string
  trackingNumber?: string
  items: { name: string; quantity: number; price: number }[]
}

function lastY(doc: jsPDF, fallback: number) {
  const t = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable
  return t?.finalY ?? fallback
}

export function downloadBoletaPdf(order: BoletaOrder) {
  const doc = new jsPDF({ unit: "pt", format: "a4" })
  const w = doc.internal.pageSize.getWidth()

  // ── Encabezado de marca ─────────────────────────────────────────
  doc.setFillColor(...NAVY)
  doc.rect(0, 0, w, 70, "F")
  doc.setFillColor(...YELLOW)
  doc.rect(0, 70, w, 4, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  doc.text("La Tiendita de Blue", 40, 32)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(210, 224, 245)
  doc.text("Figuras coleccionables y merch de anime · Perú", 40, 48)
  doc.setTextColor(...YELLOW)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(12)
  doc.text("COMPROBANTE", w - 40, 30, { align: "right" })
  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(13)
  doc.text(order.processCode, w - 40, 48, { align: "right" })

  // ── Datos de la orden y del cliente ─────────────────────────────
  const created = new Date(order.createdAt).toLocaleString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
  let y = 96
  doc.setTextColor(...NAVY)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(10)
  doc.text("Datos del pedido", 40, y)
  doc.text("Entrega", w / 2 + 10, y)
  y += 6
  doc.setDrawColor(...BLUE)
  doc.setLineWidth(0.7)
  doc.line(40, y, w / 2 - 20, y)
  doc.line(w / 2 + 10, y, w - 40, y)
  y += 16

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9)
  doc.setTextColor(60, 60, 60)
  const leftLines = [
    `Fecha: ${created}`,
    `Cliente: ${order.receiverName}`,
    `WhatsApp: ${order.receiverPhone}`,
    `Pago: ${PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}`,
    `Estado: ${STATUS_LABELS[order.status] ?? order.status}`,
  ]
  const rightLines = [
    `Modalidad: ${SHIPPING_LABELS[order.shippingType] ?? order.shippingType}`,
    order.deliveryAddress ? `Dirección: ${order.deliveryAddress}` : "",
    order.trackingNumber ? `Guía / tracking: ${order.trackingNumber}` : "",
  ].filter(Boolean)

  const leftWrapped = leftLines.flatMap((l) => doc.splitTextToSize(l, w / 2 - 65))
  const rightWrapped = rightLines.flatMap((l) => doc.splitTextToSize(l, w / 2 - 55))
  leftWrapped.forEach((l: string, i: number) => doc.text(l, 40, y + i * 13))
  rightWrapped.forEach((l: string, i: number) => doc.text(l, w / 2 + 10, y + i * 13))
  y += Math.max(leftWrapped.length, rightWrapped.length) * 13 + 12

  // ── Tabla de productos ──────────────────────────────────────────
  const subtotal = order.items.reduce((a, it) => a + it.price * it.quantity, 0)
  autoTable(doc, {
    startY: y,
    margin: { left: 40, right: 40 },
    head: [["Producto", "Cant.", "P. unit.", "Importe"]],
    body: order.items.map((it) => [
      it.name,
      String(it.quantity),
      S(it.price),
      S(it.price * it.quantity),
    ]),
    styles: { fontSize: 9, cellPadding: 5 },
    headStyles: { fillColor: NAVY, textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [237, 243, 251] },
    columnStyles: {
      1: { halign: "center", cellWidth: 45 },
      2: { halign: "right", cellWidth: 75 },
      3: { halign: "right", cellWidth: 85 },
    },
  })

  // ── Totales ─────────────────────────────────────────────────────
  let ty = lastY(doc, y) + 16
  const discount = order.discountAmount + order.couponDiscount
  const rows: [string, string][] = [["Subtotal", S(subtotal)]]
  if (order.discountAmount > 0)
    rows.push(["Descuento combos", `- ${S(order.discountAmount)}`])
  if (order.couponDiscount > 0)
    rows.push([
      `Cupón${order.couponCode ? ` (${order.couponCode})` : ""}`,
      `- ${S(order.couponDiscount)}`,
    ])
  rows.push([
    "Envío",
    order.shippingCost > 0 ? S(order.shippingCost) : "Por coordinar",
  ])

  const boxX = w - 40 - 250
  doc.setFontSize(9)
  rows.forEach(([label, val]) => {
    doc.setTextColor(90, 90, 90)
    doc.setFont("helvetica", "normal")
    doc.text(label, boxX, ty)
    doc.setTextColor(40, 40, 40)
    doc.text(val, w - 40, ty, { align: "right" })
    ty += 15
  })
  // Total destacado
  doc.setFillColor(...NAVY)
  doc.roundedRect(boxX - 10, ty - 2, 260, 26, 4, 4, "F")
  doc.setTextColor(...YELLOW)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  doc.text("TOTAL", boxX, ty + 15)
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(13)
  doc.text(S(order.totalAmount), w - 40, ty + 15, { align: "right" })
  void discount

  // ── Pie ─────────────────────────────────────────────────────────
  const h = doc.internal.pageSize.getHeight()
  doc.setTextColor(...GRAY)
  doc.setFont("helvetica", "italic")
  doc.setFontSize(7.5)
  doc.text(
    "Comprobante interno de La Tiendita de Blue, sin validez tributaria (facturación electrónica SUNAT pendiente).",
    40,
    h - 44
  )
  doc.setFont("helvetica", "normal")
  doc.text(
    "Coordinación de entregas por WhatsApp · ¡Gracias por tu compra! ✨",
    40,
    h - 32
  )
  doc.text(`Generado ${new Date().toLocaleString("es-PE")}`, w - 40, h - 32, {
    align: "right",
  })

  doc.save(`boleta_${order.processCode}.pdf`)
}
