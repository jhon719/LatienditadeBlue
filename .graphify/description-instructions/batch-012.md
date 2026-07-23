# Node Description Batch 13 of 30

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

- "admin_campaignform_campaigndata": "CampaignData" | kind=code-symbol | source=src/components/admin/CampaignForm.tsx:L45 | neighbors=[CampaignForm.tsx, page.tsx] | lang=en
- "admin_campaignform_numstr": "numStr()" | kind=code-symbol | source=src/components/admin/CampaignForm.tsx:L55 | neighbors=[CampaignForm.tsx, CampaignForm()] | lang=en
- "admin_campaignform_tolocalinput": "toLocalInput()" | kind=code-symbol | source=src/components/admin/CampaignForm.tsx:L59 | neighbors=[CampaignForm.tsx, CampaignForm()] | lang=en
- "admin_catalogentryform_catalogentrydata": "CatalogEntryData" | kind=code-symbol | source=src/components/admin/CatalogEntryForm.tsx:L57 | neighbors=[CatalogEntryForm.tsx, page.tsx] | lang=en
- "admin_crmpanel_crmpanel": "CrmPanel()" | kind=code-symbol | source=src/components/admin/CrmPanel.tsx:L42 | neighbors=[CrmPanel.tsx, page.tsx] | lang=en
- "admin_shalomcontactform_shalomcontactdata": "ShalomContactData" | kind=code-symbol | source=src/components/admin/ShalomContactForm.tsx:L19 | neighbors=[ShalomContactForm.tsx, page.tsx] | lang=en
- "admin_shalomdirectorytab_shalomdirectorytab": "ShalomDirectoryTab()" | kind=code-symbol | source=src/components/admin/ShalomDirectoryTab.tsx:L44 | neighbors=[ShalomDirectoryTab.tsx, page.tsx] | lang=en
- "auth_forcedresetform_forcedresetform": "ForcedResetForm()" | kind=code-symbol | source=src/components/auth/ForcedResetForm.tsx:L29 | neighbors=[ForcedResetForm.tsx, page.tsx] | lang=en
- "auth_layout": "layout.tsx" | kind=code-symbol | source=src/app/(auth)/layout.tsx:L1 | neighbors=[AuthLayout(), 2982ca1 iniciar proyecto] | lang=en
- "auth_loginform_loginform": "LoginForm()" | kind=code-symbol | source=src/components/auth/LoginForm.tsx:L23 | neighbors=[LoginForm.tsx, page.tsx] | lang=en
- "auth_registerform_registerform": "RegisterForm()" | kind=code-symbol | source=src/components/auth/RegisterForm.tsx:L42 | neighbors=[RegisterForm.tsx, page.tsx] | lang=en
- "cart_cartitem_cartitem": "CartItem()" | kind=code-symbol | source=src/components/cart/CartItem.tsx:L15 | neighbors=[CartItem.tsx, page.tsx] | lang=en
- "cart_cartsummary_cartsummary": "CartSummary()" | kind=code-symbol | source=src/components/cart/CartSummary.tsx:L14 | neighbors=[CartSummary.tsx, page.tsx] | lang=en
- "categorieslines0205_asset_convention": "Mapeo Fisico de Imagenes por slug (public/imagenes/Lista de Animes, Lineas de f…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.05-Sistema de Categorias, Lineas y Marcas Dinamicas]].md | neighbors=[02.05 — Sistema de Categorias, Lineas y…, Assets Locales (public/Imagenes, no ren…] | lang=nl
- "charts_cashflowchart_cashflowchart": "CashFlowChart()" | kind=code-symbol | source=src/components/admin/charts/CashFlowChart.tsx:L57 | neighbors=[page.tsx, CashFlowChart.tsx] | lang=en
- "charts_logisticsdonut_logisticsdonut": "LogisticsDonut()" | kind=code-symbol | source=src/components/admin/charts/LogisticsDonut.tsx:L47 | neighbors=[page.tsx, LogisticsDonut.tsx] | lang=en
- "charts_peruheatmap_peruheatmap": "PeruHeatMap()" | kind=code-symbol | source=src/components/admin/charts/PeruHeatMap.tsx:L38 | neighbors=[page.tsx, PeruHeatMap.tsx] | lang=en
- "checkout_couponinput_appliedcoupon": "AppliedCoupon" | kind=code-symbol | source=src/components/checkout/CouponInput.tsx:L8 | neighbors=[CouponInput.tsx, page.tsx] | lang=en
- "checkout_couponinput_couponinput": "CouponInput()" | kind=code-symbol | source=src/components/checkout/CouponInput.tsx:L21 | neighbors=[CouponInput.tsx, page.tsx] | lang=en
- "checkout_ordersummary_ordersummary": "OrderSummary()" | kind=code-symbol | source=src/components/checkout/OrderSummary.tsx:L17 | neighbors=[OrderSummary.tsx, page.tsx] | lang=en
- "claudemd_overview": "Project Overview: e-commerce peruano de figuras coleccionables" | kind=entity | source=CLAUDE.md | neighbors=[Boveda de Obsidian (docs/Boveda-Proyect…, CLAUDE.md — Guia del Proyecto] | lang=nl
- "claudemd_rule_no_modals": "Regla: no usar Modales, usar paginas dedicadas para formularios" | kind=entity | source=CLAUDE.md | neighbors=[CLAUDE.md — Guia del Proyecto, Convenciones (Sin Server Actions, RHF+Z…] | lang=en
- "claudemd_rule_zustand": "Regla: manejo de estado global con Zustand" | kind=entity | source=CLAUDE.md | neighbors=[CLAUDE.md — Guia del Proyecto, Convenciones (Sin Server Actions, RHF+Z…] | lang=en
- "common_marquee_marquee": "Marquee()" | kind=code-symbol | source=src/components/common/Marquee.tsx:L5 | neighbors=[Marquee.tsx, BenefitsMarquee.tsx] | lang=en
- "common_socialicon_social_bg": "SOCIAL_BG" | kind=code-symbol | source=src/components/common/SocialIcon.tsx:L19 | neighbors=[SocialIcon.tsx, FollowUs.tsx] | lang=en
- "crm0504_stub_document": "05.04 (referenciada como 'Logistica Interna y Preventas') — nota real es 'Gesti…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/[[05.04-Gestión de Notificaciones, CRM y Correos Transaccionales]].md | neighbors=[05.03 — Control de Inventario y Prevent…, 05.07 — Motor Avanzado de Separaciones,…] | lang=es
- "crmusers0502_stub_document": "05.02 (referenciada como 'Gestion de Clientes (CRM) y Usuarios') — nota real 05…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/ | neighbors=[06.02 — Flujo de Compra Manual, POS y B…, 07.03 — Politica de Privacidad y Protec…] | lang=es
- "dashboard0501_document": "05.01 — Dashboard, Analitica y UI/UX (nota referenciada, no incluida en este ch…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/[[05.01-Dashboard, Analítica y UI_UX]].md | neighbors=[08.01 — Estrategia de Despliegue y Conf…, 05.03 — Control de Inventario y Prevent…] | lang=es
- "datamodel_api_routes": "Estructura de API Routes (auth, users, categories, brands, products, addresses,…" | kind=entity | source=docs/DATA-MODEL.md | neighbors=[Modelo de Datos - BasicTechShop (refere…, API Routes (listado detallado con metod…] | lang=nl
- "datamodel_brand": "Brand (Marcas)" | kind=entity | source=docs/DATA-MODEL.md | neighbors=[Modelo de Datos - BasicTechShop (refere…, Product (Productos)] | lang=en
- "datamodel_category": "Category (Categorias)" | kind=entity | source=docs/DATA-MODEL.md | neighbors=[Modelo de Datos - BasicTechShop (refere…, Product (Productos)] | lang=en
- "datamodel_order_status": "Estados de Pedido (PENDING→CONFIRMED→PROCESSING→SHIPPED→DELIVERED / CANCELLED)" | kind=entity | source=docs/DATA-MODEL.md | neighbors=[Order (Pedidos), Modelo de Datos - BasicTechShop (refere…] | lang=nl
- "dbmodel0103_antifraud_traceability": "Trazabilidad Antifraude (processCode unico + relacion obligatoria Order-Payment…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.03-Modelo de Base de Datos Prisma SQL]].md | neighbors=[Auth y Seguridad (NextAuth v5, RBAC, mu…, 01.03 — Modelo de Base de Datos Prisma …] | lang=en
- "deploy0801_db_config_neon": "Configuracion Neon + Prisma (DATABASE_URL local vs Neon, DATABASE_URL_NON_POOLI…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/08-Plan-de-Implementacion-y-Despliegue/[[08.01-Estrategia-de-Despliegue-y-Configuracion-de-Entornos]].md | neighbors=[01.03 — Modelo de Base de Datos Prisma …, 08.01 — Estrategia de Despliegue y Conf…] | lang=it
- "eslint_config": "eslint.config.mjs" | kind=code-symbol | source=eslint.config.mjs:L1 | neighbors=[2982ca1 iniciar proyecto, eslintConfig] | lang=en
- "gallery0202_block4_reviews": "Bloque 4: <RatingsAndReviews/> — promedio, distribucion, badge Compra Verificada" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.02-Galeria Interactiva y Detalle de Producto]].md | neighbors=[02.02 — Galeria Interactiva y Detalle d…, 02.04 — Sistema de Resenas Vinculado a …] | lang=en
- "googleauth0206_gcp_config": "Configuracion Google Cloud Console (OAuth consent, origenes/redirect URIs, domi…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.06-Autenticacion Segura con Google y NextAuth v5]].md | neighbors=[02.06 — Autenticacion Segura con Google…, 03.01 — Pasarela Automatizada Mercado P…] | lang=en
- "home_benefitsmarquee_benefitsmarquee": "BenefitsMarquee()" | kind=code-symbol | source=src/components/home/BenefitsMarquee.tsx:L25 | neighbors=[BenefitsMarquee.tsx, page.tsx] | lang=en
- "home_buymeacoffee_buymeacoffee": "BuyMeACoffee()" | kind=code-symbol | source=src/components/home/BuyMeACoffee.tsx:L10 | neighbors=[BuyMeACoffee.tsx, page.tsx] | lang=en
- "home_categorytrends_categorytrends": "CategoryTrends()" | kind=code-symbol | source=src/components/home/CategoryTrends.tsx:L12 | neighbors=[CategoryTrends.tsx, page.tsx] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-012.json

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
