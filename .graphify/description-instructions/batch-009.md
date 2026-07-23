# Node Description Batch 10 of 30

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

- "20260721045812_add_separations_migration_preorder_reservations": "preorder_reservations" | kind=code-symbol | source=prisma/migrations/20260721045812_add_separations/migration.sql:L8 | neighbors=[migration.sql, preorder_reservations] | lang=en
- "admin_campaignform_campaign_type_options": "CAMPAIGN_TYPE_OPTIONS" | kind=code-symbol | source=src/components/admin/CampaignForm.tsx:L32 | neighbors=[CampaignForm.tsx, page.tsx, page.tsx] | lang=en
- "admin_campaignform_campaigntype": "CampaignType" | kind=code-symbol | source=src/components/admin/CampaignForm.tsx:L30 | neighbors=[CampaignForm.tsx, page.tsx, page.tsx] | lang=en
- "admin_catalogentryform_catalogentryform": "CatalogEntryForm()" | kind=code-symbol | source=src/components/admin/CatalogEntryForm.tsx:L75 | neighbors=[CatalogEntryForm.tsx, page.tsx, page.tsx] | lang=en
- "admin_catalogentryform_catalogentrytype": "CatalogEntryType" | kind=code-symbol | source=src/components/admin/CatalogEntryForm.tsx:L32 | neighbors=[CatalogEntryForm.tsx, page.tsx, page.tsx] | lang=en
- "admin_productform_productform": "ProductForm()" | kind=code-symbol | source=src/components/admin/ProductForm.tsx:L62 | neighbors=[ProductForm.tsx, page.tsx, page.tsx] | lang=en
- "admin_shalomcontactform_shalomcontactform": "ShalomContactForm()" | kind=code-symbol | source=src/components/admin/ShalomContactForm.tsx:L28 | neighbors=[ShalomContactForm.tsx, page.tsx, page.tsx] | lang=en
- "auth_authshell_authshell": "AuthShell()" | kind=code-symbol | source=src/components/auth/AuthShell.tsx:L26 | neighbors=[AuthShell.tsx, page.tsx, page.tsx] | lang=en
- "auth_googlebutton_googlebutton": "GoogleButton()" | kind=code-symbol | source=src/components/auth/GoogleButton.tsx:L31 | neighbors=[GoogleButton.tsx, LoginForm.tsx, RegisterForm.tsx] | lang=en
- "boveda_vault": "Boveda de Obsidian (docs/Boveda-Proyecto-Ecommerce)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce | neighbors=[Project Overview: e-commerce peruano de…, README.md — La Tiendita de Blue, Seccion Documentacion (enlaces a CLAUDE…] | lang=nl
- "checkout_manualpaymentsection_manualpaymentsection": "ManualPaymentSection()" | kind=code-symbol | source=src/components/checkout/ManualPaymentSection.tsx:L18 | neighbors=[page.tsx, ManualPaymentSection.tsx, page.tsx] | lang=en
- "claudemd_rule_rhf_zod": "Regla: formularios con react-hook-form + zod" | kind=entity | source=CLAUDE.md | neighbors=[CLAUDE.md — Guia del Proyecto, Convenciones (Sin Server Actions, RHF+Z…, Checklist de Seguridad (Code Review): d…] | lang=en
- "commit:repo:github.com/jhon719/LatienditadeBlue@2ee7082cf01579654f3c65f512e82a801bd7033e": "2ee7082 version 3" | kind=Commit | source=git | neighbors=[main, 487cc56 version 4, 3db2e43 version 2] | lang=en
- "commit:repo:github.com/jhon719/LatienditadeBlue@3b141c84b4ad44217d8b18885513f59207b68a89": "3b141c8 16/07/2026" | kind=Commit | source=git | neighbors=[main, 0a444d0 18/97/2026, 9b525c4 version 1] | lang=en
- "commit:repo:github.com/jhon719/LatienditadeBlue@583a96a0610dd2b57a67c502ccccdaa1e9e68313": "583a96a 15/07/2026" | kind=Commit | source=git | neighbors=[2982ca1 iniciar proyecto, main, 9b525c4 version 1] | lang=pt
- "commit:repo:github.com/jhon719/LatienditadeBlue@7205424ffc9833be828d10befaae17854848eed3": "7205424 version ultima" | kind=Commit | source=git | neighbors=[main, b975a3a version 6, 8b3e1a0 version 5] | lang=en
- "commit:repo:github.com/jhon719/LatienditadeBlue@9b525c4de2d839344d1137a9b7d2ba6fb6f3401b": "9b525c4 version 1" | kind=Commit | source=git | neighbors=[583a96a 15/07/2026, main, 3b141c8 16/07/2026] | lang=en
- "commit:repo:github.com/jhon719/LatienditadeBlue@d837affa433d700e27215915cb60ecd28d30532d": "d837aff version 2" | kind=Commit | source=git | neighbors=[2f6d845 revision 1, main, 3db2e43 version 2] | lang=en
- "common_countup_countup": "CountUp()" | kind=code-symbol | source=src/components/common/CountUp.tsx:L18 | neighbors=[AcquisitionsTab.tsx, CountUp.tsx, StatsBand.tsx] | lang=en
- "common_socialicon_socialicon": "SocialIcon()" | kind=code-symbol | source=src/components/common/SocialIcon.tsx:L6 | neighbors=[SocialIcon.tsx, FollowUs.tsx, Footer.tsx] | lang=en
- "datamodel_address": "Address (Direcciones)" | kind=entity | source=docs/DATA-MODEL.md | neighbors=[Modelo de Datos - BasicTechShop (refere…, User (Usuarios), Order (Pedidos)] | lang=en
- "datamodel_orderitem": "OrderItem (Items del Pedido)" | kind=entity | source=docs/DATA-MODEL.md | neighbors=[Modelo de Datos - BasicTechShop (refere…, Order (Pedidos), Product (Productos)] | lang=en
- "datamodel_roles_permissions": "Roles y Permisos (CUSTOMER/MODERATOR/ADMIN)" | kind=entity | source=docs/DATA-MODEL.md | neighbors=[Modelo de Datos - BasicTechShop (refere…, User (Usuarios), Usuarios y Roles (CUSTOMER, MODERATOR, …] | lang=es
- "dbmodel0103_privacy_policy": "Politica de Datos Privados vs Publicos (firstName/lastName/dni nunca expuestos)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.03-Modelo de Base de Datos Prisma SQL]].md | neighbors=[Auth y Seguridad (NextAuth v5, RBAC, mu…, 01.03 — Modelo de Base de Datos Prisma …, Convenciones (Sin Server Actions, RHF+Z…] | lang=nl
- "deploy0801_vercel_deploy": "Despliegue en Vercel (build: npx prisma generate && next build, Edge Middleware…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/08-Plan-de-Implementacion-y-Despliegue/[[08.01-Estrategia-de-Despliegue-y-Configuracion-de-Entornos]].md | neighbors=[Configuration (path alias @/*, remote i…, 08.01 — Estrategia de Despliegue y Conf…, Despliegue (build prisma generate && ne…] | lang=en
- "googleauth0206_document": "02.06 — Autenticacion Segura con Google y NextAuth v5" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.06-Autenticacion Segura con Google y NextAuth v5]].md | neighbors=[03.01 — Pasarela Automatizada Mercado P…, Configuracion .env (GOOGLE_CLIENT_ID/SE…, Configuracion Google Cloud Console (OAu…] | lang=es
- "googleauth0206_env_config": "Configuracion .env (GOOGLE_CLIENT_ID/SECRET, NEXTAUTH_SECRET, NEXTAUTH_URL)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.06-Autenticacion Segura con Google y NextAuth v5]].md | neighbors=[Configuration (path alias @/*, remote i…, 02.06 — Autenticacion Segura con Google…, Variables de Entorno (tabla .env)] | lang=en
- "hooks_use_coarse_pointer_usecoarsepointer": "useCoarsePointer()" | kind=code-symbol | source=src/hooks/use-coarse-pointer.ts:L18 | neighbors=[use-coarse-pointer.ts, MagneticButton.tsx, SpotlightCard.tsx] | lang=en
- "layout_bluetbubble": "BluetBubble.tsx" | kind=code-symbol | source=src/components/layout/BluetBubble.tsx:L1 | neighbors=[0a444d0 18/97/2026, BluetBubble(), page.tsx] | lang=en
- "legal07_stub_document": "07 — Marco Legal y Politicas (seccion padre referenciada, sin archivo indice lo…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/ | neighbors=[07.03 — Politica de Privacidad y Protec…, 07.02 — Politicas de Devolucion y Reemb…, 07.01 — Terminos y Condiciones de Preve…] | lang=es
- "lib_acquisitions_r2": "r2()" | kind=code-symbol | source=src/lib/acquisitions.ts:L51 | neighbors=[acquisitions.ts, computeAcquisition(), igvAmount()] | lang=en
- "lib_acquisitions_soles": "soles()" | kind=code-symbol | source=src/lib/acquisitions.ts:L68 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, acquisitions.ts] | lang=en
- "lib_acquisitions_yen": "yen()" | kind=code-symbol | source=src/lib/acquisitions.ts:L66 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, acquisitions.ts] | lang=en
- "lib_analytics_getcashflowseries": "getCashFlowSeries()" | kind=code-symbol | source=src/lib/analytics.ts:L84 | neighbors=[page.tsx, analytics.ts, rangeToDate()] | lang=en
- "lib_analytics_getkpis": "getKpis()" | kind=code-symbol | source=src/lib/analytics.ts:L37 | neighbors=[page.tsx, analytics.ts, rangeToDate()] | lang=en
- "lib_analytics_rangetodate": "rangeToDate()" | kind=code-symbol | source=src/lib/analytics.ts:L8 | neighbors=[analytics.ts, getCashFlowSeries(), getKpis()] | lang=en
- "lib_auth_isgoogleenabled": "isGoogleEnabled()" | kind=code-symbol | source=src/lib/auth.ts:L9 | neighbors=[auth.ts, page.tsx, page.tsx] | lang=en
- "lib_campaign_admin_campaign_types": "CAMPAIGN_TYPES" | kind=code-symbol | source=src/lib/campaign-admin.ts:L67 | neighbors=[route.ts, campaign-admin.ts, route.ts] | lang=en
- "lib_campaign_admin_campaignmodel": "campaignModel()" | kind=code-symbol | source=src/lib/campaign-admin.ts:L82 | neighbors=[route.ts, campaign-admin.ts, route.ts] | lang=en
- "lib_campaign_admin_iscampaigntype": "isCampaignType()" | kind=code-symbol | source=src/lib/campaign-admin.ts:L76 | neighbors=[route.ts, campaign-admin.ts, route.ts] | lang=en

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-009.json

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
