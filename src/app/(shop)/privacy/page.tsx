import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/LegalPage"

export const metadata: Metadata = {
  title: "Política de Privacidad | La Tiendita de Blue",
}

// Bóveda 07.03 — Política de Privacidad y Protección de Datos (Ley N° 29733)
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Política de Privacidad"
      updatedAt="julio 2026"
      intro="Esta política explica qué datos personales recopilamos, cómo los protegemos y cuáles son tus derechos, en cumplimiento de la Ley de Protección de Datos Personales del Perú (Ley N° 29733)."
      sections={[
        {
          title: "Datos que Recolectamos",
          items: [
            "Identificación: nombres, DNI/RUC y dirección de entrega.",
            "Contacto: correo electrónico y teléfono, usados exclusivamente para la gestión de pedidos y notificaciones de envío.",
            "Transaccionales: historial de compras y comprobantes de pago, almacenados de forma segura.",
            "Técnicos: cookies de sesión necesarias para el funcionamiento del carrito y tu inicio de sesión.",
          ],
        },
        {
          title: "Uso de la Información",
          items: [
            "Finalidad primaria: procesar pedidos, emitir comprobantes y gestionar la logística de envíos.",
            "Finalidad secundaria: enviarte información sobre nuevos ingresos o preventas solo si diste tu consentimiento explícito.",
            "Nunca compartimos, vendemos ni alquilamos tu información personal a terceros.",
            "Tus datos privados (DNI, teléfono, dirección) jamás se muestran públicamente en la tienda: solo tú y el administrador pueden verlos.",
          ],
        },
        {
          title: "Tus Derechos (Derechos ARCO)",
          items: [
            "Acceso: solicitar saber qué datos tenemos sobre ti.",
            "Rectificación: corregir información inexacta (cambio de dirección, DNI, etc.) desde tu perfil o por WhatsApp.",
            "Cancelación: solicitar la eliminación de tus datos, siempre que no contravenga obligaciones legales (los comprobantes de pago deben conservarse por ley).",
            "Oposición: pedir que no usemos tus datos para fines comerciales.",
          ],
        },
        {
          title: "Seguridad",
          items: [
            "Contraseñas cifradas con bcrypt; nunca almacenamos tu clave en texto plano.",
            "Las cuentas creadas con Google no almacenan contraseña en nuestra base de datos.",
            "Los comprobantes de pago se archivan de forma segura tras la conciliación y no se comparten con terceros.",
          ],
        },
      ]}
    />
  )
}
