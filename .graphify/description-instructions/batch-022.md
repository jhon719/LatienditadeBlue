# Node Description Batch 23 of 30

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "lib_campaigns_couponvalidation": "CouponValidation" | kind=code-symbol | source=src/lib/campaigns.ts:L103 | neighbors=[campaigns.ts]
- "lib_campaigns_priceableproduct": "PriceableProduct" | kind=code-symbol | source=src/lib/campaigns.ts:L66 | neighbors=[campaigns.ts]
- "lib_campaigns_schedulable": "Schedulable" | kind=code-symbol | source=src/lib/campaigns.ts:L14 | neighbors=[campaigns.ts]
- "lib_email_isemailenabled": "isEmailEnabled()" | kind=code-symbol | source=src/lib/email.ts:L10 | neighbors=[email.ts]
- "lib_email_orderemaildata": "OrderEmailData" | kind=code-symbol | source=src/lib/email.ts:L81 | neighbors=[email.ts]
- "lib_email_shipping_labels": "SHIPPING_LABELS" | kind=code-symbol | source=src/lib/email.ts:L90 | neighbors=[email.ts]
- "lib_image_validation_sniffedimage": "SniffedImage" | kind=code-symbol | source=src/lib/image-validation.ts:L12 | neighbors=[image-validation.ts]
- "lib_mercadopago_ismercadopagosandbox": "isMercadoPagoSandbox()" | kind=code-symbol | source=src/lib/mercadopago.ts:L11 | neighbors=[mercadopago.ts]
- "lib_peru_perudepartment": "PeruDepartment" | kind=code-symbol | source=src/lib/peru.ts:L5 | neighbors=[peru.ts]
- "lib_pricing_bundlediscount": "BundleDiscount" | kind=code-symbol | source=src/lib/pricing.ts:L18 | neighbors=[pricing.ts]
- "lib_pricing_pricingitem": "PricingItem" | kind=code-symbol | source=src/lib/pricing.ts:L12 | neighbors=[pricing.ts]
- "lib_prisma_createprismaclient": "createPrismaClient()" | kind=code-symbol | source=src/lib/prisma.ts:L10 | neighbors=[prisma.ts]
- "lib_prisma_globalforprisma": "globalForPrisma" | kind=code-symbol | source=src/lib/prisma.ts:L5 | neighbors=[prisma.ts]
- "lib_reports_pdf_blue": "BLUE" | kind=code-symbol | source=src/lib/reports-pdf.ts:L9 | neighbors=[reports-pdf.ts]
- "lib_reports_pdf_deliveryrow": "DeliveryRow" | kind=code-symbol | source=src/lib/reports-pdf.ts:L138 | neighbors=[reports-pdf.ts]
- "lib_reports_pdf_estadoenvio": "estadoEnvio()" | kind=code-symbol | source=src/lib/reports-pdf.ts:L162 | neighbors=[reports-pdf.ts]
- "lib_reports_pdf_fecha": "fecha()" | kind=code-symbol | source=src/lib/reports-pdf.ts:L15 | neighbors=[reports-pdf.ts]
- "lib_reports_pdf_gray": "GRAY" | kind=code-symbol | source=src/lib/reports-pdf.ts:L11 | neighbors=[reports-pdf.ts]
- "lib_reports_pdf_lasty": "lastY()" | kind=code-symbol | source=src/lib/reports-pdf.ts:L60 | neighbors=[reports-pdf.ts]
- "lib_reports_pdf_navy": "NAVY" | kind=code-symbol | source=src/lib/reports-pdf.ts:L8 | neighbors=[reports-pdf.ts]
- "lib_reports_pdf_rgb": "RGB" | kind=code-symbol | source=src/lib/reports-pdf.ts:L7 | neighbors=[reports-pdf.ts]
- "lib_reports_pdf_s": "S()" | kind=code-symbol | source=src/lib/reports-pdf.ts:L13 | neighbors=[reports-pdf.ts]
- "lib_reports_pdf_yellow": "YELLOW" | kind=code-symbol | source=src/lib/reports-pdf.ts:L10 | neighbors=[reports-pdf.ts]
- "lib_separations_semaphore": "Semaphore" | kind=code-symbol | source=src/lib/separations.ts:L46 | neighbors=[separations.ts]
- "lib_separations_semaphorelevel": "SemaphoreLevel" | kind=code-symbol | source=src/lib/separations.ts:L44 | neighbors=[separations.ts]
- "lib_separations_separationbalance": "SeparationBalance" | kind=code-symbol | source=src/lib/separations.ts:L28 | neighbors=[separations.ts]
- "lib_separations_separationkind": "SeparationKind" | kind=code-symbol | source=src/lib/separations.ts:L10 | neighbors=[separations.ts]
- "lib_separations_separationstatus": "SeparationStatus" | kind=code-symbol | source=src/lib/separations.ts:L11 | neighbors=[separations.ts]
- "lib_separations_server_db": "Db" | kind=code-symbol | source=src/lib/separations-server.ts:L5 | neighbors=[separations-server.ts]
- "lib_separations_server_separationwithrelations": "SeparationWithRelations" | kind=code-symbol | source=src/lib/separations-server.ts:L33 | neighbors=[separations-server.ts]
- "lib_social_sociallink": "SocialLink" | kind=code-symbol | source=src/lib/social.ts:L6 | neighbors=[social.ts]
- "lib_transformers_orderwithitems": "OrderWithItems" | kind=code-symbol | source=src/lib/transformers.ts:L144 | neighbors=[transformers.ts]
- "lib_transformers_productwithrelations": "ProductWithRelations" | kind=code-symbol | source=src/lib/transformers.ts:L14 | neighbors=[transformers.ts]
- "lib_transformers_reviewwithuser": "ReviewWithUser" | kind=code-symbol | source=src/lib/transformers.ts:L122 | neighbors=[transformers.ts]
- "lib_transformers_withcount": "WithCount" | kind=code-symbol | source=src/lib/transformers.ts:L74 | neighbors=[transformers.ts]
- "lib_utils_formatprice": "formatPrice()" | kind=code-symbol | source=src/lib/utils.ts:L18 | neighbors=[utils.ts]
- "lines_route_get": "GET()" | kind=code-symbol | source=src/app/api/lines/route.ts:L8 | neighbors=[route.ts]
- "lines_route_lineschema": "lineSchema" | kind=code-symbol | source=src/app/api/lines/route.ts:L34 | neighbors=[route.ts]
- "lines_route_post": "POST()" | kind=code-symbol | source=src/app/api/lines/route.ts:L42 | neighbors=[route.ts]
- "login_page_loginpage": "LoginPage()" | kind=code-symbol | source=src/app/(auth)/login/page.tsx:L6 | neighbors=[page.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-022.json

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
