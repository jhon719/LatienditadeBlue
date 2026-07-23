# Node Description Batch 12 of 30

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

- "stores_products_store_useproductsstore": "useProductsStore" | kind=code-symbol | source=src/stores/products-store.ts:L43 | neighbors=[FilterSidebar.tsx, page.tsx, products-store.ts] | lang=en
- "terms0701_preorder_policy": "Politica de Preventas (adelanto no reembolsable si cancela cliente, reembolso i…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.01-Terminos-y-Condiciones-de-Preventas-y-Ventas]].md | neighbors=[Condiciones No Admitidas (danos transpo…, 05.03 — Control de Inventario y Prevent…, 07.01 — Terminos y Condiciones de Preve…] | lang=nl
- "terms0701_sales_policy": "Politica de Ventas Stock Fisico (validez de comprobantes via Bandeja POS, reser…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.01-Terminos-y-Condiciones-de-Preventas-y-Ventas]].md | neighbors=[Auth y Seguridad (NextAuth v5, RBAC, mu…, 05.02 — Bandeja POS de Aprobacion de Co…, 07.01 — Terminos y Condiciones de Preve…] | lang=nl
- "testreport_finding_profile_edit_broken": "Hallazgo: boton 'Editar' del perfil no activa el modo edicion" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP), Recomendaciones del reporte (seccion 5), TC011 User Profile Management CRUD (FAI…] | lang=es
- "testreport_tc008_cart_operations": "TC008 Shopping Cart Operations (FAILED, HIGH)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[TestSprite AI Testing Report (MCP), Hallazgo: carrito de compras falla al a…, Hallazgo: errores de manejo de imagenes…] | lang=en
- "types_index_product_type_labels": "PRODUCT_TYPE_LABELS" | kind=code-symbol | source=src/types/index.ts:L103 | neighbors=[FilterSidebar.tsx, page.tsx, index.ts] | lang=en
- "ui_breadcrumb_breadcrumb": "Breadcrumb()" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L7 | neighbors=[page.tsx, page.tsx, breadcrumb.tsx] | lang=en
- "ui_breadcrumb_breadcrumbitem": "BreadcrumbItem()" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L24 | neighbors=[page.tsx, page.tsx, breadcrumb.tsx] | lang=en
- "ui_breadcrumb_breadcrumblink": "BreadcrumbLink()" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L34 | neighbors=[page.tsx, page.tsx, breadcrumb.tsx] | lang=en
- "ui_breadcrumb_breadcrumblist": "BreadcrumbList()" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L11 | neighbors=[page.tsx, page.tsx, breadcrumb.tsx] | lang=en
- "ui_breadcrumb_breadcrumbpage": "BreadcrumbPage()" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L52 | neighbors=[page.tsx, page.tsx, breadcrumb.tsx] | lang=en
- "ui_breadcrumb_breadcrumbseparator": "BreadcrumbSeparator()" | kind=code-symbol | source=src/components/ui/breadcrumb.tsx:L65 | neighbors=[page.tsx, page.tsx, breadcrumb.tsx] | lang=en
- "ui_button_buttonvariants": "buttonVariants" | kind=code-symbol | source=src/components/ui/button.tsx:L7 | neighbors=[alert-dialog.tsx, button.tsx, Button()] | lang=en
- "ui_carousel_carouselcontent": "CarouselContent()" | kind=code-symbol | source=src/components/ui/carousel.tsx:L135 | neighbors=[HeroBanner.tsx, carousel.tsx, useCarousel()] | lang=en
- "ui_carousel_carouselitem": "CarouselItem()" | kind=code-symbol | source=src/components/ui/carousel.tsx:L156 | neighbors=[HeroBanner.tsx, carousel.tsx, useCarousel()] | lang=en
- "ui_carousel_carouselnext": "CarouselNext()" | kind=code-symbol | source=src/components/ui/carousel.tsx:L204 | neighbors=[HeroBanner.tsx, carousel.tsx, useCarousel()] | lang=en
- "ui_carousel_carouselprevious": "CarouselPrevious()" | kind=code-symbol | source=src/components/ui/carousel.tsx:L174 | neighbors=[HeroBanner.tsx, carousel.tsx, useCarousel()] | lang=en
- "ui_dropdown_menu_dropdownmenulabel": "DropdownMenuLabel()" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L146 | neighbors=[AdminHeader.tsx, Header.tsx, dropdown-menu.tsx] | lang=en
- "ui_radio_group_radiogroup": "RadioGroup()" | kind=code-symbol | source=src/components/ui/radio-group.tsx:L9 | neighbors=[CatalogEntryForm.tsx, page.tsx, radio-group.tsx] | lang=en
- "ui_radio_group_radiogroupitem": "RadioGroupItem()" | kind=code-symbol | source=src/components/ui/radio-group.tsx:L22 | neighbors=[CatalogEntryForm.tsx, page.tsx, radio-group.tsx] | lang=en
- "ui_switch_switch": "Switch()" | kind=code-symbol | source=src/components/ui/switch.tsx:L8 | neighbors=[page.tsx, page.tsx, switch.tsx] | lang=en
- "20260718231507_init_migration_accounts": "accounts" | kind=code-symbol | source=prisma/migrations/20260718231507_init/migration.sql:L43 | neighbors=[migration.sql, users] | lang=en
- "20260718231507_init_migration_brands": "brands" | kind=code-symbol | source=prisma/migrations/20260718231507_init/migration.sql:L90 | neighbors=[migration.sql, products] | lang=en
- "20260718231507_init_migration_categories": "categories" | kind=code-symbol | source=prisma/migrations/20260718231507_init/migration.sql:L61 | neighbors=[migration.sql, products] | lang=en
- "20260718231507_init_migration_lines": "lines" | kind=code-symbol | source=prisma/migrations/20260718231507_init/migration.sql:L76 | neighbors=[migration.sql, products] | lang=en
- "20260719144924_add_campaigns_crm_migration_categories": "categories" | kind=code-symbol | source=prisma/migrations/20260719144924_add_campaigns_crm/migration.sql:L123 | neighbors=[migration.sql, discount_rules] | lang=en
- "20260719144924_add_campaigns_crm_migration_coupons": "coupons" | kind=code-symbol | source=prisma/migrations/20260719144924_add_campaigns_crm/migration.sql:L77 | neighbors=[migration.sql, orders] | lang=en
- "20260719144924_add_campaigns_crm_migration_lines": "lines" | kind=code-symbol | source=prisma/migrations/20260719144924_add_campaigns_crm/migration.sql:L126 | neighbors=[migration.sql, discount_rules] | lang=en
- "20260719144924_add_campaigns_crm_migration_orders": "orders" | kind=code-symbol | source=prisma/migrations/20260719144924_add_campaigns_crm/migration.sql:L14 | neighbors=[migration.sql, coupons] | lang=en
- "20260719214006_add_logistics_backoffice_migration_users": "users" | kind=code-symbol | source=prisma/migrations/20260719214006_add_logistics_backoffice/migration.sql:L70 | neighbors=[migration.sql, preorder_reservations] | lang=en
- "20260721031556_add_line_brand_migration_brands": "brands" | kind=code-symbol | source=prisma/migrations/20260721031556_add_line_brand/migration.sql:L2 | neighbors=[migration.sql, lines] | lang=en
- "20260721031556_add_line_brand_migration_lines": "lines" | kind=code-symbol | source=prisma/migrations/20260721031556_add_line_brand/migration.sql:L2 | neighbors=[migration.sql, brands] | lang=en
- "20260721214537_add_acquisitions_migration": "migration.sql" | kind=code-symbol | source=prisma/migrations/20260721214537_add_acquisitions/migration.sql:L1 | neighbors=[acquisitions, 487cc56 version 4] | lang=en
- "20260721230413_add_shalom_contacts_migration": "migration.sql" | kind=code-symbol | source=prisma/migrations/20260721230413_add_shalom_contacts/migration.sql:L1 | neighbors=[shalom_contacts, 487cc56 version 4] | lang=en
- "adicionales_admin_routes": "Grupo de Rutas Privadas src/app/(admin-panel)/admin/ (dashboard, products, orde…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/Adicionales.md | neighbors=[Adicionales — Desglose Detallado de Dir…, 05.02 — Bandeja POS de Aprobacion de Co…] | lang=nl
- "admin_acquisitionform_acquisitiondata": "AcquisitionData" | kind=code-symbol | source=src/components/admin/AcquisitionForm.tsx:L34 | neighbors=[AcquisitionForm.tsx, page.tsx] | lang=en
- "admin_acquisitionform_num": "num()" | kind=code-symbol | source=src/components/admin/AcquisitionForm.tsx:L36 | neighbors=[AcquisitionForm.tsx, AcquisitionForm()] | lang=en
- "admin_acquisitionstab_acquisitionstab": "AcquisitionsTab()" | kind=code-symbol | source=src/components/admin/AcquisitionsTab.tsx:L195 | neighbors=[AcquisitionsTab.tsx, page.tsx] | lang=en
- "admin_adminmobilenav_adminmobilenav": "AdminMobileNav()" | kind=code-symbol | source=src/components/admin/AdminMobileNav.tsx:L39 | neighbors=[AdminHeader.tsx, AdminMobileNav.tsx] | lang=en
- "admin_adminsidebar_adminsidebar": "AdminSidebar()" | kind=code-symbol | source=src/components/admin/AdminSidebar.tsx:L35 | neighbors=[AdminSidebar.tsx, layout.tsx] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-011.json

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
