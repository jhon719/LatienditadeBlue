// Fórmulas del ledger de Adquisiciones (hoja ADQUISICIONES del Excel).
// Replican los cálculos de la hoja para las entradas nuevas del panel.

// Meses activos en logística (enero → octubre). Diciembre quedó fuera por ser
// del ciclo pasado; noviembre/diciembre se sumarán cuando cierre el año.
export const ACQUISITION_MONTHS = [
  "ENERO",
  "FEBRERO",
  "MARZO",
  "ABRIL",
  "MAYO",
  "JUNIO",
  "JULIO",
  "AGOSTO",
  "SEPTIEMBRE",
  "OCTUBRE",
] as const

// Orden cronológico calendario (enero primero)
export const MONTH_ORDER: Record<string, number> = {
  ENERO: 1,
  FEBRERO: 2,
  MARZO: 3,
  ABRIL: 4,
  MAYO: 5,
  JUNIO: 6,
  JULIO: 7,
  AGOSTO: 8,
  SEPTIEMBRE: 9,
  OCTUBRE: 10,
  NOVIEMBRE: 11,
  DICIEMBRE: 12,
}

export interface AcquisitionInputs {
  commission: number
  cost: number
  shippingNac: number
  shippingInt: number
  exchangeRate: number | null
  igv: number
  approxRevenue: number
}

export interface AcquisitionDerived {
  total: number
  totalSoles: number
  revenue: number
}

const r2 = (n: number) => Math.round(n * 100) / 100

// TOTAL = COMISION + COSTO + ENVIO NAC   (moneda origen)
// SOLES = (TOTAL + ENVIO INT) * TIPO DE CAMBIO
// REVENUE = APROX - IGV
export function computeAcquisition(i: AcquisitionInputs): AcquisitionDerived {
  const total = r2(i.commission + i.cost + i.shippingNac)
  const tc = i.exchangeRate ?? 0
  const totalSoles = r2((total + i.shippingInt) * tc)
  const revenue = r2(i.approxRevenue - i.igv)
  return { total, totalSoles, revenue }
}

// Formateo de moneda para el ledger. Las columnas de origen (comisión, costo,
// envíos, total) están en YENES; las convertidas y los impuestos en SOLES.
export const yen = (n: number) =>
  `¥ ${n.toLocaleString("es-PE", { maximumFractionDigits: 0 })}`
export const soles = (n: number) =>
  `S/ ${n.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

// El IGV/aduanas real = (+SUNAT) − SOLES (lo que se agrega sobre el costo convertido).
export const igvAmount = (landedSunat: number, preTaxSoles: number) =>
  r2(landedSunat - preTaxSoles)
