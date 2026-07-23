# Node Description Batch 20 of 30

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

- "categories_route_categoryschema": "categorySchema" | kind=code-symbol | source=src/app/api/categories/route.ts:L34 | neighbors=[route.ts] | lang=en
- "categories_route_get": "GET()" | kind=code-symbol | source=src/app/api/categories/route.ts:L8 | neighbors=[route.ts] | lang=en
- "categories_route_post": "POST()" | kind=code-symbol | source=src/app/api/categories/route.ts:L42 | neighbors=[route.ts] | lang=en
- "categorieslines0205_admin_workflow": "Flujo Admin CRUD de Categorias (generacion de slug, toggles isActive/isTrending)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.05-Sistema de Categorias, Lineas y Marcas Dinamicas]].md | neighbors=[02.05 — Sistema de Categorias, Lineas y…] | lang=nl
- "change_password_route_post": "POST()" | kind=code-symbol | source=src/app/api/auth/change-password/route.ts:L14 | neighbors=[route.ts] | lang=en
- "change_password_route_schema": "schema" | kind=code-symbol | source=src/app/api/auth/change-password/route.ts:L7 | neighbors=[route.ts] | lang=en
- "charts_cashflowchart_cashflowtooltip": "CashFlowTooltip()" | kind=code-symbol | source=src/components/admin/charts/CashFlowChart.tsx:L25 | neighbors=[CashFlowChart.tsx] | lang=en
- "charts_cashflowchart_tooltippayload": "TooltipPayload" | kind=code-symbol | source=src/components/admin/charts/CashFlowChart.tsx:L20 | neighbors=[CashFlowChart.tsx] | lang=en
- "charts_logisticsdonut_donuttooltip": "DonutTooltip()" | kind=code-symbol | source=src/components/admin/charts/LogisticsDonut.tsx:L24 | neighbors=[LogisticsDonut.tsx] | lang=en
- "charts_logisticsdonut_donuttooltippayload": "DonutTooltipPayload" | kind=code-symbol | source=src/components/admin/charts/LogisticsDonut.tsx:L20 | neighbors=[LogisticsDonut.tsx] | lang=en
- "charts_logisticsdonut_slice_style": "SLICE_STYLE" | kind=code-symbol | source=src/components/admin/charts/LogisticsDonut.tsx:L10 | neighbors=[LogisticsDonut.tsx] | lang=en
- "charts_peruheatmap_colorfor": "colorFor()" | kind=code-symbol | source=src/components/admin/charts/PeruHeatMap.tsx:L24 | neighbors=[PeruHeatMap.tsx] | lang=en
- "charts_peruheatmap_deptfeatureprops": "DeptFeatureProps" | kind=code-symbol | source=src/components/admin/charts/PeruHeatMap.tsx:L18 | neighbors=[PeruHeatMap.tsx] | lang=en
- "charts_peruheatmap_geo": "geo" | kind=code-symbol | source=src/components/admin/charts/PeruHeatMap.tsx:L22 | neighbors=[PeruHeatMap.tsx] | lang=en
- "charts_peruheatmap_sequential_blue": "SEQUENTIAL_BLUE" | kind=code-symbol | source=src/components/admin/charts/PeruHeatMap.tsx:L15 | neighbors=[PeruHeatMap.tsx] | lang=en
- "checkout_couponinput_couponinputprops": "CouponInputProps" | kind=code-symbol | source=src/components/checkout/CouponInput.tsx:L13 | neighbors=[CouponInput.tsx] | lang=en
- "checkout_manualpaymentsection_manualpaymentsectionprops": "ManualPaymentSectionProps" | kind=code-symbol | source=src/components/checkout/ManualPaymentSection.tsx:L9 | neighbors=[ManualPaymentSection.tsx] | lang=en
- "checkout_ordersummary_ordersummaryprops": "OrderSummaryProps" | kind=code-symbol | source=src/components/checkout/OrderSummary.tsx:L9 | neighbors=[OrderSummary.tsx] | lang=en
- "checkout_page_checkoutformdata": "CheckoutFormData" | kind=code-symbol | source=src/app/(shop)/checkout/page.tsx:L77 | neighbors=[page.tsx] | lang=en
- "checkout_page_checkoutpage": "CheckoutPage()" | kind=code-symbol | source=src/app/(shop)/checkout/page.tsx:L79 | neighbors=[page.tsx] | lang=en
- "checkout_page_checkoutschema": "checkoutSchema" | kind=code-symbol | source=src/app/(shop)/checkout/page.tsx:L55 | neighbors=[page.tsx] | lang=en
- "checkout_page_shipping_options": "SHIPPING_OPTIONS" | kind=code-symbol | source=src/app/(shop)/checkout/page.tsx:L31 | neighbors=[page.tsx] | lang=en
- "checkoutux06_stub_document": "06 — Experiencia de Usuario y Checkout (seccion padre referenciada, sin archivo…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/06-Flujos-De-Negocio-Y-Trazabilidad/ | neighbors=[06.02 — Flujo de Compra Manual, POS y B…] | lang=en
- "claudemd_component_organization": "Organizacion de Componentes (src/components/)" | kind=entity | source=CLAUDE.md | neighbors=[CLAUDE.md — Guia del Proyecto] | lang=nl
- "claudemd_data_layer": "Capa de Datos (schema.prisma, seed.ts, prisma.ts, transformers.ts, types/index.…" | kind=entity | source=CLAUDE.md | neighbors=[CLAUDE.md — Guia del Proyecto] | lang=nl
- "claudemd_graphify": "Integracion graphify (grafo de conocimiento del repo)" | kind=entity | source=CLAUDE.md | neighbors=[CLAUDE.md — Guia del Proyecto] | lang=en
- "claudemd_styling_system": "Styling System (Tailwind v4, paleta hex, Bebas Neue/Montserrat)" | kind=entity | source=CLAUDE.md | neighbors=[CLAUDE.md — Guia del Proyecto] | lang=en
- "code_admin_products_new_page": "src/app/(admin-panel)/admin/products/new/page.tsx" | kind=code-symbol | source=src/app/(admin-panel)/admin/products/new/page.tsx | neighbors=[Hallazgo: creacion de producto en panel…] | lang=en
- "code_cart_store_ts": "cart-store.ts (referenciado, detallado en otro chunk)" | kind=code-symbol | source=src/stores/cart-store.ts | neighbors=[Hallazgo: carrito de compras falla al a…] | lang=en
- "code_middleware_ts": "src/middleware.ts" | kind=code-symbol | source=src/middleware.ts | neighbors=[Hallazgo critico: RBAC no aplicado, cli…] | lang=en
- "code_pricing_ts": "src/lib/pricing.ts" | kind=code-symbol | source=src/lib/pricing.ts | neighbors=[Bundles 'Combina y Ahorra' (referenciad…] | lang=en
- "code_productcard_component": "ProductCard component" | kind=code-symbol | source=src/components/products/ProductCard.tsx | neighbors=[Hallazgo: errores de manejo de imagenes…] | lang=en
- "code_productgallery_component": "ProductGallery component" | kind=code-symbol | source=src/components/products/ProductGallery.tsx | neighbors=[Hallazgo: errores de manejo de imagenes…] | lang=en
- "common_countup_countupprops": "CountUpProps" | kind=code-symbol | source=src/components/common/CountUp.tsx:L7 | neighbors=[CountUp.tsx] | lang=en
- "common_countup_easeoutcubic": "easeOutCubic()" | kind=code-symbol | source=src/components/common/CountUp.tsx:L16 | neighbors=[CountUp.tsx] | lang=en
- "common_imagelightbox_imagelightboxprops": "ImageLightboxProps" | kind=code-symbol | source=src/components/common/ImageLightbox.tsx:L13 | neighbors=[ImageLightbox.tsx] | lang=en
- "common_useravatar_useravatarprops": "UserAvatarProps" | kind=code-symbol | source=src/components/common/UserAvatar.tsx:L5 | neighbors=[UserAvatar.tsx] | lang=en
- "deliveries_route_get": "GET()" | kind=code-symbol | source=src/app/api/admin/reports/deliveries/route.ts:L7 | neighbors=[route.ts] | lang=en
- "deploy0801_dotenv_strategy": "Modelo DotEnv (.env.local vs Vercel Environment Variables, misma estructura en …" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/08-Plan-de-Implementacion-y-Despliegue/[[08.01-Estrategia-de-Despliegue-y-Configuracion-de-Entornos]].md | neighbors=[08.01 — Estrategia de Despliegue y Conf…] | lang=es
- "deploy0801_preflight_checklist": "Checklist Pre-flight (prisma validate, check-env.js, logging centralizado)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/08-Plan-de-Implementacion-y-Despliegue/[[08.01-Estrategia-de-Despliegue-y-Configuracion-de-Entornos]].md | neighbors=[08.01 — Estrategia de Despliegue y Conf…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-019.json

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
