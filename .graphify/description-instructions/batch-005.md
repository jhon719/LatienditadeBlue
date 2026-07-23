# Node Description Batch 6 of 30

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

- "stores_cart_store_usecartstore": "useCartStore" | kind=code-symbol | source=src/stores/cart-store.ts:L20 | neighbors=[page.tsx, page.tsx, Header.tsx, ProductBundle.tsx, ProductCard.tsx, ProductDetail.tsx] | lang=en
- "ui_alert_dialog_alertdialog": "AlertDialog()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L9 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "ui_alert_dialog_alertdialogaction": "AlertDialogAction()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L121 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "ui_alert_dialog_alertdialogcancel": "AlertDialogCancel()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L133 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "ui_alert_dialog_alertdialogcontent": "AlertDialogContent()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L47 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "ui_alert_dialog_alertdialogdescription": "AlertDialogDescription()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L108 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "ui_alert_dialog_alertdialogfooter": "AlertDialogFooter()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L79 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "ui_alert_dialog_alertdialogheader": "AlertDialogHeader()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L66 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "ui_alert_dialog_alertdialogtitle": "AlertDialogTitle()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L95 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "users_route": "route.ts" | kind=code-symbol | source=src/app/api/users/route.ts:L1 | neighbors=[2982ca1 iniciar proyecto, 2f6d845 revision 1, 3db2e43 version 2, 487cc56 version 4, api-guards.ts, requireAdmin()] | lang=en
- "app_layout": "layout.tsx" | kind=code-symbol | source=src/app/layout.tsx:L1 | neighbors=[metadata, RootLayout(), SessionProvider.tsx, SessionProvider(), ThemeProvider.tsx, ThemeProvider()] | lang=en
- "auth_googlebutton": "GoogleButton.tsx" | kind=code-symbol | source=src/components/auth/GoogleButton.tsx:L1 | neighbors=[GoogleButton(), GoogleIcon(), button.tsx, Button(), LoginForm.tsx, RegisterForm.tsx] | lang=en
- "charts_cashflowchart": "CashFlowChart.tsx" | kind=code-symbol | source=src/components/admin/charts/CashFlowChart.tsx:L1 | neighbors=[page.tsx, CashFlowChart(), CashFlowTooltip(), TooltipPayload, analytics.ts, CashFlowPoint] | lang=en
- "common_gradienttext_gradienttext": "GradientText()" | kind=code-symbol | source=src/components/common/GradientText.tsx:L5 | neighbors=[GradientText.tsx, CategoryTrends.tsx, FeaturedProducts.tsx, FollowUs.tsx, LinesSection.tsx, ReviewsSection.tsx] | lang=en
- "gallery0202_document": "02.02 — Galeria Interactiva y Detalle de Producto" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.02-Galeria Interactiva y Detalle de Producto]].md | neighbors=[01.02 — Estructura de Directorios Next.…, Bloque 1: <ProductGallery/> (zoom hover…, Bloque 4: <RatingsAndReviews/> — promed…, Bloque 5: <QuestionsAndAnswers/> — acor…, 01.03 — Modelo de Base de Datos Prisma …, 01.04 — Libreria de Animaciones y Disen…] | lang=en
- "hooks_use_coarse_pointer": "use-coarse-pointer.ts" | kind=code-symbol | source=src/hooks/use-coarse-pointer.ts:L1 | neighbors=[8b3e1a0 version 5, getServerSnapshot(), getSnapshot(), subscribe(), useCoarsePointer(), MagneticButton.tsx] | lang=en
- "legal_legalpage": "LegalPage.tsx" | kind=code-symbol | source=src/components/legal/LegalPage.tsx:L1 | neighbors=[3db2e43 version 2, LegalPage(), LegalPageProps, LegalSection, page.tsx, page.tsx] | lang=en
- "lib_campaigns_getactivediscountrules": "getActiveDiscountRules()" | kind=code-symbol | source=src/lib/campaigns.ts:L62 | neighbors=[route.ts, campaigns.ts, liveCampaignWhere(), route.ts, route.ts, route.ts] | lang=en
- "readme_convenciones": "Convenciones (Sin Server Actions, RHF+Zod, Zustand, paginas dedicadas, datos pr…" | kind=entity | source=README.md | neighbors=[Assets Locales (public/Imagenes, no ren…, Regla: no usar Modales, usar paginas de…, Regla: no usar Server Actions, usar Rou…, Regla: formularios con react-hook-form …, Regla: manejo de estado global con Zust…, Politica de Datos Privados vs Publicos …] | lang=en
- "readme_documentacion_links": "Seccion Documentacion (enlaces a CLAUDE.md, PLAN.md, DATA-MODEL.md, PAGES.md, P…" | kind=entity | source=README.md | neighbors=[Boveda de Obsidian (docs/Boveda-Proyect…, CLAUDE.md — Guia del Proyecto, Modelo de Datos - BasicTechShop (refere…, Listado de Paginas - BasicTechShop (ref…, Plan: La Tiendita de Blue (referenciado…, PRD (referenciado, detallado en otro ch…] | lang=pt
- "shalom_contacts_route": "route.ts" | kind=code-symbol | source=src/app/api/admin/shalom-contacts/route.ts:L1 | neighbors=[487cc56 version 4, api-guards.ts, requireAdmin(), prisma.ts, GET(), POST()] | lang=en
- "src_middleware": "middleware.ts" | kind=code-symbol | source=src/middleware.ts:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, auth.ts, adminRoutes, config, guestRoutes] | lang=en
- "summary_route": "route.ts" | kind=code-symbol | source=src/app/api/admin/acquisitions/summary/route.ts:L1 | neighbors=[487cc56 version 4, acquisitions.ts, MONTH_ORDER, api-guards.ts, requireAdmin(), prisma.ts] | lang=en
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=src/components/ui/avatar.tsx:L1 | neighbors=[AdminHeader.tsx, 2982ca1 iniciar proyecto, utils.ts, cn(), Avatar(), AvatarFallback()] | lang=en
- "ui_checkbox": "checkbox.tsx" | kind=code-symbol | source=src/components/ui/checkbox.tsx:L1 | neighbors=[CatalogEntryForm.tsx, ProductForm.tsx, 2982ca1 iniciar proyecto, FilterSection.tsx, utils.ts, cn()] | lang=en
- "ui_radio_group": "radio-group.tsx" | kind=code-symbol | source=src/components/ui/radio-group.tsx:L1 | neighbors=[CatalogEntryForm.tsx, page.tsx, 2982ca1 iniciar proyecto, utils.ts, cn(), RadioGroup()] | lang=en
- "ui_skeleton": "skeleton.tsx" | kind=code-symbol | source=src/components/ui/skeleton.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, page.tsx, page.tsx, ProductGrid.tsx, utils.ts, cn()] | lang=en
- "validate_route": "route.ts" | kind=code-symbol | source=src/app/api/coupons/validate/route.ts:L1 | neighbors=[3db2e43 version 2, api-guards.ts, requireUser(), campaigns.ts, validateCoupon(), POST()] | lang=en
- "20260718231507_init_migration_products": "products" | kind=code-symbol | source=prisma/migrations/20260718231507_init/migration.sql:L103 | neighbors=[migration.sql, order_items, brands, categories, lines, reviews] | lang=en
- "20260719214006_add_logistics_backoffice_migration": "migration.sql" | kind=code-symbol | source=prisma/migrations/20260719214006_add_logistics_backoffice/migration.sql:L1 | neighbors=[import_batch_items, import_batches, preorder_reservations, products, users, 3db2e43 version 2] | lang=en
- "admin_layout": "layout.tsx" | kind=code-symbol | source=src/app/(admin-panel)/admin/layout.tsx:L1 | neighbors=[AdminSidebar.tsx, AdminSidebar(), AdminLayout(), auth.ts, 2982ca1 iniciar proyecto, ef3a883 version 7] | lang=en
- "claudemd_auth_seguridad": "Auth y Seguridad (NextAuth v5, RBAC, mustChangePassword, idempotencyKey, proces…" | kind=entity | source=CLAUDE.md | neighbors=[Base de Datos Local (PostgreSQL 18, lat…, CLAUDE.md — Guia del Proyecto, Trazabilidad Antifraude (processCode un…, Politica de Datos Privados vs Publicos …, Derechos ARCO (Ley N 29733 Peru) — Acce…, Politica de Ventas Stock Fisico (valide…] | lang=es
- "claudemd_configuration": "Configuration (path alias @/*, remote image patterns, build de deploy)" | kind=entity | source=CLAUDE.md | neighbors=[CLAUDE.md — Guia del Proyecto, Plan: La Tiendita de Blue (referenciado…, Despliegue en Vercel (build: npx prisma…, Configuracion .env (GOOGLE_CLIENT_ID/SE…, Despliegue (build prisma generate && ne…, Variables de Entorno (tabla .env)] | lang=nl
- "common_countup": "CountUp.tsx" | kind=code-symbol | source=src/components/common/CountUp.tsx:L1 | neighbors=[AcquisitionsTab.tsx, 487cc56 version 4, CountUp(), CountUpProps, easeOutCubic(), StatsBand.tsx] | lang=en
- "common_tiktokicon_tiktokicon": "TiktokIcon()" | kind=code-symbol | source=src/components/common/TiktokIcon.tsx:L4 | neighbors=[ContactBadges.tsx, ShalomDirectoryTab.tsx, SocialIcon.tsx, TiktokIcon.tsx, ManchasStorePromo.tsx, ProfileSettingsForm.tsx] | lang=en
- "dbarch0201_stub_document": "02.01 (referenciada repetidamente como 'Arquitectura de Base de Datos') — posib…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/ | neighbors=[08.01 — Estrategia de Despliegue y Conf…, 05.03 — Control de Inventario y Prevent…, Diseno del Comprobante PDF (QR dinamico…, Flujo de Enlace Copiable (pagina de pag…, 07.03 — Politica de Privacidad y Protec…, 07.01 — Terminos y Condiciones de Preve…] | lang=en
- "home_benefitsmarquee": "BenefitsMarquee.tsx" | kind=code-symbol | source=src/components/home/BenefitsMarquee.tsx:L1 | neighbors=[487cc56 version 4, Marquee.tsx, Marquee(), BENEFITS, BenefitsMarquee(), page.tsx] | lang=en
- "lib_email_send": "send()" | kind=code-symbol | source=src/lib/email.ts:L19 | neighbors=[email.ts, client(), sendOrderDeliveredEmail(), sendOrderReceivedEmail(), sendOrderShippedEmail(), sendPaymentApprovedEmail()] | lang=en
- "lib_image_validation": "image-validation.ts" | kind=code-symbol | source=src/lib/image-validation.ts:L1 | neighbors=[route.ts, ef3a883 version 7, IMAGE_EXT, SniffedImage, sniffImageType(), route.ts] | lang=en
- "lib_pricing_calculatebundlediscount": "calculateBundleDiscount()" | kind=code-symbol | source=src/lib/pricing.ts:L24 | neighbors=[CartSummary.tsx, OrderSummary.tsx, page.tsx, pricing.ts, route.ts, ProductBundle.tsx] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-005.json

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
