# Node Description Batch 14 of 30

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

- "home_featuredproducts_featuredproducts": "FeaturedProducts()" | kind=code-symbol | source=src/components/home/FeaturedProducts.tsx:L10 | neighbors=[FeaturedProducts.tsx, page.tsx] | lang=en
- "home_followus_followus": "FollowUs()" | kind=code-symbol | source=src/components/home/FollowUs.tsx:L10 | neighbors=[FollowUs.tsx, page.tsx] | lang=en
- "home_herobanner_herobanner": "HeroBanner()" | kind=code-symbol | source=src/components/home/HeroBanner.tsx:L20 | neighbors=[HeroBanner.tsx, page.tsx] | lang=en
- "home_linessection_linessection": "LinesSection()" | kind=code-symbol | source=src/components/home/LinesSection.tsx:L10 | neighbors=[LinesSection.tsx, page.tsx] | lang=en
- "home_quickaccesspanel_quickaccesspanel": "QuickAccessPanel()" | kind=code-symbol | source=src/components/home/QuickAccessPanel.tsx:L27 | neighbors=[QuickAccessPanel.tsx, page.tsx] | lang=en
- "home_reviewssection_reviewssection": "ReviewsSection()" | kind=code-symbol | source=src/components/home/ReviewsSection.tsx:L8 | neighbors=[ReviewsSection.tsx, page.tsx] | lang=en
- "home_statsband_statsband": "StatsBand()" | kind=code-symbol | source=src/components/home/StatsBand.tsx:L7 | neighbors=[StatsBand.tsx, page.tsx] | lang=en
- "home0201_document": "02.01 — Home y Categorias Visuales con Imagenes (nota referenciada, no incluida…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.01-Home y Categorías Visuales con Imágenes]].md | neighbors=[02.05 — Sistema de Categorias, Lineas y…, 01.02 — Estructura de Directorios Next.…] | lang=es
- "id_page_money": "money()" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/separations/[id]/page.tsx:L80 | neighbors=[page.tsx, SeparationDetailPage()] | lang=en
- "id_page_separationdetailpage": "SeparationDetailPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/separations/[id]/page.tsx:L84 | neighbors=[page.tsx, money()] | lang=en
- "inventory0503_preorder_engine": "Motor de Preventas (adelanto, saldo, ETA, semaforo de cobranzas, cancelacion)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/[[05.03-Control de Inventario y Preventas]].md | neighbors=[05.03 — Control de Inventario y Prevent…, 05.07 — Motor Avanzado de Separaciones,…] | lang=nl
- "layout_animatedthemetoggle_animatedthemetoggle": "AnimatedThemeToggle()" | kind=code-symbol | source=src/components/layout/AnimatedThemeToggle.tsx:L10 | neighbors=[AnimatedThemeToggle.tsx, Header.tsx] | lang=en
- "layout_announcementbar_announcementbar": "AnnouncementBar()" | kind=code-symbol | source=src/components/layout/AnnouncementBar.tsx:L6 | neighbors=[AnnouncementBar.tsx, layout.tsx] | lang=en
- "layout_bluetbubble_bluetbubble": "BluetBubble()" | kind=code-symbol | source=src/components/layout/BluetBubble.tsx:L9 | neighbors=[BluetBubble.tsx, page.tsx] | lang=en
- "layout_footer_footer": "Footer()" | kind=code-symbol | source=src/components/layout/Footer.tsx:L8 | neighbors=[Footer.tsx, layout.tsx] | lang=en
- "layout_header_header": "Header()" | kind=code-symbol | source=src/components/layout/Header.tsx:L38 | neighbors=[Header.tsx, layout.tsx] | lang=en
- "layout_mobilenav_mobilenav": "MobileNav()" | kind=code-symbol | source=src/components/layout/MobileNav.tsx:L21 | neighbors=[Header.tsx, MobileNav.tsx] | lang=en
- "layout_themetoggle_themetoggle": "ThemeToggle()" | kind=code-symbol | source=src/components/layout/ThemeToggle.tsx:L8 | neighbors=[AdminHeader.tsx, ThemeToggle.tsx] | lang=en
- "layout_topbar_topbar": "TopBar()" | kind=code-symbol | source=src/components/layout/TopBar.tsx:L10 | neighbors=[TopBar.tsx, layout.tsx] | lang=en
- "lib_acquisitions_acquisition_months": "ACQUISITION_MONTHS" | kind=code-symbol | source=src/lib/acquisitions.ts:L6 | neighbors=[AcquisitionForm.tsx, acquisitions.ts] | lang=en
- "lib_analytics_cashflowpoint": "CashFlowPoint" | kind=code-symbol | source=src/lib/analytics.ts:L78 | neighbors=[CashFlowChart.tsx, analytics.ts] | lang=en
- "lib_analytics_departmentstat": "DepartmentStat" | kind=code-symbol | source=src/lib/analytics.ts:L161 | neighbors=[PeruHeatMap.tsx, analytics.ts] | lang=en
- "lib_analytics_getcustomermap": "getCustomerMap()" | kind=code-symbol | source=src/lib/analytics.ts:L167 | neighbors=[page.tsx, analytics.ts] | lang=en
- "lib_analytics_getlogisticsdonut": "getLogisticsDonut()" | kind=code-symbol | source=src/lib/analytics.ts:L135 | neighbors=[page.tsx, analytics.ts] | lang=en
- "lib_analytics_logisticsslice": "LogisticsSlice" | kind=code-symbol | source=src/lib/analytics.ts:L129 | neighbors=[LogisticsDonut.tsx, analytics.ts] | lang=en
- "lib_analytics_timerange": "TimeRange" | kind=code-symbol | source=src/lib/analytics.ts:L6 | neighbors=[page.tsx, analytics.ts] | lang=en
- "lib_boleta_pdf_boletaorder": "BoletaOrder" | kind=code-symbol | source=src/lib/boleta-pdf.ts:L34 | neighbors=[boleta-pdf.ts, BoletaButton.tsx] | lang=en
- "lib_boleta_pdf_lasty": "lastY()" | kind=code-symbol | source=src/lib/boleta-pdf.ts:L52 | neighbors=[boleta-pdf.ts, downloadBoletaPdf()] | lang=en
- "lib_boleta_pdf_s": "S()" | kind=code-symbol | source=src/lib/boleta-pdf.ts:L13 | neighbors=[boleta-pdf.ts, downloadBoletaPdf()] | lang=en
- "lib_campaigns_iscampaignlive": "isCampaignLive()" | kind=code-symbol | source=src/lib/campaigns.ts:L20 | neighbors=[campaigns.ts, validateCoupon()] | lang=en
- "lib_email_client": "client()" | kind=code-symbol | source=src/lib/email.ts:L14 | neighbors=[email.ts, send()] | lang=en
- "lib_mercadopago_ismercadopagoenabled": "isMercadoPagoEnabled()" | kind=code-symbol | source=src/lib/mercadopago.ts:L6 | neighbors=[mercadopago.ts, route.ts] | lang=en
- "lib_peru_department_codes": "DEPARTMENT_CODES" | kind=code-symbol | source=src/lib/peru.ts:L38 | neighbors=[peru.ts, route.ts] | lang=en
- "lib_peru_departmentlabel": "departmentLabel()" | kind=code-symbol | source=src/lib/peru.ts:L43 | neighbors=[PeruHeatMap.tsx, peru.ts] | lang=en
- "lib_peru_peru_departments": "PERU_DEPARTMENTS" | kind=code-symbol | source=src/lib/peru.ts:L10 | neighbors=[peru.ts, ProfileSettingsForm.tsx] | lang=en
- "lib_reports_pdf_deliveriesreport": "DeliveriesReport" | kind=code-symbol | source=src/lib/reports-pdf.ts:L156 | neighbors=[reports-pdf.ts, page.tsx] | lang=en
- "lib_reports_pdf_userreportrow": "UserReportRow" | kind=code-symbol | source=src/lib/reports-pdf.ts:L67 | neighbors=[reports-pdf.ts, page.tsx] | lang=en
- "lib_separations_computesemaphore": "computeSemaphore()" | kind=code-symbol | source=src/lib/separations.ts:L53 | neighbors=[separations.ts, separations-server.ts] | lang=en
- "lib_separations_defaultduedate": "defaultDueDate()" | kind=code-symbol | source=src/lib/separations.ts:L14 | neighbors=[separations.ts, route.ts] | lang=en
- "lib_separations_validatepaymentamount": "validatePaymentAmount()" | kind=code-symbol | source=src/lib/separations.ts:L86 | neighbors=[separations.ts, route.ts] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-013.json

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
