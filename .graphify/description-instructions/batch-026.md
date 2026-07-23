# Node Description Batch 27 of 30

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

- "profile_route_profileschema": "profileSchema" | kind=code-symbol | source=src/app/api/user/profile/route.ts:L34 | neighbors=[route.ts] | lang=en
- "profiles0203_forced_reset_flow": "Flujo de Cambio Forzado (mustChangePassword, /auth/forced-reset)" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.03-Sistema de Perfiles y Datos Privados de Admin]].md | neighbors=[02.03 — Sistema de Perfiles y Datos Pri…] | lang=nl
- "profiles0203_ui_profile_admin": "Diseno de Interfaces Protegidas (perfil cliente enmascarado, panel admin con da…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.03-Sistema de Perfiles y Datos Privados de Admin]].md | neighbors=[02.03 — Sistema de Perfiles y Datos Pri…] | lang=en
- "profiles0203_visibility_matrix": "Matriz de Visibilidad de Datos (username/avatarUrl publicos vs realName/dni/pho…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.03-Sistema de Perfiles y Datos Privados de Admin]].md | neighbors=[02.03 — Sistema de Perfiles y Datos Pri…] | lang=nl
- "providers_sessionprovider_sessionproviderprops": "SessionProviderProps" | kind=code-symbol | source=src/components/providers/SessionProvider.tsx:L5 | neighbors=[SessionProvider.tsx] | lang=en
- "react_bits_animatedcontent_animatedcontentprops": "AnimatedContentProps" | kind=code-symbol | source=src/components/react-bits/AnimatedContent.tsx:L6 | neighbors=[AnimatedContent.tsx] | lang=en
- "react_bits_magneticbutton_magneticbuttonprops": "MagneticButtonProps" | kind=code-symbol | source=src/components/react-bits/MagneticButton.tsx:L7 | neighbors=[MagneticButton.tsx] | lang=en
- "react_bits_spotlightcard_spotlightcardprops": "SpotlightCardProps" | kind=code-symbol | source=src/components/react-bits/SpotlightCard.tsx:L7 | neighbors=[SpotlightCard.tsx] | lang=en
- "react_bits_tiltcard_tiltcard": "TiltCard()" | kind=code-symbol | source=src/components/react-bits/TiltCard.tsx:L11 | neighbors=[TiltCard.tsx] | lang=en
- "react_bits_tiltcard_tiltcardprops": "TiltCardProps" | kind=code-symbol | source=src/components/react-bits/TiltCard.tsx:L6 | neighbors=[TiltCard.tsx] | lang=en
- "readme_stack_tecnologico": "Stack Tecnologico (tabla)" | kind=entity | source=README.md | neighbors=[README.md — La Tiendita de Blue] | lang=en
- "readme_tienda_publica": "Funcionalidades: Tienda Publica" | kind=entity | source=README.md | neighbors=[README.md — La Tiendita de Blue] | lang=en
- "receiptgen0302_stub_document": "03.02 (referenciada como 'Generacion de Comprobante y Envio de Alertas por Corr…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/03-Sistema-Pagos-Y-Checkouts/ | neighbors=[03.01 — Pasarela Automatizada Mercado P…] | lang=es
- "receive_route_params": "Params" | kind=code-symbol | source=src/app/api/admin/batches/[id]/receive/route.ts:L5 | neighbors=[route.ts] | lang=en
- "receive_route_post": "POST()" | kind=code-symbol | source=src/app/api/admin/batches/[id]/receive/route.ts:L14 | neighbors=[route.ts] | lang=en
- "register_page_registerpage": "RegisterPage()" | kind=code-symbol | source=src/app/(auth)/register/page.tsx:L5 | neighbors=[page.tsx] | lang=en
- "register_route_post": "POST()" | kind=code-symbol | source=src/app/api/auth/register/route.ts:L21 | neighbors=[route.ts] | lang=en
- "register_route_registerschema": "registerSchema" | kind=code-symbol | source=src/app/api/auth/register/route.ts:L6 | neighbors=[route.ts] | lang=en
- "release_route_params": "Params" | kind=code-symbol | source=src/app/api/admin/separations/[id]/release/route.ts:L5 | neighbors=[route.ts] | lang=en
- "release_route_post": "POST()" | kind=code-symbol | source=src/app/api/admin/separations/[id]/release/route.ts:L10 | neighbors=[route.ts] | lang=en
- "release_stock_route_get": "GET()" | kind=code-symbol | source=src/app/api/cron/release-stock/route.ts:L8 | neighbors=[route.ts] | lang=en
- "reports_page_reportspage": "ReportsPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/reports/page.tsx:L37 | neighbors=[page.tsx] | lang=en
- "reports_page_usersreport": "UsersReport" | kind=code-symbol | source=src/app/(admin-panel)/admin/reports/page.tsx:L31 | neighbors=[page.tsx] | lang=en
- "reset_password_route_post": "POST()" | kind=code-symbol | source=src/app/api/admin/users/[id]/reset-password/route.ts:L10 | neighbors=[route.ts] | lang=en
- "returns_page_metadata": "metadata" | kind=code-symbol | source=src/app/(shop)/returns/page.tsx:L4 | neighbors=[page.tsx] | lang=en
- "returns_page_returnspage": "ReturnsPage()" | kind=code-symbol | source=src/app/(shop)/returns/page.tsx:L9 | neighbors=[page.tsx] | lang=en
- "returns0702_return_scenarios": "Escenarios de Devolucion (defecto de fabrica, error de despacho, desistimiento …" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.02-Politicas-de-Devolucion-y-Reembolsos]].md | neighbors=[07.02 — Politicas de Devolucion y Reemb…] | lang=nl
- "reviews_route_get": "GET()" | kind=code-symbol | source=src/app/api/reviews/route.ts:L21 | neighbors=[route.ts] | lang=en
- "reviews_route_reviewschema": "reviewSchema" | kind=code-symbol | source=src/app/api/reviews/route.ts:L59 | neighbors=[route.ts] | lang=en
- "reviews_route_verified_statuses": "VERIFIED_STATUSES" | kind=code-symbol | source=src/app/api/reviews/route.ts:L8 | neighbors=[route.ts] | lang=en
- "security0402_xss_protection": "Blindaje XSS (auto-escaping React 19, prohibicion de dangerouslySetInnerHTML si…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/04-Seguridad-Y-Prevencion-De-Errores/[[04.02-Blindaje contra SQL Injection y XSS]].md | neighbors=[04.02 — Blindaje contra SQL Injection y…] | lang=nl
- "separations_page_clientseparationspage": "ClientSeparationsPage()" | kind=code-symbol | source=src/app/(shop)/profile/separations/page.tsx:L253 | neighbors=[page.tsx] | lang=en
- "separations_page_payment": "Payment" | kind=code-symbol | source=src/app/(shop)/profile/separations/page.tsx:L20 | neighbors=[page.tsx] | lang=en
- "separations_page_paysaldoform": "PaySaldoForm()" | kind=code-symbol | source=src/app/(shop)/profile/separations/page.tsx:L52 | neighbors=[page.tsx] | lang=en
- "separations_page_separation": "Separation" | kind=code-symbol | source=src/app/(shop)/profile/separations/page.tsx:L26 | neighbors=[page.tsx] | lang=en
- "separations_page_status_label": "STATUS_LABEL" | kind=code-symbol | source=src/app/(shop)/profile/separations/page.tsx:L40 | neighbors=[page.tsx] | lang=en
- "separations_route_createschema": "createSchema" | kind=code-symbol | source=src/app/api/separations/route.ts:L23 | neighbors=[route.ts] | lang=en
- "separations_route_get": "GET()" | kind=code-symbol | source=src/app/api/separations/route.ts:L10 | neighbors=[route.ts] | lang=en
- "separations_route_post": "POST()" | kind=code-symbol | source=src/app/api/separations/route.ts:L34 | neighbors=[route.ts] | lang=en
- "separations0507_balance_logic": "Logica de Reduccion de Saldo (abono inicial S/10, abonos libres, PAGO_COMPLETAD…" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/[[05.07-Motor Avanzado de Separaciones, Plazos y Pagos Fraccionados]].md | neighbors=[05.07 — Motor Avanzado de Separaciones,…] | lang=nl

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-026.json

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
