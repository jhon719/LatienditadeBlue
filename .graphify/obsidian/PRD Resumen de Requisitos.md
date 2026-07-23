# PRD Resumen de Requisitos

> 13 nodes

## Key Concepts

- **PRD (referenciado, detallado en otro chunk)** (19 connections) — `docs/PRD.md`
- **Modelo de Datos (5): User-Address-Order-OrderItem-Product-Category-Brand** (4 connections) — `docs/PRD.md`
- **Estados de Pedido (PRD): PENDING→CONFIRMED→PROCESSING→SHIPPED→DELIVERED / CANCELLED** (2 connections) — `docs/PRD.md`
- **Metodos de Pago (PRD): CARD, TRANSFER, WALLET, CASH_ON_DELIVERY** (2 connections) — `docs/PRD.md`
- **Categorias de Productos (8): PCs, Monitores, Teclados, Mouse, Audifonos, Almacenamiento, Componentes** (2 connections) — `docs/PRD.md`
- **Marcas Soportadas: ASUS, MSI, Corsair, Logitech, Razer, HyperX, Kingston, Samsung, LG, Dell, NVIDIA, AMD** (2 connections) — `docs/PRD.md`
- **Fases de Implementacion (11): 1.UI mock completada, 2.Backend en progreso, 3.Auth pendiente, 4.Pagos Stripe pendiente, 5.Deploy pendiente** (2 connections) — `docs/PRD.md`
- **Stack Tecnologico (PRD): Next.js16, TS, PostgreSQL planificado, Prisma, shadcn/ui new-york, Zustand, RHF+Zod, NextAuth.js** (1 connections) — `docs/PRD.md`
- **Tienda Publica (4.1): Homepage, Catalogo, Detalle, Carrito, Checkout** (1 connections) — `docs/PRD.md`
- **Autenticacion (4.2): registro email/password, login, proteccion de rutas por rol** (1 connections) — `docs/PRD.md`
- **Perfil de Usuario (4.3): info personal, historial pedidos, direcciones CRUD, favoritos, configuracion** (1 connections) — `docs/PRD.md`
- **Panel de Administracion (4.4): dashboard, productos CRUD, usuarios, pagos/ordenes, configuracion** (1 connections) — `docs/PRD.md`
- **Requisitos No Funcionales (9): Responsive, tema dark/light, WCAG basico, SEO SSR, skeletons** (1 connections) — `docs/PRD.md`

## Relationships

- [[Plan de Implementacion Resumen]] (3 shared connections)
- [[Estructura de Paginas y Rutas]] (2 shared connections)
- [[Modelo de Datos (Entidades)]] (2 shared connections)
- [[README Overview del Proyecto]] (1 shared connections)
- [[TestSprite Findings Report]] (1 shared connections)

## Source Files

- `docs/PRD.md`

## Audit Trail

- EXTRACTED: 36 (92%)
- INFERRED: 2 (5%)
- AMBIGUOUS: 1 (3%)

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*