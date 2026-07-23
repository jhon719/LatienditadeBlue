# Node Description Batch 24 of 30

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

- "logistics_page_batch": "Batch" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/page.tsx:L63 | neighbors=[page.tsx]
- "logistics_page_batchestab": "BatchesTab()" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/page.tsx:L221 | neighbors=[page.tsx]
- "logistics_page_logisticspage": "LogisticsPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/page.tsx:L375 | neighbors=[page.tsx]
- "logistics_page_money": "money()" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/page.tsx:L81 | neighbors=[page.tsx]
- "logistics_page_separation": "Separation" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/page.tsx:L49 | neighbors=[page.tsx]
- "logistics_page_separationstab": "SeparationsTab()" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/page.tsx:L86 | neighbors=[page.tsx]
- "logistics_page_status_label": "STATUS_LABEL" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/page.tsx:L74 | neighbors=[page.tsx]
- "manual_payments_page_manualpaymentspage": "ManualPaymentsPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/manual-payments/page.tsx:L57 | neighbors=[page.tsx]
- "manual_payments_page_posorder": "PosOrder" | kind=code-symbol | source=src/app/(admin-panel)/admin/manual-payments/page.tsx:L20 | neighbors=[page.tsx]
- "manual_payments_page_timeago": "timeAgo()" | kind=code-symbol | source=src/app/(admin-panel)/admin/manual-payments/page.tsx:L48 | neighbors=[page.tsx]
- "manualflow0602_backoffice_order": "Paso 1: Registro Manual back-office (Crear Pedido, valida stock, CRM autocomple…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/06-Flujos-De-Negocio-Y-Trazabilidad/[[06.02-Flujo de Compra Manual, POS y Boleta PDF]].md | neighbors=[06.02 — Flujo de Compra Manual, POS y B…]
- "manualflow0602_billing_architecture": "Arquitectura de Facturacion (Nubefact/Izipay, webhook, logs de error SUNAT)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/06-Flujos-De-Negocio-Y-Trazabilidad/[[06.02-Flujo de Compra Manual, POS y Boleta PDF]].md | neighbors=[06.02 — Flujo de Compra Manual, POS y B…]
- "manualflow0602_boleta_emission": "Paso 4: Emision Automatizada de Boleta Electronica (API facturador SUNAT, envio…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/06-Flujos-De-Negocio-Y-Trazabilidad/[[06.02-Flujo de Compra Manual, POS y Boleta PDF]].md | neighbors=[06.02 — Flujo de Compra Manual, POS y B…]
- "manualflow0602_proforma_pdf": "Paso 2: PDF de Proforma (link unico enviado por WhatsApp)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/06-Flujos-De-Negocio-Y-Trazabilidad/[[06.02-Flujo de Compra Manual, POS y Boleta PDF]].md | neighbors=[06.02 — Flujo de Compra Manual, POS y B…]
- "manualflow0602_root_duplicate_empty": "06.02-Flujo de Compra Manual, POS y Boleta PDF.md (archivo raiz duplicado, vaci…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/06.02-Flujo de Compra Manual, POS y Boleta PDF.md | neighbors=[06.02 — Flujo de Compra Manual, POS y B…]
- "manualflow0602_vs_automatic_table": "Tabla Comparativa Flujo Automatico (06.01) vs Manual (06.02)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/06-Flujos-De-Negocio-Y-Trazabilidad/[[06.02-Flujo de Compra Manual, POS y Boleta PDF]].md | neighbors=[06.02 — Flujo de Compra Manual, POS y B…]
- "mercadopago_route_get": "GET()" | kind=code-symbol | source=src/app/api/payments/mercadopago/route.ts:L8 | neighbors=[route.ts]
- "mercadopago_route_post": "POST()" | kind=code-symbol | source=src/app/api/webhook/mercadopago/route.ts:L6 | neighbors=[route.ts]
- "mercadopago_route_schema": "schema" | kind=code-symbol | source=src/app/api/payments/mercadopago/route.ts:L12 | neighbors=[route.ts]
- "mercadopago0301_flow_e2e": "Flujo E2E de Pago (Checkout -> Preference -> Pago -> Webhook -> Estado PAID/FAI…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/03-Sistema-Pagos-Y-Checkouts/[[03.01-Pasarela Automatizada Mercado Pago]].md | neighbors=[03.01 — Pasarela Automatizada Mercado P…]
- "mercadopago0301_ux_notes": "UX del Boton de Pago (loading Bluet, Checkout Pro / Brick embebido)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/03-Sistema-Pagos-Y-Checkouts/[[03.01-Pasarela Automatizada Mercado Pago]].md | neighbors=[03.01 — Pasarela Automatizada Mercado P…]
- "new_page_batchopt": "BatchOpt" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/separations/new/page.tsx:L37 | neighbors=[page.tsx]
- "new_page_lineitem": "LineItem" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/batches/new/page.tsx:L31 | neighbors=[page.tsx]
- "new_page_newacquisitionpage": "NewAcquisitionPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/acquisitions/new/page.tsx:L5 | neighbors=[page.tsx]
- "new_page_newbatchpage": "NewBatchPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/batches/new/page.tsx:L37 | neighbors=[page.tsx]
- "new_page_newcampaigncontent": "NewCampaignContent()" | kind=code-symbol | source=src/app/(admin-panel)/admin/campaigns/new/page.tsx:L14 | neighbors=[page.tsx]
- "new_page_newcampaignpage": "NewCampaignPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/campaigns/new/page.tsx:L30 | neighbors=[page.tsx]
- "new_page_newcatalogentrycontent": "NewCatalogEntryContent()" | kind=code-symbol | source=src/app/(admin-panel)/admin/categories/new/page.tsx:L10 | neighbors=[page.tsx]
- "new_page_newcategorypage": "NewCategoryPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/categories/new/page.tsx:L23 | neighbors=[page.tsx]
- "new_page_newproductpage": "NewProductPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/products/new/page.tsx:L5 | neighbors=[page.tsx]
- "new_page_newseparationpage": "NewSeparationPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/separations/new/page.tsx:L45 | neighbors=[page.tsx]
- "new_page_newshalomcontactpage": "NewShalomContactPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/shalom/new/page.tsx:L5 | neighbors=[page.tsx]
- "new_page_productopt": "ProductOpt" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/separations/new/page.tsx:L31 | neighbors=[page.tsx]
- "new_page_useropt": "UserOpt" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/separations/new/page.tsx:L26 | neighbors=[page.tsx]
- "next_config_csp": "csp" | kind=code-symbol | source=next.config.ts:L10 | neighbors=[next.config.ts]
- "next_config_nextconfig": "nextConfig" | kind=code-symbol | source=next.config.ts:L38 | neighbors=[next.config.ts]
- "next_config_securityheaders": "securityHeaders" | kind=code-symbol | source=next.config.ts:L23 | neighbors=[next.config.ts]
- "orders_page_adminorder": "AdminOrder" | kind=code-symbol | source=src/app/(admin-panel)/admin/orders/page.tsx:L27 | neighbors=[page.tsx]
- "orders_page_adminorderspage": "AdminOrdersPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/orders/page.tsx:L130 | neighbors=[page.tsx]
- "orders_page_orderspage": "OrdersPage()" | kind=code-symbol | source=src/app/(shop)/profile/orders/page.tsx:L40 | neighbors=[page.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-023.json

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
