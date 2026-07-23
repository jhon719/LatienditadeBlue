# Node Description Batch 16 of 30

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

- "products_pricefilter_pricefilter": "PriceFilter()" | kind=code-symbol | source=src/components/products/PriceFilter.tsx:L15 | neighbors=[FilterSidebar.tsx, PriceFilter.tsx] | lang=en
- "products_productbundle_productbundle": "ProductBundle()" | kind=code-symbol | source=src/components/products/ProductBundle.tsx:L18 | neighbors=[page.tsx, ProductBundle.tsx] | lang=en
- "products_productdetail_productdetail": "ProductDetail()" | kind=code-symbol | source=src/components/products/ProductDetail.tsx:L32 | neighbors=[page.tsx, ProductDetail.tsx] | lang=en
- "products_productgallery_productgallery": "ProductGallery()" | kind=code-symbol | source=src/components/products/ProductGallery.tsx:L12 | neighbors=[page.tsx, ProductGallery.tsx] | lang=en
- "products_productgrid_productgrid": "ProductGrid()" | kind=code-symbol | source=src/components/products/ProductGrid.tsx:L16 | neighbors=[page.tsx, ProductGrid.tsx] | lang=en
- "products_productreviews_productreviews": "ProductReviews()" | kind=code-symbol | source=src/components/products/ProductReviews.tsx:L56 | neighbors=[page.tsx, ProductReviews.tsx] | lang=en
- "products_sortselect_sortselect": "SortSelect()" | kind=code-symbol | source=src/components/products/SortSelect.tsx:L16 | neighbors=[page.tsx, SortSelect.tsx] | lang=en
- "profile_avataruploader_avataruploader": "AvatarUploader()" | kind=code-symbol | source=src/components/profile/AvatarUploader.tsx:L14 | neighbors=[AvatarUploader.tsx, page.tsx] | lang=en
- "profile_profilemobilenav_profilemobilenav": "ProfileMobileNav()" | kind=code-symbol | source=src/components/profile/ProfileMobileNav.tsx:L16 | neighbors=[layout.tsx, ProfileMobileNav.tsx] | lang=en
- "profile_profilesettingsform_profilesettingsform": "ProfileSettingsForm()" | kind=code-symbol | source=src/components/profile/ProfileSettingsForm.tsx:L77 | neighbors=[ProfileSettingsForm.tsx, page.tsx] | lang=en
- "profile_profilesidebar_profilesidebar": "ProfileSidebar()" | kind=code-symbol | source=src/components/profile/ProfileSidebar.tsx:L19 | neighbors=[layout.tsx, ProfileSidebar.tsx] | lang=en
- "providers_sessionprovider_sessionprovider": "SessionProvider()" | kind=code-symbol | source=src/components/providers/SessionProvider.tsx:L9 | neighbors=[layout.tsx, SessionProvider.tsx] | lang=en
- "providers_themeprovider_themeprovider": "ThemeProvider()" | kind=code-symbol | source=src/components/providers/ThemeProvider.tsx:L6 | neighbors=[layout.tsx, ThemeProvider.tsx] | lang=en
- "react_bits_magneticbutton_magneticbutton": "MagneticButton()" | kind=code-symbol | source=src/components/react-bits/MagneticButton.tsx:L11 | neighbors=[HeroBanner.tsx, MagneticButton.tsx] | lang=en
- "readme_modelo_datos": "Modelo de Datos (listado de entidades Prisma)" | kind=entity | source=README.md | neighbors=[01.03 — Modelo de Base de Datos Prisma …, README.md — La Tiendita de Blue] | lang=nl
- "readme_panel_admin": "Funcionalidades: Panel de Administracion" | kind=entity | source=README.md | neighbors=[05.02 — Bandeja POS de Aprobacion de Co…, README.md — La Tiendita de Blue] | lang=nl
- "readme_requisitos_instalacion": "Requisitos e Instalacion (Node 20+, Postgres 18, npm install, migrate, seed)" | kind=entity | source=README.md | neighbors=[Base de Datos Local (PostgreSQL 18, lat…, README.md — La Tiendita de Blue] | lang=en
- "readme_scripts": "Scripts Disponibles (dev/build/start/lint/db:seed/db:migrate)" | kind=entity | source=README.md | neighbors=[Base de Datos Local (PostgreSQL 18, lat…, README.md — La Tiendita de Blue] | lang=en
- "returns0702_excluded_conditions": "Condiciones No Admitidas (danos transporte sin video, figuras Loose/Caja Danada…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.02-Politicas-de-Devolucion-y-Reembolsos]].md | neighbors=[07.02 — Politicas de Devolucion y Reemb…, Politica de Preventas (adelanto no reem…] | lang=en
- "returns0702_refund_process": "Proceso de Reembolso (ticket soporte, 48h resolucion, Nota de Credito SUNAT)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.02-Politicas-de-Devolucion-y-Reembolsos]].md | neighbors=[06.02 — Flujo de Compra Manual, POS y B…, 07.02 — Politicas de Devolucion y Reemb…] | lang=nl
- "reviews_route_hasverifiedpurchase": "hasVerifiedPurchase()" | kind=code-symbol | source=src/app/api/reviews/route.ts:L10 | neighbors=[route.ts, POST()] | lang=en
- "reviews_route_post": "POST()" | kind=code-symbol | source=src/app/api/reviews/route.ts:L66 | neighbors=[route.ts, hasVerifiedPurchase()] | lang=en
- "security0402_sqli_protection": "Blindaje SQL Injection (consultas parametrizadas de Prisma, $queryRaw template …" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/04-Seguridad-Y-Prevencion-De-Errores/[[04.02-Blindaje contra SQL Injection y XSS]].md | neighbors=[01.03 — Modelo de Base de Datos Prisma …, 04.02 — Blindaje contra SQL Injection y…] | lang=nl
- "separations_page_money": "money()" | kind=code-symbol | source=src/app/(shop)/profile/separations/page.tsx:L47 | neighbors=[page.tsx, SeparationCard()] | lang=en
- "separations_page_separationcard": "SeparationCard()" | kind=code-symbol | source=src/app/(shop)/profile/separations/page.tsx:L174 | neighbors=[page.tsx, money()] | lang=en
- "shipping_shalomtracker_shalomtracker": "ShalomTracker()" | kind=code-symbol | source=src/components/shipping/ShalomTracker.tsx:L11 | neighbors=[page.tsx, ShalomTracker.tsx] | lang=en
- "testreport_finding_admin_role_selection_bug": "Hallazgo: seleccion de rol por defecto incorrecta al crear usuario (Administrad…" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP), TC013 Admin Panel User Management and R…] | lang=nl
- "testreport_finding_missing_sizes_prop": "Advertencia de performance: falta prop 'sizes' en imagenes Next.js con fill" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP), Recomendaciones del reporte (seccion 5)] | lang=en
- "testreport_tc005_rbac_enforcement": "TC005 Role-Based Access Control Enforcement (FAILED, CRITICAL)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP), Hallazgo critico: RBAC no aplicado, cli…] | lang=en
- "testreport_tc009_checkout_success": "TC009 Checkout Flow Success (FAILED, CRITICAL)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP), Hallazgo: carrito de compras falla al a…] | lang=en
- "testreport_tc011_profile_crud": "TC011 User Profile Management CRUD (FAILED, MEDIUM)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP), Hallazgo: boton 'Editar' del perfil no …] | lang=en
- "testreport_tc012_admin_product_crud": "TC012 Admin Panel Product CRUD Operations (FAILED, HIGH)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP), Hallazgo: creacion de producto en panel…] | lang=en
- "testreport_tc013_admin_user_management": "TC013 Admin Panel User Management and Role Assignments (FAILED, MEDIUM)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP), Hallazgo: seleccion de rol por defecto …] | lang=en
- "testsprite_tests_tc001_user_registration_success": "TC001_User_Registration_Success.py" | kind=code-symbol | source=testsprite_tests/TC001_User_Registration_Success.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()] | lang=en
- "testsprite_tests_tc002_user_registration_validation_errors": "TC002_User_Registration_Validation_Errors.py" | kind=code-symbol | source=testsprite_tests/TC002_User_Registration_Validation_Errors.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()] | lang=en
- "testsprite_tests_tc003_user_login_success": "TC003_User_Login_Success.py" | kind=code-symbol | source=testsprite_tests/TC003_User_Login_Success.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()] | lang=en
- "testsprite_tests_tc004_user_login_failure": "TC004_User_Login_Failure.py" | kind=code-symbol | source=testsprite_tests/TC004_User_Login_Failure.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()] | lang=en
- "testsprite_tests_tc005_role_based_access_control_enforcement": "TC005_Role_Based_Access_Control_Enforcement.py" | kind=code-symbol | source=testsprite_tests/TC005_Role_Based_Access_Control_Enforcement.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()] | lang=en
- "testsprite_tests_tc006_product_catalog_filtering_and_sorting": "TC006_Product_Catalog_Filtering_and_Sorting.py" | kind=code-symbol | source=testsprite_tests/TC006_Product_Catalog_Filtering_and_Sorting.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()] | lang=en
- "testsprite_tests_tc007_product_details_page_display": "TC007_Product_Details_Page_Display.py" | kind=code-symbol | source=testsprite_tests/TC007_Product_Details_Page_Display.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-015.json

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
