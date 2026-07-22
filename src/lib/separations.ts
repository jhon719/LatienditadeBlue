// Motor de Separaciones / Apartados (bóveda 05.06 y 05.07)
// Reglas comerciales de adelanto mínimo, plazos diferenciados y semáforo de cobranza.

// Adelanto inicial obligatorio para asegurar el producto (bóveda 05.07 §2)
export const MIN_DEPOSIT = 10

// Plazo por defecto para saldar una separación de STOCK físico (bóveda 05.07 §3A)
export const STOCK_DUE_DAYS = 15

export type SeparationKind = "STOCK" | "PREORDER"
export type SeparationStatus = "PENDING" | "ARRIVED" | "COMPLETED" | "CANCELLED"

// Fecha límite sugerida al crear una separación según su tipo
export function defaultDueDate(kind: SeparationKind, eta?: Date | null): Date {
  const now = new Date()
  if (kind === "STOCK") {
    const d = new Date(now)
    d.setDate(d.getDate() + STOCK_DUE_DAYS)
    return d
  }
  // Preventa: el saldo final se cobra al llegar; si hay ETA la usamos, si no +30 días
  if (eta) return new Date(eta)
  const d = new Date(now)
  d.setDate(d.getDate() + 30)
  return d
}

export interface SeparationBalance {
  total: number
  paid: number
  balance: number
  progress: number // 0-100
  isPaidInFull: boolean
}

export function computeBalance(totalPrice: number, depositPaid: number): SeparationBalance {
  const total = Number(totalPrice)
  const paid = Number(depositPaid)
  const balance = Math.max(0, Math.round((total - paid) * 100) / 100)
  const progress = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0
  return { total, paid, balance, progress, isPaidInFull: balance <= 0 }
}

export type SemaphoreLevel = "ok" | "warning" | "overdue" | "done"

export interface Semaphore {
  level: SemaphoreLevel
  daysLeft: number | null // negativo = vencido
  label: string
}

// Semáforo de cobranza (bóveda 05.06 §3 / 05.07 §4): 🟢 en plazo, 🟡 por vencer, 🔴 vencido
export function computeSemaphore(
  status: SeparationStatus,
  dueDate: Date | string | null,
  isPaidInFull: boolean
): Semaphore {
  if (status === "COMPLETED" || isPaidInFull) {
    return { level: "done", daysLeft: null, label: "Pagado" }
  }
  if (status === "CANCELLED") {
    return { level: "overdue", daysLeft: null, label: "Liberada" }
  }
  if (!dueDate) {
    return { level: "ok", daysLeft: null, label: "Sin plazo" }
  }
  const due = new Date(dueDate)
  const now = new Date()
  const msPerDay = 1000 * 60 * 60 * 24
  const daysLeft = Math.ceil((due.getTime() - now.getTime()) / msPerDay)

  if (daysLeft < 0) {
    return { level: "overdue", daysLeft, label: `Vencida hace ${Math.abs(daysLeft)}d` }
  }
  if (daysLeft <= 3) {
    return {
      level: "warning",
      daysLeft,
      label: daysLeft === 0 ? "Vence hoy" : `Vence en ${daysLeft}d`,
    }
  }
  return { level: "ok", daysLeft, label: `${daysLeft} días restantes` }
}

// Valida el monto de un abono contra el saldo pendiente y el mínimo inicial
export function validatePaymentAmount(
  amount: number,
  balance: number,
  isFirstPayment: boolean
): { ok: true } | { ok: false; error: string } {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { ok: false, error: "El monto debe ser mayor a 0" }
  }
  if (isFirstPayment && amount < MIN_DEPOSIT) {
    return { ok: false, error: `El adelanto inicial mínimo es S/ ${MIN_DEPOSIT.toFixed(2)}` }
  }
  // Tolerancia de 1 centavo por redondeo
  if (amount > balance + 0.01) {
    return { ok: false, error: `El abono no puede superar el saldo pendiente (S/ ${balance.toFixed(2)})` }
  }
  return { ok: true }
}
