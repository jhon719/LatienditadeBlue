import { Resend } from "resend"

// Correos transaccionales (bóveda 05.04). Si RESEND_API_KEY no está configurada,
// las funciones no hacen nada (no rompen el flujo de compra). Los envíos nunca
// lanzan: se registran en consola y se ignoran para no bloquear la transacción.

const FROM = process.env.EMAIL_FROM ?? "La Tiendita de Blue <onboarding@resend.dev>"
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

export function isEmailEnabled(): boolean {
  return !!process.env.RESEND_API_KEY
}

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY
  return key ? new Resend(key) : null
}

async function send(to: string, subject: string, html: string): Promise<void> {
  const resend = client()
  if (!resend || !to) return
  try {
    await resend.emails.send({ from: FROM, to, subject, html })
  } catch (error) {
    console.error("Error enviando correo:", error)
  }
}

// ---- Plantilla base con estética de marca ----
function layout(opts: {
  title: string
  accent?: string
  intro: string
  body: string
  ctaLabel?: string
  ctaUrl?: string
}): string {
  const accent = opts.accent ?? "#4A80BE"
  const cta =
    opts.ctaLabel && opts.ctaUrl
      ? `<tr><td style="padding:8px 0 4px">
           <a href="${opts.ctaUrl}" style="display:inline-block;background:${accent};color:#fff;text-decoration:none;font-weight:700;padding:12px 24px;border-radius:9999px;font-size:14px">${opts.ctaLabel}</a>
         </td></tr>`
      : ""
  return `
  <div style="background:#f2f4f8;padding:24px 0;font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 8px 24px rgba(20,47,92,.08)">
          <tr><td style="background:linear-gradient(135deg,#142F5C,#4A80BE);padding:22px 28px">
            <span style="color:#fff;font-size:22px;font-weight:800;letter-spacing:.5px">La Tiendita de Blue</span>
            <span style="color:#F5B400;font-size:22px">✦</span>
          </td></tr>
          <tr><td style="padding:28px">
            <h1 style="margin:0 0 6px;font-size:22px;color:#142F5C">${opts.title}</h1>
            <p style="margin:0 0 16px;font-size:15px;color:#59697a;line-height:1.5">${opts.intro}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${opts.body}
              ${cta}
            </table>
          </td></tr>
          <tr><td style="padding:18px 28px;background:#f7f9fc;border-top:1px solid #e6ebf2">
            <p style="margin:0;font-size:12px;color:#8a98ab">
              Coordinamos tu entrega por WhatsApp. Si tienes dudas, respóndenos o escríbenos.
              <br/>© ${new Date().getFullYear()} La Tiendita de Blue · Figuras de anime en Perú 💙
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </div>`
}

function orderRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;font-size:14px;color:#59697a">${label}</td>
    <td style="padding:6px 0;font-size:14px;color:#142F5C;font-weight:700;text-align:right">${value}</td>
  </tr>`
}

interface OrderEmailData {
  email: string
  processCode: string
  totalAmount: number
  paymentMethod: string
  shippingType: string
  receiverName: string
}

const SHIPPING_LABELS: Record<string, string> = {
  PICKUP: "Recojo en tienda",
  LOCAL_DELIVERY: "Motorizado (Lima)",
  NATIONAL_COURIER: "Courier a provincia",
}

// 1) Pedido recibido (manual): esperamos validar el comprobante
export async function sendOrderReceivedEmail(o: OrderEmailData): Promise<void> {
  const isManual = o.paymentMethod === "MANUAL_TRANSFER"
  const html = layout({
    title: `¡Recibimos tu pedido ${o.processCode}! 🎉`,
    intro: isManual
      ? "Estamos validando tu comprobante de pago. Te avisaremos apenas lo confirmemos (normalmente en pocas horas)."
      : "Tu pedido fue registrado correctamente. Te avisaremos cuando el pago se acredite.",
    body:
      orderRow("Código de pedido", o.processCode) +
      orderRow("Receptor", o.receiverName) +
      orderRow("Envío", SHIPPING_LABELS[o.shippingType] ?? o.shippingType) +
      orderRow("Total", `S/ ${o.totalAmount.toFixed(2)}`),
    ctaLabel: "Ver mis pedidos",
    ctaUrl: `${APP_URL}/profile/orders`,
  })
  await send(o.email, `Pedido ${o.processCode} recibido — La Tiendita de Blue`, html)
}

// 2) Pago aprobado en la Bandeja POS: preparando el pedido
export async function sendPaymentApprovedEmail(o: OrderEmailData): Promise<void> {
  const html = layout({
    title: "¡Pago confirmado! 💙",
    accent: "#1E7E34",
    intro: `Verificamos tu pago del pedido ${o.processCode}. Ya estamos preparando tu figura con mucho cariño.`,
    body:
      orderRow("Código de pedido", o.processCode) +
      orderRow("Envío", SHIPPING_LABELS[o.shippingType] ?? o.shippingType) +
      orderRow("Total pagado", `S/ ${o.totalAmount.toFixed(2)}`),
    ctaLabel: "Seguir mi pedido",
    ctaUrl: `${APP_URL}/profile/orders`,
  })
  await send(o.email, `Pago confirmado — Pedido ${o.processCode}`, html)
}

// 3) Pedido enviado (con tracking)
export async function sendOrderShippedEmail(
  o: OrderEmailData & { trackingNumber?: string | null }
): Promise<void> {
  const html = layout({
    title: "Tu pedido va en camino 🚚",
    intro: `El pedido ${o.processCode} fue despachado.`,
    body:
      orderRow("Código de pedido", o.processCode) +
      orderRow("Envío", SHIPPING_LABELS[o.shippingType] ?? o.shippingType) +
      (o.trackingNumber ? orderRow("N° de guía", o.trackingNumber) : ""),
    ctaLabel: "Ver detalle",
    ctaUrl: `${APP_URL}/profile/orders`,
  })
  await send(o.email, `Pedido ${o.processCode} enviado`, html)
}

// 4) Pedido entregado: pedir reseña
export async function sendOrderDeliveredEmail(o: OrderEmailData): Promise<void> {
  const html = layout({
    title: "¡Tu figura llegó! 📦✨",
    accent: "#F5B400",
    intro: `Esperamos que ames tu pedido ${o.processCode}. ¿Nos dejas una reseña con tu unboxing? ¡Ayuda un montón a otros coleccionistas!`,
    body: orderRow("Código de pedido", o.processCode),
    ctaLabel: "Dejar mi reseña",
    ctaUrl: `${APP_URL}/profile/orders`,
  })
  await send(o.email, `¿Cómo llegó tu pedido ${o.processCode}?`, html)
}
