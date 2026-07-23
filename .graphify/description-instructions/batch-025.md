# Node Description Batch 26 of 30

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

- "products_filtersection_filteroption": "FilterOption" | kind=code-symbol | source=src/components/products/FilterSection.tsx:L8 | neighbors=[FilterSection.tsx]
- "products_filtersection_filtersectionprops": "FilterSectionProps" | kind=code-symbol | source=src/components/products/FilterSection.tsx:L15 | neighbors=[FilterSection.tsx]
- "products_filtersidebar_filtersidebarprops": "FilterSidebarProps" | kind=code-symbol | source=src/components/products/FilterSidebar.tsx:L10 | neighbors=[FilterSidebar.tsx]
- "products_filtersidebar_status_options": "STATUS_OPTIONS" | kind=code-symbol | source=src/components/products/FilterSidebar.tsx:L15 | neighbors=[FilterSidebar.tsx]
- "products_filtersidebar_type_options": "TYPE_OPTIONS" | kind=code-symbol | source=src/components/products/FilterSidebar.tsx:L22 | neighbors=[FilterSidebar.tsx]
- "products_page_adminproductspage": "AdminProductsPage()" | kind=code-symbol | source=src/app/(admin-panel)/admin/products/page.tsx:L94 | neighbors=[page.tsx]
- "products_page_category": "Category" | kind=code-symbol | source=src/app/(admin-panel)/admin/products/page.tsx:L47 | neighbors=[page.tsx]
- "products_page_productscontent": "ProductsContent()" | kind=code-symbol | source=src/app/(shop)/products/page.tsx:L26 | neighbors=[page.tsx]
- "products_page_productspage": "ProductsPage()" | kind=code-symbol | source=src/app/(shop)/products/page.tsx:L253 | neighbors=[page.tsx]
- "products_page_productspageskeleton": "ProductsPageSkeleton()" | kind=code-symbol | source=src/app/(shop)/products/page.tsx:L223 | neighbors=[page.tsx]
- "products_page_productsskeleton": "ProductsSkeleton()" | kind=code-symbol | source=src/app/(admin-panel)/admin/products/page.tsx:L60 | neighbors=[page.tsx]
- "products_page_statusbadge": "statusBadge" | kind=code-symbol | source=src/app/(admin-panel)/admin/products/page.tsx:L53 | neighbors=[page.tsx]
- "products_pagination_paginationprops": "PaginationProps" | kind=code-symbol | source=src/components/products/Pagination.tsx:L7 | neighbors=[Pagination.tsx]
- "products_pricefilter_pricefilterprops": "PriceFilterProps" | kind=code-symbol | source=src/components/products/PriceFilter.tsx:L8 | neighbors=[PriceFilter.tsx]
- "products_productbundle_productbundleprops": "ProductBundleProps" | kind=code-symbol | source=src/components/products/ProductBundle.tsx:L12 | neighbors=[ProductBundle.tsx]
- "products_productcard_offerbadge": "OfferBadge()" | kind=code-symbol | source=src/components/products/ProductCard.tsx:L20 | neighbors=[ProductCard.tsx]
- "products_productcard_productcardprops": "ProductCardProps" | kind=code-symbol | source=src/components/products/ProductCard.tsx:L13 | neighbors=[ProductCard.tsx]
- "products_productcard_statusbadge": "StatusBadge()" | kind=code-symbol | source=src/components/products/ProductCard.tsx:L31 | neighbors=[ProductCard.tsx]
- "products_productdetail_productdetailprops": "ProductDetailProps" | kind=code-symbol | source=src/components/products/ProductDetail.tsx:L25 | neighbors=[ProductDetail.tsx]
- "products_productgallery_productgalleryprops": "ProductGalleryProps" | kind=code-symbol | source=src/components/products/ProductGallery.tsx:L7 | neighbors=[ProductGallery.tsx]
- "products_productgrid_productgridprops": "ProductGridProps" | kind=code-symbol | source=src/components/products/ProductGrid.tsx:L9 | neighbors=[ProductGrid.tsx]
- "products_productreviews_reviewformdata": "ReviewFormData" | kind=code-symbol | source=src/components/products/ProductReviews.tsx:L22 | neighbors=[ProductReviews.tsx]
- "products_productreviews_reviewschema": "reviewSchema" | kind=code-symbol | source=src/components/products/ProductReviews.tsx:L14 | neighbors=[ProductReviews.tsx]
- "products_productreviews_starsinput": "StarsInput()" | kind=code-symbol | source=src/components/products/ProductReviews.tsx:L24 | neighbors=[ProductReviews.tsx]
- "products_route_createproductschema": "createProductSchema" | kind=code-symbol | source=src/app/api/products/route.ts:L105 | neighbors=[route.ts]
- "products_route_get": "GET()" | kind=code-symbol | source=src/app/api/products/route.ts:L10 | neighbors=[route.ts]
- "products_route_post": "POST()" | kind=code-symbol | source=src/app/api/products/route.ts:L122 | neighbors=[route.ts]
- "products_sortselect_sortselectprops": "SortSelectProps" | kind=code-symbol | source=src/components/products/SortSelect.tsx:L11 | neighbors=[SortSelect.tsx]
- "profile_avataruploader_avataruploaderprops": "AvatarUploaderProps" | kind=code-symbol | source=src/components/profile/AvatarUploader.tsx:L9 | neighbors=[AvatarUploader.tsx]
- "profile_layout_profilelayout": "ProfileLayout()" | kind=code-symbol | source=src/app/(shop)/profile/layout.tsx:L6 | neighbors=[layout.tsx]
- "profile_page_profilepage": "ProfilePage()" | kind=code-symbol | source=src/app/(shop)/profile/page.tsx:L19 | neighbors=[page.tsx]
- "profile_profilemobilenav_navigation": "navigation" | kind=code-symbol | source=src/components/profile/ProfileMobileNav.tsx:L9 | neighbors=[ProfileMobileNav.tsx]
- "profile_profilesettingsform_passwordformdata": "PasswordFormData" | kind=code-symbol | source=src/components/profile/ProfileSettingsForm.tsx:L70 | neighbors=[ProfileSettingsForm.tsx]
- "profile_profilesettingsform_passwordschema": "passwordSchema" | kind=code-symbol | source=src/components/profile/ProfileSettingsForm.tsx:L57 | neighbors=[ProfileSettingsForm.tsx]
- "profile_profilesettingsform_profilesettingsformprops": "ProfileSettingsFormProps" | kind=code-symbol | source=src/components/profile/ProfileSettingsForm.tsx:L72 | neighbors=[ProfileSettingsForm.tsx]
- "profile_profilesettingsform_settingsformdata": "SettingsFormData" | kind=code-symbol | source=src/components/profile/ProfileSettingsForm.tsx:L55 | neighbors=[ProfileSettingsForm.tsx]
- "profile_profilesettingsform_settingsschema": "settingsSchema" | kind=code-symbol | source=src/components/profile/ProfileSettingsForm.tsx:L30 | neighbors=[ProfileSettingsForm.tsx]
- "profile_profilesidebar_navigation": "navigation" | kind=code-symbol | source=src/components/profile/ProfileSidebar.tsx:L12 | neighbors=[ProfileSidebar.tsx]
- "profile_route_get": "GET()" | kind=code-symbol | source=src/app/api/user/profile/route.ts:L7 | neighbors=[route.ts]
- "profile_route_patch": "PATCH()" | kind=code-symbol | source=src/app/api/user/profile/route.ts:L63 | neighbors=[route.ts]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-025.json

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
