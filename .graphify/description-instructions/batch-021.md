# Node Description Batch 22 of 30

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

- "id_route_params": "Params" | kind=code-symbol | source=src/app/api/products/[id]/route.ts:L8 | neighbors=[route.ts]
- "id_route_patch": "PATCH()" | kind=code-symbol | source=src/app/api/lines/[id]/route.ts:L33 | neighbors=[route.ts]
- "id_route_post": "POST()" | kind=code-symbol | source=src/app/api/admin/proofs/[id]/route.ts:L16 | neighbors=[route.ts]
- "id_route_put": "PUT()" | kind=code-symbol | source=src/app/api/products/[id]/route.ts:L67 | neighbors=[route.ts]
- "id_route_schema": "schema" | kind=code-symbol | source=src/app/api/admin/shalom-contacts/[id]/route.ts:L6 | neighbors=[route.ts]
- "id_route_stock_held": "STOCK_HELD" | kind=code-symbol | source=src/app/api/admin/orders/[id]/route.ts:L12 | neighbors=[route.ts]
- "id_route_updateproductschema": "updateProductSchema" | kind=code-symbol | source=src/app/api/products/[id]/route.ts:L49 | neighbors=[route.ts]
- "id_route_updateschema": "updateSchema" | kind=code-symbol | source=src/app/api/lines/[id]/route.ts:L25 | neighbors=[route.ts]
- "inventory0503_dual_stock": "Visor Dual de Stock (Fisico inmediato vs Transito/Lotes Aduanas)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/[[05.03-Control de Inventario y Preventas]].md | neighbors=[05.03 — Control de Inventario y Prevent…]
- "inventory0503_low_stock_alerts": "Alertas Automaticas de Low Stock" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/[[05.03-Control de Inventario y Preventas]].md | neighbors=[05.03 — Control de Inventario y Prevent…]
- "inventory0503_variants_sku": "Gestion de Variantes de Producto (Nuevo/Sellado, Loose, Caja Danada) con SKU un…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/[[05.03-Control de Inventario y Preventas]].md | neighbors=[05.03 — Control de Inventario y Prevent…]
- "layout_header_getclientsnapshot": "getClientSnapshot()" | kind=code-symbol | source=src/components/layout/Header.tsx:L35 | neighbors=[Header.tsx]
- "layout_header_getserversnapshot": "getServerSnapshot()" | kind=code-symbol | source=src/components/layout/Header.tsx:L36 | neighbors=[Header.tsx]
- "layout_header_navlinks": "navLinks" | kind=code-symbol | source=src/components/layout/Header.tsx:L25 | neighbors=[Header.tsx]
- "layout_header_subscribetoclient": "subscribeToClient()" | kind=code-symbol | source=src/components/layout/Header.tsx:L34 | neighbors=[Header.tsx]
- "layout_mobilenav_links": "links" | kind=code-symbol | source=src/components/layout/MobileNav.tsx:L11 | neighbors=[MobileNav.tsx]
- "layout_topbar_benefits": "benefits" | kind=code-symbol | source=src/components/layout/TopBar.tsx:L3 | neighbors=[TopBar.tsx]
- "legal_legalpage_legalpageprops": "LegalPageProps" | kind=code-symbol | source=src/components/legal/LegalPage.tsx:L8 | neighbors=[LegalPage.tsx]
- "legal_legalpage_legalsection": "LegalSection" | kind=code-symbol | source=src/components/legal/LegalPage.tsx:L3 | neighbors=[LegalPage.tsx]
- "lib_acquisitions_acquisitionderived": "AcquisitionDerived" | kind=code-symbol | source=src/lib/acquisitions.ts:L45 | neighbors=[acquisitions.ts]
- "lib_acquisitions_acquisitioninputs": "AcquisitionInputs" | kind=code-symbol | source=src/lib/acquisitions.ts:L35 | neighbors=[acquisitions.ts]
- "lib_analytics_dashboardkpis": "DashboardKpis" | kind=code-symbol | source=src/lib/analytics.ts:L29 | neighbors=[analytics.ts]
- "lib_analytics_paid_statuses": "PAID_STATUSES" | kind=code-symbol | source=src/lib/analytics.ts:L25 | neighbors=[analytics.ts]
- "lib_auth_generateusername": "generateUsername()" | kind=code-symbol | source=src/lib/auth.ts:L14 | neighbors=[auth.ts]
- "lib_auth_handlers_signin_signout_auth": "{ handlers, signIn, signOut, auth }" | kind=code-symbol | source=src/lib/auth.ts:L88 | neighbors=[auth.ts]
- "lib_auth_providers": "providers" | kind=code-symbol | source=src/lib/auth.ts:L30 | neighbors=[auth.ts]
- "lib_boleta_pdf_blue": "BLUE" | kind=code-symbol | source=src/lib/boleta-pdf.ts:L9 | neighbors=[boleta-pdf.ts]
- "lib_boleta_pdf_gray": "GRAY" | kind=code-symbol | source=src/lib/boleta-pdf.ts:L11 | neighbors=[boleta-pdf.ts]
- "lib_boleta_pdf_navy": "NAVY" | kind=code-symbol | source=src/lib/boleta-pdf.ts:L8 | neighbors=[boleta-pdf.ts]
- "lib_boleta_pdf_payment_labels": "PAYMENT_LABELS" | kind=code-symbol | source=src/lib/boleta-pdf.ts:L21 | neighbors=[boleta-pdf.ts]
- "lib_boleta_pdf_rgb": "RGB" | kind=code-symbol | source=src/lib/boleta-pdf.ts:L7 | neighbors=[boleta-pdf.ts]
- "lib_boleta_pdf_shipping_labels": "SHIPPING_LABELS" | kind=code-symbol | source=src/lib/boleta-pdf.ts:L16 | neighbors=[boleta-pdf.ts]
- "lib_boleta_pdf_status_labels": "STATUS_LABELS" | kind=code-symbol | source=src/lib/boleta-pdf.ts:L25 | neighbors=[boleta-pdf.ts]
- "lib_boleta_pdf_yellow": "YELLOW" | kind=code-symbol | source=src/lib/boleta-pdf.ts:L10 | neighbors=[boleta-pdf.ts]
- "lib_campaign_admin_announcementschema": "announcementSchema" | kind=code-symbol | source=src/lib/campaign-admin.ts:L25 | neighbors=[campaign-admin.ts]
- "lib_campaign_admin_bannerschema": "bannerSchema" | kind=code-symbol | source=src/lib/campaign-admin.ts:L14 | neighbors=[campaign-admin.ts]
- "lib_campaign_admin_campaigntype": "CampaignType" | kind=code-symbol | source=src/lib/campaign-admin.ts:L74 | neighbors=[campaign-admin.ts]
- "lib_campaign_admin_couponschema": "couponSchema" | kind=code-symbol | source=src/lib/campaign-admin.ts:L33 | neighbors=[campaign-admin.ts]
- "lib_campaign_admin_discountruleschema": "discountRuleSchema" | kind=code-symbol | source=src/lib/campaign-admin.ts:L48 | neighbors=[campaign-admin.ts]
- "lib_campaign_admin_scheduling": "scheduling" | kind=code-symbol | source=src/lib/campaign-admin.ts:L8 | neighbors=[campaign-admin.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-021.json

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
