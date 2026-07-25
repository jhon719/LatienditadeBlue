# Graph Report - .  (2026-07-25)

## Corpus Check
- Large corpus: 1536 files · ~282,669 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 1211 nodes · 3068 edges · 57 communities detected
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output
- Edge kinds: imports: 924 · contains: 755 · imports_from: 576 · MODIFIES: 373 · conceptually_related_to: 187 · references: 108 · calls: 51 · shares_data_with: 36 · ON_BRANCH: 18 · PARENT_OF: 17 · cites: 7 · rationale_for: 5 · semantically_similar_to: 5 · implements: 4 · inherits: 2


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 1536 · Candidates: 1705
- Excluded: 33 untracked · 59711 ignored · 6 sensitive · 57 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `6688ce2`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `Button()` - 58 edges
2. `cn()` - 46 edges
3. `Card()` - 30 edges
4. `CardContent()` - 30 edges
5. `TestSprite AI Testing Report (MCP)` - 27 edges
6. `Input()` - 26 edges
7. `Plan: La Tiendita de Blue (referenciado, detallado en otro chunk)` - 24 edges
8. `CardHeader()` - 22 edges
9. `CardTitle()` - 22 edges
10. `requireAdmin()` - 20 edges

## Surprising Connections (you probably didn't know these)
- `Hallazgo: creacion de producto en panel admin falla con datos validos` --references--> `src/app/(admin-panel)/admin/products/new/page.tsx`  [EXTRACTED]
  testsprite_tests/testsprite-mcp-test-report.md → src/app/(admin-panel)/admin/products/new/page.tsx
- `Hallazgo: carrito de compras falla al agregar un segundo producto` --references--> `cart-store.ts (referenciado, detallado en otro chunk)`  [EXTRACTED]
  testsprite_tests/testsprite-mcp-test-report.md → src/stores/cart-store.ts
- `Hallazgo critico: RBAC no aplicado, clientes acceden al panel admin` --references--> `src/middleware.ts`  [EXTRACTED]
  testsprite_tests/testsprite-mcp-test-report.md → src/middleware.ts
- `Trazabilidad Antifraude (processCode unico + relacion obligatoria Order-PaymentProof)` --shares_data_with--> `Auth y Seguridad (NextAuth v5, RBAC, mustChangePassword, idempotencyKey, processCode)`  [INFERRED]
  docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.03-Modelo de Base de Datos Prisma SQL]].md → CLAUDE.md
- `Diseno del Comprobante PDF (QR dinamico, hash SHA-256, marca de agua, sello digital)` --shares_data_with--> `Modelo de Negocio (catalogo dual, pago dual, envios WhatsApp, preventas/separaciones, trazabilidad)`  [INFERRED]
  docs/Boveda-Proyecto-Ecommerce/06-Flujos-De-Negocio-Y-Trazabilidad/[[06.02-Flujo de Compra Manual, POS y Boleta PDF]].md → README.md

## Hyperedges (group relationships)
- **Documentos y config con identidad 'BasicTechShop' legado vs 'La Tiendita de Blue' actual** — dockercompose_postgres_service, claudemd_document, readme_document [INFERRED 0.60]
- **Tension arquitectonica: ejemplos de Server Actions en la boveda vs. regla vigente de solo Route Handlers** — claudemd_rule_no_server_actions, profiles0203_getpublicprofile_action, profiles0203_adminresetpassword_action, manualpayment0302_admin_approval_flow, security0402_checklist [INFERRED 0.60]
- **Drift del esquema Order/OrderStatus entre multiples notas de la boveda (01.03, 03.01, 03.02)** — dbmodel0103_model_order, mercadopago0301_order_model, manualpayment0302_order_model [INFERRED 0.65]
- **Bug de carrito bloquea flujo completo de checkout** — testreport_finding_cart_broken, testreport_tc008_cart_operations, testreport_tc009_checkout_success, code_cart_store_ts [INFERRED 0.85]
- **Cluster de fallos CRUD en el panel admin detectados por TestSprite** — testreport_finding_admin_product_creation_fails, testreport_finding_admin_role_selection_bug, code_admin_products_new_page, plan_panel_admin [INFERRED 0.70]

