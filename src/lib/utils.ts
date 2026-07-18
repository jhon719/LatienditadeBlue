import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// "Jujutsu Kaisen" → "jujutsu-kaisen" (regla de la bóveda 02.05)
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function formatPrice(value: number): string {
  return `S/ ${value.toFixed(2)}`
}

// Enmascara datos sensibles en el perfil: "45678128" → "45***128"
export function maskSensitive(value: string | null | undefined): string {
  if (!value) return "—"
  if (value.length <= 5) return `${value[0]}***`
  return `${value.slice(0, 2)}***${value.slice(-3)}`
}

// Enlace de coordinación por WhatsApp (bóveda 03.03)
export function whatsappLink(message: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51997763962"
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}
