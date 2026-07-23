# Node Description Batch 21 of 30

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

- "deployindex_stub_document": "08 — Plan de Implementacion y Despliegue (seccion padre referenciada)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/08-Plan-de-Implementacion-y-Despliegue/ | neighbors=[08.01 — Estrategia de Despliegue y Conf…] | lang=en
- "design0104_stub_document": "01.04 — Libreria de Animaciones y Diseno Visual (nota referenciada, no incluida…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.04-Librería de Animaciones y Diseño Visual]].md | neighbors=[02.02 — Galeria Interactiva y Detalle d…] | lang=en
- "dirstruct0102_api_routes": "Capa de API Routes (src/app/api/)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.02-Estructura de Directorios Next.js]].md | neighbors=[01.02 — Estructura de Directorios Next.…] | lang=nl
- "dirstruct0102_route_groups": "Grupos de Rutas (shop) y (admin-panel) — layouts aislados" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.02-Estructura de Directorios Next.js]].md | neighbors=[01.02 — Estructura de Directorios Next.…] | lang=en
- "dirstruct0102_state_and_lib": "Capa de Estado y Logica (src/stores/ y src/lib/)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.02-Estructura de Directorios Next.js]].md | neighbors=[01.02 — Estructura de Directorios Next.…] | lang=es
- "edit_page_editcampaignpage": "EditCampaignPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/campaigns/[type]/[id]/edit/page.tsx:L16 | neighbors=[page.tsx] | lang=en
- "edit_page_editcatalogentrypage": "EditCatalogEntryPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/categories/[type]/[id]/edit/page.tsx:L21 | neighbors=[page.tsx] | lang=en
- "edit_page_editproductpage": "EditProductPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/products/[id]/edit/page.tsx:L8 | neighbors=[page.tsx] | lang=en
- "edit_page_endpoint": "ENDPOINT" | kind=code-symbol | source=src/app/(admin-panel)/admin/categories/[type]/[id]/edit/page.tsx:L15 | neighbors=[page.tsx] | lang=en
- "eslint_config_eslintconfig": "eslintConfig" | kind=code-symbol | source=eslint.config.mjs:L5 | neighbors=[eslint.config.mjs] | lang=en
- "forced_reset_page_forcedresetpage": "ForcedResetPage()" | kind=code-symbol | source=src/app/(auth)/forced-reset/page.tsx:L6 | neighbors=[page.tsx] | lang=en
- "gallery0202_block1_gallery": "Bloque 1: <ProductGallery/> (zoom hover, carrusel miniaturas, next/image priori…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.02-Galeria Interactiva y Detalle de Producto]].md | neighbors=[02.02 — Galeria Interactiva y Detalle d…] | lang=en
- "gallery0202_block5_qa": "Bloque 5: <QuestionsAndAnswers/> — acordeon + CTA WhatsApp con Bluet" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.02-Galeria Interactiva y Detalle de Producto]].md | neighbors=[02.02 — Galeria Interactiva y Detalle d…] | lang=en
- "gallery0202_layout_blocks": "Arquitectura de 5 Bloques de la Interfaz (Layout)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.02-Galeria Interactiva y Detalle de Producto]].md | neighbors=[02.02 — Galeria Interactiva y Detalle d…] | lang=nl
- "home_benefitsmarquee_benefits": "BENEFITS" | kind=code-symbol | source=src/components/home/BenefitsMarquee.tsx:L14 | neighbors=[BenefitsMarquee.tsx] | lang=en
- "home_quickaccesspanel_quicklinks": "quickLinks" | kind=code-symbol | source=src/components/home/QuickAccessPanel.tsx:L9 | neighbors=[QuickAccessPanel.tsx] | lang=en
- "hooks_use_coarse_pointer_getserversnapshot": "getServerSnapshot()" | kind=code-symbol | source=src/hooks/use-coarse-pointer.ts:L16 | neighbors=[use-coarse-pointer.ts] | lang=en
- "hooks_use_coarse_pointer_getsnapshot": "getSnapshot()" | kind=code-symbol | source=src/hooks/use-coarse-pointer.ts:L15 | neighbors=[use-coarse-pointer.ts] | lang=en
- "hooks_use_coarse_pointer_subscribe": "subscribe()" | kind=code-symbol | source=src/hooks/use-coarse-pointer.ts:L9 | neighbors=[use-coarse-pointer.ts] | lang=en
- "id_page_adminorderdetailpage": "AdminOrderDetailPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/orders/[id]/page.tsx:L103 | neighbors=[page.tsx] | lang=en
- "id_page_batch": "Batch" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/batches/[id]/page.tsx:L20 | neighbors=[page.tsx] | lang=en
- "id_page_customerprofilepage": "CustomerProfilePage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/users/[id]/page.tsx:L31 | neighbors=[page.tsx] | lang=en
- "id_page_editacquisitionpage": "EditAcquisitionPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/acquisitions/[id]/page.tsx:L12 | neighbors=[page.tsx] | lang=en
- "id_page_editbatchpage": "EditBatchPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/batches/[id]/page.tsx:L31 | neighbors=[page.tsx] | lang=en
- "id_page_editshalomcontactpage": "EditShalomContactPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/shalom/[id]/page.tsx:L12 | neighbors=[page.tsx] | lang=en
- "id_page_orderdetail": "OrderDetail" | kind=code-symbol | source=src/app/(admin-panel)/admin/orders/[id]/page.tsx:L39 | neighbors=[page.tsx] | lang=en
- "id_page_pay_badge": "PAY_BADGE" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/separations/[id]/page.tsx:L74 | neighbors=[page.tsx] | lang=en
- "id_page_payment": "Payment" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/separations/[id]/page.tsx:L41 | neighbors=[page.tsx] | lang=en
- "id_page_productpage": "ProductPage()" | kind=code-symbol | source=src/app/(shop)/products/[id]/page.tsx:L27 | neighbors=[page.tsx] | lang=en
- "id_page_productpageprops": "ProductPageProps" | kind=code-symbol | source=src/app/(shop)/products/[id]/page.tsx:L23 | neighbors=[page.tsx] | lang=en
- "id_page_separation": "Separation" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/separations/[id]/page.tsx:L51 | neighbors=[page.tsx] | lang=en
- "id_page_shippinglabels": "shippingLabels" | kind=code-symbol | source=src/app/(admin-panel)/admin/orders/[id]/page.tsx:L97 | neighbors=[page.tsx] | lang=en
- "id_page_status_badge": "STATUS_BADGE" | kind=code-symbol | source=src/app/(admin-panel)/admin/orders/[id]/page.tsx:L88 | neighbors=[page.tsx] | lang=en
- "id_page_status_label": "STATUS_LABEL" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/separations/[id]/page.tsx:L67 | neighbors=[page.tsx] | lang=en
- "id_page_status_options": "STATUS_OPTIONS" | kind=code-symbol | source=src/app/(admin-panel)/admin/orders/[id]/page.tsx:L79 | neighbors=[page.tsx] | lang=en
- "id_page_statuslabels": "statusLabels" | kind=code-symbol | source=src/app/(admin-panel)/admin/users/[id]/page.tsx:L21 | neighbors=[page.tsx] | lang=en
- "id_route_actionschema": "actionSchema" | kind=code-symbol | source=src/app/api/admin/proofs/[id]/route.ts:L9 | neighbors=[route.ts] | lang=en
- "id_route_crmschema": "crmSchema" | kind=code-symbol | source=src/app/api/admin/users/[id]/route.ts:L9 | neighbors=[route.ts] | lang=en
- "id_route_delete": "DELETE()" | kind=code-symbol | source=src/app/api/products/[id]/route.ts:L116 | neighbors=[route.ts] | lang=en
- "id_route_get": "GET()" | kind=code-symbol | source=src/app/api/products/[id]/route.ts:L10 | neighbors=[route.ts] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-020.json

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
