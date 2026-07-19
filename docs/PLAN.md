# Plan: La Tiendita de Blue — E-commerce de Figuras de Anime (Perú)

La especificación completa del negocio vive en la bóveda de Obsidian
(`docs/Boveda-Proyecto-Ecommerce`), organizada en 8 secciones (Core y
Arquitectura, Frontend, Pagos, Seguridad, Panel POS, Flujos de Negocio,
Legal y Despliegue).

## Stack Tecnológico
- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui
- **Base de datos**: PostgreSQL 18 (local) / Neon (producción)
- **ORM**: Prisma 7 (adapter pg)
- **Auth**: NextAuth v5 — Credenciales + Google OAuth (condicional)
- **Estado global**: Zustand · **Formularios**: react-hook-form + zod
- **Pagos**: Manual (Yape/Plin/transferencia + Bandeja POS) y Mercado Pago (preparado)
- **Imágenes**: locales en `public/Imagenes/` (categorías, líneas, QRs, avatares) + Cloudinary/fallback local para vouchers y productos

## Estado de implementación (julio 2026)

### ✅ Completado
1. **DB desde cero** — schema completo (User/Account/Category/Line/Brand/Product/Review/Order/OrderItem/PaymentProof), migración init, seed desde carpetas de imágenes reales
2. **Autenticación** — registro con username, Google condicional, reset forzado por soporte del admin, RBAC middleware
3. **Catálogo dinámico** — categorías (animes) con flag TENDENCIA, líneas, marcas, filtros combinados y búsqueda
4. **Tienda** — home (CategoryTrends, destacados, líneas, reseñas, burbuja Bluet→WhatsApp), detalle con galería/preventas/reseñas verificadas, avatares locales
5. **Checkout dual** — envíos (recojo/motorizado/courier) + pago manual con QRs y voucher o Mercado Pago; idempotencia anti doble clic; processCode; success con CTA de WhatsApp
6. **Panel admin** — dashboard KPIs, Bandeja POS (aprobar/rechazar con liberación de stock), órdenes con tracking, CRUD productos/categorías/líneas, usuarios con datos privados y reset de clave
7. **Marco legal (07)** — páginas /terms, /returns y /privacy con el contenido de la bóveda + checkbox obligatorio de aceptación en el checkout + columna Legal en el footer
8. **Bundles "Combina y Ahorra" (02.02)** — 2 uds. del mismo anime = 5% dto., 3+ = 10%; cálculo compartido cliente/servidor (`src/lib/pricing.ts`), `discountAmount` persistido en la orden, bloque de set en el detalle de producto
9. **Buy Me a Coffee (02.01)** — sección desplegable en el home con el QR de Yape local
10. **Liberación de stock (06.01)** — órdenes de pasarela colgadas en PENDING_PAYMENT se cancelan y liberan stock (60 min por defecto, `STOCK_RELEASE_MINUTES`); endpoint `/api/cron/release-stock` (Vercel Cron con `CRON_SECRET`) + disparo oportunista al abrir el dashboard admin
11. **Cloudinary activo** — credenciales reales en `.env`; productos/vouchers/reseñas/banners suben a `latiendita/*`; avatares en `latiendita/avatars` con public_id = userId (sobrescribe al cambiar foto) y fallback local sin credenciales
12. **Campañas y Marketing (05.05)** — modelos Banner/Announcement/Coupon/DiscountRule con máquina de estados Draft/Active/Scheduled; CRUD unificado `/api/admin/campaigns/[type]`; panel `/admin/campaigns` con tabs; Hero carrusel y cinta superior administrables; motor de reglas de precio (global/categoría/línea) con precios tachados en catálogo y precio congelado en la orden; cupones con límite de usos, compra mínima y validación en tiempo real en el checkout (`couponDiscount` persistido)
13. **CRM y Notificaciones (05.04)** — ficha 360° del cliente (`/admin/users/[id]`) con nivel de fidelidad, notas del admin e historial; plantillas de mensajes WhatsApp con "Copiar mensaje" (proforma, pago aprobado, enviado, post-entrega, llegada de preventa); opt-in de marketing en registro y perfil (Ley 29733)
14. **Dashboard analítico (05.01)** — KPIs con selector de tiempo (Hoy/7d/30d/1a): ingresos, ventas completadas, capital en preventas, tareas críticas; gráfico de área suavizada de flujo de caja (stock vs preventas, recharts); donut de estado logístico con número héroe; mapa de calor vectorial del Perú (d3-geo + GeoJSON en `src/data/peru-departments.json`) coloreado por clientes por departamento (campo `User.department`, seleccionable en el perfil) + ranking Top 5; paletas validadas para daltonismo en light y dark
15. **Mercado Pago sandbox** — credenciales TEST activas en `.env`; el checkout redirige a `sandbox.mercadopago.com.pe`; al pasar a producción solo reemplazar por APP_USR-... (el webhook de acreditación requiere URL pública, no funciona en localhost)

### 🔜 Próximas fases (según bóveda)
- Boleta virtual PDF con hash antifraude (06.02)
- Correos transaccionales automáticos (05.04 §2, requiere proveedor de email)
- Pop-ups promocionales con cookies (05.05 §2)
- Facturación electrónica SUNAT · API couriers
- Credenciales reales de Google OAuth y Mercado Pago producción
