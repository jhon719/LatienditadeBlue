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

// ------------------------------ LOTES ATRASADOS ------------------------------

export interface OverdueBatchRow {
  id: string
  name: string
  supplier: string | null
  trackingRef: string | null
  eta: string
  daysOverdue: number
  severity: "LEVE" | "MODERADO" | "CRITICO"
  itemsCount: number
  totalUnits: number
  pendingPreorders: number
}

export interface OverdueBatchesReport {
  generatedAt: string
  summary: { total: number; leve: number; moderado: number; critico: number }
  batches: OverdueBatchRow[]
}

const SEVERITY_LABEL: Record<OverdueBatchRow["severity"], string> = {
  LEVE: "Leve",
  MODERADO: "Moderado",
  CRITICO: "Crítico",
}
const SEVERITY_COLOR: Record<OverdueBatchRow["severity"], RGB> = {
  LEVE: [138, 109, 0],
  MODERADO: [204, 105, 0],
  CRITICO: [180, 30, 30],
}

export function downloadOverdueBatchesPdf(data: OverdueBatchesReport) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" })
  drawHeader(doc, "Lotes atrasados", `${data.summary.total} lotes con ETA vencido`)

  autoTable(doc, {
    startY: 62,
    margin: { left: 40, right: 40 },
    head: [
      [
        "Lote",
        "N° de Lote",
        "Guía",
        "ETA",
        "Días de atraso",
        "Severidad",
        "Ítems",
        "Unidades",
        "Separaciones pendientes",
      ],
    ],
    body: data.batches.map((b) => [
      b.name,
      b.supplier ?? "—",
      b.trackingRef ?? "—",
      fecha(b.eta),
      String(b.daysOverdue),
      SEVERITY_LABEL[b.severity],
      String(b.itemsCount),
      String(b.totalUnits),
      String(b.pendingPreorders),
    ]),
    styles: { fontSize: 7.5, cellPadding: 3, overflow: "linebreak" },
    headStyles: { fillColor: NAVY, textColor: 255, fontStyle: "bold", fontSize: 7.5 },
    alternateRowStyles: { fillColor: [253, 245, 235] },
    columnStyles: { 4: { halign: "center" }, 6: { halign: "center" }, 7: { halign: "center" } },
    didParseCell: (hookData) => {
      if (hookData.section !== "body") return
      const row = data.batches[hookData.row.index]
      if (hookData.column.index === 5) {
        hookData.cell.styles.textColor = SEVERITY_COLOR[row.severity]
        hookData.cell.styles.fontStyle = "bold"
      }
    },
  })

  drawFooter(doc)
  doc.save(`lotes_atrasados_${new Date().toISOString().slice(0, 10)}.pdf`)
}

// ------------------------------ MARGEN POR LOTE ------------------------------

export interface BatchMarginRow {
  id: string
  name: string
  supplier: string | null
  status: "IN_TRANSIT" | "RECEIVED"
  eta: string | null
  itemsCount: number
  totalUnits: number
  costTotal: number
  revenueExpected: number
  margin: number
  marginPct: number | null
  costComplete: boolean
}

export interface BatchMarginReport {
  generatedAt: string
  summary: {
    batchCount: number
    incompleteCostCount: number
    costTotal: number
    revenueExpected: number
    margin: number
  }
  batches: BatchMarginRow[]
}

export function downloadBatchMarginPdf(data: BatchMarginReport) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" })
  drawHeader(doc, "Margen por lote", `${data.summary.batchCount} lotes · margen total ${S(data.summary.margin)}`)

  autoTable(doc, {
    startY: 62,
    margin: { left: 40, right: 40 },
    head: [
      [
        "Lote",
        "N° de Lote",
        "Estado",
        "Ítems",
        "Unidades",
        "Costo proveedor",
        "Venta esperada",
        "Margen",
        "Margen %",
      ],
    ],
    body: data.batches.map((b) => [
      b.name + (b.costComplete ? "" : " *"),
      b.supplier ?? "—",
      b.status === "RECEIVED" ? "Recibido" : "En tránsito",
      String(b.itemsCount),
      String(b.totalUnits),
      S(b.costTotal),
      S(b.revenueExpected),
      S(b.margin),
      b.marginPct == null ? "—" : `${b.marginPct.toFixed(1)}%`,
    ]),
    styles: { fontSize: 7.5, cellPadding: 3, overflow: "linebreak" },
    headStyles: { fillColor: NAVY, textColor: 255, fontStyle: "bold", fontSize: 7.5 },
    alternateRowStyles: { fillColor: [237, 243, 251] },
    columnStyles: {
      4: { halign: "center" },
      5: { halign: "right" },
      6: { halign: "right" },
      7: { halign: "right" },
      8: { halign: "right" },
    },
  })

  if (data.summary.incompleteCostCount > 0) {
    const y = lastY(doc, 62) + 18
    doc.setTextColor(...GRAY)
    doc.setFont("helvetica", "italic")
    doc.setFontSize(7.5)
    doc.text(
      `* ${data.summary.incompleteCostCount} lote(s) con costo incompleto (algún ítem sin costo registrado): el margen mostrado es un mínimo, no el real.`,
      40,
      y
    )
  }

  drawFooter(doc)
  doc.save(`margen_lotes_${new Date().toISOString().slice(0, 10)}.pdf`)
}

