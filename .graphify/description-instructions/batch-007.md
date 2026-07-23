# Node Description Batch 8 of 30

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

- "lib_social_social_links": "SOCIAL_LINKS" | kind=code-symbol | source=src/lib/social.ts:L25 | neighbors=[FollowUs.tsx, QuickAccessPanel.tsx, Footer.tsx, social.ts, ManchasStorePromo.tsx]
- "lib_utils_slugify": "slugify()" | kind=code-symbol | source=src/lib/utils.ts:L9 | neighbors=[route.ts, route.ts, utils.ts, route.ts, route.ts]
- "privacy_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/privacy/page.tsx:L1 | neighbors=[3db2e43 version 2, LegalPage.tsx, LegalPage(), metadata, PrivacyPage()]
- "react_bits_tiltcard": "TiltCard.tsx" | kind=code-symbol | source=src/components/react-bits/TiltCard.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, utils.ts, cn(), TiltCard(), TiltCardProps]
- "release_stock_route": "route.ts" | kind=code-symbol | source=src/app/api/cron/release-stock/route.ts:L1 | neighbors=[3db2e43 version 2, auth.ts, release-stock.ts, releaseAbandonedStock(), GET()]
- "returns_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/returns/page.tsx:L1 | neighbors=[3db2e43 version 2, LegalPage.tsx, LegalPage(), metadata, ReturnsPage()]
- "shipping_shalomtracker": "ShalomTracker.tsx" | kind=code-symbol | source=src/components/shipping/ShalomTracker.tsx:L1 | neighbors=[487cc56 version 4, page.tsx, ShalomTracker(), button.tsx, Button()]
- "terms_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/terms/page.tsx:L1 | neighbors=[3db2e43 version 2, LegalPage.tsx, LegalPage(), metadata, TermsPage()]
- "testreport_finding_admin_product_creation_fails": "Hallazgo: creacion de producto en panel admin falla con datos validos" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[src/app/(admin-panel)/admin/products/ne…, Panel admin (dashboard KPIs, Bandeja PO…, TestSprite AI Testing Report (MCP), Recomendaciones del reporte (seccion 5), TC012 Admin Panel Product CRUD Operatio…]
- "testreport_finding_rbac_vulnerability": "Hallazgo critico: RBAC no aplicado, clientes acceden al panel admin" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[src/middleware.ts, Autenticacion (registro username, Googl…, TestSprite AI Testing Report (MCP), Recomendaciones del reporte (seccion 5), TC005 Role-Based Access Control Enforce…]
- "types_index_cartitem": "CartItem" | kind=code-symbol | source=src/types/index.ts:L87 | neighbors=[CartItem.tsx, CartSummary.tsx, OrderSummary.tsx, cart-store.ts, index.ts]
- "types_index_category": "Category" | kind=code-symbol | source=src/types/index.ts:L55 | neighbors=[page.tsx, CategoryTrends.tsx, transformers.ts, products-store.ts, index.ts]
- "types_index_filterstate": "FilterState" | kind=code-symbol | source=src/types/index.ts:L92 | neighbors=[FilterMobile.tsx, FilterSidebar.tsx, page.tsx, products-store.ts, index.ts]
- "types_index_line": "Line" | kind=code-symbol | source=src/types/index.ts:L66 | neighbors=[page.tsx, LinesSection.tsx, transformers.ts, products-store.ts, index.ts]
- "types_next_auth_d": "next-auth.d.ts" | kind=code-symbol | source=src/types/next-auth.d.ts:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, JWT, Session, User]
- "ui_alert_dialog_alertdialogtrigger": "AlertDialogTrigger()" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L15 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, alert-dialog.tsx]
- "ui_carousel_usecarousel": "useCarousel()" | kind=code-symbol | source=src/components/ui/carousel.tsx:L35 | neighbors=[carousel.tsx, CarouselContent(), CarouselItem(), CarouselNext(), CarouselPrevious()]
- "ui_sheet_sheet": "Sheet()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L9 | neighbors=[AdminHeader.tsx, AdminMobileNav.tsx, MobileNav.tsx, FilterMobile.tsx, sheet.tsx]
- "ui_sheet_sheetcontent": "SheetContent()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L47 | neighbors=[AdminHeader.tsx, AdminMobileNav.tsx, MobileNav.tsx, FilterMobile.tsx, sheet.tsx]
- "ui_sheet_sheetheader": "SheetHeader()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L84 | neighbors=[AdminHeader.tsx, AdminMobileNav.tsx, MobileNav.tsx, FilterMobile.tsx, sheet.tsx]
- "ui_sheet_sheettitle": "SheetTitle()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L104 | neighbors=[AdminHeader.tsx, AdminMobileNav.tsx, MobileNav.tsx, FilterMobile.tsx, sheet.tsx]
- "ui_sheet_sheettrigger": "SheetTrigger()" | kind=code-symbol | source=src/components/ui/sheet.tsx:L13 | neighbors=[AdminHeader.tsx, AdminMobileNav.tsx, MobileNav.tsx, FilterMobile.tsx, sheet.tsx]
- "ui_slider": "slider.tsx" | kind=code-symbol | source=src/components/ui/slider.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, PriceFilter.tsx, utils.ts, cn(), Slider()]
- "20260718231507_init_migration_orders": "orders" | kind=code-symbol | source=prisma/migrations/20260718231507_init/migration.sql:L139 | neighbors=[migration.sql, order_items, users, payment_proofs]
- "20260719214006_add_logistics_backoffice_migration_preorder_reservations": "preorder_reservations" | kind=code-symbol | source=prisma/migrations/20260719214006_add_logistics_backoffice/migration.sql:L35 | neighbors=[migration.sql, import_batches, products, users]
- "admin_acquisitionform_acquisitionform": "AcquisitionForm()" | kind=code-symbol | source=src/components/admin/AcquisitionForm.tsx:L38 | neighbors=[AcquisitionForm.tsx, num(), page.tsx, page.tsx]
- "admin_separationbits_progressbar": "ProgressBar()" | kind=code-symbol | source=src/components/admin/SeparationBits.tsx:L44 | neighbors=[SeparationBits.tsx, page.tsx, page.tsx, page.tsx]
- "admin_separationbits_semaphorebadge": "SemaphoreBadge()" | kind=code-symbol | source=src/components/admin/SeparationBits.tsx:L13 | neighbors=[SeparationBits.tsx, page.tsx, page.tsx, page.tsx]
- "admin_separationbits_semaphorelevel": "SemaphoreLevel" | kind=code-symbol | source=src/components/admin/SeparationBits.tsx:L3 | neighbors=[SeparationBits.tsx, page.tsx, page.tsx, page.tsx]
- "autopay0601_document": "06.01 — Flujo de Compra por Pasarela Automatica (nota referenciada, no incluida…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/06-Flujos-De-Negocio-Y-Trazabilidad/[[06.01-Flujo de Compra por Pasarela Automática]].md | neighbors=[08.01 — Estrategia de Despliegue y Conf…, 05.03 — Control de Inventario y Prevent…, 06.02 — Flujo de Compra Manual, POS y B…, 07.03 — Politica de Privacidad y Protec…]
- "claudemd_assets_locales": "Assets Locales (public/Imagenes, no renombrar)" | kind=entity | source=CLAUDE.md | neighbors=[Mapeo Fisico de Imagenes por slug (publ…, CLAUDE.md — Guia del Proyecto, Recursos Estaticos QR de Cobro (public/…, Convenciones (Sin Server Actions, RHF+Z…]
- "claudemd_db_local": "Base de Datos Local (PostgreSQL 18, latiendita_blue, usuarios seed)" | kind=entity | source=CLAUDE.md | neighbors=[Auth y Seguridad (NextAuth v5, RBAC, mu…, CLAUDE.md — Guia del Proyecto, Requisitos e Instalacion (Node 20+, Pos…, Scripts Disponibles (dev/build/start/li…]
- "claudemd_rule_no_server_actions": "Regla: no usar Server Actions, usar Route Handlers" | kind=entity | source=CLAUDE.md | neighbors=[CLAUDE.md — Guia del Proyecto, Flujo Admin de Aprobacion de Voucher (S…, Convenciones (Sin Server Actions, RHF+Z…, Checklist de Seguridad (Code Review): d…]
- "common_imagelightbox_imagelightbox": "ImageLightbox()" | kind=code-symbol | source=src/components/common/ImageLightbox.tsx:L27 | neighbors=[AcquisitionsTab.tsx, ManualPaymentSection.tsx, ImageLightbox.tsx, page.tsx]
- "datamodel_product": "Product (Productos)" | kind=entity | source=docs/DATA-MODEL.md | neighbors=[OrderItem (Items del Pedido), Brand (Marcas), Category (Categorias), Modelo de Datos - BasicTechShop (refere…]
- "datamodel_user": "User (Usuarios)" | kind=entity | source=docs/DATA-MODEL.md | neighbors=[Address (Direcciones), Order (Pedidos), Roles y Permisos (CUSTOMER/MODERATOR/AD…, Modelo de Datos - BasicTechShop (refere…]
- "layout_topbar": "TopBar.tsx" | kind=code-symbol | source=src/components/layout/TopBar.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, benefits, TopBar(), layout.tsx]
- "legal_legalpage_legalpage": "LegalPage()" | kind=code-symbol | source=src/components/legal/LegalPage.tsx:L16 | neighbors=[LegalPage.tsx, page.tsx, page.tsx, page.tsx]
- "lib_acquisitions_igvamount": "igvAmount()" | kind=code-symbol | source=src/lib/acquisitions.ts:L72 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, acquisitions.ts, r2()]
- "lib_acquisitions_month_order": "MONTH_ORDER" | kind=code-symbol | source=src/lib/acquisitions.ts:L20 | neighbors=[route.ts, AcquisitionsTab.tsx, acquisitions.ts, route.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-007.json

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
