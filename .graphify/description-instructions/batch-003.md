# Node Description Batch 4 of 30

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

- "products_productbundle": "ProductBundle.tsx" | kind=code-symbol | source=src/components/products/ProductBundle.tsx:L1 | neighbors=[3db2e43 version 2, page.tsx, pricing.ts, calculateBundleDiscount(), effectivePrice(), ProductBundle()] | lang=en
- "readme_document": "README.md — La Tiendita de Blue" | kind=entity | source=README.md | neighbors=[Convenciones (Sin Server Actions, RHF+Z…, Despliegue (build prisma generate && ne…, Boveda de Obsidian (docs/Boveda-Proyect…, Seccion Documentacion (enlaces a CLAUDE…, Estructura del Proyecto (arbol src/), Modelo de Datos (listado de entidades P…] | lang=en
- "shop_layout": "layout.tsx" | kind=code-symbol | source=src/app/(shop)/layout.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, 3db2e43 version 2, AnnouncementBar.tsx, AnnouncementBar(), Footer.tsx, Footer()] | lang=en
- "ui_separator": "separator.tsx" | kind=code-symbol | source=src/components/ui/separator.tsx:L1 | neighbors=[CartSummary.tsx, OrderSummary.tsx, 2982ca1 iniciar proyecto, Footer.tsx, MobileNav.tsx, page.tsx] | lang=en
- "checkout_manualpaymentsection": "ManualPaymentSection.tsx" | kind=code-symbol | source=src/components/checkout/ManualPaymentSection.tsx:L1 | neighbors=[page.tsx, ManualPaymentSection(), ManualPaymentSectionProps, ImageLightbox.tsx, ImageLightbox(), input.tsx] | lang=en
- "common_imagelightbox": "ImageLightbox.tsx" | kind=code-symbol | source=src/components/common/ImageLightbox.tsx:L1 | neighbors=[AcquisitionsTab.tsx, ManualPaymentSection.tsx, 487cc56 version 4, ImageLightbox(), ImageLightboxProps, utils.ts] | lang=en
- "home_followus": "FollowUs.tsx" | kind=code-symbol | source=src/components/home/FollowUs.tsx:L1 | neighbors=[487cc56 version 4, GradientText.tsx, GradientText(), SocialIcon.tsx, SOCIAL_BG, SocialIcon()] | lang=en
- "lib_social": "social.ts" | kind=code-symbol | source=src/lib/social.ts:L1 | neighbors=[ContactBadges.tsx, 487cc56 version 4, SocialIcon.tsx, FollowUs.tsx, QuickAccessPanel.tsx, Footer.tsx] | lang=en
- "lines_route": "route.ts" | kind=code-symbol | source=src/app/api/lines/route.ts:L1 | neighbors=[0a444d0 18/97/2026, 487cc56 version 4, api-guards.ts, requireAdmin(), prisma.ts, transformers.ts] | lang=en
- "products_productgrid": "ProductGrid.tsx" | kind=code-symbol | source=src/components/products/ProductGrid.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, page.tsx, ProductCard.tsx, ProductCard(), ProductGrid(), ProductGridProps] | lang=en
- "ui_breadcrumb": "breadcrumb.tsx" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, page.tsx, page.tsx, utils.ts, cn(), Breadcrumb()] | lang=en
- "ui_textarea": "textarea.tsx" | kind=code-symbol | source=src/components/ui/textarea.tsx:L1 | neighbors=[AcquisitionForm.tsx, CampaignForm.tsx, CrmPanel.tsx, ProductForm.tsx, ShalomContactForm.tsx, 2982ca1 iniciar proyecto] | lang=en
- "20260718231507_init_migration": "migration.sql" | kind=code-symbol | source=prisma/migrations/20260718231507_init/migration.sql:L1 | neighbors=[accounts, brands, categories, lines, order_items, orders] | lang=en
- "admin_adminsidebar": "AdminSidebar.tsx" | kind=code-symbol | source=src/components/admin/AdminSidebar.tsx:L1 | neighbors=[AdminSidebar(), navigation, utils.ts, cn(), button.tsx, Button()] | lang=en
- "charts_peruheatmap": "PeruHeatMap.tsx" | kind=code-symbol | source=src/components/admin/charts/PeruHeatMap.tsx:L1 | neighbors=[page.tsx, colorFor(), DeptFeatureProps, geo, PeruHeatMap(), SEQUENTIAL_BLUE] | lang=en
- "commit:repo:github.com/jhon719/LatienditadeBlue@2f6d8458716498bcfdcb274ba3d57a950679abf9": "2f6d845 revision 1" | kind=Commit | source=git | neighbors=[0a444d0 18/97/2026, AdminHeader.tsx, AdminMobileNav.tsx, main, page.tsx, d837aff version 2] | lang=en
- "common_socialicon": "SocialIcon.tsx" | kind=code-symbol | source=src/components/common/SocialIcon.tsx:L1 | neighbors=[487cc56 version 4, SOCIAL_BG, SocialIcon(), TiktokIcon.tsx, TiktokIcon(), social.ts] | lang=en
- "common_useravatar": "UserAvatar.tsx" | kind=code-symbol | source=src/components/common/UserAvatar.tsx:L1 | neighbors=[0a444d0 18/97/2026, 3db2e43 version 2, UserAvatar(), UserAvatarProps, ReviewsSection.tsx, page.tsx] | lang=en
- "dirstruct0102_document": "01.02 — Estructura de Directorios Next.js (App Router)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.02-Estructura de Directorios Next.js]].md | neighbors=[02.05 — Sistema de Categorias, Lineas y…, 01.03 — Modelo de Base de Datos Prisma …, Capa de API Routes (src/app/api/), Adicionales — Desglose Detallado de Dir…, 02.02 — Galeria Interactiva y Detalle d…, 02.01 — Home y Categorias Visuales con …] | lang=nl
- "home_categorytrends": "CategoryTrends.tsx" | kind=code-symbol | source=src/components/home/CategoryTrends.tsx:L1 | neighbors=[0a444d0 18/97/2026, 487cc56 version 4, b975a3a version 6, GradientText.tsx, GradientText(), CategoryTrends()] | lang=en
- "home_linessection": "LinesSection.tsx" | kind=code-symbol | source=src/components/home/LinesSection.tsx:L1 | neighbors=[0a444d0 18/97/2026, 487cc56 version 4, b975a3a version 6, GradientText.tsx, GradientText(), LinesSection()] | lang=en
- "layout_footer": "Footer.tsx" | kind=code-symbol | source=src/components/layout/Footer.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, 3db2e43 version 2, 487cc56 version 4, SocialIcon.tsx, SocialIcon(), Footer()] | lang=en
- "profile_profilemobilenav": "ProfileMobileNav.tsx" | kind=code-symbol | source=src/components/profile/ProfileMobileNav.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 487cc56 version 4, layout.tsx, utils.ts, cn()] | lang=en
- "profile_route": "route.ts" | kind=code-symbol | source=src/app/api/user/profile/route.ts:L1 | neighbors=[0a444d0 18/97/2026, 3db2e43 version 2, 487cc56 version 4, api-guards.ts, requireUser(), peru.ts] | lang=en
- "reviews_route": "route.ts" | kind=code-symbol | source=src/app/api/reviews/route.ts:L1 | neighbors=[0a444d0 18/97/2026, api-guards.ts, requireUser(), prisma.ts, transformers.ts, transformReview()] | lang=en
- "type_route": "route.ts" | kind=code-symbol | source=src/app/api/admin/campaigns/[type]/route.ts:L1 | neighbors=[3db2e43 version 2, api-guards.ts, requireAdmin(), campaign-admin.ts, CAMPAIGN_TYPES, campaignModel()] | lang=en
- "acquisitions_route": "route.ts" | kind=code-symbol | source=src/app/api/admin/acquisitions/route.ts:L1 | neighbors=[createSchema, GET(), POST(), acquisitions.ts, computeAcquisition(), MONTH_ORDER] | lang=en
- "admin_separationbits": "SeparationBits.tsx" | kind=code-symbol | source=src/components/admin/SeparationBits.tsx:L1 | neighbors=[ProgressBar(), SEMAPHORE_STYLES, SemaphoreBadge(), SemaphoreLevel, utils.ts, cn()] | lang=en
- "admin_statscard": "StatsCard.tsx" | kind=code-symbol | source=src/components/admin/StatsCard.tsx:L1 | neighbors=[StatsCard(), StatsCardProps, utils.ts, cn(), card.tsx, Card()] | lang=en
- "cancel_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/checkout/cancel/page.tsx:L1 | neighbors=[CheckoutCancelPage(), button.tsx, Button(), card.tsx, Card(), CardContent()] | lang=en
- "cart_cartitem": "CartItem.tsx" | kind=code-symbol | source=src/components/cart/CartItem.tsx:L1 | neighbors=[CartItem(), CartItemProps, index.ts, CartItem, button.tsx, Button()] | lang=en
- "cart_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/cart/page.tsx:L1 | neighbors=[CartItem.tsx, CartItem(), CartSummary.tsx, CartSummary(), CartPage(), cart-store.ts] | lang=en
- "commit:repo:github.com/jhon719/LatienditadeBlue@ef3a88325ecfc903b88078877f3aad8b8f2df7fe": "ef3a883 version 7" | kind=Commit | source=git | neighbors=[b975a3a version 6, layout.tsx, route.ts, main, a16fe9a vaersion 8, image-validation.ts] | lang=pt
- "common_gradienttext": "GradientText.tsx" | kind=code-symbol | source=src/components/common/GradientText.tsx:L1 | neighbors=[487cc56 version 4, GradientText(), utils.ts, cn(), CategoryTrends.tsx, FeaturedProducts.tsx] | lang=en
- "dbmodel0103_document": "01.03 — Modelo de Base de Datos Prisma SQL" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.03-Modelo de Base de Datos Prisma SQL]].md | neighbors=[Trazabilidad Antifraude (processCode un…, 02.05 — Sistema de Categorias, Lineas y…, 01.02 — Estructura de Directorios Next.…, 05.02 — Bandeja POS de Aprobacion de Co…, 02.04 — Sistema de Resenas Vinculado a …, Politica de Datos Privados vs Publicos …] | lang=nl
- "lib_api_guards_requireuser": "requireUser()" | kind=code-symbol | source=src/lib/api-guards.ts:L5 | neighbors=[route.ts, route.ts, api-guards.ts, route.ts, route.ts, route.ts] | lang=en
- "login_page": "page.tsx" | kind=code-symbol | source=src/app/(auth)/login/page.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 487cc56 version 4, AuthShell.tsx, AuthShell(), LoginForm.tsx] | lang=en
- "pages_document": "Listado de Paginas - BasicTechShop (referenciado, detallado en otro chunk)" | kind=entity | source=docs/PAGES.md | neighbors=[Paginas de Administracion, API Routes (listado detallado con metod…, Paginas de Checkout, Plan: La Tiendita de Blue (referenciado…, Estructura de Layouts (root, (shop), (a…, Proteccion de Rutas (Middleware)] | lang=nl
- "pos0502_document": "05.02 — Bandeja POS de Aprobacion de Comprobantes (nota referenciada, no inclui…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/[[05.02-Bandeja POS de Aprobación de Comprobantes]].md | neighbors=[Grupo de Rutas Privadas src/app/(admin-…, 01.03 — Modelo de Base de Datos Prisma …, 01.02 — Estructura de Directorios Next.…, 05.03 — Control de Inventario y Prevent…, 06.02 — Flujo de Compra Manual, POS y B…, Paso 3: Validacion de Comprobante (re-v…] | lang=nl
- "products_sortselect": "SortSelect.tsx" | kind=code-symbol | source=src/components/products/SortSelect.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, page.tsx, SortSelect(), SortSelectProps, select.tsx, Select()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-003.json

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
