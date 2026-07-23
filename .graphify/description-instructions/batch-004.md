# Node Description Batch 5 of 30

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

- "react_bits_animatedcontent_animatedcontent": "AnimatedContent()" | kind=code-symbol | source=src/components/react-bits/AnimatedContent.tsx:L13 | neighbors=[page.tsx, BuyMeACoffee.tsx, CategoryTrends.tsx, FeaturedProducts.tsx, FollowUs.tsx, HeroBanner.tsx] | lang=en
- "react_bits_spotlightcard": "SpotlightCard.tsx" | kind=code-symbol | source=src/components/react-bits/SpotlightCard.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, 8b3e1a0 version 5, QuickAccessPanel.tsx, ReviewsSection.tsx, use-coarse-pointer.ts, useCoarsePointer()] | lang=en
- "register_page": "page.tsx" | kind=code-symbol | source=src/app/(auth)/register/page.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 487cc56 version 4, AuthShell.tsx, AuthShell(), RegisterForm.tsx] | lang=en
- "separations0507_document": "05.07 — Motor Avanzado de Separaciones, Plazos y Pagos Fraccionados" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/[[05.07-Motor Avanzado de Separaciones, Plazos y Pagos Fraccionados]].md | neighbors=[Motor de Preventas (adelanto, saldo, ET…, Modelo de Negocio (catalogo dual, pago …, Logica de Reduccion de Saldo (abono ini…, 05.04 (referenciada como 'Logistica Int…, 05.03 — Control de Inventario y Prevent…, 05 — Panel Administrativo y POS (indice…] | lang=en
- "terms0701_document": "07.01 — Terminos y Condiciones de Preventas y Ventas" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.01-Terminos-y-Condiciones-de-Preventas-y-Ventas]].md | neighbors=[07.02 — Politicas de Devolucion y Reemb…, 05.07 — Motor Avanzado de Separaciones,…, Integracion Legal en Checkout (checkbox…, 02.01 (referenciada repetidamente como …, 07 — Marco Legal y Politicas (seccion p…, 06.03 — Logistica de Envios e Integraci…] | lang=es
- "ui_separator_separator": "Separator()" | kind=code-symbol | source=src/components/ui/separator.tsx:L8 | neighbors=[CartSummary.tsx, OrderSummary.tsx, Footer.tsx, MobileNav.tsx, page.tsx, page.tsx] | lang=en
- "ui_tabs": "tabs.tsx" | kind=code-symbol | source=src/components/ui/tabs.tsx:L1 | neighbors=[page.tsx, 2982ca1 iniciar proyecto, page.tsx, page.tsx, utils.ts, cn()] | lang=en
- "checkout_couponinput": "CouponInput.tsx" | kind=code-symbol | source=src/components/checkout/CouponInput.tsx:L1 | neighbors=[AppliedCoupon, CouponInput(), CouponInputProps, button.tsx, Button(), input.tsx] | lang=en
- "common_tiktokicon": "TiktokIcon.tsx" | kind=code-symbol | source=src/components/common/TiktokIcon.tsx:L1 | neighbors=[ContactBadges.tsx, ShalomDirectoryTab.tsx, 487cc56 version 4, SocialIcon.tsx, TiktokIcon(), utils.ts] | lang=en
- "mercadopago0301_document": "03.01 — Pasarela Automatizada Mercado Pago" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/03-Sistema-Pagos-Y-Checkouts/[[03.01-Pasarela Automatizada Mercado Pago]].md | neighbors=[02.06 — Autenticacion Segura con Google…, Configuracion Google Cloud Console (OAu…, 03.02 — Plantilla de Pago Manual con QR…, 01.02 — Estructura de Directorios Next.…, 03.02 (referenciada como 'Generacion de…, Flujo E2E de Pago (Checkout -> Preferen…] | lang=en
- "paymentid_route": "route.ts" | kind=code-symbol | source=src/app/api/admin/separations/[id]/payments/[paymentId]/route.ts:L1 | neighbors=[487cc56 version 4, api-guards.ts, requireAdmin(), prisma.ts, separations-server.ts, recalcSeparation()] | lang=en
- "plan_boveda_proyecto": "Boveda de Obsidian (docs/Boveda-Proyecto-Ecommerce, 8 secciones)" | kind=entity | source=docs/PLAN.md | neighbors=[Bundles 'Combina y Ahorra' (referenciad…, Buy Me a Coffee (02.01): seccion desple…, Campanas y Marketing (05.05): Banner/An…, CRM y Notificaciones (05.04): ficha 360…, Dashboard analitico (05.01): KPIs, fluj…, Plan: La Tiendita de Blue (referenciado…] | lang=nl
- "privacy0703_document": "07.03 — Politica de Privacidad y Proteccion de Datos" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.03-Politica-de-Privacidad-y-Proteccion-de-Datos]].md | neighbors=[Responsabilidad Admin-Driven (no compar…, Derechos ARCO (Ley N 29733 Peru) — Acce…, Recoleccion de Datos (identificacion, c…, Uso y Tratamiento (finalidad primaria/s…, 06.01 — Flujo de Compra por Pasarela Au…, 05.02 (referenciada como 'Gestion de Cl…] | lang=nl
- "products_filtersection": "FilterSection.tsx" | kind=code-symbol | source=src/components/products/FilterSection.tsx:L1 | neighbors=[0a444d0 18/97/2026, FilterOption, FilterSection(), FilterSectionProps, checkbox.tsx, Checkbox()] | lang=en
- "products_pagination": "Pagination.tsx" | kind=code-symbol | source=src/components/products/Pagination.tsx:L1 | neighbors=[a16fe9a vaersion 8, page.tsx, utils.ts, cn(), buildPageList(), Pagination()] | lang=en
- "profile_layout": "layout.tsx" | kind=code-symbol | source=src/app/(shop)/profile/layout.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, 487cc56 version 4, auth.ts, prisma.ts, ProfileLayout(), ProfileMobileNav.tsx] | lang=en
- "react_bits_magneticbutton": "MagneticButton.tsx" | kind=code-symbol | source=src/components/react-bits/MagneticButton.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, 8b3e1a0 version 5, HeroBanner.tsx, use-coarse-pointer.ts, useCoarsePointer(), utils.ts] | lang=en
- "ui_field": "field.tsx" | kind=code-symbol | source=src/components/ui/field.tsx:L1 | neighbors=[RegisterForm.tsx, 2982ca1 iniciar proyecto, utils.ts, cn(), Field, FieldDescription] | lang=en
- "ui_table_table": "Table()" | kind=code-symbol | source=src/components/ui/table.tsx:L7 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "ui_table_tablebody": "TableBody()" | kind=code-symbol | source=src/components/ui/table.tsx:L32 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "ui_table_tablecell": "TableCell()" | kind=code-symbol | source=src/components/ui/table.tsx:L81 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "ui_table_tablehead": "TableHead()" | kind=code-symbol | source=src/components/ui/table.tsx:L68 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "ui_table_tableheader": "TableHeader()" | kind=code-symbol | source=src/components/ui/table.tsx:L22 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "ui_table_tablerow": "TableRow()" | kind=code-symbol | source=src/components/ui/table.tsx:L55 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx] | lang=en
- "ui_textarea_textarea": "Textarea()" | kind=code-symbol | source=src/components/ui/textarea.tsx:L5 | neighbors=[AcquisitionForm.tsx, CampaignForm.tsx, CrmPanel.tsx, ProductForm.tsx, ShalomContactForm.tsx, page.tsx] | lang=en
- "20260719144924_add_campaigns_crm_migration": "migration.sql" | kind=code-symbol | source=prisma/migrations/20260719144924_add_campaigns_crm/migration.sql:L1 | neighbors=[announcements, banners, categories, coupons, discount_rules, lines] | lang=en
- "adicionales_document": "Adicionales — Desglose Detallado de Directorios y Procesos" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/Adicionales.md | neighbors=[Grupo de Rutas Privadas src/app/(admin-…, Endpoints Backend src/app/api/ (orders,…, Componentes UI src/components/ (admin, …, Utilidades src/lib/ (db.ts, mercadopago…, Grupo de Rutas Publicas src/app/(shop)/…, Estado Global src/stores/ (cart-store.t…] | lang=en
- "batches_route": "route.ts" | kind=code-symbol | source=src/app/api/admin/batches/route.ts:L1 | neighbors=[createSchema, GET(), itemSchema, POST(), api-guards.ts, requireAdmin()] | lang=en
- "charts_logisticsdonut": "LogisticsDonut.tsx" | kind=code-symbol | source=src/components/admin/charts/LogisticsDonut.tsx:L1 | neighbors=[page.tsx, DonutTooltip(), DonutTooltipPayload, LogisticsDonut(), SLICE_STYLE, analytics.ts] | lang=en
- "commit:repo:github.com/jhon719/LatienditadeBlue@8b3e1a0fccb9a31138aa618692ceb71411e8125d": "8b3e1a0 version 5" | kind=Commit | source=git | neighbors=[487cc56 version 4, main, 7205424 version ultima, use-coarse-pointer.ts, auth.ts, next.config.ts] | lang=pt
- "common_useravatar_useravatar": "UserAvatar()" | kind=code-symbol | source=src/components/common/UserAvatar.tsx:L15 | neighbors=[UserAvatar.tsx, ReviewsSection.tsx, page.tsx, Header.tsx, ProductReviews.tsx, AvatarUploader.tsx] | lang=en
- "common_whatsappicon": "WhatsappIcon.tsx" | kind=code-symbol | source=src/components/common/WhatsappIcon.tsx:L1 | neighbors=[ContactBadges.tsx, ShalomDirectoryTab.tsx, page.tsx, 487cc56 version 4, WhatsappIcon(), utils.ts] | lang=en
- "deploy0801_document": "08.01 — Estrategia de Despliegue y Configuracion de Entornos" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/08-Plan-de-Implementacion-y-Despliegue/[[08.01-Estrategia-de-Despliegue-y-Configuracion-de-Entornos]].md | neighbors=[Configuracion Neon + Prisma (DATABASE_U…, 06.01 — Flujo de Compra por Pasarela Au…, 05.01 — Dashboard, Analitica y UI/UX (n…, 02.01 (referenciada repetidamente como …, 08 — Plan de Implementacion y Despliegu…, Modelo DotEnv (.env.local vs Vercel Env…] | lang=nl
- "lib_mercadopago": "mercadopago.ts" | kind=code-symbol | source=src/lib/mercadopago.ts:L1 | neighbors=[0a444d0 18/97/2026, 3db2e43 version 2, getClient(), getPaymentClient(), getPreferenceClient(), isMercadoPagoEnabled()] | lang=en
- "lib_peru": "peru.ts" | kind=code-symbol | source=src/lib/peru.ts:L1 | neighbors=[PeruHeatMap.tsx, 3db2e43 version 2, DEPARTMENT_CODES, departmentLabel(), PERU_DEPARTMENTS, PeruDepartment] | lang=en
- "orders_boletabutton": "BoletaButton.tsx" | kind=code-symbol | source=src/components/orders/BoletaButton.tsx:L1 | neighbors=[487cc56 version 4, boleta-pdf.ts, BoletaOrder, downloadBoletaPdf(), BoletaButton(), button.tsx] | lang=en
- "products_manchasstorepromo": "ManchasStorePromo.tsx" | kind=code-symbol | source=src/components/products/ManchasStorePromo.tsx:L1 | neighbors=[487cc56 version 4, TiktokIcon.tsx, TiktokIcon(), social.ts, SOCIAL_LINKS, ManchasStoreBanner()] | lang=en
- "products_pricefilter": "PriceFilter.tsx" | kind=code-symbol | source=src/components/products/PriceFilter.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, FilterSidebar.tsx, PriceFilter(), PriceFilterProps, input.tsx, Input()] | lang=en
- "profile_avataruploader": "AvatarUploader.tsx" | kind=code-symbol | source=src/components/profile/AvatarUploader.tsx:L1 | neighbors=[0a444d0 18/97/2026, UserAvatar.tsx, UserAvatar(), AvatarUploader(), AvatarUploaderProps, button.tsx] | lang=en
- "returns0702_document": "07.02 — Politicas de Devolucion y Reembolsos" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.02-Politicas-de-Devolucion-y-Reembolsos]].md | neighbors=[07.03 — Politica de Privacidad y Protec…, 05.03 — Control de Inventario y Prevent…, 07 — Marco Legal y Politicas (seccion p…, 05.02 — Bandeja POS de Aprobacion de Co…, 07.01 — Terminos y Condiciones de Preve…, Condiciones No Admitidas (danos transpo…] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-004.json

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
