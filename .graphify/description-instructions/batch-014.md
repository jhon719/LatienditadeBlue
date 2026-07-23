# Node Description Batch 15 of 30

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

- "lib_social_socialplatform": "SocialPlatform" | kind=code-symbol | source=src/lib/social.ts:L4 | neighbors=[SocialIcon.tsx, social.ts] | lang=en
- "lib_social_tiktokprofileurl": "tiktokProfileUrl()" | kind=code-symbol | source=src/lib/social.ts:L14 | neighbors=[ContactBadges.tsx, social.ts] | lang=en
- "lib_utils_masksensitive": "maskSensitive()" | kind=code-symbol | source=src/lib/utils.ts:L23 | neighbors=[utils.ts, page.tsx] | lang=en
- "lib_utils_whatsapplink": "whatsappLink()" | kind=code-symbol | source=src/lib/utils.ts:L30 | neighbors=[utils.ts, page.tsx] | lang=en
- "logistics0603_document": "06.03 — Logistica de Envios e Integracion con Courier (nota referenciada, no in…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/06-Flujos-De-Negocio-Y-Trazabilidad/[[06.03-Logística de Envíos e Integración con Courier]].md | neighbors=[06.02 — Flujo de Compra Manual, POS y B…, 07.01 — Terminos y Condiciones de Preve…] | lang=en
- "manualflow0602_link_flow": "Flujo de Enlace Copiable (pagina de pago sin login, subida de voucher)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/06-Flujos-De-Negocio-Y-Trazabilidad/[[06.02-Flujo de Compra Manual, POS y Boleta PDF]].md | neighbors=[02.01 (referenciada repetidamente como …, 06.02 — Flujo de Compra Manual, POS y B…] | lang=nl
- "manualflow0602_voucher_validation": "Paso 3: Validacion de Comprobante (re-vinculacion con Bandeja POS 05.02)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/06-Flujos-De-Negocio-Y-Trazabilidad/[[06.02-Flujo de Compra Manual, POS y Boleta PDF]].md | neighbors=[06.02 — Flujo de Compra Manual, POS y B…, 05.02 — Bandeja POS de Aprobacion de Co…] | lang=en
- "manualpayment0302_flow_approval": "Flujo de Aprobacion Manual (QR -> voucher Cloudinary -> AWAITING_VERIFICATION -…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/03-Sistema-Pagos-Y-Checkouts/[[03.02-Plantilla de Pago Manual con QR Digital y Vouchers]].md | neighbors=[03.02 — Plantilla de Pago Manual con QR…, Responsabilidad Admin-Driven (no compar…] | lang=nl
- "manualpayment0302_static_qr_assets": "Recursos Estaticos QR de Cobro (public/imagenes/pagos/qr-yape.webp, qr-plin.web…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/03-Sistema-Pagos-Y-Checkouts/[[03.02-Plantilla de Pago Manual con QR Digital y Vouchers]].md | neighbors=[Assets Locales (public/Imagenes, no ren…, 03.02 — Plantilla de Pago Manual con QR…] | lang=nl
- "nextauth_route": "route.ts" | kind=code-symbol | source=src/app/api/auth/[...nextauth]/route.ts:L1 | neighbors=[2982ca1 iniciar proyecto, auth.ts] | lang=en
- "orders_boletabutton_boletabutton": "BoletaButton()" | kind=code-symbol | source=src/components/orders/BoletaButton.tsx:L9 | neighbors=[BoletaButton.tsx, page.tsx] | lang=en
- "pages_checkout": "Paginas de Checkout" | kind=entity | source=docs/PAGES.md | neighbors=[Listado de Paginas - BasicTechShop (ref…, Proteccion de Rutas (Middleware)] | lang=nl
- "pages_public": "Paginas Publicas (Shop)" | kind=entity | source=docs/PAGES.md | neighbors=[Estructura de Layouts (root, (shop), (a…, Listado de Paginas - BasicTechShop (ref…] | lang=en
- "plan_autenticacion": "Autenticacion (registro username, Google condicional, reset forzado, RBAC middl…" | kind=entity | source=docs/PLAN.md | neighbors=[Plan: La Tiendita de Blue (referenciado…, Hallazgo critico: RBAC no aplicado, cli…] | lang=en
- "plan_buy_me_a_coffee": "Buy Me a Coffee (02.01): seccion desplegable en home con QR de Yape local" | kind=entity | source=docs/PLAN.md | neighbors=[Boveda de Obsidian (docs/Boveda-Proyect…, Plan: La Tiendita de Blue (referenciado…] | lang=en
- "plan_checkout_dual": "Checkout dual (envios + pago manual con QR/voucher o Mercado Pago; idempotencia…" | kind=entity | source=docs/PLAN.md | neighbors=[Plan: La Tiendita de Blue (referenciado…, Hallazgo: carrito de compras falla al a…] | lang=en
- "plan_crm_notificaciones": "CRM y Notificaciones (05.04): ficha 360 del cliente, plantillas WhatsApp, opt-i…" | kind=entity | source=docs/PLAN.md | neighbors=[Boveda de Obsidian (docs/Boveda-Proyect…, Plan: La Tiendita de Blue (referenciado…] | lang=es
- "plan_dashboard_analitico": "Dashboard analitico (05.01): KPIs, flujo de caja (recharts), mapa de calor Peru…" | kind=entity | source=docs/PLAN.md | neighbors=[Boveda de Obsidian (docs/Boveda-Proyect…, Plan: La Tiendita de Blue (referenciado…] | lang=nl
- "plan_liberacion_stock": "Liberacion de stock (06.01): cancelacion de ordenes PENDING_PAYMENT y liberacio…" | kind=entity | source=docs/PLAN.md | neighbors=[Boveda de Obsidian (docs/Boveda-Proyect…, Plan: La Tiendita de Blue (referenciado…] | lang=nl
- "plan_marco_legal": "Marco legal (07): /terms, /returns, /privacy + checkbox de aceptacion en checko…" | kind=entity | source=docs/PLAN.md | neighbors=[Boveda de Obsidian (docs/Boveda-Proyect…, Plan: La Tiendita de Blue (referenciado…] | lang=nl
- "plan_panel_admin": "Panel admin (dashboard KPIs, Bandeja POS, ordenes con tracking, CRUD productos/…" | kind=entity | source=docs/PLAN.md | neighbors=[Plan: La Tiendita de Blue (referenciado…, Hallazgo: creacion de producto en panel…] | lang=en
- "plan_proximas_fases": "Proximas fases (boleta PDF, correos transaccionales, pop-ups, SUNAT, credencial…" | kind=entity | source=docs/PLAN.md | neighbors=[Boveda de Obsidian (docs/Boveda-Proyect…, Plan: La Tiendita de Blue (referenciado…] | lang=en
- "plan_tienda": "Tienda (home, detalle con galeria/preventas/resenas verificadas, avatares local…" | kind=entity | source=docs/PLAN.md | neighbors=[Plan: La Tiendita de Blue (referenciado…, Exclusiones (10): sin cupones/descuento…] | lang=en
- "posindex_document": "05 — Panel Administrativo y POS (indice de seccion)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS.md | neighbors=[05.03 — Control de Inventario y Prevent…, 05.07 — Motor Avanzado de Separaciones,…] | lang=en
- "postcss_config": "postcss.config.mjs" | kind=code-symbol | source=postcss.config.mjs:L1 | neighbors=[2982ca1 iniciar proyecto, config] | lang=en
- "prd_categorias_productos": "Categorias de Productos (8): PCs, Monitores, Teclados, Mouse, Audifonos, Almace…" | kind=entity | source=docs/PRD.md | neighbors=[PRD (referenciado, detallado en otro ch…, Marcas Soportadas: ASUS, MSI, Corsair, …] | lang=nl
- "prd_estados_pedido": "Estados de Pedido (PRD): PENDING→CONFIRMED→PROCESSING→SHIPPED→DELIVERED / CANCE…" | kind=entity | source=docs/PRD.md | neighbors=[PRD (referenciado, detallado en otro ch…, Modelo de Datos (5): User-Address-Order…] | lang=nl
- "prd_fases_implementacion": "Fases de Implementacion (11): 1.UI mock completada, 2.Backend en progreso, 3.Au…" | kind=entity | source=docs/PRD.md | neighbors=[Plan: La Tiendita de Blue (referenciado…, PRD (referenciado, detallado en otro ch…] | lang=nl
- "prd_marcas_soportadas": "Marcas Soportadas: ASUS, MSI, Corsair, Logitech, Razer, HyperX, Kingston, Samsu…" | kind=entity | source=docs/PRD.md | neighbors=[Categorias de Productos (8): PCs, Monit…, PRD (referenciado, detallado en otro ch…] | lang=en
- "prd_metodos_pago": "Metodos de Pago (PRD): CARD, TRANSFER, WALLET, CASH_ON_DELIVERY" | kind=entity | source=docs/PRD.md | neighbors=[PRD (referenciado, detallado en otro ch…, Modelo de Datos (5): User-Address-Order…] | lang=nl
- "prd_roles_usuarios": "Usuarios y Roles (CUSTOMER, MODERATOR, ADMIN)" | kind=entity | source=docs/PRD.md | neighbors=[Roles y Permisos (CUSTOMER/MODERATOR/AD…, PRD (referenciado, detallado en otro ch…] | lang=es
- "prisma_seed_scanimagefolder": "scanImageFolder()" | kind=code-symbol | source=prisma/seed.ts:L34 | neighbors=[seed.ts, main()] | lang=en
- "prisma_seed_slugify": "slugify()" | kind=code-symbol | source=prisma/seed.ts:L17 | neighbors=[seed.ts, main()] | lang=en
- "privacy0703_admin_responsibility": "Responsabilidad Admin-Driven (no compartir capturas de clientes, archivar vouch…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.03-Politica-de-Privacidad-y-Proteccion-de-Datos]].md | neighbors=[Flujo de Aprobacion Manual (QR -> vouch…, 07.03 — Politica de Privacidad y Protec…] | lang=nl
- "privacy0703_arco_rights": "Derechos ARCO (Ley N 29733 Peru) — Acceso, Rectificacion, Cancelacion, Oposicion" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.03-Politica-de-Privacidad-y-Proteccion-de-Datos]].md | neighbors=[Auth y Seguridad (NextAuth v5, RBAC, mu…, 07.03 — Politica de Privacidad y Protec…] | lang=en
- "products_filtermobile_filtermobile": "FilterMobile()" | kind=code-symbol | source=src/components/products/FilterMobile.tsx:L21 | neighbors=[FilterMobile.tsx, page.tsx] | lang=en
- "products_filtersection_filtersection": "FilterSection()" | kind=code-symbol | source=src/components/products/FilterSection.tsx:L24 | neighbors=[FilterSection.tsx, FilterSidebar.tsx] | lang=en
- "products_manchasstorepromo_manchasstorebanner": "ManchasStoreBanner()" | kind=code-symbol | source=src/components/products/ManchasStorePromo.tsx:L15 | neighbors=[ManchasStorePromo.tsx, page.tsx] | lang=en
- "products_manchasstorepromo_manchasstoreverticals": "ManchasStoreVerticals()" | kind=code-symbol | source=src/components/products/ManchasStorePromo.tsx:L73 | neighbors=[ManchasStorePromo.tsx, page.tsx] | lang=en
- "products_pagination_buildpagelist": "buildPageList()" | kind=code-symbol | source=src/components/products/Pagination.tsx:L14 | neighbors=[Pagination.tsx, Pagination()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-014.json

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