## Communities

### Community 6 - "Acquisitions & Shalom API Routes"
Cohesion: 0.04
Nodes (4): eslintConfig, config, registerSchema, 2982ca1 iniciar proyecto

### Community 4 - "Admin Order & Batch Tracking"
Cohesion: 0.06
Nodes (37): csp, securityHeaders, nextConfig, generatedPasswords, seedPassword(), pool, adapter, prisma (+29 more)

### Community 39 - "Transactional Email Sending"
Cohesion: 0.38
Nodes (10): users, accounts, categories, lines, brands, products, reviews, orders (+2 more)

### Community 20 - "Campaigns & Coupon Validation"
Cohesion: 0.16
Nodes (15): OrderSummaryProps, OrderSummary(), ProductBundleProps, ProductBundle(), ProductDetailProps, ProductDetail(), effectivePrice(), PricingItem (+7 more)

### Community 45 - "Seed Script & Image Scan"
Cohesion: 0.36
Nodes (7): banners, announcements, discount_rules, coupons, orders, categories, lines

### Community 50 - "Root Layout & Providers"
Cohesion: 0.67
Nodes (5): import_batches, import_batch_items, preorder_reservations, products, users

### Community 8 - "Campaign List Page"
Cohesion: 0.08
Nodes (13): acquisitions, shalom_contacts, Params, itemSchema, createSchema, Params, schema, Params (+5 more)

### Community 55 - "Stats Counter Animation"
Cohesion: 1.00
Nodes (2): lines, brands

### Community 56 - "Checkout Success Page"
Cohesion: 1.00
Nodes (2): separation_payments, preorder_reservations

### Community 1 - "Campaign & Catalog Forms"
Cohesion: 0.06
Nodes (33): ENDPOINT, ProductOpt, LineItem, UserOpt, BatchOpt, CampaignType, CAMPAIGN_TYPE_OPTIONS, Option (+25 more)

### Community 10 - "Footer & Social Icons"
Cohesion: 0.10
Nodes (20): CampaignItem, STATUS_LABELS, TYPE_LABELS, WhatsappIcon(), SortSelectProps, SortSelect(), settingsSchema, SettingsFormData (+12 more)

### Community 0 - "Admin CRM Dashboard Widgets"
Cohesion: 0.10
Nodes (30): ENDPOINT, Separation, Batch, STATUS_LABEL, Category, statusBadge, AdminUser, Acquisition (+22 more)

### Community 19 - "Home Marquee Components"
Cohesion: 0.16
Nodes (11): navigation, AdminSidebar(), CartItemProps, CartItem(), CartSummaryProps, CartSummary(), links, navigation (+3 more)

### Community 5 - "Auth Layout & Test Config"
Cohesion: 0.06
Nodes (32): Batch, Payment, Separation, STATUS_LABEL, PAY_BADGE, money(), SeparationDetailPage(), OrderDetail (+24 more)

### Community 9 - "Admin CRM Input Forms"
Cohesion: 0.06
Nodes (29): PosCustomer, PosOrder, PosSeparationPayment, QueueItem, money(), ManualPaymentsPage(), AdminOrder, orderStatusBadge (+21 more)

### Community 7 - "Auth Forms & Register Flow"
Cohesion: 0.07
Nodes (28): statusLabels, RANGES, profileSchema, TooltipPayload, CashFlowChart(), SLICE_STYLE, DonutTooltipPayload, LogisticsDonut() (+20 more)

### Community 22 - "Plan de Implementacion Resumen"
Cohesion: 0.14
Nodes (13): UsersReport, RGB, NAVY, BLUE, YELLOW, GRAY, drawHeader(), drawFooter() (+5 more)

### Community 13 - "Separations Balance Logic"
Cohesion: 0.08
Nodes (13): schema, FEATURES, AuthShell(), ForcedResetForm(), LoginForm(), RegisterForm(), isGoogleEnabled(), providers (+5 more)

### Community 11 - "Product Admin API Routes"
Cohesion: 0.15
Nodes (19): num(), AcquisitionForm(), TIER_LABELS, CrmPanelProps, StatsCardProps, resetSchema, ResetFormData, ManualPaymentSectionProps (+11 more)

