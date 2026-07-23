# Node Description Batch 9 of 30

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
Write every description in Dutch (nl). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "lib_boleta_pdf_downloadboletapdf": "downloadBoletaPdf()" | kind=code-symbol | source=src/lib/boleta-pdf.ts:L57 | neighbors=[boleta-pdf.ts, lastY(), S(), BoletaButton.tsx]
- "lib_campaigns_applydiscountrules": "applyDiscountRules()" | kind=code-symbol | source=src/lib/campaigns.ts:L73 | neighbors=[campaigns.ts, transformers.ts, route.ts, route.ts]
- "lib_campaigns_livecampaignwhere": "liveCampaignWhere()" | kind=code-symbol | source=src/lib/campaigns.ts:L29 | neighbors=[campaigns.ts, getActiveAnnouncement(), getActiveBanners(), getActiveDiscountRules()]
- "lib_campaigns_validatecoupon": "validateCoupon()" | kind=code-symbol | source=src/lib/campaigns.ts:L107 | neighbors=[campaigns.ts, isCampaignLive(), route.ts, route.ts]
- "lib_reports_pdf_downloaddeliveriespdf": "downloadDeliveriesPdf()" | kind=code-symbol | source=src/lib/reports-pdf.ts:L165 | neighbors=[reports-pdf.ts, drawFooter(), drawHeader(), page.tsx]
- "lib_reports_pdf_downloaduserspdf": "downloadUsersPdf()" | kind=code-symbol | source=src/lib/reports-pdf.ts:L82 | neighbors=[reports-pdf.ts, drawFooter(), drawHeader(), page.tsx]
- "lib_transformers_transformcategory": "transformCategory()" | kind=code-symbol | source=src/lib/transformers.ts:L76 | neighbors=[route.ts, route.ts, transformers.ts, page.tsx]
- "lib_transformers_transformline": "transformLine()" | kind=code-symbol | source=src/lib/transformers.ts:L89 | neighbors=[route.ts, transformers.ts, route.ts, page.tsx]
- "lib_transformers_transformorder": "transformOrder()" | kind=code-symbol | source=src/lib/transformers.ts:L150 | neighbors=[route.ts, transformers.ts, page.tsx, route.ts]
- "lib_transformers_transformproduct": "transformProduct()" | kind=code-symbol | source=src/lib/transformers.ts:L21 | neighbors=[route.ts, transformers.ts, route.ts, page.tsx]
- "pages_layouts": "Estructura de Layouts (root, (shop), (admin-panel))" | kind=entity | source=docs/PAGES.md | neighbors=[Paginas de Administracion, Listado de Paginas - BasicTechShop (ref…, Paginas de Perfil de Usuario, Paginas Publicas (Shop)]
- "pages_middleware": "Proteccion de Rutas (Middleware)" | kind=entity | source=docs/PAGES.md | neighbors=[Paginas de Administracion, Paginas de Checkout, Listado de Paginas - BasicTechShop (ref…, Paginas de Perfil de Usuario]
- "prd_modelo_datos": "Modelo de Datos (5): User-Address-Order-OrderItem-Product-Category-Brand" | kind=entity | source=docs/PRD.md | neighbors=[Modelo de Datos - BasicTechShop (refere…, PRD (referenciado, detallado en otro ch…, Estados de Pedido (PRD): PENDING→CONFIR…, Metodos de Pago (PRD): CARD, TRANSFER, …]
- "products_productcard_productcard": "ProductCard()" | kind=code-symbol | source=src/components/products/ProductCard.tsx:L48 | neighbors=[FeaturedProducts.tsx, page.tsx, ProductCard.tsx, ProductGrid.tsx]
- "providers_sessionprovider": "SessionProvider.tsx" | kind=code-symbol | source=src/components/providers/SessionProvider.tsx:L1 | neighbors=[layout.tsx, 2982ca1 iniciar proyecto, SessionProvider(), SessionProviderProps]
- "readme_variables_entorno": "Variables de Entorno (tabla .env)" | kind=entity | source=README.md | neighbors=[Configuracion .env (GOOGLE_CLIENT_ID/SE…, Configuration (path alias @/*, remote i…, 03.01 — Pasarela Automatizada Mercado P…, README.md — La Tiendita de Blue]
- "reset_password_route": "route.ts" | kind=code-symbol | source=src/app/api/admin/users/[id]/reset-password/route.ts:L1 | neighbors=[0a444d0 18/97/2026, auth.ts, prisma.ts, POST()]
- "testreport_finding_image_handling_errors": "Hallazgo: errores de manejo de imagenes (src faltante, href vacio)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[ProductCard component, ProductGallery component, TestSprite AI Testing Report (MCP), TC008 Shopping Cart Operations (FAILED,…]
- "types_index_brand": "Brand" | kind=code-symbol | source=src/types/index.ts:L78 | neighbors=[page.tsx, transformers.ts, products-store.ts, index.ts]
- "types_index_reviewitem": "ReviewItem" | kind=code-symbol | source=src/types/index.ts:L130 | neighbors=[ReviewsSection.tsx, transformers.ts, ProductReviews.tsx, index.ts]
- "ui_checkbox_checkbox": "Checkbox()" | kind=code-symbol | source=src/components/ui/checkbox.tsx:L9 | neighbors=[CatalogEntryForm.tsx, ProductForm.tsx, FilterSection.tsx, checkbox.tsx]
- "ui_dropdown_menu_dropdownmenu": "DropdownMenu()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L9 | neighbors=[AdminHeader.tsx, Header.tsx, page.tsx, dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenucontent": "DropdownMenuContent()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L34 | neighbors=[AdminHeader.tsx, Header.tsx, page.tsx, dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuitem": "DropdownMenuItem()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L62 | neighbors=[AdminHeader.tsx, Header.tsx, page.tsx, dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenuseparator": "DropdownMenuSeparator()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L166 | neighbors=[AdminHeader.tsx, Header.tsx, page.tsx, dropdown-menu.tsx]
- "ui_dropdown_menu_dropdownmenutrigger": "DropdownMenuTrigger()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L23 | neighbors=[AdminHeader.tsx, Header.tsx, page.tsx, dropdown-menu.tsx]
- "ui_skeleton_skeleton": "Skeleton()" | kind=code-symbol | source=src/components/ui/skeleton.tsx:L3 | neighbors=[page.tsx, page.tsx, ProductGrid.tsx, skeleton.tsx]
- "ui_tabs_tabs": "Tabs()" | kind=code-symbol | source=src/components/ui/tabs.tsx:L8 | neighbors=[page.tsx, page.tsx, page.tsx, tabs.tsx]
- "ui_tabs_tabscontent": "TabsContent()" | kind=code-symbol | source=src/components/ui/tabs.tsx:L53 | neighbors=[page.tsx, page.tsx, page.tsx, tabs.tsx]
- "ui_tabs_tabslist": "TabsList()" | kind=code-symbol | source=src/components/ui/tabs.tsx:L21 | neighbors=[page.tsx, page.tsx, page.tsx, tabs.tsx]
- "ui_tabs_tabstrigger": "TabsTrigger()" | kind=code-symbol | source=src/components/ui/tabs.tsx:L37 | neighbors=[page.tsx, page.tsx, page.tsx, tabs.tsx]
- "20260718231507_init_migration_order_items": "order_items" | kind=code-symbol | source=prisma/migrations/20260718231507_init/migration.sql:L163 | neighbors=[migration.sql, orders, products]
- "20260718231507_init_migration_payment_proofs": "payment_proofs" | kind=code-symbol | source=prisma/migrations/20260718231507_init/migration.sql:L174 | neighbors=[migration.sql, orders, users]
- "20260718231507_init_migration_reviews": "reviews" | kind=code-symbol | source=prisma/migrations/20260718231507_init/migration.sql:L125 | neighbors=[migration.sql, products, users]
- "20260719144924_add_campaigns_crm_migration_discount_rules": "discount_rules" | kind=code-symbol | source=prisma/migrations/20260719144924_add_campaigns_crm/migration.sql:L59 | neighbors=[migration.sql, categories, lines]
- "20260719214006_add_logistics_backoffice_migration_import_batch_items": "import_batch_items" | kind=code-symbol | source=prisma/migrations/20260719214006_add_logistics_backoffice/migration.sql:L24 | neighbors=[migration.sql, import_batches, products]
- "20260719214006_add_logistics_backoffice_migration_import_batches": "import_batches" | kind=code-symbol | source=prisma/migrations/20260719214006_add_logistics_backoffice/migration.sql:L8 | neighbors=[migration.sql, import_batch_items, preorder_reservations]
- "20260719214006_add_logistics_backoffice_migration_products": "products" | kind=code-symbol | source=prisma/migrations/20260719214006_add_logistics_backoffice/migration.sql:L67 | neighbors=[migration.sql, import_batch_items, preorder_reservations]
- "20260721031556_add_line_brand_migration": "migration.sql" | kind=code-symbol | source=prisma/migrations/20260721031556_add_line_brand/migration.sql:L1 | neighbors=[brands, lines, 487cc56 version 4]
- "20260721045812_add_separations_migration": "migration.sql" | kind=code-symbol | source=prisma/migrations/20260721045812_add_separations/migration.sql:L1 | neighbors=[preorder_reservations, separation_payments, 487cc56 version 4]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-008.json

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
