# Node Description Batch 19 of 30

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

- "admin_productform_productschema": "productSchema" | kind=code-symbol | source=src/components/admin/ProductForm.tsx:L37 | neighbors=[ProductForm.tsx]
- "admin_productform_uploadedimage": "UploadedImage" | kind=code-symbol | source=src/components/admin/ProductForm.tsx:L32 | neighbors=[ProductForm.tsx]
- "admin_separationbits_semaphore_styles": "SEMAPHORE_STYLES" | kind=code-symbol | source=src/components/admin/SeparationBits.tsx:L5 | neighbors=[SeparationBits.tsx]
- "admin_shalomdirectorytab_contact": "Contact" | kind=code-symbol | source=src/components/admin/ShalomDirectoryTab.tsx:L31 | neighbors=[ShalomDirectoryTab.tsx]
- "admin_shalomdirectorytab_tiktokurl": "tiktokUrl()" | kind=code-symbol | source=src/components/admin/ShalomDirectoryTab.tsx:L41 | neighbors=[ShalomDirectoryTab.tsx]
- "admin_statscard_statscard": "StatsCard()" | kind=code-symbol | source=src/components/admin/StatsCard.tsx:L12 | neighbors=[StatsCard.tsx]
- "admin_statscard_statscardprops": "StatsCardProps" | kind=code-symbol | source=src/components/admin/StatsCard.tsx:L5 | neighbors=[StatsCard.tsx]
- "apartar_page_apartarpage": "ApartarPage()" | kind=code-symbol | source=src/app/(shop)/products/[id]/apartar/page.tsx:L24 | neighbors=[page.tsx]
- "app_layout_metadata": "metadata" | kind=code-symbol | source=src/app/layout.tsx:L6 | neighbors=[layout.tsx]
- "app_layout_rootlayout": "RootLayout()" | kind=code-symbol | source=src/app/layout.tsx:L12 | neighbors=[layout.tsx]
- "auth_authshell_features": "FEATURES" | kind=code-symbol | source=src/components/auth/AuthShell.tsx:L8 | neighbors=[AuthShell.tsx]
- "auth_forcedresetform_resetformdata": "ResetFormData" | kind=code-symbol | source=src/components/auth/ForcedResetForm.tsx:L27 | neighbors=[ForcedResetForm.tsx]
- "auth_forcedresetform_resetschema": "resetSchema" | kind=code-symbol | source=src/components/auth/ForcedResetForm.tsx:L14 | neighbors=[ForcedResetForm.tsx]
- "auth_googlebutton_googleicon": "GoogleIcon()" | kind=code-symbol | source=src/components/auth/GoogleButton.tsx:L8 | neighbors=[GoogleButton.tsx]
- "auth_layout_authlayout": "AuthLayout()" | kind=code-symbol | source=src/app/(auth)/layout.tsx:L1 | neighbors=[layout.tsx]
- "auth_loginform_loginformdata": "LoginFormData" | kind=code-symbol | source=src/components/auth/LoginForm.tsx:L21 | neighbors=[LoginForm.tsx]
- "auth_loginform_loginschema": "loginSchema" | kind=code-symbol | source=src/components/auth/LoginForm.tsx:L16 | neighbors=[LoginForm.tsx]
- "auth_registerform_registerformdata": "RegisterFormData" | kind=code-symbol | source=src/components/auth/RegisterForm.tsx:L40 | neighbors=[RegisterForm.tsx]
- "auth_registerform_registerschema": "registerSchema" | kind=code-symbol | source=src/components/auth/RegisterForm.tsx:L22 | neighbors=[RegisterForm.tsx]
- "avatar_route_avatar_dir": "AVATAR_DIR" | kind=code-symbol | source=src/app/api/user/avatar/route.ts:L14 | neighbors=[route.ts]
- "avatar_route_post": "POST()" | kind=code-symbol | source=src/app/api/user/avatar/route.ts:L19 | neighbors=[route.ts]
- "batches_route_createschema": "createSchema" | kind=code-symbol | source=src/app/api/admin/batches/route.ts:L50 | neighbors=[route.ts]
- "batches_route_get": "GET()" | kind=code-symbol | source=src/app/api/admin/batches/route.ts:L8 | neighbors=[route.ts]
- "batches_route_itemschema": "itemSchema" | kind=code-symbol | source=src/app/api/admin/batches/route.ts:L44 | neighbors=[route.ts]
- "batches_route_post": "POST()" | kind=code-symbol | source=src/app/api/admin/batches/route.ts:L59 | neighbors=[route.ts]
- "brands_route_brandschema": "brandSchema" | kind=code-symbol | source=src/app/api/brands/route.ts:L33 | neighbors=[route.ts]
- "brands_route_get": "GET()" | kind=code-symbol | source=src/app/api/brands/route.ts:L8 | neighbors=[route.ts]
- "brands_route_post": "POST()" | kind=code-symbol | source=src/app/api/brands/route.ts:L39 | neighbors=[route.ts]
- "campaigns_page_campaignitem": "CampaignItem" | kind=code-symbol | source=src/app/(admin-panel)/admin/campaigns/page.tsx:L29 | neighbors=[page.tsx]
- "campaigns_page_campaignspage": "CampaignsPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/campaigns/page.tsx:L221 | neighbors=[page.tsx]
- "campaigns_page_campaigntable": "CampaignTable()" | kind=code-symbol | source=src/app/(admin-panel)/admin/campaigns/page.tsx:L76 | neighbors=[page.tsx]
- "campaigns_page_formatwindow": "formatWindow()" | kind=code-symbol | source=src/app/(admin-panel)/admin/campaigns/page.tsx:L65 | neighbors=[page.tsx]
- "campaigns_page_status_labels": "STATUS_LABELS" | kind=code-symbol | source=src/app/(admin-panel)/admin/campaigns/page.tsx:L52 | neighbors=[page.tsx]
- "campaigns_page_type_labels": "TYPE_LABELS" | kind=code-symbol | source=src/app/(admin-panel)/admin/campaigns/page.tsx:L58 | neighbors=[page.tsx]
- "cancel_page_checkoutcancelpage": "CheckoutCancelPage()" | kind=code-symbol | source=src/app/(shop)/checkout/cancel/page.tsx:L6 | neighbors=[page.tsx]
- "cart_cartitem_cartitemprops": "CartItemProps" | kind=code-symbol | source=src/components/cart/CartItem.tsx:L9 | neighbors=[CartItem.tsx]
- "cart_cartsummary_cartsummaryprops": "CartSummaryProps" | kind=code-symbol | source=src/components/cart/CartSummary.tsx:L10 | neighbors=[CartSummary.tsx]
- "cart_page_cartpage": "CartPage()" | kind=code-symbol | source=src/app/(shop)/cart/page.tsx:L10 | neighbors=[page.tsx]
- "categories_page_admincategoriespage": "AdminCategoriesPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/categories/page.tsx:L38 | neighbors=[page.tsx]
- "categories_page_endpoint": "ENDPOINT" | kind=code-symbol | source=src/app/(admin-panel)/admin/categories/page.tsx:L31 | neighbors=[page.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-018.json

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
