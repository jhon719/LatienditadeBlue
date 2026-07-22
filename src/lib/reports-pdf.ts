import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

// Generación de PDF en el cliente para los reportes del panel admin.
// Paleta de marca: azul oscuro #142F5C, azul #4A80BE, amarillo #F5B400.

type RGB = [number, number, number]
const NAVY: RGB = [20, 47, 92]
const BLUE: RGB = [74, 128, 190]
const YELLOW: RGB = [245, 180, 0]
const GRAY: RGB = [110, 110, 110]

const S = (n: number) =>
  `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const fecha = (iso: string) =>
  new Date(iso).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

function drawHeader(doc: jsPDF, title: string, subtitle: string) {
  const w = doc.internal.pageSize.getWidth()
  // Barra superior de marca
  doc.setFillColor(...NAVY)
  doc.rect(0, 0, w, 46, "F")
  doc.setFillColor(...YELLOW)
  doc.rect(0, 46, w, 3, "F")

  doc.setTextColor(255, 255, 255)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(15)
  doc.text("La Tiendita de Blue", 40, 26)

  doc.setTextColor(...YELLOW)
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text(title.toUpperCase(), w - 40, 22, { align: "right" })
  doc.setTextColor(220, 230, 245)
  doc.setFont("helvetica", "normal")
  doc.setFontSize(8)
  doc.text(subtitle, w - 40, 35, { align: "right" })
}

function drawFooter(doc: jsPDF) {
  const pages = doc.getNumberOfPages()
  const w = doc.internal.pageSize.getWidth()
  const h = doc.internal.pageSize.getHeight()
  const stamp = `Generado ${new Date().toLocaleString("es-PE")}`
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    doc.setTextColor(...GRAY)
    doc.setFontSize(7.5)
    doc.setFont("helvetica", "normal")
    doc.text(stamp, 40, h - 18)
    doc.text(`Página ${i} de ${pages}`, w - 40, h - 18, { align: "right" })
  }
}

function lastY(doc: jsPDF, fallback: number) {
  const t = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable
  return t?.finalY ?? fallback
}

// ------------------------------ USUARIOS ------------------------------

export interface UserReportRow {
  username: string
  fullName: string | null
  email: string
  phone: string | null
  dni: string | null
  department: string | null
  role: string
  loyaltyTier: string
  tiktokUsername: string | null
  ordersCount: number
  totalSpent: number
  createdAt: string
}

export function downloadUsersPdf(data: {
  generatedAt: string
  users: UserReportRow[]
}) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" })
  drawHeader(
    doc,
    "Reporte de usuarios",
    `${data.users.length} usuarios registrados`
  )

  autoTable(doc, {
    startY: 62,
    margin: { left: 40, right: 40 },
    head: [
      [
        "Usuario",
        "Nombre",
        "TikTok",
        "Email",
        "WhatsApp",
        "Depto.",
        "Rol",
        "Pedidos",
        "Gastado",
        "Alta",
      ],
    ],
    body: data.users.map((u) => [
      u.username,
      u.fullName ?? "—",
      u.tiktokUsername ?? "—",
      u.email,
      u.phone ?? "—",
      u.department ?? "—",
      u.role === "ADMIN" ? "Admin" : "Cliente",
      String(u.ordersCount),
      S(u.totalSpent),
      fecha(u.createdAt),
    ]),
    styles: { fontSize: 7.5, cellPadding: 3, overflow: "linebreak" },
    headStyles: { fillColor: NAVY, textColor: 255, fontStyle: "bold", fontSize: 7.5 },
    alternateRowStyles: { fillColor: [237, 243, 251] },
    columnStyles: {
      3: { cellWidth: 130 },
      7: { halign: "center" },
      8: { halign: "right" },
    },
  })

  drawFooter(doc)
  doc.save(`usuarios_${new Date().toISOString().slice(0, 10)}.pdf`)
}

// ------------------------------ ENTREGAS ------------------------------

export interface DeliveryRow {
  processCode: string
  shippingStatus: string
  receiverName: string
  receiverPhone: string
  deliveryAddress: string | null
  trackingNumber: string | null
  department: string | null
  tiktokUsername: string | null
  buyer: string
  buyerPhone: string | null
  dni: string | null
  items: string
  total: number
  shippingCost: number
  createdAt: string
}

export interface DeliveriesReport {
  generatedAt: string
  total: number
  groups: { pickup: DeliveryRow[]; local: DeliveryRow[]; courier: DeliveryRow[] }
}

const estadoEnvio = (s: string) =>
  s === "SHIPPED" ? "Enviado" : s === "DELIVERED" ? "Entregado" : "Preparando"

export function downloadDeliveriesPdf(data: DeliveriesReport) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" })
  drawHeader(
    doc,
    "Entregas disponibles",
    `${data.total} pedidos pagados por entregar`
  )
  const w = doc.internal.pageSize.getWidth()

  const section = (
    title: string,
    color: RGB,
    rows: DeliveryRow[],
    head: string[],
    body: (r: DeliveryRow) => (string | number)[],
    startY: number
  ) => {
    // Encabezado de sección
    doc.setFillColor(...color)
    doc.rect(40, startY, w - 80, 18, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.text(`${title}  ·  ${rows.length}`, 46, startY + 12.5)

    if (rows.length === 0) {
      doc.setTextColor(...GRAY)
      doc.setFont("helvetica", "italic")
      doc.setFontSize(8)
      doc.text("Sin pedidos en esta modalidad.", 46, startY + 32)
      return startY + 44
    }

    autoTable(doc, {
      startY: startY + 22,
      margin: { left: 40, right: 40 },
      head: [head],
      body: rows.map(body),
      styles: { fontSize: 7.5, cellPadding: 3, overflow: "linebreak" },
      headStyles: { fillColor: color, textColor: 255, fontStyle: "bold", fontSize: 7.5 },
      alternateRowStyles: { fillColor: [245, 247, 250] },
    })
    return lastY(doc, startY + 22) + 18
  }

  let y = 62

  // Presencial (recojo en tienda)
  y = section(
    "PRESENCIAL — Recojo en tienda",
    NAVY,
    data.groups.pickup,
    ["Código", "Comprador", "WhatsApp", "TikTok", "Productos", "Total", "Estado"],
    (r) => [
      r.processCode,
      r.receiverName,
      r.receiverPhone,
      r.tiktokUsername ?? "—",
      r.items,
      S(r.total),
      estadoEnvio(r.shippingStatus),
    ],
    y
  )

  // Motorizado (Lima)
  y = section(
    "MOTORIZADO — Lima",
    BLUE,
    data.groups.local,
    ["Código", "Receptor", "WhatsApp", "Dirección", "Productos", "Total", "Estado"],
    (r) => [
      r.processCode,
      r.receiverName,
      r.receiverPhone,
      r.deliveryAddress ?? "—",
      r.items,
      S(r.total),
      estadoEnvio(r.shippingStatus),
    ],
    y
  )

  // Agencia Shalom / courier a provincia
  section(
    "AGENCIA — Shalom / courier a provincia",
    [138, 109, 0],
    data.groups.courier,
    [
      "Código",
      "Receptor",
      "DNI",
      "WhatsApp",
      "Agencia / dirección destino",
      "Depto.",
      "Tracking",
      "Total",
    ],
    (r) => [
      r.processCode,
      r.receiverName,
      r.dni ?? "—",
      r.receiverPhone,
      r.deliveryAddress ?? "—",
      r.department ?? "—",
      r.trackingNumber ?? "—",
      S(r.total),
    ],
    y
  )

  drawFooter(doc)
  doc.save(`entregas_${new Date().toISOString().slice(0, 10)}.pdf`)
}
