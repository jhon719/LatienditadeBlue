# La Tiendita de Blue 🩵

E-commerce peruano de **figuras coleccionables y merchandising de anime**, construido con Next.js 16, TypeScript, Tailwind CSS v4, Prisma 7 y PostgreSQL.

Inspirado estructural y visualmente en tiendas de referencia (estilo *Homidori*), el proyecto resuelve los problemas típicos del comercio digital en Perú —fraude, desconfianza y falta de trazabilidad— mediante un **sistema de pagos dual**, una **Bandeja POS antifraude** para validar vouchers, **boletas virtuales en PDF con código de proceso único** y coordinación de envíos por **WhatsApp**.

> La especificación de negocio completa vive en la bóveda de Obsidian (`docs/Boveda-Proyecto-Ecommerce`), organizada en 8 secciones: Core y Arquitectura, Frontend, Pagos, Seguridad, Panel POS, Flujos de Negocio, Legal y Despliegue.

## Modelo de negocio

- **Catálogo** organizado por **Categoría (anime)**, **Línea de figura** y **Marca (fabricante)**, con estados `STOCK` / `PREVENTA` / `AGOTADO` / `ONLINE`.
- **Pago dual**:
  - **Manual** (Yape / Plin / transferencia): el cliente ve el QR de la billetera de la tienda, ingresa su número de operación y sube el voucher, que un operador valida en la **Bandeja POS**.
  - **Mercado Pago** (sandbox activo; se pasa a producción cambiando las credenciales en `.env`).
- **Envíos** coordinados por WhatsApp: recojo en tienda, motorizado (Lima) y courier a provincia (Olva / Shalom).
- **Preventas y separaciones**: reservas con adelantos y pagos fraccionados.
- **Trazabilidad**: cada orden tiene `processCode` (ORD-XXXXX) y boleta PDF descargable al aprobarse el pago.

## Funcionalidades

### Tienda pública
- Home visual: Hero carrusel administrable, categorías en tendencia, destacados, líneas, reseñas y burbuja **Bluet → WhatsApp**.
- Catálogo con filtros combinados (anime / línea / marca / estado) y búsqueda.
- Detalle de producto con galería, especificaciones, reseñas verificadas y bundle **"Combina y Ahorra"** (2 uds. del mismo anime = 5 % dto., 3+ = 10 %).
- Carrito (Zustand) y checkout dual con selección de envío, cupones y aceptación obligatoria de términos.
- Perfil de usuario: avatar, datos privados, historial de pedidos, separaciones (preventa) y tracking del courier.

### Panel de administración
- **Dashboard analítico** con KPIs por rango de tiempo, flujo de caja (recharts), donut logístico y **mapa de calor del Perú** por departamento (d3-geo).
- **Bandeja POS**: aprobación/rechazo de vouchers con liberación de stock.
- **Órdenes y logística**: estados de despacho e inyección de tracking.
- **CRUD** de productos, categorías, líneas y marcas.
- **Campañas y marketing**: banners, anuncios, cupones y reglas de descuento (global / categoría / línea) con máquina de estados.
- **CRM 360°**: ficha del cliente, nivel de fidelidad, notas y plantillas de mensajes de WhatsApp.
- **Usuarios**: gestión con datos privados y reset de contraseña forzado por soporte.

## Stack tecnológico

| Categoría | Tecnología |
|-----------|-----------|
| Framework | Next.js 16 (App Router) + React 19 |
| Lenguaje | TypeScript |
| Estilos / UI | Tailwind CSS v4 · shadcn/ui · Radix · Embla Carousel |
| ORM / BD | Prisma 7 (adapter `pg`) · PostgreSQL |
| Autenticación | NextAuth v5 (JWT) — Credenciales + Google (condicional) |
| Estado global | Zustand |
| Formularios | react-hook-form + zod |
| Pagos | Mercado Pago SDK · pago manual con voucher |
| Imágenes | Cloudinary (con fallback local) |
| Documentos | jsPDF + jspdf-autotable (boletas y reportes) |
| Correo | Resend (transaccional) |
| Analítica | Recharts · d3-geo |

## Requisitos

- Node.js **20+**
- PostgreSQL **18** (local, DB `latiendita_blue`)

## Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd la-tiendita-de-blue

# Instalar dependencias (postinstall corre prisma generate)
npm install

# Crear el archivo .env (ver "Variables de entorno" más abajo)
# y configurar al menos DATABASE_URL y AUTH_SECRET

# Ejecutar migraciones
npx prisma migrate dev

