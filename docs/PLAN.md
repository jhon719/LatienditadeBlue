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

### 🔜 Próximas fases (según bóveda)
- Boleta virtual PDF con hash antifraude (06.02)
- Bundles "lleva el set completo" (02.02 bloque 3)
- Dashboard con mapa de calor del Perú y gráficos (05.01)
- Cron job de liberación de stock a las 2h sin voucher (05.02)
- Buy Me a Coffee (02.01) · Facturación electrónica SUNAT · API couriers
- Activar Mercado Pago y Google OAuth con credenciales reales
