import type { Metadata } from "next"
import { LegalPage } from "@/components/legal/LegalPage"

export const metadata: Metadata = {
  title: "Términos y Condiciones | La Tiendita de Blue",
}

// Bóveda 07.01 — Términos y Condiciones de Uso y Compra
export default function TermsPage() {
  return (
    <LegalPage
      title="Términos y Condiciones de Uso y Compra"
      updatedAt="julio 2026"
      intro="Bienvenido(a) a La Tiendita de Blue. Al acceder, navegar o realizar una compra en nuestro sitio web, el usuario acepta los presentes Términos y Condiciones. Si no está de acuerdo con alguno de ellos, deberá abstenerse de utilizar el sitio."
      closing="Al realizar una compra en La Tiendita de Blue, el usuario declara haber leído, comprendido y aceptado íntegramente los presentes Términos y Condiciones."
      sections={[
        {
          title: "Identificación",
          blocks: [
            {
              p: "La Tiendita de Blue es una tienda online dedicada a la comercialización de figuras coleccionables, merchandising y productos relacionados con el anime, videojuegos y cultura pop.",
            },
          ],
        },
        {
          title: "Aceptación de los Términos",
          blocks: [
            {
              p: "El uso del sitio web implica la aceptación plena de estos Términos y Condiciones, así como de las Políticas de Privacidad, Envíos, Preventas y Devoluciones.",
            },
          ],
        },
        {
          title: "Registro de Usuario",
          items: [
            "El usuario declara que la información proporcionada durante su registro es veraz y actualizada.",
            "El usuario es responsable de mantener la confidencialidad de su cuenta y contraseña.",
            "La Tiendita de Blue podrá suspender o cancelar cuentas que proporcionen información falsa o hagan un uso indebido del sitio.",
          ],
        },
        {
          title: "Productos",
          items: [
            "Las imágenes publicadas son referenciales y pueden presentar ligeras diferencias respecto al producto final debido al fabricante, iluminación o configuración de pantalla.",
            "Las medidas, colores y acabados pueden variar ligeramente sin que ello constituya un defecto.",
            "La disponibilidad de stock está sujeta a actualización permanente.",
          ],
        },
        {
          title: "Precios",
          items: [
            "Todos los precios se encuentran expresados en Soles (S/).",
            "Los precios pueden modificarse sin previo aviso, excepto en pedidos ya confirmados.",
            "En caso de errores manifiestos de publicación, digitación o sistemas informáticos, La Tiendita de Blue podrá cancelar la compra y devolver íntegramente el importe pagado.",
          ],
        },
        {
          title: "Métodos de Pago",
          blocks: [
            { p: "Aceptamos los siguientes medios de pago:" },
            {
              list: [
                "Mercado Pago (tarjetas de débito y crédito).",
                "Yape.",
                "Plin.",
                "Transferencia bancaria.",
              ],
            },
            { p: "La compra será considerada confirmada únicamente cuando el pago haya sido validado." },
          ],
        },
        {
          title: "Envíos",
          items: [
            "Los pedidos serán enviados una vez confirmado el pago.",
            "Los tiempos de entrega son estimados y pueden variar por factores logísticos, climáticos, aduaneros o causas de fuerza mayor.",
            "La Tiendita de Blue no será responsable por retrasos atribuibles a empresas transportistas.",
          ],
        },
        {
          title: "Preventas y Reservas",
          blocks: [
            { p: "Las preventas permiten asegurar un producto antes de su llegada al país." },
          ],
          subsections: [
            {
              number: "8.1",
              title: "Reserva",
              blocks: [
                { p: "Para reservar un producto será necesario realizar el pago equivalente al 15% del precio total del artículo." },
                { p: "La reserva garantiza la separación del producto a nombre del cliente." },
              ],
            },
            {
              number: "8.2",
              title: "Naturaleza del pago",
              blocks: [
                { p: "El pago correspondiente al 15% constituye un importe destinado a cubrir gastos administrativos, financieros, logísticos y de importación asociados a la gestión de la preventa." },
              ],
            },
            {
              number: "8.3",
              title: "Pago del saldo",
              blocks: [
                { p: "El saldo pendiente deberá cancelarse dentro del plazo indicado por La Tiendita de Blue." },
                { p: "El incumplimiento del plazo podrá ocasionar la cancelación automática de la preventa." },
              ],
            },
            {
              number: "8.4",
              title: "Cancelación por parte del cliente",
              blocks: [
                { p: "Si el cliente decide cancelar voluntariamente su preventa, el importe correspondiente al 15% abonado por concepto de reserva no será reembolsable, independientemente del motivo de la cancelación." },
              ],
            },
            {
              number: "8.5",
              title: "Incumplimiento",
              blocks: [
                { p: "Si el cliente no completa el pago dentro del plazo establecido y no existe un acuerdo previo con la tienda, perderá automáticamente el derecho sobre el producto reservado, así como el monto abonado por concepto de reserva." },
              ],
            },
            {
              number: "8.6",
              title: "Retrasos",
              blocks: [
                { p: "Las fechas de llegada de las preventas son estimadas." },
                { p: "Pueden modificarse debido a retrasos del fabricante, distribuidores, transporte internacional, aduanas o cualquier causa ajena al control de La Tiendita de Blue." },
                { p: "Estos retrasos no constituyen incumplimiento contractual." },
              ],
            },
            {
              number: "8.7",
              title: "Cancelación por parte de la tienda",
              blocks: [
                { p: "Si una preventa fuera cancelada por causas atribuibles a La Tiendita de Blue o al fabricante (como cancelación oficial del producto o imposibilidad definitiva de importación), el cliente podrá optar entre:" },
                {
                  list: [
                    "El reembolso íntegro del dinero pagado.",
                    "Mantener el monto como saldo a favor para futuras compras.",
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "Cambios, Devoluciones y Reembolsos",
          subsections: [
            {
              number: "9.1",
              title: "Productos con defecto de fábrica",
              blocks: [
                { p: "Los productos con defectos de fabricación podrán ser evaluados para cambio o devolución conforme a la legislación vigente." },
                { p: "La tienda podrá solicitar fotografías, videos o la devolución del producto para verificar el defecto." },
              ],
            },
            {
              number: "9.2",
              title: "Daños ocasionados durante el transporte",
              blocks: [
                { p: "El cliente deberá informar cualquier daño visible dentro de las primeras 24 horas posteriores a la recepción del pedido, adjuntando fotografías del embalaje y del producto." },
              ],
            },
            {
              number: "9.3",
              title: "Productos abiertos",
              blocks: [
                { p: "No se aceptarán devoluciones de productos abiertos, manipulados, usados o con sellos de seguridad retirados, salvo que exista un defecto de fabricación." },
              ],
            },
            {
              number: "9.4",
              title: "Error en el envío",
              blocks: [
                { p: "Si La Tiendita de Blue envía un producto distinto al adquirido, asumirá los costos necesarios para realizar el cambio correspondiente." },
              ],
            },
            {
              number: "9.5",
              title: "Productos coleccionables",
              blocks: [
                { p: "Las pequeñas variaciones de pintura, color, empaque, blister, caja o acabado propias del proceso de fabricación no serán consideradas defectos." },
              ],
            },
          ],
        },
        {
          title: "Cancelación de Pedidos",
          blocks: [
            { p: "Los pedidos podrán cancelarse antes del despacho." },
            { p: "Si el pedido corresponde a una preventa, se aplicarán las condiciones establecidas en la sección de Preventas y Reservas." },
          ],
        },
        {
          title: "Garantía",
          blocks: [
            { p: "La garantía cubre únicamente defectos de fabricación." },
            { p: "No cubre daños ocasionados por:" },
            {
              list: [
                "Golpes.",
                "Caídas.",
                "Exposición al calor o humedad.",
                "Manipulación inadecuada.",
                "Desgaste por uso.",
              ],
            },
          ],
        },
        {
          title: "Responsabilidad",
          blocks: [
            {
              p: "La Tiendita de Blue no será responsable por daños indirectos, lucro cesante, pérdidas económicas o retrasos ocasionados por terceros, fabricantes, transportistas, autoridades aduaneras o eventos de fuerza mayor.",
            },
          ],
        },
        {
          title: "Propiedad Intelectual",
          blocks: [
            { p: "Todo el contenido del sitio web, incluyendo imágenes, logotipos, textos, diseños y material gráfico, pertenece a La Tiendita de Blue o cuenta con las autorizaciones correspondientes." },
            { p: "Queda prohibida su reproducción sin autorización." },
          ],
        },
        {
          title: "Protección de Datos Personales",
          blocks: [
            {
              p: "Los datos personales serán utilizados únicamente para procesar pedidos, brindar atención al cliente y cumplir obligaciones legales, conforme a la legislación peruana sobre protección de datos personales.",
            },
          ],
        },
        {
          title: "Modificaciones",
          blocks: [
            { p: "La Tiendita de Blue podrá modificar los presentes Términos y Condiciones cuando resulte necesario." },
            { p: "Las modificaciones entrarán en vigor desde su publicación en el sitio web." },
          ],
        },
        {
          title: "Legislación Aplicable",
          blocks: [
            { p: "Estos Términos y Condiciones se rigen por las leyes de la República del Perú." },
            { p: "Cualquier controversia será resuelta conforme a la normativa peruana vigente." },
          ],
        },
        {
          title: "Contacto",
          blocks: [
            {
              p: "Para cualquier consulta relacionada con estos Términos y Condiciones, el usuario podrá comunicarse con La Tiendita de Blue mediante los canales oficiales publicados en el sitio web.",
            },
          ],
        },
      ]}
    />
  )
}
