# Node Description Batch 17 of 30

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

- "testsprite_tests_tc008_shopping_cart_operations": "TC008_Shopping_Cart_Operations.py" | kind=code-symbol | source=testsprite_tests/TC008_Shopping_Cart_Operations.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()]
- "testsprite_tests_tc009_checkout_flow_success": "TC009_Checkout_Flow_Success.py" | kind=code-symbol | source=testsprite_tests/TC009_Checkout_Flow_Success.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()]
- "testsprite_tests_tc010_checkout_flow_payment_failure_handling": "TC010_Checkout_Flow_Payment_Failure_Handling.py" | kind=code-symbol | source=testsprite_tests/TC010_Checkout_Flow_Payment_Failure_Handling.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()]
- "testsprite_tests_tc011_user_profile_management_crud": "TC011_User_Profile_Management_CRUD.py" | kind=code-symbol | source=testsprite_tests/TC011_User_Profile_Management_CRUD.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()]
- "testsprite_tests_tc012_admin_panel_product_crud_operations": "TC012_Admin_Panel_Product_CRUD_Operations.py" | kind=code-symbol | source=testsprite_tests/TC012_Admin_Panel_Product_CRUD_Operations.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()]
- "testsprite_tests_tc013_admin_panel_user_management_and_role_assignments": "TC013_Admin_Panel_User_Management_and_Role_Assignments.py" | kind=code-symbol | source=testsprite_tests/TC013_Admin_Panel_User_Management_and_Role_Assignments.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()]
- "testsprite_tests_tc014_api_endpoint_response_and_error_handling": "TC014_API_Endpoint_Response_and_Error_Handling.py" | kind=code-symbol | source=testsprite_tests/TC014_API_Endpoint_Response_and_Error_Handling.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()]
- "testsprite_tests_tc015_responsive_design_verification": "TC015_Responsive_Design_Verification.py" | kind=code-symbol | source=testsprite_tests/TC015_Responsive_Design_Verification.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()]
- "testsprite_tests_tc016_database_integrity_and_relational_constraints": "TC016_Database_Integrity_and_Relational_Constraints.py" | kind=code-symbol | source=testsprite_tests/TC016_Database_Integrity_and_Relational_Constraints.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()]
- "testsprite_tests_tc017_performance_and_seo_checks": "TC017_Performance_and_SEO_Checks.py" | kind=code-symbol | source=testsprite_tests/TC017_Performance_and_SEO_Checks.py:L1 | neighbors=[2982ca1 iniciar proyecto, run_test()]
- "types_index_announcementview": "AnnouncementView" | kind=code-symbol | source=src/types/index.ts:L122 | neighbors=[AnnouncementBar.tsx, index.ts]
- "types_index_bannerview": "BannerView" | kind=code-symbol | source=src/types/index.ts:L113 | neighbors=[HeroBanner.tsx, index.ts]
- "types_index_orderstatustype": "OrderStatusType" | kind=code-symbol | source=src/types/index.ts:L14 | neighbors=[page.tsx, index.ts]
- "types_index_orderview": "OrderView" | kind=code-symbol | source=src/types/index.ts:L152 | neighbors=[transformers.ts, index.ts]
- "types_index_productstatus": "ProductStatus" | kind=code-symbol | source=src/types/index.ts:L3 | neighbors=[FilterSidebar.tsx, index.ts]
- "types_index_producttype": "ProductType" | kind=code-symbol | source=src/types/index.ts:L4 | neighbors=[FilterSidebar.tsx, index.ts]
- "types_index_shippingtype": "ShippingType" | kind=code-symbol | source=src/types/index.ts:L11 | neighbors=[page.tsx, index.ts]
- "types_next_auth_d_jwt": "JWT" | kind=code-symbol | source=src/types/next-auth.d.ts:L22 | neighbors=[next-auth.d.ts, DefaultJWT]
- "types_next_auth_d_user": "User" | kind=code-symbol | source=src/types/next-auth.d.ts:L14 | neighbors=[next-auth.d.ts, DefaultUser]
- "ui_avatar_avatar": "Avatar()" | kind=code-symbol | source=src/components/ui/avatar.tsx:L8 | neighbors=[AdminHeader.tsx, avatar.tsx]
- "ui_avatar_avatarfallback": "AvatarFallback()" | kind=code-symbol | source=src/components/ui/avatar.tsx:L37 | neighbors=[AdminHeader.tsx, avatar.tsx]
- "ui_badge_badgevariants": "badgeVariants" | kind=code-symbol | source=src/components/ui/badge.tsx:L7 | neighbors=[badge.tsx, Badge()]
- "ui_card_cardfooter": "CardFooter()" | kind=code-symbol | source=src/components/ui/card.tsx:L74 | neighbors=[ForcedResetForm.tsx, card.tsx]
- "ui_carousel_carousel": "Carousel()" | kind=code-symbol | source=src/components/ui/carousel.tsx:L45 | neighbors=[HeroBanner.tsx, carousel.tsx]
- "ui_dialog_dialog": "Dialog()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L9 | neighbors=[ImageLightbox.tsx, dialog.tsx]
- "ui_dialog_dialogcontent": "DialogContent()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L49 | neighbors=[ImageLightbox.tsx, dialog.tsx]
- "ui_dialog_dialogtitle": "DialogTitle()" | kind=code-symbol | source=src/components/ui/dialog.tsx:L106 | neighbors=[ImageLightbox.tsx, dialog.tsx]
- "ui_field_field": "Field" | kind=code-symbol | source=src/components/ui/field.tsx:L16 | neighbors=[RegisterForm.tsx, field.tsx]
- "ui_field_fielddescription": "FieldDescription" | kind=code-symbol | source=src/components/ui/field.tsx:L43 | neighbors=[RegisterForm.tsx, field.tsx]
- "ui_field_fielderror": "FieldError" | kind=code-symbol | source=src/components/ui/field.tsx:L55 | neighbors=[RegisterForm.tsx, field.tsx]
- "ui_field_fieldgroup": "FieldGroup" | kind=code-symbol | source=src/components/ui/field.tsx:L4 | neighbors=[RegisterForm.tsx, field.tsx]
- "ui_field_fieldlabel": "FieldLabel" | kind=code-symbol | source=src/components/ui/field.tsx:L28 | neighbors=[RegisterForm.tsx, field.tsx]
- "ui_scroll_area_scrollarea": "ScrollArea()" | kind=code-symbol | source=src/components/ui/scroll-area.tsx:L8 | neighbors=[ProfileMobileNav.tsx, scroll-area.tsx]
- "ui_scroll_area_scrollbar": "ScrollBar()" | kind=code-symbol | source=src/components/ui/scroll-area.tsx:L31 | neighbors=[ProfileMobileNav.tsx, scroll-area.tsx]
- "ui_slider_slider": "Slider()" | kind=code-symbol | source=src/components/ui/slider.tsx:L8 | neighbors=[PriceFilter.tsx, slider.tsx]
- "20260719050630_add_bundle_discount_migration": "migration.sql" | kind=code-symbol | source=prisma/migrations/20260719050630_add_bundle_discount/migration.sql:L1 | neighbors=[3db2e43 version 2]
- "20260719144924_add_campaigns_crm_migration_announcements": "announcements" | kind=code-symbol | source=prisma/migrations/20260719144924_add_campaigns_crm/migration.sql:L43 | neighbors=[migration.sql]
- "20260719144924_add_campaigns_crm_migration_banners": "banners" | kind=code-symbol | source=prisma/migrations/20260719144924_add_campaigns_crm/migration.sql:L24 | neighbors=[migration.sql]
- "20260719210752_add_user_department_migration": "migration.sql" | kind=code-symbol | source=prisma/migrations/20260719210752_add_user_department/migration.sql:L1 | neighbors=[3db2e43 version 2]
- "20260720054745_add_product_type_migration": "migration.sql" | kind=code-symbol | source=prisma/migrations/20260720054745_add_product_type/migration.sql:L1 | neighbors=[487cc56 version 4]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-016.json

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
