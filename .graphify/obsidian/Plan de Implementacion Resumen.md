# Plan de Implementacion Resumen

> 18 nodes

## Key Concepts

- **Plan: La Tiendita de Blue (referenciado, detallado en otro chunk)** (24 connections) — `docs/PLAN.md`
- **Boveda de Obsidian (docs/Boveda-Proyecto-Ecommerce, 8 secciones)** (9 connections) — `docs/PLAN.md`
- **Bundles 'Combina y Ahorra' (referenciado, detallado en otro chunk)** (3 connections) — `docs/PLAN.md`
- **Campanas y Marketing (05.05): Banner/Announcement/Coupon/DiscountRule, motor de reglas de precio, cupones** (3 connections) — `docs/PLAN.md`
- **Exclusiones (10): sin cupones/descuentos, sin resenas, sin wishlist avanzada, sin multi-idioma/moneda** (3 connections) — `docs/PRD.md`
- **Tienda (home, detalle con galeria/preventas/resenas verificadas, avatares locales, burbuja Bluet→WhatsApp)** (2 connections) — `docs/PLAN.md`
- **Marco legal (07): /terms, /returns, /privacy + checkbox de aceptacion en checkout** (2 connections) — `docs/PLAN.md`
- **Buy Me a Coffee (02.01): seccion desplegable en home con QR de Yape local** (2 connections) — `docs/PLAN.md`
- **Liberacion de stock (06.01): cancelacion de ordenes PENDING_PAYMENT y liberacion tras 60 min** (2 connections) — `docs/PLAN.md`
- **CRM y Notificaciones (05.04): ficha 360 del cliente, plantillas WhatsApp, opt-in marketing (Ley 29733)** (2 connections) — `docs/PLAN.md`
- **Dashboard analitico (05.01): KPIs, flujo de caja (recharts), mapa de calor Peru (d3-geo)** (2 connections) — `docs/PLAN.md`
- **Proximas fases (boleta PDF, correos transaccionales, pop-ups, SUNAT, credenciales OAuth/MP produccion)** (2 connections) — `docs/PLAN.md`
- **Stack Tecnologico (Next.js 16, TS, Tailwind v4, Prisma 7, NextAuth v5, Zustand, RHF+Zod, pagos manual+Mercado Pago)** (1 connections) — `docs/PLAN.md`
- **DB desde cero (schema completo, migracion init, seed desde imagenes)** (1 connections) — `docs/PLAN.md`
- **Catalogo dinamico (categorias/animes con TENDENCIA, lineas, marcas, filtros y busqueda)** (1 connections) — `docs/PLAN.md`
- **Cloudinary activo (productos/vouchers/resenas/banners en latiendita/*, avatares con public_id=userId)** (1 connections) — `docs/PLAN.md`
- **Mercado Pago sandbox (credenciales TEST, redirige a sandbox.mercadopago.com.pe)** (1 connections) — `docs/PLAN.md`
- **src/lib/pricing.ts** (1 connections) — `src/lib/pricing.ts`

## Relationships

- [[PRD Resumen de Requisitos]] (3 shared connections)
- [[TestSprite Findings Report]] (2 shared connections)
- [[Env Config & Payment Gateways]] (1 shared connections)
- [[Modelo de Datos (Entidades)]] (1 shared connections)
- [[Estructura de Paginas y Rutas]] (1 shared connections)
- [[Cart & Checkout Test Findings]] (1 shared connections)
- [[README Overview del Proyecto]] (1 shared connections)

## Source Files

- `docs/PLAN.md`
- `docs/PRD.md`
- `src/lib/pricing.ts`

## Audit Trail

- EXTRACTED: 54 (87%)
- INFERRED: 1 (2%)
- AMBIGUOUS: 7 (11%)

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*