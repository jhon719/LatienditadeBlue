# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**La Tiendita de Blue** es un e-commerce peruano de figuras coleccionables y merchandising de anime, construido con Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Prisma 7 y PostgreSQL. La especificación completa del negocio vive en la bóveda de Obsidian (`docs/Boveda-Proyecto-Ecommerce`, accesible por MCP).

Modelo de negocio: catálogo de figuras por **Categoría (anime)**, **Línea de figura** y **Marca (fabricante)**, con estados STOCK / PREVENTA / AGOTADO / ONLINE. Pago dual: **manual (Yape/Plin/transferencia con voucher validado en Bandeja POS)** y **Mercado Pago** (preparado, se activa con credenciales en `.env`). Envíos coordinados por WhatsApp (recojo, motorizado Lima, courier a provincia).

### Component Organization
```
src/components/
├── layout/      # Header, Footer, TopBar, MobileNav, BluetBubble, ThemeToggle
├── home/        # HeroBanner, CategoryTrends, FeaturedProducts, LinesSection, ReviewsSection
├── products/    # ProductCard, ProductGrid, ProductDetail, ProductReviews, FilterSidebar
├── cart/        # CartItem, CartSummary
├── checkout/    # OrderSummary, ManualPaymentSection
├── admin/       # AdminSidebar, ProductForm, ImageUpload, StatsCard
├── profile/     # ProfileSidebar, AvatarUploader, ProfileSettingsForm
├── auth/        # LoginForm, RegisterForm, GoogleButton, ForcedResetForm
├── common/      # UserAvatar (avatar local con fallback Mascota BLUE)
├── providers/   # ThemeProvider, SessionProvider
└── ui/          # shadcn/ui components
```

### Data Layer
- `prisma/schema.prisma` — Modelo relacional completo (User, Account, Category, Line, Brand, Product, Review, Order, OrderItem, PaymentProof)
- `prisma/seed.ts` — Seed que escanea `public/Imagenes/` para categorías/líneas
- `src/lib/prisma.ts` — Cliente Prisma singleton (adapter pg)
- `src/lib/transformers.ts` — Mapeo Prisma → tipos de UI (Decimal→number, ratings)
- `src/types/index.ts` — Interfaces de dominio (Product, Category, Line, Order, Review...)

### Assets locales (NO renombrar archivos)
- `public/Imagenes/Lista de Animes/` — imágenes de categorías (slug ↔ nombre de archivo)
- `public/Imagenes/Lineas de figuras/` — imágenes de líneas
- `public/Imagenes/Pagos/` — QRs de Yape/Plin y cuenta bancaria del checkout manual
- `public/Imagenes/avatar/` — avatares de usuarios subidos ( `[userId].ext` )
- `public/Imagenes/{LOGO BLUE.jpeg, Mascota BLUE.png}` — logo y mascota Bluet (fallback universal)
- `public/uploads/` — fallback local de vouchers cuando Cloudinary no está configurado

### Auth y seguridad
- NextAuth v5 (JWT) con Credentials + Google (condicional: solo si `GOOGLE_CLIENT_ID/SECRET` en env)
- RBAC en `src/middleware.ts` (rutas `/admin` solo ADMIN) + `requireUser/requireAdmin` en `src/lib/api-guards.ts`
- `mustChangePassword` fuerza redirect a `/forced-reset` (flujo de soporte del admin)
- Órdenes con `idempotencyKey` unique (anti doble clic) y `processCode` (trazabilidad ORD-XXXXX)
- Datos privados del usuario (dni, phone, address) nunca se exponen en endpoints públicos

### Base de datos local
- PostgreSQL 18 en `localhost:5432`, DB `latiendita_blue` (credenciales en `.env`)
- `npx prisma migrate dev` para migraciones, `npm run db:seed` para seed
- Usuarios seed: `admin@latienditadeblue.com` / `Admin-Blue-2026` (ADMIN) y `cliente@demo.com` / `Cliente-Demo-2026`

### Styling System
- Tailwind CSS v4, paleta de marca en hex: azul `#4A80BE`, azul oscuro `#142F5C`, amarillo `#F5B400`, pasteles (`#E1F0FF`, `#FFF5D1`, `#FFEAEA`, `#E2FBE9`)
- Tipografías: Bebas Neue (`font-display`) y Montserrat (`font-sans`)
- Dark/light via `next-themes`; usa `cn()` de `src/lib/utils.ts`

## Configuration

- **Path alias**: `@/*` maps to `./src/*`
- **Images**: remote patterns para `images.unsplash.com` y `res.cloudinary.com`
- **Deploy**: build = `prisma generate && next build`; en Vercel configurar `DATABASE_URL` (Neon), `AUTH_SECRET`, Cloudinary (obligatorio en prod: el disco es efímero) y opcionalmente Google/Mercado Pago

## Project Plan

See `/docs/PLAN.md` for detailed implementation phases and roadmap.
La documentación de negocio completa está en la bóveda Obsidian (`docs/Boveda-Proyecto-Ecommerce`).

## Rules

- Al momento de crear datos nuevos no uses Modales, usa paginas dedicadas para los formularios 
- no uses server actions, usa Route handlers
- para manejo de estado global usa Zustand
- para formularios usar react-hook-form y zod
