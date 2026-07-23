# Node Description Batch 3 of 30

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
Write every description in Dutch (nl). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "separations_route": "route.ts" | kind=code-symbol | source=src/app/api/separations/route.ts:L1 | neighbors=[487cc56 version 4, api-guards.ts, requireAdmin(), requireUser(), campaigns.ts, applyDiscountRules()]
- "ui_select_select": "Select()" | kind=code-symbol | source=src/components/ui/select.tsx:L9 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, ProductForm.tsx]
- "ui_select_selectcontent": "SelectContent()" | kind=code-symbol | source=src/components/ui/select.tsx:L53 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, ProductForm.tsx]
- "ui_select_selectitem": "SelectItem()" | kind=code-symbol | source=src/components/ui/select.tsx:L103 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, ProductForm.tsx]
- "ui_select_selecttrigger": "SelectTrigger()" | kind=code-symbol | source=src/components/ui/select.tsx:L27 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, ProductForm.tsx]
- "ui_select_selectvalue": "SelectValue()" | kind=code-symbol | source=src/components/ui/select.tsx:L21 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, ProductForm.tsx]
- "auth_forcedresetform": "ForcedResetForm.tsx" | kind=code-symbol | source=src/components/auth/ForcedResetForm.tsx:L1 | neighbors=[ForcedResetForm(), ResetFormData, resetSchema, button.tsx, Button(), card.tsx]
- "auth_loginform": "LoginForm.tsx" | kind=code-symbol | source=src/components/auth/LoginForm.tsx:L1 | neighbors=[GoogleButton.tsx, GoogleButton(), LoginForm(), LoginFormData, loginSchema, button.tsx]
- "branch:repo:github.com/jhon719/LatienditadeBlue#main": "main" | kind=Branch | source=git | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 2ee7082 version 3, 2f6d845 revision 1, 3b141c8 16/07/2026, 3db2e43 version 2]
- "cart_cartsummary": "CartSummary.tsx" | kind=code-symbol | source=src/components/cart/CartSummary.tsx:L1 | neighbors=[CartSummary(), CartSummaryProps, pricing.ts, calculateBundleDiscount(), effectivePrice(), index.ts]
- "home_reviewssection": "ReviewsSection.tsx" | kind=code-symbol | source=src/components/home/ReviewsSection.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 487cc56 version 4, GradientText.tsx, GradientText(), UserAvatar.tsx]
- "layout_mobilenav": "MobileNav.tsx" | kind=code-symbol | source=src/components/layout/MobileNav.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, 487cc56 version 4, Header.tsx, links, MobileNav(), button.tsx]
- "lib_acquisitions": "acquisitions.ts" | kind=code-symbol | source=src/lib/acquisitions.ts:L1 | neighbors=[route.ts, AcquisitionForm.tsx, AcquisitionsTab.tsx, 487cc56 version 4, route.ts, ACQUISITION_MONTHS]
- "stores_products_store": "products-store.ts" | kind=code-symbol | source=src/stores/products-store.ts:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 487cc56 version 4, a16fe9a vaersion 8, FilterSidebar.tsx, page.tsx]
- "types_index_product": "Product" | kind=code-symbol | source=src/types/index.ts:L23 | neighbors=[ProductForm.tsx, page.tsx, page.tsx, FeaturedProducts.tsx, page.tsx, pricing.ts]
- "upload_route": "route.ts" | kind=code-symbol | source=src/app/api/upload/route.ts:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 3db2e43 version 2, 487cc56 version 4, ef3a883 version 7, auth.ts]
- "claudemd_document": "CLAUDE.md — Guia del Proyecto" | kind=entity | source=CLAUDE.md | neighbors=[Assets Locales (public/Imagenes, no ren…, Auth y Seguridad (NextAuth v5, RBAC, mu…, Organizacion de Componentes (src/compon…, Configuration (path alias @/*, remote i…, Capa de Datos (schema.prisma, seed.ts, …, Base de Datos Local (PostgreSQL 18, lat…]
- "inventory0503_document": "05.03 — Control de Inventario y Preventas" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/05-Panel-Administrativo-Y-POS/[[05.03-Control de Inventario y Preventas]].md | neighbors=[06.01 — Flujo de Compra por Pasarela Au…, 05.04 (referenciada como 'Logistica Int…, 05.01 — Dashboard, Analitica y UI/UX (n…, 02.01 (referenciada repetidamente como …, 05.02 — Bandeja POS de Aprobacion de Co…, 05 — Panel Administrativo y POS (indice…]
- "lib_boleta_pdf": "boleta-pdf.ts" | kind=code-symbol | source=src/lib/boleta-pdf.ts:L1 | neighbors=[487cc56 version 4, BLUE, BoletaOrder, downloadBoletaPdf(), GRAY, lastY()]
- "lib_campaign_admin": "campaign-admin.ts" | kind=code-symbol | source=src/lib/campaign-admin.ts:L1 | neighbors=[3db2e43 version 2, route.ts, announcementSchema, bannerSchema, CAMPAIGN_TYPES, campaignModel()]
- "lib_email": "email.ts" | kind=code-symbol | source=src/lib/email.ts:L1 | neighbors=[487cc56 version 4, route.ts, client(), isEmailEnabled(), layout(), OrderEmailData]
- "products_productreviews": "ProductReviews.tsx" | kind=code-symbol | source=src/components/products/ProductReviews.tsx:L1 | neighbors=[0a444d0 18/97/2026, page.tsx, UserAvatar.tsx, UserAvatar(), ProductReviews(), ReviewFormData]
- "profile_profilesidebar": "ProfileSidebar.tsx" | kind=code-symbol | source=src/components/profile/ProfileSidebar.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 487cc56 version 4, layout.tsx, UserAvatar.tsx, UserAvatar()]
- "react_bits_animatedcontent": "AnimatedContent.tsx" | kind=code-symbol | source=src/components/react-bits/AnimatedContent.tsx:L1 | neighbors=[page.tsx, 2982ca1 iniciar proyecto, BuyMeACoffee.tsx, CategoryTrends.tsx, FeaturedProducts.tsx, FollowUs.tsx]
- "ui_dialog": "dialog.tsx" | kind=code-symbol | source=src/components/ui/dialog.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, ImageLightbox.tsx, utils.ts, cn(), Dialog(), DialogClose()]
- "admin_contactbadges": "ContactBadges.tsx" | kind=code-symbol | source=src/components/admin/ContactBadges.tsx:L1 | neighbors=[ContactBadges(), TiktokIcon.tsx, TiktokIcon(), WhatsappIcon.tsx, WhatsappIcon(), social.ts]
- "admin_imageupload": "ImageUpload.tsx" | kind=code-symbol | source=src/components/admin/ImageUpload.tsx:L1 | neighbors=[AcquisitionForm.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, ImageUpload(), ImageUploadProps, UploadedImage]
- "avatar_route": "route.ts" | kind=code-symbol | source=src/app/api/user/avatar/route.ts:L1 | neighbors=[AVATAR_DIR, POST(), api-guards.ts, requireUser(), cloudinary.ts, isCloudinaryEnabled()]
- "brands_route": "route.ts" | kind=code-symbol | source=src/app/api/brands/route.ts:L1 | neighbors=[brandSchema, GET(), POST(), api-guards.ts, requireAdmin(), prisma.ts]
- "categories_route": "route.ts" | kind=code-symbol | source=src/app/api/categories/route.ts:L1 | neighbors=[categorySchema, GET(), POST(), api-guards.ts, requireAdmin(), prisma.ts]
- "checkout_ordersummary": "OrderSummary.tsx" | kind=code-symbol | source=src/components/checkout/OrderSummary.tsx:L1 | neighbors=[OrderSummary(), OrderSummaryProps, pricing.ts, calculateBundleDiscount(), effectivePrice(), index.ts]
- "datamodel_document": "Modelo de Datos - BasicTechShop (referenciado, detallado en otro chunk)" | kind=entity | source=docs/DATA-MODEL.md | neighbors=[Address (Direcciones), Estructura de API Routes (auth, users, …, Brand (Marcas), Category (Categorias), Plan: La Tiendita de Blue (referenciado…, Order (Pedidos)]
- "home_featuredproducts": "FeaturedProducts.tsx" | kind=code-symbol | source=src/components/home/FeaturedProducts.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 487cc56 version 4, GradientText.tsx, GradientText(), FeaturedProducts()]
- "home_quickaccesspanel": "QuickAccessPanel.tsx" | kind=code-symbol | source=src/components/home/QuickAccessPanel.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 487cc56 version 4, QuickAccessPanel(), quickLinks, social.ts]
- "lib_pricing": "pricing.ts" | kind=code-symbol | source=src/lib/pricing.ts:L1 | neighbors=[CartSummary.tsx, OrderSummary.tsx, page.tsx, 3db2e43 version 2, BundleDiscount, calculateBundleDiscount()]
- "lib_separations": "separations.ts" | kind=code-symbol | source=src/lib/separations.ts:L1 | neighbors=[487cc56 version 4, computeBalance(), computeSemaphore(), defaultDueDate(), Semaphore, SemaphoreLevel]
- "lib_separations_server": "separations-server.ts" | kind=code-symbol | source=src/lib/separations-server.ts:L1 | neighbors=[487cc56 version 4, route.ts, separations.ts, computeBalance(), computeSemaphore(), Db]
- "mercadopago_route": "route.ts" | kind=code-symbol | source=src/app/api/webhook/mercadopago/route.ts:L1 | neighbors=[0a444d0 18/97/2026, 3db2e43 version 2, 487cc56 version 4, api-guards.ts, requireUser(), mercadopago.ts]
- "payments_route": "route.ts" | kind=code-symbol | source=src/app/api/separations/[id]/payments/route.ts:L1 | neighbors=[487cc56 version 4, api-guards.ts, requireAdmin(), requireUser(), prisma.ts, separations.ts]
- "prisma_seed": "seed.ts" | kind=code-symbol | source=prisma/seed.ts:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 487cc56 version 4, adapter, ANIMES_DIR, LINEAS_DIR]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-002.json

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
