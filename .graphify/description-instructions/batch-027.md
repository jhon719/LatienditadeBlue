# Node Description Batch 28 of 30

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

- "separations0507_reminders_automation": "Automatizacion de Recordatorios (contador regresivo, notificaciones 3/1/0 dias)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/[[05.07-Motor Avanzado de Separaciones, Plazos y Pagos Fraccionados]].md | neighbors=[05.07 — Motor Avanzado de Separaciones,…] | lang=nl
- "separations0507_stock_rules": "Reglas Diferenciadas Stock Fisico (quincena 15 dias) vs Preventa (hito 50% a fi…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/[[05.07-Motor Avanzado de Separaciones, Plazos y Pagos Fraccionados]].md | neighbors=[05.07 — Motor Avanzado de Separaciones,…] | lang=en
- "separationspolicy0506_stub_document": "05.06 — Politica y Gestion de Separaciones y Adelantos (nota referenciada, no i…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/[[05.06-Política y Gestión de Separaciones y Adelantos]].md | neighbors=[05.07 — Motor Avanzado de Separaciones,…] | lang=es
- "settings_page_adminsettingspage": "AdminSettingsPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/settings/page.tsx:L19 | neighbors=[page.tsx] | lang=en
- "settings_page_settingspage": "SettingsPage()" | kind=code-symbol | source=src/app/(shop)/profile/settings/page.tsx:L8 | neighbors=[page.tsx] | lang=en
- "shalom_contacts_route_get": "GET()" | kind=code-symbol | source=src/app/api/admin/shalom-contacts/route.ts:L8 | neighbors=[route.ts] | lang=en
- "shalom_contacts_route_post": "POST()" | kind=code-symbol | source=src/app/api/admin/shalom-contacts/route.ts:L52 | neighbors=[route.ts] | lang=en
- "shalom_contacts_route_schema": "schema" | kind=code-symbol | source=src/app/api/admin/shalom-contacts/route.ts:L43 | neighbors=[route.ts] | lang=en
- "shop_layout_shoplayout": "ShopLayout()" | kind=code-symbol | source=src/app/(shop)/layout.tsx:L7 | neighbors=[layout.tsx] | lang=en
- "shop_page_homepage": "HomePage()" | kind=code-symbol | source=src/app/(shop)/page.tsx:L23 | neighbors=[page.tsx] | lang=en
- "src_middleware_adminroutes": "adminRoutes" | kind=code-symbol | source=src/middleware.ts:L10 | neighbors=[middleware.ts] | lang=en
- "src_middleware_config": "config" | kind=code-symbol | source=src/middleware.ts:L65 | neighbors=[middleware.ts] | lang=en
- "src_middleware_guestroutes": "guestRoutes" | kind=code-symbol | source=src/middleware.ts:L13 | neighbors=[middleware.ts] | lang=en
- "src_middleware_protectedroutes": "protectedRoutes" | kind=code-symbol | source=src/middleware.ts:L7 | neighbors=[middleware.ts] | lang=en
- "stores_cart_store_cartstate": "CartState" | kind=code-symbol | source=src/stores/cart-store.ts:L6 | neighbors=[cart-store.ts] | lang=en
- "stores_products_store_defaultfilters": "defaultFilters" | kind=code-symbol | source=src/stores/products-store.ts:L33 | neighbors=[products-store.ts] | lang=en
- "stores_products_store_productsstate": "ProductsState" | kind=code-symbol | source=src/stores/products-store.ts:L6 | neighbors=[products-store.ts] | lang=en
- "success_page_checkoutsuccesspage": "CheckoutSuccessPage()" | kind=code-symbol | source=src/app/(shop)/checkout/success/page.tsx:L153 | neighbors=[page.tsx] | lang=en
- "success_page_shippingicons": "shippingIcons" | kind=code-symbol | source=src/app/(shop)/checkout/success/page.tsx:L32 | neighbors=[page.tsx] | lang=en
- "success_page_shippinglabels": "shippingLabels" | kind=code-symbol | source=src/app/(shop)/checkout/success/page.tsx:L26 | neighbors=[page.tsx] | lang=en
- "success_page_successcontent": "SuccessContent()" | kind=code-symbol | source=src/app/(shop)/checkout/success/page.tsx:L38 | neighbors=[page.tsx] | lang=en
- "success_page_successskeleton": "SuccessSkeleton()" | kind=code-symbol | source=src/app/(shop)/checkout/success/page.tsx:L141 | neighbors=[page.tsx] | lang=en
- "summary_route_get": "GET()" | kind=code-symbol | source=src/app/api/admin/acquisitions/summary/route.ts:L7 | neighbors=[route.ts] | lang=en
- "terms_page_metadata": "metadata" | kind=code-symbol | source=src/app/(shop)/terms/page.tsx:L4 | neighbors=[page.tsx] | lang=en
- "terms_page_termspage": "TermsPage()" | kind=code-symbol | source=src/app/(shop)/terms/page.tsx:L9 | neighbors=[page.tsx] | lang=en
- "terms0701_checkout_integration": "Integracion Legal en Checkout (checkbox obligatorio + enlace de descarga PDF)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.01-Terminos-y-Condiciones-de-Preventas-y-Ventas]].md | neighbors=[07.01 — Terminos y Condiciones de Preve…] | lang=nl
- "terms0701_shipping_warranty_policy": "Politica de Envios y Garantias (responsabilidad courier, condicion producto, re…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.01-Terminos-y-Condiciones-de-Preventas-y-Ventas]].md | neighbors=[07.01 — Terminos y Condiciones de Preve…] | lang=es
- "testreport_raw_draft": "Raw Test Report Draft/Template (con placeholders {{TODO:AI_ANALYSIS}})" | kind=entity | source=testsprite_tests/tmp/raw_report.md | neighbors=[TestSprite AI Testing Report (MCP)] | lang=en
- "testreport_tc001_user_registration": "TC001 User Registration Success (Passed)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP)] | lang=en
- "testreport_tc002_validation_errors": "TC002 User Registration Validation Errors (Passed)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP)] | lang=en
- "testreport_tc003_login_success": "TC003 User Login Success (Passed)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP)] | lang=en
- "testreport_tc004_login_failure": "TC004 User Login Failure (Passed)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP)] | lang=en
- "testreport_tc006_catalog_filter_sort": "TC006 Product Catalog Filtering and Sorting (Passed)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP)] | lang=en
- "testreport_tc007_product_detail_display": "TC007 Product Details Page Display (Passed)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP)] | lang=en
- "testreport_tc010_checkout_payment_failure": "TC010 Checkout Flow Payment Failure Handling (Passed)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP)] | lang=en
- "testreport_tc014_api_endpoints": "TC014 API Endpoint Response and Error Handling (Passed)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP)] | lang=en
- "testreport_tc015_responsive_design": "TC015 Responsive Design Verification (Passed)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP)] | lang=en
- "testreport_tc016_db_integrity": "TC016 Database Integrity and Relational Constraints (Passed)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP)] | lang=en
- "testreport_tc017_performance_seo": "TC017 Performance and SEO Checks (Passed)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP)] | lang=en
- "testsprite_tests_tc001_user_registration_success_run_test": "run_test()" | kind=code-symbol | source=testsprite_tests/TC001_User_Registration_Success.py:L5 | neighbors=[TC001_User_Registration_Success.py] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-027.json

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
