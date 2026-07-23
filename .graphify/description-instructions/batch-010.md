# Node Description Batch 11 of 30

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

- "lib_campaign_admin_normalizedates": "normalizeDates()" | kind=code-symbol | source=src/lib/campaign-admin.ts:L96 | neighbors=[route.ts, campaign-admin.ts, route.ts] | lang=en
- "lib_campaigns_getactiveannouncement": "getActiveAnnouncement()" | kind=code-symbol | source=src/lib/campaigns.ts:L53 | neighbors=[campaigns.ts, liveCampaignWhere(), layout.tsx] | lang=en
- "lib_campaigns_getactivebanners": "getActiveBanners()" | kind=code-symbol | source=src/lib/campaigns.ts:L46 | neighbors=[campaigns.ts, liveCampaignWhere(), page.tsx] | lang=en
- "lib_cloudinary_iscloudinaryenabled": "isCloudinaryEnabled()" | kind=code-symbol | source=src/lib/cloudinary.ts:L10 | neighbors=[route.ts, cloudinary.ts, route.ts] | lang=en
- "lib_image_validation_image_ext": "IMAGE_EXT" | kind=code-symbol | source=src/lib/image-validation.ts:L6 | neighbors=[route.ts, image-validation.ts, route.ts] | lang=en
- "lib_image_validation_sniffimagetype": "sniffImageType()" | kind=code-symbol | source=src/lib/image-validation.ts:L14 | neighbors=[route.ts, image-validation.ts, route.ts] | lang=en
- "lib_mercadopago_getclient": "getClient()" | kind=code-symbol | source=src/lib/mercadopago.ts:L15 | neighbors=[mercadopago.ts, getPaymentClient(), getPreferenceClient()] | lang=en
- "lib_mercadopago_getpaymentclient": "getPaymentClient()" | kind=code-symbol | source=src/lib/mercadopago.ts:L25 | neighbors=[mercadopago.ts, getClient(), route.ts] | lang=en
- "lib_mercadopago_getpreferenceclient": "getPreferenceClient()" | kind=code-symbol | source=src/lib/mercadopago.ts:L21 | neighbors=[mercadopago.ts, getClient(), route.ts] | lang=en
- "lib_release_stock_releaseabandonedstock": "releaseAbandonedStock()" | kind=code-symbol | source=src/lib/release-stock.ts:L16 | neighbors=[page.tsx, release-stock.ts, route.ts] | lang=en
- "lib_reports_pdf_drawfooter": "drawFooter()" | kind=code-symbol | source=src/lib/reports-pdf.ts:L45 | neighbors=[reports-pdf.ts, downloadDeliveriesPdf(), downloadUsersPdf()] | lang=en
- "lib_reports_pdf_drawheader": "drawHeader()" | kind=code-symbol | source=src/lib/reports-pdf.ts:L22 | neighbors=[reports-pdf.ts, downloadDeliveriesPdf(), downloadUsersPdf()] | lang=en
- "lib_separations_computebalance": "computeBalance()" | kind=code-symbol | source=src/lib/separations.ts:L36 | neighbors=[separations.ts, separations-server.ts, route.ts] | lang=en
- "lib_separations_server_recalcseparation": "recalcSeparation()" | kind=code-symbol | source=src/lib/separations-server.ts:L9 | neighbors=[separations-server.ts, route.ts, route.ts] | lang=en
- "lib_separations_server_separation_include": "SEPARATION_INCLUDE" | kind=code-symbol | source=src/lib/separations-server.ts:L83 | neighbors=[route.ts, separations-server.ts, route.ts] | lang=en
- "lib_separations_server_serializeseparation": "serializeSeparation()" | kind=code-symbol | source=src/lib/separations-server.ts:L41 | neighbors=[route.ts, separations-server.ts, route.ts] | lang=en
- "lib_social_whatsappchaturl": "whatsappChatUrl()" | kind=code-symbol | source=src/lib/social.ts:L18 | neighbors=[ContactBadges.tsx, QuickAccessPanel.tsx, social.ts] | lang=en
- "lib_transformers_transformbrand": "transformBrand()" | kind=code-symbol | source=src/lib/transformers.ts:L111 | neighbors=[route.ts, route.ts, transformers.ts] | lang=en
- "lib_transformers_transformreview": "transformReview()" | kind=code-symbol | source=src/lib/transformers.ts:L126 | neighbors=[transformers.ts, route.ts, page.tsx] | lang=en
- "manualflow0602_boleta_pdf_design": "Diseno del Comprobante PDF (QR dinamico, hash SHA-256, marca de agua, sello dig…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/06-Flujos-De-Negocio-Y-Trazabilidad/[[06.02-Flujo de Compra Manual, POS y Boleta PDF]].md | neighbors=[02.01 (referenciada repetidamente como …, 06.02 — Flujo de Compra Manual, POS y B…, Modelo de Negocio (catalogo dual, pago …] | lang=en
- "manualpayment0302_admin_approval_flow": "Flujo Admin de Aprobacion de Voucher (Server Action que cambia AWAITING_VERIFIC…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/03-Sistema-Pagos-Y-Checkouts/[[03.02-Plantilla de Pago Manual con QR Digital y Vouchers]].md | neighbors=[Regla: no usar Server Actions, usar Rou…, 03.02 — Plantilla de Pago Manual con QR…, 05.02 — Bandeja POS de Aprobacion de Co…] | lang=en
- "pages_admin": "Paginas de Administracion" | kind=entity | source=docs/PAGES.md | neighbors=[Listado de Paginas - BasicTechShop (ref…, Proteccion de Rutas (Middleware), Estructura de Layouts (root, (shop), (a…] | lang=nl
- "pages_api_routes": "API Routes (listado detallado con metodos HTTP)" | kind=entity | source=docs/PAGES.md | neighbors=[Estructura de API Routes (auth, users, …, Listado de Paginas - BasicTechShop (ref…, API Endpoints (7): Auth, Products, Cate…] | lang=en
- "pages_profile": "Paginas de Perfil de Usuario" | kind=entity | source=docs/PAGES.md | neighbors=[Estructura de Layouts (root, (shop), (a…, Listado de Paginas - BasicTechShop (ref…, Proteccion de Rutas (Middleware)] | lang=nl
- "plan_bundles_combina_ahorra": "Bundles 'Combina y Ahorra' (referenciado, detallado en otro chunk)" | kind=entity | source=docs/PLAN.md | neighbors=[src/lib/pricing.ts, Boveda de Obsidian (docs/Boveda-Proyect…, Plan: La Tiendita de Blue (referenciado…] | lang=es
- "plan_campanas_marketing": "Campanas y Marketing (05.05): Banner/Announcement/Coupon/DiscountRule, motor de…" | kind=entity | source=docs/PLAN.md | neighbors=[Boveda de Obsidian (docs/Boveda-Proyect…, Plan: La Tiendita de Blue (referenciado…, Exclusiones (10): sin cupones/descuento…] | lang=nl
- "prd_api_endpoints": "API Endpoints (7): Auth, Products, Categories, Brands, Orders, Addresses, Users…" | kind=entity | source=docs/PRD.md | neighbors=[API Routes (listado detallado con metod…, PRD (referenciado, detallado en otro ch…, Estructura de Paginas (6): Publicas 6, …] | lang=en
- "prd_estructura_paginas": "Estructura de Paginas (6): Publicas 6, Checkout 3, Perfil 7, Admin 7, Total 23" | kind=entity | source=docs/PRD.md | neighbors=[Listado de Paginas - BasicTechShop (ref…, API Endpoints (7): Auth, Products, Cate…, PRD (referenciado, detallado en otro ch…] | lang=nl
- "prd_exclusiones": "Exclusiones (10): sin cupones/descuentos, sin resenas, sin wishlist avanzada, s…" | kind=entity | source=docs/PRD.md | neighbors=[Campanas y Marketing (05.05): Banner/An…, Tienda (home, detalle con galeria/preve…, PRD (referenciado, detallado en otro ch…] | lang=en
- "prisma_seed_main": "main()" | kind=code-symbol | source=prisma/seed.ts:L48 | neighbors=[seed.ts, scanImageFolder(), slugify()] | lang=en
- "products_filtersidebar_filtersidebar": "FilterSidebar()" | kind=code-symbol | source=src/components/products/FilterSidebar.tsx:L26 | neighbors=[FilterMobile.tsx, FilterSidebar.tsx, page.tsx] | lang=en
- "products_pagination_pagination": "Pagination()" | kind=code-symbol | source=src/components/products/Pagination.tsx:L28 | neighbors=[page.tsx, Pagination.tsx, buildPageList()] | lang=en
- "profiles0203_document": "02.03 — Sistema de Perfiles y Datos Privados de Admin" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.03-Sistema de Perfiles y Datos Privados de Admin]].md | neighbors=[Flujo de Cambio Forzado (mustChangePass…, Diseno de Interfaces Protegidas (perfil…, Matriz de Visibilidad de Datos (usernam…] | lang=nl
- "providers_themeprovider": "ThemeProvider.tsx" | kind=code-symbol | source=src/components/providers/ThemeProvider.tsx:L1 | neighbors=[layout.tsx, 2982ca1 iniciar proyecto, ThemeProvider()] | lang=en
- "react_bits_spotlightcard_spotlightcard": "SpotlightCard()" | kind=code-symbol | source=src/components/react-bits/SpotlightCard.tsx:L12 | neighbors=[QuickAccessPanel.tsx, ReviewsSection.tsx, SpotlightCard.tsx] | lang=en
- "readme_despliegue": "Despliegue (build prisma generate && next build, Vercel/Neon)" | kind=entity | source=README.md | neighbors=[Despliegue en Vercel (build: npx prisma…, Configuration (path alias @/*, remote i…, README.md — La Tiendita de Blue] | lang=en
- "readme_estructura_proyecto": "Estructura del Proyecto (arbol src/)" | kind=entity | source=README.md | neighbors=[Adicionales — Desglose Detallado de Dir…, 01.02 — Estructura de Directorios Next.…, README.md — La Tiendita de Blue] | lang=en
- "reviews0204_document": "02.04 — Sistema de Resenas Vinculado a Usuarios (nota referenciada, no incluida…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.04-Sistema de Reseñas Vinculado a Usuarios]].md | neighbors=[01.03 — Modelo de Base de Datos Prisma …, Bloque 4: <RatingsAndReviews/> — promed…, 03.02 — Plantilla de Pago Manual con QR…] | lang=nl
- "security0402_checklist": "Checklist de Seguridad (Code Review): dangerouslySetInnerHTML, validacion serve…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/04-Seguridad-Y-Prevencion-De-Errores/[[04.02-Blindaje contra SQL Injection y XSS]].md | neighbors=[Regla: no usar Server Actions, usar Rou…, Regla: formularios con react-hook-form …, 04.02 — Blindaje contra SQL Injection y…] | lang=en
- "security0402_document": "04.02 — Blindaje contra SQL Injection y XSS" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/04-Seguridad-Y-Prevencion-De-Errores/[[04.02-Blindaje contra SQL Injection y XSS]].md | neighbors=[Checklist de Seguridad (Code Review): d…, Blindaje SQL Injection (consultas param…, Blindaje XSS (auto-escaping React 19, p…] | lang=es

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-010.json

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