### Community 38 - "Checkout Coupon & Shipping"
Cohesion: 0.23
Nodes (8): SHIPPING_OPTIONS, checkoutSchema, CheckoutFormData, AppliedCoupon, CouponInputProps, CouponInput(), RadioGroup(), RadioGroupItem()

### Community 52 - "Product Card & Grid"
Cohesion: 0.33
Nodes (2): shippingLabels, shippingIcons

### Community 12 - "Boleta PDF Generation"
Cohesion: 0.08
Nodes (26): AnnouncementBar(), Footer(), Header(), benefits, TopBar(), FilterOption, FilterSectionProps, FilterSection() (+18 more)

### Community 23 - "Estructura de Directorios Next.js"
Cohesion: 0.21
Nodes (10): GradientText(), BuyMeACoffee(), CategoryTrends(), FeaturedProducts(), LinesSection(), ReviewsSection(), BluetBubble(), AnimatedContentProps (+2 more)

### Community 36 - "Legal Pages (Terms/Privacy)"
Cohesion: 0.19
Nodes (6): metadata, metadata, metadata, LegalSection, LegalPageProps, LegalPage()

### Community 2 - "UI Utilities & Marquee"
Cohesion: 0.06
Nodes (25): lineSchema, ImageLightboxProps, Marquee(), BENEFITS, BenefitsMarquee(), PaginationProps, buildPageList(), Pagination() (+17 more)

### Community 28 - "Hero Banner & Carousel"
Cohesion: 0.18
Nodes (10): UserAvatarProps, UserAvatar(), reviewSchema, ReviewFormData, ProductReviews(), AvatarUploaderProps, AvatarUploader(), maskSensitive() (+2 more)

### Community 14 - "TestSprite Findings Report"
Cohesion: 0.09
Nodes (18): Params, updateSchema, Params, STOCK_HELD, actionSchema, schema, crmSchema, updateProductSchema (+10 more)

### Community 33 - "Avatar Upload & Cloudinary"
Cohesion: 0.19
Nodes (10): createSchema, ACQUISITION_MONTHS, MONTH_ORDER, AcquisitionInputs, AcquisitionDerived, r2(), computeAcquisition(), yen() (+2 more)

### Community 21 - "Deliveries PDF Report"
Cohesion: 0.14
Nodes (14): schema, SHIPPING_COSTS, createOrderSchema, requireUser(), Schedulable, isCampaignLive(), liveCampaignWhere(), getActiveBanners() (+6 more)

### Community 18 - "Admin Sidebar & Login"
Cohesion: 0.12
Nodes (17): Params, schema, createSchema, Db, recalcSeparation(), SeparationWithRelations, serializeSeparation(), SEPARATION_INCLUDE (+9 more)

### Community 16 - "Admin Dashboard Charts"
Cohesion: 0.09
Nodes (17): brandSchema, categorySchema, VERIFIED_STATUSES, hasVerifiedPurchase(), reviewSchema, POST(), ProductWithRelations, transformProduct() (+9 more)

### Community 44 - "Estructura de Paginas y Rutas"
Cohesion: 0.31
Nodes (5): schema, isMercadoPagoEnabled(), getClient(), getPreferenceClient(), getPaymentClient()

### Community 46 - "Stock Release Cron Job"
Cohesion: 0.32
Nodes (4): metadata, SessionProviderProps, SessionProvider(), ThemeProvider()

### Community 3 - "Admin Header & Theme Toggle"
Cohesion: 0.07
Nodes (23): navigation, AdminMobileNav(), AnimatedThemeToggle(), navLinks, MobileNav(), ThemeToggle(), FilterMobileProps, FilterMobile() (+15 more)

### Community 31 - "Order Summary & Pricing"
Cohesion: 0.20
Nodes (10): GoogleButton(), loginSchema, LoginFormData, registerSchema, RegisterFormData, FieldGroup, Field, FieldLabel (+2 more)

### Community 51 - "Cart & Checkout Test Findings"
Cohesion: 0.40
Nodes (3): CountUpProps, CountUp(), StatsBand()

