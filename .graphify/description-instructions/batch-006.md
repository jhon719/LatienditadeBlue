# Node Description Batch 7 of 30

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

- "lib_pricing_effectiveprice": "effectivePrice()" | kind=code-symbol | source=src/lib/pricing.ts:L4 | neighbors=[CartSummary.tsx, OrderSummary.tsx, page.tsx, pricing.ts, ProductBundle.tsx, cart-store.ts] | lang=en
- "lib_release_stock": "release-stock.ts" | kind=code-symbol | source=src/lib/release-stock.ts:L1 | neighbors=[page.tsx, 3db2e43 version 2, ef3a883 version 7, prisma.ts, releaseAbandonedStock(), route.ts] | lang=en
- "manualpayment0302_document": "03.02 — Plantilla de Pago Manual con QR Digital y Vouchers" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/03-Sistema-Pagos-Y-Checkouts/[[03.02-Plantilla de Pago Manual con QR Digital y Vouchers]].md | neighbors=[Flujo Admin de Aprobacion de Voucher (S…, 03.01 — Pasarela Automatizada Mercado P…, 02.04 — Sistema de Resenas Vinculado a …, Flujo de Aprobacion Manual (QR -> vouch…, Recursos Estaticos QR de Cobro (public/…, Modelo de Negocio (catalogo dual, pago …] | lang=es
- "next_config": "next.config.ts" | kind=code-symbol | source=next.config.ts:L1 | neighbors=[2982ca1 iniciar proyecto, 8b3e1a0 version 5, ef3a883 version 7, csp, nextConfig, securityHeaders] | lang=en
- "products_productgallery": "ProductGallery.tsx" | kind=code-symbol | source=src/components/products/ProductGallery.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, page.tsx, utils.ts, cn(), ProductGallery(), ProductGalleryProps] | lang=en
- "readme_modelo_negocio": "Modelo de Negocio (catalogo dual, pago dual, envios WhatsApp, preventas/separac…" | kind=entity | source=README.md | neighbors=[Diseno del Comprobante PDF (QR dinamico…, 05.03 — Control de Inventario y Prevent…, 03.02 — Plantilla de Pago Manual con QR…, 03.01 — Pasarela Automatizada Mercado P…, README.md — La Tiendita de Blue, 05.07 — Motor Avanzado de Separaciones,…] | lang=nl
- "receive_route": "route.ts" | kind=code-symbol | source=src/app/api/admin/batches/[id]/receive/route.ts:L1 | neighbors=[487cc56 version 4, api-guards.ts, requireAdmin(), prisma.ts, Params, POST()] | lang=en
- "register_route": "route.ts" | kind=code-symbol | source=src/app/api/auth/register/route.ts:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 3db2e43 version 2, prisma.ts, POST(), registerSchema] | lang=en
- "release_route": "route.ts" | kind=code-symbol | source=src/app/api/admin/separations/[id]/release/route.ts:L1 | neighbors=[487cc56 version 4, api-guards.ts, requireAdmin(), prisma.ts, Params, POST()] | lang=en
- "testreport_finding_cart_broken": "Hallazgo: carrito de compras falla al agregar un segundo producto" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[cart-store.ts (referenciado, detallado …, Checkout dual (envios + pago manual con…, TestSprite AI Testing Report (MCP), Recomendaciones del reporte (seccion 5), TC008 Shopping Cart Operations (FAILED,…, TC009 Checkout Flow Success (FAILED, CR…] | lang=en
- "testreport_recommendations": "Recomendaciones del reporte (seccion 5)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP), Hallazgo: creacion de producto en panel…, Hallazgo: carrito de compras falla al a…, Advertencia de performance: falta prop …, Hallazgo: boton 'Editar' del perfil no …, Hallazgo critico: RBAC no aplicado, cli…] | lang=en
- "ui_scroll_area": "scroll-area.tsx" | kind=code-symbol | source=src/components/ui/scroll-area.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, ProfileMobileNav.tsx, utils.ts, cn(), ScrollArea(), ScrollBar()] | lang=en
- "ui_switch": "switch.tsx" | kind=code-symbol | source=src/components/ui/switch.tsx:L1 | neighbors=[page.tsx, 2982ca1 iniciar proyecto, page.tsx, utils.ts, cn(), Switch()] | lang=en
- "20260718231507_init_migration_users": "users" | kind=code-symbol | source=prisma/migrations/20260718231507_init/migration.sql:L23 | neighbors=[migration.sql, accounts, orders, payment_proofs, reviews] | lang=en
- "admin_campaignform_campaignform": "CampaignForm()" | kind=code-symbol | source=src/components/admin/CampaignForm.tsx:L67 | neighbors=[CampaignForm.tsx, numStr(), toLocalInput(), page.tsx, page.tsx] | lang=en
- "admin_contactbadges_contactbadges": "ContactBadges()" | kind=code-symbol | source=src/components/admin/ContactBadges.tsx:L7 | neighbors=[ContactBadges.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "admin_imageupload_imageupload": "ImageUpload()" | kind=code-symbol | source=src/components/admin/ImageUpload.tsx:L22 | neighbors=[AcquisitionForm.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, ImageUpload.tsx, ProductForm.tsx] | lang=en
- "auth_authshell": "AuthShell.tsx" | kind=code-symbol | source=src/components/auth/AuthShell.tsx:L1 | neighbors=[AuthShell(), FEATURES, 487cc56 version 4, page.tsx, page.tsx] | lang=en
- "categorieslines0205_document": "02.05 — Sistema de Categorias, Lineas y Marcas Dinamicas" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.05-Sistema de Categorias, Lineas y Marcas Dinamicas]].md | neighbors=[Flujo Admin CRUD de Categorias (generac…, Mapeo Fisico de Imagenes por slug (publ…, 01.02 — Estructura de Directorios Next.…, 02.01 — Home y Categorias Visuales con …, 01.03 — Modelo de Base de Datos Prisma …] | lang=en
- "change_password_route": "route.ts" | kind=code-symbol | source=src/app/api/auth/change-password/route.ts:L1 | neighbors=[POST(), schema, auth.ts, prisma.ts, 0a444d0 18/97/2026] | lang=en
- "commit:repo:github.com/jhon719/LatienditadeBlue@a16fe9af9d17bf3e854fcb4c0aac98018eb8a0dd": "a16fe9a vaersion 8" | kind=Commit | source=git | neighbors=[main, page.tsx, Pagination.tsx, products-store.ts, ef3a883 version 7] | lang=pt
- "commit:repo:github.com/jhon719/LatienditadeBlue@b975a3a0dcfb3027376b7b51ea4380907a73ec27": "b975a3a version 6" | kind=Commit | source=git | neighbors=[7205424 version ultima, main, ef3a883 version 7, CategoryTrends.tsx, LinesSection.tsx] | lang=pt
- "common_marquee": "Marquee.tsx" | kind=code-symbol | source=src/components/common/Marquee.tsx:L1 | neighbors=[487cc56 version 4, Marquee(), utils.ts, cn(), BenefitsMarquee.tsx] | lang=en
- "common_whatsappicon_whatsappicon": "WhatsappIcon()" | kind=code-symbol | source=src/components/common/WhatsappIcon.tsx:L4 | neighbors=[ContactBadges.tsx, ShalomDirectoryTab.tsx, page.tsx, WhatsappIcon.tsx, ProfileSettingsForm.tsx] | lang=en
- "datamodel_order": "Order (Pedidos)" | kind=entity | source=docs/DATA-MODEL.md | neighbors=[Address (Direcciones), Modelo de Datos - BasicTechShop (refere…, Estados de Pedido (PENDING→CONFIRMED→PR…, User (Usuarios), OrderItem (Items del Pedido)] | lang=en
- "deliveries_route": "route.ts" | kind=code-symbol | source=src/app/api/admin/reports/deliveries/route.ts:L1 | neighbors=[487cc56 version 4, GET(), api-guards.ts, requireAdmin(), prisma.ts] | lang=en
- "forced_reset_page": "page.tsx" | kind=code-symbol | source=src/app/(auth)/forced-reset/page.tsx:L1 | neighbors=[0a444d0 18/97/2026, ForcedResetForm.tsx, ForcedResetForm(), ForcedResetPage(), auth.ts] | lang=en
- "home_buymeacoffee": "BuyMeACoffee.tsx" | kind=code-symbol | source=src/components/home/BuyMeACoffee.tsx:L1 | neighbors=[3db2e43 version 2, BuyMeACoffee(), AnimatedContent.tsx, AnimatedContent(), page.tsx] | lang=en
- "home_statsband": "StatsBand.tsx" | kind=code-symbol | source=src/components/home/StatsBand.tsx:L1 | neighbors=[487cc56 version 4, CountUp.tsx, CountUp(), StatsBand(), page.tsx] | lang=en
- "layout_animatedthemetoggle": "AnimatedThemeToggle.tsx" | kind=code-symbol | source=src/components/layout/AnimatedThemeToggle.tsx:L1 | neighbors=[487cc56 version 4, AnimatedThemeToggle(), utils.ts, cn(), Header.tsx] | lang=en
- "layout_announcementbar": "AnnouncementBar.tsx" | kind=code-symbol | source=src/components/layout/AnnouncementBar.tsx:L1 | neighbors=[3db2e43 version 2, AnnouncementBar(), index.ts, AnnouncementView, layout.tsx] | lang=en
- "layout_themetoggle": "ThemeToggle.tsx" | kind=code-symbol | source=src/components/layout/ThemeToggle.tsx:L1 | neighbors=[AdminHeader.tsx, 2982ca1 iniciar proyecto, ThemeToggle(), button.tsx, Button()] | lang=en
- "lib_acquisitions_computeacquisition": "computeAcquisition()" | kind=code-symbol | source=src/lib/acquisitions.ts:L56 | neighbors=[route.ts, AcquisitionForm.tsx, route.ts, acquisitions.ts, r2()] | lang=en
- "lib_cloudinary": "cloudinary.ts" | kind=code-symbol | source=src/lib/cloudinary.ts:L1 | neighbors=[route.ts, 0a444d0 18/97/2026, 2982ca1 iniciar proyecto, isCloudinaryEnabled(), route.ts] | lang=en
- "lib_email_layout": "layout()" | kind=code-symbol | source=src/lib/email.ts:L30 | neighbors=[email.ts, sendOrderDeliveredEmail(), sendOrderReceivedEmail(), sendOrderShippedEmail(), sendPaymentApprovedEmail()] | lang=en
- "lib_email_orderrow": "orderRow()" | kind=code-symbol | source=src/lib/email.ts:L74 | neighbors=[email.ts, sendOrderDeliveredEmail(), sendOrderReceivedEmail(), sendOrderShippedEmail(), sendPaymentApprovedEmail()] | lang=en
- "lib_email_sendorderdeliveredemail": "sendOrderDeliveredEmail()" | kind=code-symbol | source=src/lib/email.ts:L149 | neighbors=[route.ts, email.ts, layout(), orderRow(), send()] | lang=en
- "lib_email_sendorderreceivedemail": "sendOrderReceivedEmail()" | kind=code-symbol | source=src/lib/email.ts:L97 | neighbors=[email.ts, layout(), orderRow(), send(), route.ts] | lang=en
- "lib_email_sendordershippedemail": "sendOrderShippedEmail()" | kind=code-symbol | source=src/lib/email.ts:L132 | neighbors=[route.ts, email.ts, layout(), orderRow(), send()] | lang=en
- "lib_email_sendpaymentapprovedemail": "sendPaymentApprovedEmail()" | kind=code-symbol | source=src/lib/email.ts:L116 | neighbors=[route.ts, email.ts, layout(), orderRow(), send()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-006.json

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
