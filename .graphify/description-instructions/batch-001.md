# Node Description Batch 2 of 30

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
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "ui_input_input": "Input()" | kind=code-symbol | source=src/components/ui/input.tsx:L5 | neighbors=[AcquisitionForm.tsx, AcquisitionsTab.tsx, AdminHeader.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, ProductForm.tsx]
- "orders_route": "route.ts" | kind=code-symbol | source=src/app/api/orders/route.ts:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 3db2e43 version 2, 487cc56 version 4, ef3a883 version 7, api-guards.ts]
- "plan_document": "Plan: La Tiendita de Blue (referenciado, detallado en otro chunk)" | kind=entity | source=docs/PLAN.md | neighbors=[Configuration (path alias @/*, remote i…, Modelo de Datos - BasicTechShop (refere…, Listado de Paginas - BasicTechShop (ref…, Autenticacion (registro username, Googl…, Bundles 'Combina y Ahorra' (referenciad…, Buy Me a Coffee (02.01): seccion desple…]
- "admin_crmpanel": "CrmPanel.tsx" | kind=code-symbol | source=src/components/admin/CrmPanel.tsx:L1 | neighbors=[CrmPanel(), CrmPanelProps, TIER_LABELS, button.tsx, Button(), card.tsx]
- "lib_auth": "auth.ts" | kind=code-symbol | source=src/lib/auth.ts:L1 | neighbors=[layout.tsx, route.ts, 0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 8b3e1a0 version 5, page.tsx]
- "separations_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/profile/separations/page.tsx:L1 | neighbors=[487cc56 version 4, SeparationBits.tsx, ProgressBar(), SemaphoreBadge(), SemaphoreLevel, ClientSeparationsPage()]
- "ui_alert_dialog": "alert-dialog.tsx" | kind=code-symbol | source=src/components/ui/alert-dialog.tsx:L1 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, 2982ca1 iniciar proyecto, page.tsx, page.tsx]
- "products_filtersidebar": "FilterSidebar.tsx" | kind=code-symbol | source=src/components/products/FilterSidebar.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 487cc56 version 4, FilterMobile.tsx, FilterSection.tsx, FilterSection()]
- "products_productcard": "ProductCard.tsx" | kind=code-symbol | source=src/components/products/ProductCard.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 3db2e43 version 2, 487cc56 version 4, FeaturedProducts.tsx, page.tsx]
- "ui_card_cardheader": "CardHeader()" | kind=code-symbol | source=src/components/ui/card.tsx:L18 | neighbors=[AcquisitionForm.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, page.tsx, ProductForm.tsx]
- "ui_card_cardtitle": "CardTitle()" | kind=code-symbol | source=src/components/ui/card.tsx:L31 | neighbors=[AcquisitionForm.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, page.tsx, ProductForm.tsx]
- "edit_page": "page.tsx" | kind=code-symbol | source=src/app/(admin-panel)/admin/products/[id]/edit/page.tsx:L1 | neighbors=[0a444d0 18/97/2026, 487cc56 version 4, CampaignForm.tsx, CAMPAIGN_TYPE_OPTIONS, CampaignData, CampaignForm()]
- "ui_dropdown_menu": "dropdown-menu.tsx" | kind=code-symbol | source=src/components/ui/dropdown-menu.tsx:L1 | neighbors=[AdminHeader.tsx, 2982ca1 iniciar proyecto, Header.tsx, page.tsx, utils.ts, cn()]
- "ui_label": "label.tsx" | kind=code-symbol | source=src/components/ui/label.tsx:L1 | neighbors=[AcquisitionForm.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, ProductForm.tsx, ShalomContactForm.tsx]
- "auth_registerform": "RegisterForm.tsx" | kind=code-symbol | source=src/components/auth/RegisterForm.tsx:L1 | neighbors=[GoogleButton.tsx, GoogleButton(), RegisterForm(), RegisterFormData, registerSchema, button.tsx]
- "lib_api_guards_requireadmin": "requireAdmin()" | kind=code-symbol | source=src/lib/api-guards.ts:L16 | neighbors=[route.ts, route.ts, route.ts, route.ts, route.ts, page.tsx]
- "lib_campaigns": "campaigns.ts" | kind=code-symbol | source=src/lib/campaigns.ts:L1 | neighbors=[3db2e43 version 2, route.ts, applyDiscountRules(), CouponValidation, getActiveAnnouncement(), getActiveBanners()]
- "ui_badge": "badge.tsx" | kind=code-symbol | source=src/components/ui/badge.tsx:L1 | neighbors=[AcquisitionsTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx, 2982ca1 iniciar proyecto]
- "admin_shalomcontactform": "ShalomContactForm.tsx" | kind=code-symbol | source=src/components/admin/ShalomContactForm.tsx:L1 | neighbors=[ShalomContactData, ShalomContactForm(), button.tsx, Button(), card.tsx, Card()]
- "apartar_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/products/[id]/apartar/page.tsx:L1 | neighbors=[ApartarPage(), ManualPaymentSection.tsx, ManualPaymentSection(), index.ts, Product, badge.tsx]
- "prd_document": "PRD (referenciado, detallado en otro chunk)" | kind=entity | source=docs/PRD.md | neighbors=[API Endpoints (7): Auth, Products, Cate…, Autenticacion (4.2): registro email/pas…, Categorias de Productos (8): PCs, Monit…, Plan: La Tiendita de Blue (referenciado…, Estados de Pedido (PRD): PENDING→CONFIR…, Estructura de Paginas (6): Publicas 6, …]
- "ui_card_carddescription": "CardDescription()" | kind=code-symbol | source=src/components/ui/card.tsx:L41 | neighbors=[AcquisitionForm.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, page.tsx, ProductForm.tsx]
- "ui_carousel": "carousel.tsx" | kind=code-symbol | source=src/components/ui/carousel.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, HeroBanner.tsx, utils.ts, cn(), button.tsx, Button()]
- "ui_table": "table.tsx" | kind=code-symbol | source=src/components/ui/table.tsx:L1 | neighbors=[AcquisitionsTab.tsx, ShalomDirectoryTab.tsx, page.tsx, page.tsx, 2982ca1 iniciar proyecto, page.tsx]
- "lib_reports_pdf": "reports-pdf.ts" | kind=code-symbol | source=src/lib/reports-pdf.ts:L1 | neighbors=[487cc56 version 4, BLUE, DeliveriesReport, DeliveryRow, downloadDeliveriesPdf(), downloadUsersPdf()]
- "reports_page": "page.tsx" | kind=code-symbol | source=src/app/(admin-panel)/admin/reports/page.tsx:L1 | neighbors=[487cc56 version 4, GradientText.tsx, GradientText(), reports-pdf.ts, DeliveriesReport, downloadDeliveriesPdf()]
- "ui_label_label": "Label()" | kind=code-symbol | source=src/components/ui/label.tsx:L8 | neighbors=[AcquisitionForm.tsx, CampaignForm.tsx, CatalogEntryForm.tsx, CrmPanel.tsx, ProductForm.tsx, ShalomContactForm.tsx]
- "home_herobanner": "HeroBanner.tsx" | kind=code-symbol | source=src/components/home/HeroBanner.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, 3db2e43 version 2, 487cc56 version 4, HeroBanner(), AnimatedContent.tsx, AnimatedContent()]
- "lib_analytics": "analytics.ts" | kind=code-symbol | source=src/lib/analytics.ts:L1 | neighbors=[page.tsx, CashFlowChart.tsx, LogisticsDonut.tsx, PeruHeatMap.tsx, 3db2e43 version 2, CashFlowPoint]
- "products_productdetail": "ProductDetail.tsx" | kind=code-symbol | source=src/components/products/ProductDetail.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 3db2e43 version 2, 487cc56 version 4, page.tsx, ProductDetail()]
- "profile_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/profile/page.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, auth.ts, prisma.ts, utils.ts, maskSensitive()]
- "stores_cart_store": "cart-store.ts" | kind=code-symbol | source=src/stores/cart-store.ts:L1 | neighbors=[page.tsx, page.tsx, 2982ca1 iniciar proyecto, 2f6d845 revision 1, 3db2e43 version 2, Header.tsx]
- "success_page": "page.tsx" | kind=code-symbol | source=src/app/(shop)/checkout/success/page.tsx:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, cart-store.ts, useCartStore, CheckoutSuccessPage(), shippingIcons]
- "ui_badge_badge": "Badge()" | kind=code-symbol | source=src/components/ui/badge.tsx:L28 | neighbors=[AcquisitionsTab.tsx, page.tsx, page.tsx, page.tsx, page.tsx, page.tsx]
- "ui_sheet": "sheet.tsx" | kind=code-symbol | source=src/components/ui/sheet.tsx:L1 | neighbors=[AdminHeader.tsx, AdminMobileNav.tsx, 2982ca1 iniciar proyecto, MobileNav.tsx, FilterMobile.tsx, utils.ts]
- "admin_adminmobilenav": "AdminMobileNav.tsx" | kind=code-symbol | source=src/components/admin/AdminMobileNav.tsx:L1 | neighbors=[AdminHeader.tsx, AdminMobileNav(), navigation, utils.ts, cn(), button.tsx]
- "manual_payments_page": "page.tsx" | kind=code-symbol | source=src/app/(admin-panel)/admin/manual-payments/page.tsx:L1 | neighbors=[0a444d0 18/97/2026, 487cc56 version 4, ContactBadges.tsx, ContactBadges(), ManualPaymentsPage(), PosOrder]
- "manualflow0602_document": "06.02 — Flujo de Compra Manual, POS y Boleta PDF" | kind=entity | source=docs/Boveda-Proyecto-Ecommerce/06-Flujos-De-Negocio-Y-Trazabilidad/[[06.02-Flujo de Compra Manual, POS y Boleta PDF]].md | neighbors=[Paso 1: Registro Manual back-office (Cr…, Arquitectura de Facturacion (Nubefact/I…, Paso 4: Emision Automatizada de Boleta …, Diseno del Comprobante PDF (QR dinamico…, 06.01 — Flujo de Compra por Pasarela Au…, 06 — Experiencia de Usuario y Checkout …]
- "products_filtermobile": "FilterMobile.tsx" | kind=code-symbol | source=src/components/products/FilterMobile.tsx:L1 | neighbors=[2982ca1 iniciar proyecto, FilterMobile(), FilterMobileProps, FilterSidebar.tsx, FilterSidebar(), index.ts]
- "products_route": "route.ts" | kind=code-symbol | source=src/app/api/products/route.ts:L1 | neighbors=[0a444d0 18/97/2026, 2982ca1 iniciar proyecto, 3db2e43 version 2, 487cc56 version 4, api-guards.ts, requireAdmin()]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: C:\Users\johna\Downloads\la-tiendita-de-blue\.graphify\description-instructions\batch-001.json

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
