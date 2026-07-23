# Node Description Batch 1 of 30

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
Write every description in Portuguese (pt). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "commit:repo:github.com/jhon719/LatienditadeBlue@2982ca1f1f3d9c8bcf2f872fdf312cd6bc796a49": "2982ca1 iniciar proyecto" | kind=Commit | source=git | neighbors=[AdminHeader.tsx, AdminMobileNav.tsx, AdminSidebar.tsx, ImageUpload.tsx, layout.tsx, page.tsx]
- "commit:repo:github.com/jhon719/LatienditadeBlue@487cc56bd9ef0ffed97d96b6b0c367bbf55344e9": "487cc56 version 4" | kind=Commit | source=git | neighbors=[2ee7082 version 3, migration.sql, migration.sql, migration.sql, migration.sql, migration.sql]
- "id_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/products/[id]/page.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 3db2e43 version 2, 487cc56 version 4, AcquisitionForm.tsx, AcquisitionData]
- "products_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/products/page.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 487cc56 version 4, a16fe9a vaersion 8, FilterMobile.tsx, FilterMobile()]
- "commit:repo:github.com/jhon719/LatienditadeBlue@0a444d08d9a2549fc4bd89d306f873fe2066e7c4": "0a444d0 18/97/2026" | kind=Commit | source=git | neighbors=[migration.sql, AdminSidebar.tsx, page.tsx, ProductForm.tsx, ForcedResetForm.tsx, GoogleButton.tsx]
- "commit:repo:github.com/jhon719/LatienditadeBlue@3db2e43199c5d5f72722ae5ce4ebb07354bea027": "3db2e43 version 2" | kind=Commit | source=git | neighbors=[migration.sql, migration.sql, migration.sql, migration.sql, AdminMobileNav.tsx, AdminSidebar.tsx]
- "ui_button": "button.tsx" | kind=code-symbol | source=src/components/ui/button.tsx:L1 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, AdminHeader.tsx, AdminMobileNav.tsx, AdminSidebar.tsx, CampaignForm.tsx]
- "lib_utils": "utils.ts" | kind=code-symbol | source=src/lib/utils.ts:L1 | neighbors=[AdminMobileNav.tsx, AdminSidebar.tsx, ImageUpload.tsx, page.tsx, SeparationBits.tsx, StatsCard.tsx]
- "ui_button_button": "Button()" | kind=code-symbol | source=src/components/ui/button.tsx:L39 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, AdminHeader.tsx, AdminMobileNav.tsx, AdminSidebar.tsx, CampaignForm.tsx]
- "logistics_page": "page.tsx" | kind=code-symbol | source=src/app/(admin-panel)/admin/logistics/page.tsx:L1 | neighbors=[487cc56 version 4, AcquisitionsTab.tsx, AcquisitionsTab(), SeparationBits.tsx, ProgressBar(), SemaphoreBadge()]
- "orders_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/profile/orders/page.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 487cc56 version 4, ContactBadges.tsx, ContactBadges(), auth.ts]
- "new_page": "page.tsx" | kind=code-symbol | source=src/app/(admin-panel)/admin/products/new/page.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 2f6d845 revision 1, 3db2e43 version 2, 487cc56 version 4, AcquisitionForm.tsx]
- "types_index": "index.ts" | kind=code-symbol | source=src/types/index.ts:L1 | neighbors=[ProductForm.tsx, page.tsx, CartItem.tsx, CartSummary.tsx, page.tsx, OrderSummary.tsx]
- "admin_acquisitionstab": "AcquisitionsTab.tsx" | kind=code-symbol | source=src/components/admin/AcquisitionsTab.tsx:L1 | neighbors=[Acquisition, AcquisitionsTab(), Dashboard(), money(), MonthSummary, StatCard()]
- "lib_utils_cn": "cn()" | kind=code-symbol | source=src/lib/utils.ts:L4 | neighbors=[AdminMobileNav.tsx, AdminSidebar.tsx, ImageUpload.tsx, page.tsx, SeparationBits.tsx, StatsCard.tsx]
- "id_route": "route.ts" | kind=code-symbol | source=src/app/api/products/[id]/route.ts:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 3db2e43 version 2, 487cc56 version 4, actionSchema, crmSchema]
- "lib_prisma": "prisma.ts" | kind=code-symbol | source=src/lib/prisma.ts:L1 | neighbors=[route.ts, page.tsx, route.ts, route.ts, route.ts, route.ts]
- "ui_card": "card.tsx" | kind=code-symbol | source=src/components/ui/card.tsx:L1 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, page.tsx]
- "settings_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/profile/settings/page.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 2f6d845 revision 1, 3db2e43 version 2, 487cc56 version 4, auth.ts]
- "admin_catalogentryform": "CatalogEntryForm.tsx" | kind=code-symbol | source=src/components/admin/CatalogEntryForm.tsx:L1 | neighbors=[BrandOption, CatalogEntryData, CatalogEntryForm(), CatalogEntryFormProps, CatalogEntryType, ENDPOINT]
- "admin_productform": "ProductForm.tsx" | kind=code-symbol | source=src/components/admin/ProductForm.tsx:L1 | neighbors=[ImageUpload.tsx, ImageUpload(), Option, ProductForm(), ProductFormData, ProductFormProps]
- "categories_page": "page.tsx" | kind=code-symbol | source=src/app/(admin-panel)/admin/categories/page.tsx:L1 | neighbors=[AdminCategoriesPage(), ENDPOINT, index.ts, Brand, Category, Line]
- "shop_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/page.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 3db2e43 version 2, 487cc56 version 4, BenefitsMarquee.tsx, BenefitsMarquee()]
- "admin_page": "page.tsx" | kind=code-symbol | source=src/app/(admin-panel)/admin/page.tsx:L1 | neighbors=[AdminDashboardPage(), RANGES, statusLabels, CashFlowChart.tsx, CashFlowChart(), LogisticsDonut.tsx]
- "users_page": "page.tsx" | kind=code-symbol | source=src/app/(admin-panel)/admin/users/page.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, 2f6d845 revision 1, 3db2e43 version 2, 487cc56 version 4, ContactBadges.tsx, ContactBadges()]
- "admin_acquisitionform": "AcquisitionForm.tsx" | kind=code-symbol | source=src/components/admin/AcquisitionForm.tsx:L1 | neighbors=[AcquisitionData, AcquisitionForm(), num(), ImageUpload.tsx, ImageUpload(), acquisitions.ts]
- "admin_campaignform": "CampaignForm.tsx" | kind=code-symbol | source=src/components/admin/CampaignForm.tsx:L1 | neighbors=[CAMPAIGN_TYPE_OPTIONS, CampaignData, CampaignForm(), CampaignFormProps, CampaignType, numStr()]
- "profile_profilesettingsform": "ProfileSettingsForm.tsx" | kind=code-symbol | source=src/components/profile/ProfileSettingsForm.tsx:L1 | neighbors=[0a444d0 18/97/2026, 3db2e43 version 2, 487cc56 version 4, TiktokIcon.tsx, TiktokIcon(), WhatsappIcon.tsx]
- "admin_shalomdirectorytab": "ShalomDirectoryTab.tsx" | kind=code-symbol | source=src/components/admin/ShalomDirectoryTab.tsx:L1 | neighbors=[Contact, ShalomDirectoryTab(), tiktokUrl(), TiktokIcon.tsx, TiktokIcon(), WhatsappIcon.tsx]
- "campaigns_page": "page.tsx" | kind=code-symbol | source=src/app/(admin-panel)/admin/campaigns/page.tsx:L1 | neighbors=[CampaignItem, CampaignsPage(), CampaignTable(), formatWindow(), STATUS_LABELS, TYPE_LABELS]
- "lib_transformers": "transformers.ts" | kind=code-symbol | source=src/lib/transformers.ts:L1 | neighbors=[route.ts, route.ts, 0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 3db2e43 version 2, 487cc56 version 4]
- "checkout_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/checkout/page.tsx:L1 | neighbors=[CouponInput.tsx, AppliedCoupon, CouponInput(), ManualPaymentSection.tsx, ManualPaymentSection(), OrderSummary.tsx]
- "layout_header": "Header.tsx" | kind=code-symbol | source=src/components/layout/Header.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 487cc56 version 4, UserAvatar.tsx, UserAvatar(), AnimatedThemeToggle.tsx]
- "ui_card_card": "Card()" | kind=code-symbol | source=src/components/ui/card.tsx:L5 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, page.tsx]
- "ui_card_cardcontent": "CardContent()" | kind=code-symbol | source=src/components/ui/card.tsx:L64 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, page.tsx]
- "ui_input": "input.tsx" | kind=code-symbol | source=src/components/ui/input.tsx:L1 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, AdminHeader.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, ProductForm.tsx]
- "lib_api_guards": "api-guards.ts" | kind=code-symbol | source=src/lib/api-guards.ts:L1 | neighbors=[route.ts, route.ts, route.ts, route.ts, route.ts, 0a444d0 18/97/2026]
- "ui_select": "select.tsx" | kind=code-symbol | source=src/components/ui/select.tsx:L1 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, ProductForm.tsx]
- "admin_adminheader": "AdminHeader.tsx" | kind=code-symbol | source=src/components/admin/AdminHeader.tsx:L1 | neighbors=[AdminHeader(), AdminMobileNav.tsx, AdminMobileNav(), ThemeToggle.tsx, ThemeToggle(), avatar.tsx]
- "testreport_document": "TestSprite AI Testing Report (MCP)" | kind=entity | source=testsprite_tests/testsprite-mcp-test-report.md | neighbors=[PRD (referenciado, detallado en otro ch…, Raw Test Report Draft/Template (con pla…, Hallazgo: creacion de producto en panel…, Hallazgo: seleccion de rol por defecto …, Hallazgo: carrito de compras falla al a…, Hallazgo: errores de manejo de imagenes…]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-000.json

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