// ------------------------------ STOCK EN TRÁNSITO ------------------------------

export interface TransitStockReport {
  generatedAt: string
  totalUnits: number
  totalBatches: number
  totalSkus: number
  byMonth: { label: string; units: number }[]
  byLine: { line: string; units: number }[]
  byCategory: { category: string; units: number }[]
}

export function downloadTransitStockPdf(data: TransitStockReport) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" })
  drawHeader(
    doc,
    "Stock en tránsito",
    `${data.totalUnits} unidades · ${data.totalBatches} lotes · ${data.totalSkus} SKU`
  )
  const w = doc.internal.pageSize.getWidth()

  const section = (
    title: string,
    color: RGB,
    head: string[],
    body: (string | number)[][],
    startY: number
  ) => {
    doc.setFillColor(...color)
    doc.rect(40, startY, w - 80, 18, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.text(title, 46, startY + 12.5)

    if (body.length === 0) {
      doc.setTextColor(...GRAY)
      doc.setFont("helvetica", "italic")
      doc.setFontSize(8)
      doc.text("Sin datos.", 46, startY + 32)
      return startY + 44
    }

    autoTable(doc, {
      startY: startY + 22,
      margin: { left: 40, right: 40 },
      head: [head],
      body,
      styles: { fontSize: 8, cellPadding: 3.5, overflow: "linebreak" },
      headStyles: { fillColor: color, textColor: 255, fontStyle: "bold", fontSize: 8 },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      columnStyles: { 1: { halign: "right" } },
    })
    return lastY(doc, startY + 22) + 18
  }

  let y = 62
  y = section(
    "POR MES DE ETA",
    NAVY,
    ["Mes", "Unidades"],
    data.byMonth.map((m) => [m.label, m.units]),
    y
  )
  y = section(
    "POR LÍNEA DE FIGURA",
    BLUE,
    ["Línea", "Unidades"],
    data.byLine.map((l) => [l.line, l.units]),
    y
  )
  section(
    "POR ANIME / SERIE",
    [138, 109, 0],
    ["Anime / Serie", "Unidades"],
    data.byCategory.map((c) => [c.category, c.units]),
    y
  )

  drawFooter(doc)
  doc.save(`stock_transito_${new Date().toISOString().slice(0, 10)}.pdf`)
}

// ------------------------------ PRODUCTOS SIN LOTE ------------------------------

export interface ProductWithoutBatchRow {
  id: string
  name: string
  slug: string
  status: string
  stockQty: number
  price: number
  category: string
  brand: string
  createdAt: string
}

export interface ProductsWithoutBatchReport {
  generatedAt: string
  count: number
  products: ProductWithoutBatchRow[]
}

const PRODUCT_STATUS_ES: Record<string, string> = {
  ONLINE: "Online",
  STOCK: "En stock",
  PREVENTA: "Preventa",
  AGOTADO: "Agotado",
}

export function downloadProductsWithoutBatchPdf(data: ProductsWithoutBatchReport) {
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" })
  drawHeader(doc, "Productos sin lote", `${data.count} productos sin trazabilidad a una importación`)

  autoTable(doc, {
    startY: 62,
    margin: { left: 40, right: 40 },
    head: [["Producto", "Categoría", "Marca", "Estado", "Stock", "Precio", "Alta"]],
    body: data.products.map((p) => [
      p.name,
      p.category,
      p.brand,
      PRODUCT_STATUS_ES[p.status] ?? p.status,
      String(p.stockQty),
      S(p.price),
      fecha(p.createdAt),
    ]),
    styles: { fontSize: 7.5, cellPadding: 3, overflow: "linebreak" },
    headStyles: { fillColor: NAVY, textColor: 255, fontStyle: "bold", fontSize: 7.5 },
    alternateRowStyles: { fillColor: [237, 243, 251] },
    columnStyles: { 4: { halign: "center" }, 5: { halign: "right" } },
  })

  drawFooter(doc)
  doc.save(`productos_sin_lote_${new Date().toISOString().slice(0, 10)}.pdf`)
}
