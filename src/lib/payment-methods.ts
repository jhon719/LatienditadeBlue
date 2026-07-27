import { CreditCard, Smartphone, Wallet, type LucideIcon } from "lucide-react"

// Métodos de pago que acepta la tienda (bóveda 03.01 / 03.02).
// Se representan con iconos y color de marca, sin usar los logotipos
// registrados de Yape / Plin / Mercado Pago.

export interface PaymentMethod {
  id: string
  name: string
  /** Nota corta bajo el nombre */
  detail: string
  icon: LucideIcon
  /** Color de acento aproximado a la marca, solo para el icono */
  accent: string
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "yape",
    name: "Yape",
    detail: "Escanea el QR",
    icon: Smartphone,
    accent: "#742384",
  },
  {
    id: "plin",
    name: "Plin",
    detail: "Escanea el QR",
    icon: Wallet,
    accent: "#00B2A9",
  },
  {
    id: "mercado-pago",
    name: "Mercado Pago",
    detail: "Visa · Mastercard",
    icon: CreditCard,
    accent: "#009EE3",
  },
]