### Community 32 - "Quick Access & Magnetic Button"
Cohesion: 0.25
Nodes (9): SocialIcon(), SOCIAL_BG, TiktokIcon(), FollowUs(), ManchasStoreBanner(), ManchasStoreVerticals(), SocialPlatform, SocialLink (+1 more)

### Community 17 - "Product Filter Sidebar & Store"
Cohesion: 0.12
Nodes (18): HeroBanner(), MagneticButtonProps, MagneticButton(), CarouselApi, UseCarouselParameters, CarouselOptions, CarouselPlugin, CarouselProps (+10 more)

### Community 49 - "Campaigns & Discounts Migration"
Cohesion: 0.33
Nodes (5): quickLinks, QuickAccessPanel(), SpotlightCardProps, SpotlightCard(), whatsappChatUrl()

### Community 48 - "Mercado Pago Client Setup"
Cohesion: 0.29
Nodes (4): ProductCardProps, ProductCard(), ProductGridProps, ProductGrid()

### Community 34 - "Acquisitions Cost Calculation"
Cohesion: 0.32
Nodes (12): client(), send(), layout(), orderRow(), OrderEmailData, SHIPPING_LABELS, sendOrderReceivedEmail(), sendPaymentApprovedEmail() (+4 more)

### Community 53 - "Git Commit History"
Cohesion: 0.33
Nodes (5): Session, User, DefaultUser, JWT, DefaultJWT

### Community 30 - "Peru Heat Map Component"
Cohesion: 0.17
Nodes (16): CLAUDE.md — Guia del Proyecto, Organizacion de Componentes (src/components/), Capa de Datos (schema.prisma, seed.ts, prisma.ts, transformers.ts, types/index.ts), Assets Locales (public/Imagenes, no renombrar), Styling System (Tailwind v4, paleta hex, Bebas Neue/Montserrat), Regla: no usar Modales, usar paginas dedicadas para formularios, Regla: no usar Server Actions, usar Route Handlers, Regla: manejo de estado global con Zustand (+8 more)

### Community 43 - "Modelo de Datos (Entidades)"
Cohesion: 0.24
Nodes (10): Project Overview: e-commerce peruano de figuras coleccionables, Base de Datos Local (PostgreSQL 18, latiendita_blue, usuarios seed), README.md — La Tiendita de Blue, Funcionalidades: Tienda Publica, Stack Tecnologico (tabla), Requisitos e Instalacion (Node 20+, Postgres 18, npm install, migrate, seed), Scripts Disponibles (dev/build/start/lint/db:seed/db:migrate), Estructura del Proyecto (arbol src/) (+2 more)

### Community 27 - "Politicas Legales y Envios"
Cohesion: 0.13
Nodes (17): Auth y Seguridad (NextAuth v5, RBAC, mustChangePassword, idempotencyKey, processCode), Modelo de Datos (listado de entidades Prisma), 01.03 — Modelo de Base de Datos Prisma SQL, Politica de Datos Privados vs Publicos (firstName/lastName/dni nunca expuestos), Trazabilidad Antifraude (processCode unico + relacion obligatoria Order-PaymentProof), 02.02 — Galeria Interactiva y Detalle de Producto, Arquitectura de 5 Bloques de la Interfaz (Layout), Bloque 1: <ProductGallery/> (zoom hover, carrusel miniaturas, next/image priority) (+9 more)

