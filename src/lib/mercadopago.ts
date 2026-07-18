import { MercadoPagoConfig, Preference, Payment } from "mercadopago"

// Credenciales APP_USR del panel de Mercado Pago (bóveda 03.01).
// Si no están configuradas, el checkout oculta la opción de pasarela automática.
export function isMercadoPagoEnabled(): boolean {
  const token = process.env.MERCADO_PAGO_ACCESS_TOKEN
  return !!token && token.startsWith("APP_USR")
}

function getClient(): MercadoPagoConfig {
  return new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
  })
}

export function getPreferenceClient(): Preference {
  return new Preference(getClient())
}

export function getPaymentClient(): Payment {
  return new Payment(getClient())
}
