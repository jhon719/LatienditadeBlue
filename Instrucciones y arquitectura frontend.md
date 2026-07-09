la arquitectura completa y detallada del proyecto adaptada con todos los requerimientos anteriores (Next.js, Prisma, Mercado Pago, pagos manuales con comprobante para POS/transferencia, y tomando como referencia estética, estructural y funcional a Homidori para el diseño, colores, tipografías y experiencia de usuario de la tienda de figuras y mercancía de anime). Este desglose está listo para dárselo a Antigravity como contexto técnico exacto.

1. Visión General y Referencia Visual (Homidori)
Identidad Visual y Estética:

Colores: Se adoptará la paleta limpia y contrastada de Homidori, predominando fondos neutros oscuros o blancos minimalistas (según el modo), con acentos vibrantes (como tonos fucsia, rojo neón o azul eléctrico característicos de la cultura otaku/figuras de colección) para botones de llamada a la acción (CTA), precios y etiquetas de preventa/stock.

Tipografías: Tipografías de palo seco modernas, altamente legibles para catálogos y fichas técnicas de productos, con pesos fuertes para títulos de personajes y series.

Diseño: Estructura limpia tipo "grid" o vitrina flotante, tarjetas de producto con efectos sutiles al hacer hover, previsualización rápida de variantes y banners cenefas deslizantes para anuncios de preventas (pre-orders) o llegadas de importación.

2. Arquitectura de Directorios Completa (Estructura Base + Nuevos Módulos)
Plaintext
├── prisma/
│   ├── schema.prisma                 # Modelos actualizados (Productos, Categorías, Órdenes, Pagos, Comprobantes)
│   └── seed.ts
├── public/                           # Assets estáticos, logos, fuentes e imágenes de referencia
├── src/
│   ├── app/
│   │   ├── (admin-panel)/            # Panel de administración protegido
│   │   │   └── admin/
│   │   │       ├── dashboard/        # Métricas generales y accesos rápidos
│   │   │       ├── products/         # CRUD de figuras y mercancía (con atributos personalizados)
│   │   │       ├── orders/           # Gestión de pedidos y estados
│   │   │       └── manual-payments/  # Bandeja de revisión de capturas de POS / Transferencias pendientes
│   │   ├── (shop)/                   # Experiencia de usuario pública (Inspirada en Homidori)
│   │   │   ├── cart/                 # Carrito de compras deslizante o página dedicada
│   │   │   ├── checkout/             # Selector de métodos de pago (Mercado Pago vs. Manual POS)
│   │   │   ├── orders/               # Historial de compras y subida/seguimiento de comprobantes
│   │   │   ├── products/             # Catálogo filtrable por anime, categoría, escala y fabricante
│   │   │   └── page.tsx              # Home con HeroBanner, destacados y secciones al estilo Homidori
│   │   ├── api/
│   │   │   ├── orders/               # Creación y consulta de órdenes de compra
│   │   │   ├── payments/
│   │   │   │   └── mercadopago/      # Inicialización de preferencias/checkout de Mercado Pago
│   │   │   ├── proofs/               # Endpoint para subida y almacenamiento de capturas de pago manual
│   │   │   ├── products/             # Endpoints de catálogo e inventario
│   │   │   └── webhook/
│   │   │       └── mercadopago/      # Webhook oficial para procesar acreditaciones automáticas
│   │   ├── globals.css               # Estilos globales y paleta de colores de la marca / Homidori
│   │   └── layout.tsx
│   ├── components/
│   │   ├── admin/                    # Tablas de gestión, validadores de comprobantes
│   │   ├── common/                   # Modales, botones, alertas y loaders
│   │   ├── home/                     # Hero banners, carruseles de preventas y colecciones
│   │   ├── layout/                   # Navbar (con accesos a redes/ubicación estilo Homidori), Footer
│   │   └── products/                 # ProductCard, Grid de productos, detalles de figuras
│   ├── lib/
│   │   ├── db.ts                     # Instancia de Prisma Client
│   │   ├── mercadopago.ts            # Configuración e inicialización del SDK de Mercado Pago
│   │   ├── storage.ts                # Utilidad para subida de archivos (comprobantes manuales)
│   │   └── transformers.ts           # Mapeo de datos DB a DTOs de UI
│   └── stores/
│       ├── cart-store.ts             # Estado global del carrito (Zustand)
│   -   └── ui-store.ts               # Control de modales, menús y filtros de la tienda
3. Modelo de Datos y Base de Datos (prisma/schema.prisma)
Product y Category: Adaptados para coleccionables (incluyendo campos de fabricante, escala, franquicia/anime, estado de stock o preventa).

Order: Relación con el usuario, total, y un campo de estado de pago (PENDING_PAYMENT, PAID_MP, VERIFYING_MANUAL, APPROVED, REJECTED).

PaymentProof (Nuevo para pagos manuales):

id: Identificador único.

orderId: Relación directa con la orden.

imageUrl: URL del comprobante almacenado en la nube (Supabase Storage / Vercel Blob).

operationNumber: Número de operación o referencia del voucher ingresado por el usuario.

status: PENDING (por revisar), APPROVED (aprobado por admin), REJECTED (rechazado).

createdAt: Fecha de subida.

4. Flujo de Experiencia de Usuario (Frontend / UI)
Vitrina y Navegación (Estilo Homidori): El usuario navega por un diseño limpio enfocado en los productos de anime, con menús desplegables por serie/anime, filtros laterales rápidos y visualización de stock/preventas claras.

Checkout Dual: Al procesar la compra, el usuario elige entre:

Opción A (Pasarela Automática): Redirección al flujo de Mercado Pago (Checkout Pro o integrado). El webhook de Mercado Pago actualiza la orden a PAID_MP y libera/descuenta stock de inmediato.

Opción B (Pago Manual / POS o Transferencia): Se muestran los datos de cuentas bancarias y QR de la tienda. El sistema despliega un formulario interactivo para que el usuario escriba su número de operación y suba la captura/foto del voucher. La orden queda en estado VERIFYING_MANUAL.

Panel Administrativo (Aprobación Manual): El administrador cuenta con una vista dedicada (/admin/manual-payments) donde visualiza en tiempo real las fichas de los clientes, la imagen ampliada del comprobante de pago subido, y los botones de Aprobar (lo que cambia la orden a APPROVED y procesa el estatus logístico) o Rechazar (con notificación de reintento).
