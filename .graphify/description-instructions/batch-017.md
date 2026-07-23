# Node Description Batch 18 of 30

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

- "20260721045812_add_separations_migration_separation_payments": "separation_payments" | kind=code-symbol | source=prisma/migrations/20260721045812_add_separations/migration.sql:L12 | neighbors=[migration.sql]
- "20260721214537_add_acquisitions_migration_acquisitions": "acquisitions" | kind=code-symbol | source=prisma/migrations/20260721214537_add_acquisitions/migration.sql:L2 | neighbors=[migration.sql]
- "20260721223022_add_user_tiktok_migration": "migration.sql" | kind=code-symbol | source=prisma/migrations/20260721223022_add_user_tiktok/migration.sql:L1 | neighbors=[487cc56 version 4]
- "20260721230413_add_shalom_contacts_migration_shalom_contacts": "shalom_contacts" | kind=code-symbol | source=prisma/migrations/20260721230413_add_shalom_contacts/migration.sql:L2 | neighbors=[migration.sql]
- "acquisitions_route_createschema": "createSchema" | kind=code-symbol | source=src/app/api/admin/acquisitions/route.ts:L67 | neighbors=[route.ts]
- "acquisitions_route_get": "GET()" | kind=code-symbol | source=src/app/api/admin/acquisitions/route.ts:L9 | neighbors=[route.ts]
- "acquisitions_route_post": "POST()" | kind=code-symbol | source=src/app/api/admin/acquisitions/route.ts:L87 | neighbors=[route.ts]
- "adicionales_api_routes": "Endpoints Backend src/app/api/ (orders, payments/mercadopago, proofs, products,…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/Adicionales.md | neighbors=[Adicionales — Desglose Detallado de Dir…]
- "adicionales_components": "Componentes UI src/components/ (admin, common, home, layout, products)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/Adicionales.md | neighbors=[Adicionales — Desglose Detallado de Dir…]
- "adicionales_lib": "Utilidades src/lib/ (db.ts, mercadopago.ts, storage.ts, transformers.ts)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/Adicionales.md | neighbors=[Adicionales — Desglose Detallado de Dir…]
- "adicionales_shop_routes": "Grupo de Rutas Publicas src/app/(shop)/ (home, products, cart, checkout, orders)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/Adicionales.md | neighbors=[Adicionales — Desglose Detallado de Dir…]
- "adicionales_stores": "Estado Global src/stores/ (cart-store.ts, ui-store.ts)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/Adicionales.md | neighbors=[Adicionales — Desglose Detallado de Dir…]
- "admin_acquisitionstab_acquisition": "Acquisition" | kind=code-symbol | source=src/components/admin/AcquisitionsTab.tsx:L49 | neighbors=[AcquisitionsTab.tsx]
- "admin_acquisitionstab_dashboard": "Dashboard()" | kind=code-symbol | source=src/components/admin/AcquisitionsTab.tsx:L118 | neighbors=[AcquisitionsTab.tsx]
- "admin_acquisitionstab_money": "money()" | kind=code-symbol | source=src/components/admin/AcquisitionsTab.tsx:L88 | neighbors=[AcquisitionsTab.tsx]
- "admin_acquisitionstab_monthsummary": "MonthSummary" | kind=code-symbol | source=src/components/admin/AcquisitionsTab.tsx:L68 | neighbors=[AcquisitionsTab.tsx]
- "admin_acquisitionstab_statcard": "StatCard()" | kind=code-symbol | source=src/components/admin/AcquisitionsTab.tsx:L90 | neighbors=[AcquisitionsTab.tsx]
- "admin_acquisitionstab_summary": "Summary" | kind=code-symbol | source=src/components/admin/AcquisitionsTab.tsx:L76 | neighbors=[AcquisitionsTab.tsx]
- "admin_adminheader_adminheader": "AdminHeader()" | kind=code-symbol | source=src/components/admin/AdminHeader.tsx:L26 | neighbors=[AdminHeader.tsx]
- "admin_adminmobilenav_navigation": "navigation" | kind=code-symbol | source=src/components/admin/AdminMobileNav.tsx:L28 | neighbors=[AdminMobileNav.tsx]
- "admin_adminsidebar_navigation": "navigation" | kind=code-symbol | source=src/components/admin/AdminSidebar.tsx:L22 | neighbors=[AdminSidebar.tsx]
- "admin_campaignform_campaignformprops": "CampaignFormProps" | kind=code-symbol | source=src/components/admin/CampaignForm.tsx:L47 | neighbors=[CampaignForm.tsx]
- "admin_campaignform_option": "Option" | kind=code-symbol | source=src/components/admin/CampaignForm.tsx:L39 | neighbors=[CampaignForm.tsx]
- "admin_campaignform_str": "str()" | kind=code-symbol | source=src/components/admin/CampaignForm.tsx:L54 | neighbors=[CampaignForm.tsx]
- "admin_catalogentryform_brandoption": "BrandOption" | kind=code-symbol | source=src/components/admin/CatalogEntryForm.tsx:L52 | neighbors=[CatalogEntryForm.tsx]
- "admin_catalogentryform_catalogentryformprops": "CatalogEntryFormProps" | kind=code-symbol | source=src/components/admin/CatalogEntryForm.tsx:L68 | neighbors=[CatalogEntryForm.tsx]
- "admin_catalogentryform_endpoint": "ENDPOINT" | kind=code-symbol | source=src/components/admin/CatalogEntryForm.tsx:L40 | neighbors=[CatalogEntryForm.tsx]
- "admin_catalogentryform_type_options": "TYPE_OPTIONS" | kind=code-symbol | source=src/components/admin/CatalogEntryForm.tsx:L34 | neighbors=[CatalogEntryForm.tsx]
- "admin_catalogentryform_upload_folder": "UPLOAD_FOLDER" | kind=code-symbol | source=src/components/admin/CatalogEntryForm.tsx:L46 | neighbors=[CatalogEntryForm.tsx]
- "admin_crmpanel_crmpanelprops": "CrmPanelProps" | kind=code-symbol | source=src/components/admin/CrmPanel.tsx:L33 | neighbors=[CrmPanel.tsx]
- "admin_crmpanel_tier_labels": "TIER_LABELS" | kind=code-symbol | source=src/components/admin/CrmPanel.tsx:L26 | neighbors=[CrmPanel.tsx]
- "admin_imageupload_imageuploadprops": "ImageUploadProps" | kind=code-symbol | source=src/components/admin/ImageUpload.tsx:L14 | neighbors=[ImageUpload.tsx]
- "admin_imageupload_uploadedimage": "UploadedImage" | kind=code-symbol | source=src/components/admin/ImageUpload.tsx:L9 | neighbors=[ImageUpload.tsx]
- "admin_layout_adminlayout": "AdminLayout()" | kind=code-symbol | source=src/app/(admin-panel)/admin/layout.tsx:L5 | neighbors=[layout.tsx]
- "admin_page_admindashboardpage": "AdminDashboardPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/page.tsx:L55 | neighbors=[page.tsx]
- "admin_page_ranges": "RANGES" | kind=code-symbol | source=src/app/(admin-panel)/admin/page.tsx:L47 | neighbors=[page.tsx]
- "admin_page_statuslabels": "statusLabels" | kind=code-symbol | source=src/app/(admin-panel)/admin/page.tsx:L37 | neighbors=[page.tsx]
- "admin_productform_option": "Option" | kind=code-symbol | source=src/components/admin/ProductForm.tsx:L53 | neighbors=[ProductForm.tsx]
- "admin_productform_productformdata": "ProductFormData" | kind=code-symbol | source=src/components/admin/ProductForm.tsx:L51 | neighbors=[ProductForm.tsx]
- "admin_productform_productformprops": "ProductFormProps" | kind=code-symbol | source=src/components/admin/ProductForm.tsx:L58 | neighbors=[ProductForm.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-017.json

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