# Sembrar datos iniciales (escanea public/Imagenes/ para categorías y líneas)
npm run db:seed
```

## Desarrollo

```bash
npm run dev
# Abrir http://localhost:3000
```

Usuarios seed:

| Rol | Email | Contraseña |
|-----|-------|------------|
| ADMIN | `admin@latienditadeblue.com` | `SEED_ADMIN_PASSWORD` (env) |
| Cliente demo | `cliente@demo.com` | `SEED_DEMO_PASSWORD` (env) |

Las contraseñas de los usuarios seed **no están hardcodeadas**: define `SEED_ADMIN_PASSWORD` y `SEED_DEMO_PASSWORD` en tu `.env` local antes de correr `npm run db:seed`. Si no las defines, el seed genera una contraseña aleatoria por usuario y la imprime en la consola.

## Variables de entorno

Crea un archivo `.env` en la raíz. Solo `DATABASE_URL` y `AUTH_SECRET` son obligatorias; el resto habilita funcionalidades opcionales.

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `DATABASE_URL` | ✅ | Cadena de conexión PostgreSQL |
| `AUTH_SECRET` | ✅ | Secreto de NextAuth v5 |
| `NEXT_PUBLIC_APP_URL` | Recomendada | URL base pública (callbacks de pago, correos) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Recomendada | Número de coordinación de envíos/soporte |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Opcional | Activan login con Google |
| `MERCADO_PAGO_ACCESS_TOKEN` | Opcional | Activa la pasarela Mercado Pago |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | Opcional | Subida de imágenes a la nube (obligatorio en prod: el disco es efímero) |
| `RESEND_API_KEY` / `EMAIL_FROM` | Opcional | Correos transaccionales |
| `CRON_SECRET` | Opcional | Protege el endpoint de liberación de stock (Vercel Cron) |
| `STOCK_RELEASE_MINUTES` | Opcional | Minutos para cancelar órdenes de pasarela colgadas (por defecto 60) |
| `SEED_ADMIN_PASSWORD` | Opcional (seed) | Contraseña del usuario ADMIN sembrado; si falta, se genera aleatoria |
| `SEED_DEMO_PASSWORD` | Opcional (seed) | Contraseña del cliente demo sembrado; si falta, se genera aleatoria |

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Build de producción (incluye `prisma generate`) |
| `npm run start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run db:seed` | Siembra datos iniciales |
| `npm run db:migrate` | Aplica migraciones (`prisma migrate deploy`) |

## Estructura del proyecto

```
src/
├── app/
│   ├── (shop)/              # Tienda pública: home, products, cart, checkout,
│   │                        #   profile, separations, terms/returns/privacy
│   ├── (admin-panel)/admin/ # dashboard, pos, orders, logistics, products,
│   │                        #   categories, campaigns, users, reports, settings
│   ├── (auth)/              # login, register, forced-reset
│   └── api/                 # Route handlers (orders, payments, proofs,
│                            #   webhook/mercadopago, cron/release-stock, ...)
├── components/              # layout, home, products, cart, checkout, admin,
│                            #   profile, auth, common, providers, ui (shadcn)
├── lib/                     # prisma, auth, cloudinary, mercadopago, email,
│                            #   pricing, separations, analytics, boleta-pdf, ...
├── stores/                  # cart-store, products-store (Zustand)
├── data/                    # peru-departments.json (GeoJSON del mapa de calor)
└── types/                   # Interfaces de dominio
```

## Modelo de datos

Modelo relacional en `prisma/schema.prisma`: `User`, `Account`, `Category`, `Line`, `Brand`, `Product`, `Review`, `Order`, `OrderItem`, `PaymentProof`, `Banner`, `Announcement`, `DiscountRule`, `Coupon`, `ImportBatch`, `Acquisition`, `ShalomContact`, `PreorderReservation`, `SeparationPayment`. Ver `docs/DATA-MODEL.md`.

## Convenciones

- **Sin Server Actions**: toda mutación pasa por Route Handlers (`src/app/api/`).
- Formularios con **react-hook-form + zod**; estado global con **Zustand**.
- Los formularios de creación usan **páginas dedicadas**, no modales.
- Datos privados del usuario (DNI, teléfono, dirección) nunca se exponen en endpoints públicos.
- No renombrar los assets de `public/Imagenes/` (el seed depende de sus nombres).

## Despliegue

Build: `prisma generate && next build`. En Vercel configurar `DATABASE_URL` (Neon), `AUTH_SECRET`, credenciales de Cloudinary (obligatorias en producción) y, opcionalmente, Google y Mercado Pago. El webhook de acreditación de Mercado Pago requiere una URL pública (no funciona en `localhost`).

## Documentación

- [CLAUDE.md](./CLAUDE.md) — Guía del proyecto para desarrollo asistido.
- [docs/PLAN.md](./docs/PLAN.md) — Plan de implementación y estado de fases.
- [docs/DATA-MODEL.md](./docs/DATA-MODEL.md) · [docs/PAGES.md](./docs/PAGES.md) · [docs/PRD.md](./docs/PRD.md)
- Bóveda Obsidian (`docs/Boveda-Proyecto-Ecommerce`) — Especificación completa del negocio.

## Licencia

MIT
