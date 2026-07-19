import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/LegalPage"

export const metadata: Metadata = {
  title: "Devoluciones y Reembolsos | La Tiendita de Blue",
}

// Bóveda 07.02 — Políticas de Devolución y Reembolsos
export default function ReturnsPage() {
  return (
    <LegalPage
      title="Devoluciones y Reembolsos"
      updatedAt="julio 2026"
      intro="Esta política define los escenarios en los que La Tiendita de Blue acepta devoluciones o emite reembolsos, protegiendo tanto tu compra como la integridad del catálogo."
      sections={[
        {
          title: "Escenarios de Devolución Aceptados",
          items: [
            "Defecto de fábrica: si la figura presenta daño interno (articulación rota, piezas faltantes, error de pintura grave) y no fue manipulación externa, gestionamos el cambio por una unidad nueva o el reembolso total.",
            "Error de despacho: si enviamos una figura distinta a la comprada, asumimos el costo completo de la logística inversa (recogida y reenvío).",
            "Desistimiento (compra web): tienes derecho a retractarte dentro de los 7 días posteriores a la recepción, siempre que el producto conserve su sello original, embalaje y condición de nuevo.",
          ],
        },
        {
          title: "Casos No Admitidos",
          items: [
            "Daños por transporte sin video de unboxing, cuando el paquete externo muestra maltrato del courier y no hubo queja previa.",
            'Figuras "Loose" o "Caja Dañada": al comprarlas aceptas explícitamente su condición estética; no se admiten devoluciones por la estética de la caja o desgaste declarado.',
            "Preventas abandonadas: el adelanto no es reembolsable si la cancelación es por motivos personales fuera de los plazos de garantía del fabricante.",
          ],
        },
        {
          title: "Proceso de Reembolso",
          items: [
            "Evaluación: contáctanos por WhatsApp adjuntando fotos/video y tu código de pedido (ORD-XXXXX).",
            "Resolución: tenemos hasta 48 horas para aprobar o rechazar la solicitud.",
            "Ejecución: si se aprueba, el reembolso se realiza al mismo método de pago original. En pagos por transferencia, se procesa vía transferencia bancaria tras recibir y validar la figura devuelta en almacén.",
          ],
        },
      ]}
    />
  )
}
