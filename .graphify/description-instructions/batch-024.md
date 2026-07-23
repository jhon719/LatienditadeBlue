# Node Description Batch 25 of 30

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
LANGUAGE: each entry has a `lang=` marker giving the language of its source.
Write that entry's description in EXACTLY that language. Do not translate to
a single common language — match each node's source language individually.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "orders_page_orderstatusbadge": "orderStatusBadge" | kind=code-symbol | source=src/app/(admin-panel)/admin/orders/page.tsx:L48 | neighbors=[page.tsx] | lang=en
- "orders_page_shippingeditor": "ShippingEditor()" | kind=code-symbol | source=src/app/(admin-panel)/admin/orders/page.tsx:L63 | neighbors=[page.tsx] | lang=en
- "orders_page_shippinglabels": "shippingLabels" | kind=code-symbol | source=src/app/(shop)/profile/orders/page.tsx:L34 | neighbors=[page.tsx] | lang=en
- "orders_page_statusconfig": "statusConfig" | kind=code-symbol | source=src/app/(shop)/profile/orders/page.tsx:L25 | neighbors=[page.tsx] | lang=en
- "orders_route_createorderschema": "createOrderSchema" | kind=code-symbol | source=src/app/api/orders/route.ts:L50 | neighbors=[route.ts] | lang=en
- "orders_route_generateprocesscode": "generateProcessCode()" | kind=code-symbol | source=src/app/api/orders/route.ts:L94 | neighbors=[route.ts] | lang=en
- "orders_route_get": "GET()" | kind=code-symbol | source=src/app/api/orders/route.ts:L16 | neighbors=[route.ts] | lang=en
- "orders_route_post": "POST()" | kind=code-symbol | source=src/app/api/orders/route.ts:L104 | neighbors=[route.ts] | lang=en
- "orders_route_shipping_costs": "SHIPPING_COSTS" | kind=code-symbol | source=src/app/api/orders/route.ts:L42 | neighbors=[route.ts] | lang=en
- "paymentid_route_params": "Params" | kind=code-symbol | source=src/app/api/admin/separations/[id]/payments/[paymentId]/route.ts:L7 | neighbors=[route.ts] | lang=en
- "paymentid_route_patch": "PATCH()" | kind=code-symbol | source=src/app/api/admin/separations/[id]/payments/[paymentId]/route.ts:L16 | neighbors=[route.ts] | lang=en
- "paymentid_route_schema": "schema" | kind=code-symbol | source=src/app/api/admin/separations/[id]/payments/[paymentId]/route.ts:L9 | neighbors=[route.ts] | lang=en
- "payments_route_params": "Params" | kind=code-symbol | source=src/app/api/separations/[id]/payments/route.ts:L7 | neighbors=[route.ts] | lang=en
- "payments_route_post": "POST()" | kind=code-symbol | source=src/app/api/separations/[id]/payments/route.ts:L17 | neighbors=[route.ts] | lang=en
- "payments_route_schema": "schema" | kind=code-symbol | source=src/app/api/separations/[id]/payments/route.ts:L9 | neighbors=[route.ts] | lang=en
- "plan_catalogo_dinamico": "Catalogo dinamico (categorias/animes con TENDENCIA, lineas, marcas, filtros y b…" | kind=entity | source=docs/PLAN.md | neighbors=[Plan: La Tiendita de Blue (referenciado…] | lang=es
- "plan_cloudinary_activo": "Cloudinary activo (productos/vouchers/resenas/banners en latiendita/*, avatares…" | kind=entity | source=docs/PLAN.md | neighbors=[Plan: La Tiendita de Blue (referenciado…] | lang=es
- "plan_db_desde_cero": "DB desde cero (schema completo, migracion init, seed desde imagenes)" | kind=entity | source=docs/PLAN.md | neighbors=[Plan: La Tiendita de Blue (referenciado…] | lang=en
- "plan_mercadopago_sandbox": "Mercado Pago sandbox (credenciales TEST, redirige a sandbox.mercadopago.com.pe)" | kind=entity | source=docs/PLAN.md | neighbors=[Plan: La Tiendita de Blue (referenciado…] | lang=pt
- "plan_stack_tecnologico": "Stack Tecnologico (Next.js 16, TS, Tailwind v4, Prisma 7, NextAuth v5, Zustand,…" | kind=entity | source=docs/PLAN.md | neighbors=[Plan: La Tiendita de Blue (referenciado…] | lang=en
- "postcss_config_config": "config" | kind=code-symbol | source=postcss.config.mjs:L1 | neighbors=[postcss.config.mjs] | lang=en
- "prd_autenticacion": "Autenticacion (4.2): registro email/password, login, proteccion de rutas por rol" | kind=entity | source=docs/PRD.md | neighbors=[PRD (referenciado, detallado en otro ch…] | lang=en
- "prd_panel_admin": "Panel de Administracion (4.4): dashboard, productos CRUD, usuarios, pagos/orden…" | kind=entity | source=docs/PRD.md | neighbors=[PRD (referenciado, detallado en otro ch…] | lang=nl
- "prd_perfil_usuario": "Perfil de Usuario (4.3): info personal, historial pedidos, direcciones CRUD, fa…" | kind=entity | source=docs/PRD.md | neighbors=[PRD (referenciado, detallado en otro ch…] | lang=nl
- "prd_requisitos_no_funcionales": "Requisitos No Funcionales (9): Responsive, tema dark/light, WCAG basico, SEO SS…" | kind=entity | source=docs/PRD.md | neighbors=[PRD (referenciado, detallado en otro ch…] | lang=en
- "prd_stack_tecnologico": "Stack Tecnologico (PRD): Next.js16, TS, PostgreSQL planificado, Prisma, shadcn/…" | kind=entity | source=docs/PRD.md | neighbors=[PRD (referenciado, detallado en otro ch…] | lang=en
- "prd_tienda_publica": "Tienda Publica (4.1): Homepage, Catalogo, Detalle, Carrito, Checkout" | kind=entity | source=docs/PRD.md | neighbors=[PRD (referenciado, detallado en otro ch…] | lang=en
- "prisma_config": "prisma.config.ts" | kind=code-symbol | source=prisma.config.ts:L1 | neighbors=[2982ca1 iniciar proyecto] | lang=en
- "prisma_seed_adapter": "adapter" | kind=code-symbol | source=prisma/seed.ts:L10 | neighbors=[seed.ts] | lang=en
- "prisma_seed_animes_dir": "ANIMES_DIR" | kind=code-symbol | source=prisma/seed.ts:L14 | neighbors=[seed.ts] | lang=en
- "prisma_seed_lineas_dir": "LINEAS_DIR" | kind=code-symbol | source=prisma/seed.ts:L15 | neighbors=[seed.ts] | lang=en
- "prisma_seed_pool": "pool" | kind=code-symbol | source=prisma/seed.ts:L9 | neighbors=[seed.ts] | lang=en
- "prisma_seed_prisma": "prisma" | kind=code-symbol | source=prisma/seed.ts:L11 | neighbors=[seed.ts] | lang=en
- "prisma_seed_public_dir": "PUBLIC_DIR" | kind=code-symbol | source=prisma/seed.ts:L13 | neighbors=[seed.ts] | lang=en
- "prisma_seed_titlecase": "titleCase()" | kind=code-symbol | source=prisma/seed.ts:L26 | neighbors=[seed.ts] | lang=en
- "privacy_page_metadata": "metadata" | kind=code-symbol | source=src/app/(shop)/privacy/page.tsx:L4 | neighbors=[page.tsx] | lang=en
- "privacy_page_privacypage": "PrivacyPage()" | kind=code-symbol | source=src/app/(shop)/privacy/page.tsx:L9 | neighbors=[page.tsx] | lang=en
- "privacy0703_data_collection": "Recoleccion de Datos (identificacion, contacto, transaccionales, cookies)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.03-Politica-de-Privacidad-y-Proteccion-de-Datos]].md | neighbors=[07.03 — Politica de Privacidad y Protec…] | lang=nl
- "privacy0703_data_usage": "Uso y Tratamiento (finalidad primaria/secundaria, seguridad, no venta a tercero…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.03-Politica-de-Privacidad-y-Proteccion-de-Datos]].md | neighbors=[07.03 — Politica de Privacidad y Protec…] | lang=en
- "products_filtermobile_filtermobileprops": "FilterMobileProps" | kind=code-symbol | source=src/components/products/FilterMobile.tsx:L15 | neighbors=[FilterMobile.tsx] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-024.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
