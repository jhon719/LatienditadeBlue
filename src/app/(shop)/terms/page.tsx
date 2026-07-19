import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/LegalPage"

export const metadata: Metadata = {
  title: "Términos y Condiciones | La Tiendita de Blue",
}

// Bóveda 07.01 — Términos y Condiciones de Preventas y Ventas
export default function TermsPage() {
  return (
    <LegalPage
      title="Términos y Condiciones"
      updatedAt="julio 2026"
      intro="Estas son las reglas claras para todas las transacciones dentro de La Tiendita de Blue. Al confirmar un pedido en el checkout aceptas estos términos de preventa y venta."
      sections={[
        {
          title: "Política de Preventas (Pre-orders)",
          items: [
            "El adelanto (deposit) pagado al inicio garantiza la reserva de tu figura.",
            "Las fechas estimadas de llegada (ETA) son referenciales y están sujetas a factores logísticos: aduanas, cancelaciones del fabricante o retrasos en el transporte internacional.",
            "Si cancelas la reserva por motivos personales, el adelanto no es reembolsable (cubre costos administrativos y de oportunidad).",
            "Si el proveedor cancela la figura o el stock no llega, La Tiendita de Blue garantiza el reembolso íntegro del adelanto.",
            "Una vez que te notifiquemos la llegada del producto a almacén, tienes 7 días hábiles para cancelar el saldo restante. Pasado ese plazo, la figura podrá liberarse para la venta pública.",
          ],
        },
        {
          title: "Política de Ventas (Stock Físico)",
          items: [
            "Todo pago por transferencia, Yape o Plin se verifica manualmente por nuestro equipo antes de aprobar el pedido.",
            "La tienda no se hace responsable por depósitos a cuentas no oficiales: usa únicamente los QR y cuentas mostrados en el checkout.",
            "Los pedidos iniciados con transferencia reservan el stock por 2 horas. Sin comprobante en ese plazo, el sistema puede liberar la figura para otros compradores.",
            "Cada pedido genera un código de proceso único (ORD-XXXXX) que es tu comprobante de trazabilidad.",
          ],
        },
        {
          title: "Envíos y Garantías",
          items: [
            "Una vez entregado el paquete a Shalom u Olva Courier, la responsabilidad del transporte recae en el courier. Facilitamos el seguimiento mediante el número de guía.",
            "La condición de cada producto se detalla claramente en su ficha (Nuevo/Sellado, Loose/Sin Caja, Caja Dañada).",
            "No se aceptan cambios por daños estéticos menores causados por el transporte si el embalaje fue reforzado adecuadamente.",
            "Todo reclamo debe realizarse dentro de las 24 horas posteriores a la recepción, presentando video de unboxing para validar defectos de fábrica o faltantes.",
          ],
        },
        {
          title: "Aceptación",
          items: [
            "Estos términos se aceptan mediante la casilla obligatoria del checkout antes de confirmar cualquier pedido.",
            "Este es un documento vivo: la fecha de última actualización aparece en la cabecera de esta página.",
          ],
        },
      ]}
    />
  )
}