### Community 40 - "Core DB Migration Schema"
Cohesion: 0.25
Nodes (11): Configuration (path alias @/*, remote image patterns, build de deploy), Variables de Entorno (tabla .env), Despliegue (build prisma generate && next build, Vercel/Neon), 02.06 — Autenticacion Segura con Google y NextAuth v5, Configuracion Google Cloud Console (OAuth consent, origenes/redirect URIs, dominio latienditadeblue.org.pe), Configuracion .env (GOOGLE_CLIENT_ID/SECRET, NEXTAUTH_SECRET, NEXTAUTH_URL), 03.01 — Pasarela Automatizada Mercado Pago, Flujo E2E de Pago (Checkout -> Preference -> Pago -> Webhook -> Estado PAID/FAILED) (+3 more)

### Community 35 - "Preventas y Separaciones"
Cohesion: 0.21
Nodes (13): Modelo de Negocio (catalogo dual, pago dual, envios WhatsApp, preventas/separaciones, trazabilidad), 05 — Panel Administrativo y POS (indice de seccion), 05.03 — Control de Inventario y Preventas, Gestion de Variantes de Producto (Nuevo/Sellado, Loose, Caja Danada) con SKU unico, Visor Dual de Stock (Fisico inmediato vs Transito/Lotes Aduanas), Motor de Preventas (adelanto, saldo, ETA, semaforo de cobranzas, cancelacion), Alertas Automaticas de Low Stock, 05.07 — Motor Avanzado de Separaciones, Plazos y Pagos Fraccionados (+5 more)

### Community 25 - "Auth, Seguridad y Modelo BD"
Cohesion: 0.13
Nodes (17): Funcionalidades: Panel de Administracion, Adicionales — Desglose Detallado de Directorios y Procesos, Grupo de Rutas Publicas src/app/(shop)/ (home, products, cart, checkout, orders), Grupo de Rutas Privadas src/app/(admin-panel)/admin/ (dashboard, products, orders, manual-payments), Endpoints Backend src/app/api/ (orders, payments/mercadopago, proofs, products, webhook/mercadopago), Componentes UI src/components/ (admin, common, home, layout, products), Utilidades src/lib/ (db.ts, mercadopago.ts, storage.ts, transformers.ts), Estado Global src/stores/ (cart-store.ts, ui-store.ts) (+9 more)

### Community 54 - "Preorders & Acquisitions Migration"
Cohesion: 0.50
Nodes (4): 02.03 — Sistema de Perfiles y Datos Privados de Admin, Matriz de Visibilidad de Datos (username/avatarUrl publicos vs realName/dni/phone/address privados), Diseno de Interfaces Protegidas (perfil cliente enmascarado, panel admin con datos completos), Flujo de Cambio Forzado (mustChangePassword, /auth/forced-reset)

### Community 29 - "Reglas del Proyecto (CLAUDE.md)"
Cohesion: 0.14
Nodes (17): Flujo de Aprobacion Manual (QR -> voucher Cloudinary -> AWAITING_VERIFICATION -> admin aprueba), 07.01 — Terminos y Condiciones de Preventas y Ventas, Politica de Preventas (adelanto no reembolsable si cancela cliente, reembolso integro si cancela proveedor, plazo saldo), Politica de Ventas Stock Fisico (validez de comprobantes via Bandeja POS, reserva de stock 2 horas), Politica de Envios y Garantias (responsabilidad courier, condicion producto, reclamos 24h con video unboxing), Integracion Legal en Checkout (checkbox obligatorio + enlace de descarga PDF), 07.02 — Politicas de Devolucion y Reembolsos, Escenarios de Devolucion (defecto de fabrica, error de despacho, desistimiento 7 dias) (+9 more)

### Community 26 - "User Avatar & Reviews"
Cohesion: 0.13
Nodes (17): 06.02 — Flujo de Compra Manual, POS y Boleta PDF, Paso 1: Registro Manual back-office (Crear Pedido, valida stock, CRM autocompleta), Paso 2: PDF de Proforma (link unico enviado por WhatsApp), Paso 4: Emision Automatizada de Boleta Electronica (API facturador SUNAT, envio por correo), Arquitectura de Facturacion (Nubefact/Izipay, webhook, logs de error SUNAT), Tabla Comparativa Flujo Automatico (06.01) vs Manual (06.02), Flujo de Enlace Copiable (pagina de pago sin login, subida de voucher), Diseno del Comprobante PDF (QR dinamico, hash SHA-256, marca de agua, sello digital) (+9 more)

### Community 24 - "Flujo de Boleta y Despliegue"
Cohesion: 0.17
Nodes (18): Plan: La Tiendita de Blue (referenciado, detallado en otro chunk), Bundles 'Combina y Ahorra' (referenciado, detallado en otro chunk), Boveda de Obsidian (docs/Boveda-Proyecto-Ecommerce, 8 secciones), Stack Tecnologico (Next.js 16, TS, Tailwind v4, Prisma 7, NextAuth v5, Zustand, RHF+Zod, pagos manual+Mercado Pago), DB desde cero (schema completo, migracion init, seed desde imagenes), Catalogo dinamico (categorias/animes con TENDENCIA, lineas, marcas, filtros y busqueda), Tienda (home, detalle con galeria/preventas/resenas verificadas, avatares locales, burbuja Bluet→WhatsApp), Marco legal (07): /terms, /returns, /privacy + checkbox de aceptacion en checkout (+10 more)

### Community 41 - "Cart Summary & Product Detail"
Cohesion: 0.35
Nodes (11): Modelo de Datos - BasicTechShop (referenciado, detallado en otro chunk), User (Usuarios), Category (Categorias), Brand (Marcas), Product (Productos), Address (Direcciones), Order (Pedidos), OrderItem (Items del Pedido) (+3 more)

### Community 42 - "Env Config & Payment Gateways"
Cohesion: 0.31
Nodes (11): Listado de Paginas - BasicTechShop (referenciado, detallado en otro chunk), Estructura de API Routes (auth, users, categories, brands, products, addresses, orders), Paginas Publicas (Shop), Paginas de Checkout, Paginas de Perfil de Usuario, Paginas de Administracion, API Routes (listado detallado con metodos HTTP), Estructura de Layouts (root, (shop), (admin-panel)) (+3 more)

### Community 37 - "PRD Resumen de Requisitos"
Cohesion: 0.19
Nodes (13): PRD (referenciado, detallado en otro chunk), Stack Tecnologico (PRD): Next.js16, TS, PostgreSQL planificado, Prisma, shadcn/ui new-york, Zustand, RHF+Zod, NextAuth.js, Tienda Publica (4.1): Homepage, Catalogo, Detalle, Carrito, Checkout, Autenticacion (4.2): registro email/password, login, proteccion de rutas por rol, Perfil de Usuario (4.3): info personal, historial pedidos, direcciones CRUD, favoritos, configuracion, Panel de Administracion (4.4): dashboard, productos CRUD, usuarios, pagos/ordenes, configuracion, Modelo de Datos (5): User-Address-Order-OrderItem-Product-Category-Brand, Estados de Pedido (PRD): PENDING→CONFIRMED→PROCESSING→SHIPPED→DELIVERED / CANCELLED (+5 more)

### Community 47 - "README Overview del Proyecto"
Cohesion: 0.25
Nodes (8): cart-store.ts (referenciado, detallado en otro chunk), Checkout dual (envios + pago manual con QR/voucher o Mercado Pago; idempotencia; processCode), TC008 Shopping Cart Operations (FAILED, HIGH), TC009 Checkout Flow Success (FAILED, CRITICAL), Hallazgo: carrito de compras falla al agregar un segundo producto, Hallazgo: errores de manejo de imagenes (src faltante, href vacio), ProductCard component, ProductGallery component

### Community 15 - "Brand/Category API & Transformers"
Cohesion: 0.10
Nodes (27): Autenticacion (registro username, Google condicional, reset forzado, RBAC middleware), Panel admin (dashboard KPIs, Bandeja POS, ordenes con tracking, CRUD productos/categorias/lineas, usuarios), TestSprite AI Testing Report (MCP), Raw Test Report Draft/Template (con placeholders {{TODO:AI_ANALYSIS}}), TC001 User Registration Success (Passed), TC002 User Registration Validation Errors (Passed), TC003 User Login Success (Passed), TC004 User Login Failure (Passed) (+19 more)

## Ambiguous Edges - Review These
- `Modelo de Datos - BasicTechShop (referenciado, detallado en otro chunk)` → `Plan: La Tiendita de Blue (referenciado, detallado en otro chunk)`  [AMBIGUOUS]
  docs/DATA-MODEL.md · relation: conceptually_related_to
- `Configuracion Google Cloud Console (OAuth consent, origenes/redirect URIs, dominio latienditadeblue.org.pe)` → `03.01 — Pasarela Automatizada Mercado Pago`  [AMBIGUOUS]
  docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.06-Autenticacion Segura con Google y NextAuth v5]].md · relation: conceptually_related_to
- `06.02-Flujo de Compra Manual, POS y Boleta PDF.md (archivo raiz duplicado, vacio)` → `06.02 — Flujo de Compra Manual, POS y Boleta PDF`  [AMBIGUOUS]
  docs/Boveda-Proyecto-Ecommerce/06.02-Flujo de Compra Manual, POS y Boleta PDF.md · relation: conceptually_related_to
- `Flujo Admin de Aprobacion de Voucher (Server Action que cambia AWAITING_VERIFICATION a PAID)` → `Regla: no usar Server Actions, usar Route Handlers`  [AMBIGUOUS]
  docs/Boveda-Proyecto-Ecommerce/03-Sistema-Pagos-Y-Checkouts/[[03.02-Plantilla de Pago Manual con QR Digital y Vouchers]].md · relation: conceptually_related_to
- `Listado de Paginas - BasicTechShop (referenciado, detallado en otro chunk)` → `Plan: La Tiendita de Blue (referenciado, detallado en otro chunk)`  [AMBIGUOUS]
  docs/PAGES.md · relation: conceptually_related_to
- `PRD (referenciado, detallado en otro chunk)` → `Plan: La Tiendita de Blue (referenciado, detallado en otro chunk)`  [AMBIGUOUS]
  docs/PRD.md · relation: conceptually_related_to
- `Exclusiones (10): sin cupones/descuentos, sin resenas, sin wishlist avanzada, sin multi-idioma/moneda` → `Campanas y Marketing (05.05): Banner/Announcement/Coupon/DiscountRule, motor de reglas de precio, cupones`  [AMBIGUOUS]
  docs/PRD.md · relation: conceptually_related_to
- `Exclusiones (10): sin cupones/descuentos, sin resenas, sin wishlist avanzada, sin multi-idioma/moneda` → `Tienda (home, detalle con galeria/preventas/resenas verificadas, avatares locales, burbuja Bluet→WhatsApp)`  [AMBIGUOUS]
  docs/PRD.md · relation: conceptually_related_to
- `Checklist de Seguridad (Code Review): dangerouslySetInnerHTML, validacion server-side con zod, npm audit, cookies httpOnly/secure/sameSite` → `Regla: no usar Server Actions, usar Route Handlers`  [AMBIGUOUS]
  docs/Boveda-Proyecto-Ecommerce/04-Seguridad-Y-Prevencion-De-Errores/[[04.02-Blindaje contra SQL Injection y XSS]].md · relation: conceptually_related_to

## Knowledge Gaps
- **325 isolated node(s):** `eslintConfig`, `csp`, `securityHeaders`, `nextConfig`, `config` (+320 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Stats Counter Animation`** (2 nodes): `lines`, `brands`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Checkout Success Page`** (2 nodes): `separation_payments`, `preorder_reservations`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Product Card & Grid`** (2 nodes): `shippingLabels`, `shippingIcons`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Modelo de Datos - BasicTechShop (referenciado, detallado en otro chunk)` and `Plan: La Tiendita de Blue (referenciado, detallado en otro chunk)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Configuracion Google Cloud Console (OAuth consent, origenes/redirect URIs, dominio latienditadeblue.org.pe)` and `03.01 — Pasarela Automatizada Mercado Pago`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `06.02-Flujo de Compra Manual, POS y Boleta PDF.md (archivo raiz duplicado, vacio)` and `06.02 — Flujo de Compra Manual, POS y Boleta PDF`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Flujo Admin de Aprobacion de Voucher (Server Action que cambia AWAITING_VERIFICATION a PAID)` and `Regla: no usar Server Actions, usar Route Handlers`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Listado de Paginas - BasicTechShop (referenciado, detallado en otro chunk)` and `Plan: La Tiendita de Blue (referenciado, detallado en otro chunk)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `PRD (referenciado, detallado en otro chunk)` and `Plan: La Tiendita de Blue (referenciado, detallado en otro chunk)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Exclusiones (10): sin cupones/descuentos, sin resenas, sin wishlist avanzada, sin multi-idioma/moneda` and `Campanas y Marketing (05.05): Banner/Announcement/Coupon/DiscountRule, motor de reglas de precio, cupones`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._