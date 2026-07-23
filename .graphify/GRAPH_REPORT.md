# Graph Report - .  (2026-07-23)

## Corpus Check
- 289 files · ~126,265 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1196 nodes · 3033 edges · 62 communities detected
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 50 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output
- Edge kinds: imports: 919 · contains: 743 · imports_from: 572 · MODIFIES: 372 · conceptually_related_to: 187 · references: 108 · calls: 44 · shares_data_with: 36 · ON_BRANCH: 15 · PARENT_OF: 14 · cites: 7 · rationale_for: 5 · semantically_similar_to: 5 · implements: 4 · inherits: 2


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 289 · Candidates: 391
- Excluded: 350 untracked · 58129 ignored · 0 sensitive · 15 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `a16fe9a`
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

### Community 0 - "Admin CRM Dashboard Widgets"
Cohesion: 0.10
Nodes (30): Acquisition, AcquisitionsTab(), MonthSummary, Summary, Contact, ShalomDirectoryTab(), ENDPOINT, Batch (+22 more)

### Community 1 - "Campaign & Catalog Forms"
Cohesion: 0.06
Nodes (33): CAMPAIGN_TYPE_OPTIONS, CampaignData, CampaignForm(), CampaignFormProps, CampaignType, numStr(), Option, toLocalInput() (+25 more)

### Community 2 - "UI Utilities & Marquee"
Cohesion: 0.05
Nodes (26): a16fe9a vaersion 8, ImageLightboxProps, Marquee(), BENEFITS, BenefitsMarquee(), cn(), slugify(), lineSchema (+18 more)

### Community 3 - "Admin Header & Theme Toggle"
Cohesion: 0.07
Nodes (23): AdminMobileNav(), navigation, AnimatedThemeToggle(), navLinks, MobileNav(), ThemeToggle(), FilterMobile(), FilterMobileProps (+15 more)

### Community 4 - "Admin Order & Batch Tracking"
Cohesion: 0.06
Nodes (32): AcquisitionData, CrmPanel(), ProgressBar(), SEMAPHORE_STYLES, SemaphoreBadge(), SemaphoreLevel, ShalomContactData, Batch (+24 more)

### Community 5 - "Auth Layout & Test Config"
Cohesion: 0.05
Nodes (3): 2982ca1 iniciar proyecto, eslintConfig, config

### Community 6 - "Acquisitions & Shalom API Routes"
Cohesion: 0.09
Nodes (11): acquisitions, shalom_contacts, createSchema, itemSchema, 487cc56 version 4, requireAdmin(), globalForPrisma, createProductSchema (+3 more)

### Community 7 - "Auth Forms & Register Flow"
Cohesion: 0.07
Nodes (20): AuthShell(), FEATURES, ForcedResetForm(), LoginForm(), RegisterForm(), RegisterFormData, registerSchema, schema (+12 more)

### Community 8 - "Campaign List Page"
Cohesion: 0.10
Nodes (20): CampaignItem, STATUS_LABELS, TYPE_LABELS, WhatsappIcon(), SortSelect(), SortSelectProps, PasswordFormData, passwordSchema (+12 more)

### Community 9 - "Admin CRM Input Forms"
Cohesion: 0.15
Nodes (19): AcquisitionForm(), num(), CrmPanelProps, TIER_LABELS, StatsCardProps, ResetFormData, resetSchema, ManualPaymentSection() (+11 more)

### Community 10 - "Footer & Social Icons"
Cohesion: 0.10
Nodes (18): ContactBadges(), SOCIAL_BG, SocialIcon(), TiktokIcon(), AnnouncementBar(), Footer(), Header(), benefits (+10 more)

### Community 11 - "Product Admin API Routes"
Cohesion: 0.09
Nodes (18): actionSchema, crmSchema, Params, schema, STOCK_HELD, updateProductSchema, updateSchema, announcementSchema (+10 more)

### Community 12 - "Boleta PDF Generation"
Cohesion: 0.09
Nodes (21): BLUE, BoletaOrder, downloadBoletaPdf(), GRAY, lastY(), NAVY, PAYMENT_LABELS, RGB (+13 more)

### Community 13 - "Separations Balance Logic"
Cohesion: 0.10
Nodes (19): computeBalance(), computeSemaphore(), defaultDueDate(), Semaphore, SemaphoreLevel, SeparationBalance, SeparationKind, SeparationStatus (+11 more)

### Community 14 - "TestSprite Findings Report"
Cohesion: 0.10
Nodes (27): src/app/(admin-panel)/admin/products/new/page.tsx, src/middleware.ts, Autenticacion (registro username, Google condicional, reset forzado, RBAC middleware), Panel admin (dashboard KPIs, Bandeja POS, ordenes con tracking, CRUD productos/categorias/lineas, usuarios), TestSprite AI Testing Report (MCP), Hallazgo: creacion de producto en panel admin falla con datos validos, Hallazgo: seleccion de rol por defecto incorrecta al crear usuario (Administrador en vez de Cliente), Advertencia de performance: falta prop 'sizes' en imagenes Next.js con fill (+19 more)

### Community 15 - "Brand/Category API & Transformers"
Cohesion: 0.09
Nodes (17): brandSchema, categorySchema, OrderWithItems, ProductWithRelations, ReviewWithUser, transformBrand(), transformCategory(), transformLine() (+9 more)

### Community 16 - "Admin Dashboard Charts"
Cohesion: 0.13
Nodes (17): RANGES, statusLabels, CashFlowChart(), TooltipPayload, DonutTooltipPayload, LogisticsDonut(), SLICE_STYLE, CashFlowPoint (+9 more)

### Community 17 - "Product Filter Sidebar & Store"
Cohesion: 0.12
Nodes (20): FilterOption, FilterSection(), FilterSectionProps, FilterSidebarProps, STATUS_OPTIONS, TYPE_OPTIONS, defaultFilters, ProductsState (+12 more)

### Community 18 - "Admin Sidebar & Login"
Cohesion: 0.15
Nodes (10): AdminSidebar(), navigation, GoogleButton(), LoginFormData, loginSchema, CartItem(), CartItemProps, CartSummary() (+2 more)

### Community 19 - "Home Marquee Components"
Cohesion: 0.20
Nodes (11): b975a3a version 6, GradientText(), BuyMeACoffee(), CategoryTrends(), FeaturedProducts(), FollowUs(), LinesSection(), ReviewsSection() (+3 more)

### Community 20 - "Campaigns & Coupon Validation"
Cohesion: 0.14
Nodes (14): requireUser(), applyDiscountRules(), CouponValidation, getActiveAnnouncement(), getActiveBanners(), getActiveDiscountRules(), isCampaignLive(), liveCampaignWhere() (+6 more)

### Community 21 - "Deliveries PDF Report"
Cohesion: 0.14
Nodes (13): BLUE, DeliveriesReport, DeliveryRow, downloadDeliveriesPdf(), downloadUsersPdf(), drawFooter(), drawHeader(), GRAY (+5 more)

### Community 22 - "Plan de Implementacion Resumen"
Cohesion: 0.17
Nodes (18): src/lib/pricing.ts, Boveda de Obsidian (docs/Boveda-Proyecto-Ecommerce, 8 secciones), Bundles 'Combina y Ahorra' (referenciado, detallado en otro chunk), Buy Me a Coffee (02.01): seccion desplegable en home con QR de Yape local, Campanas y Marketing (05.05): Banner/Announcement/Coupon/DiscountRule, motor de reglas de precio, cupones, Catalogo dinamico (categorias/animes con TENDENCIA, lineas, marcas, filtros y busqueda), Cloudinary activo (productos/vouchers/resenas/banners en latiendita/*, avatares con public_id=userId), CRM y Notificaciones (05.04): ficha 360 del cliente, plantillas WhatsApp, opt-in marketing (Ley 29733) (+10 more)

### Community 23 - "Estructura de Directorios Next.js"
Cohesion: 0.13
Nodes (17): Grupo de Rutas Privadas src/app/(admin-panel)/admin/ (dashboard, products, orders, manual-payments), Endpoints Backend src/app/api/ (orders, payments/mercadopago, proofs, products, webhook/mercadopago), Componentes UI src/components/ (admin, common, home, layout, products), Adicionales — Desglose Detallado de Directorios y Procesos, Utilidades src/lib/ (db.ts, mercadopago.ts, storage.ts, transformers.ts), Grupo de Rutas Publicas src/app/(shop)/ (home, products, cart, checkout, orders), Estado Global src/stores/ (cart-store.ts, ui-store.ts), Flujo Admin CRUD de Categorias (generacion de slug, toggles isActive/isTrending) (+9 more)

### Community 24 - "Flujo de Boleta y Despliegue"
Cohesion: 0.13
Nodes (17): 06.01 — Flujo de Compra por Pasarela Automatica (nota referenciada, no incluida en este chunk), 06 — Experiencia de Usuario y Checkout (seccion padre referenciada, sin archivo indice localizado), 05.01 — Dashboard, Analitica y UI/UX (nota referenciada, no incluida en este chunk), 02.01 (referenciada repetidamente como 'Arquitectura de Base de Datos') — posible confusion con 01.03, 08.01 — Estrategia de Despliegue y Configuracion de Entornos, Modelo DotEnv (.env.local vs Vercel Environment Variables, misma estructura en todos los entornos), Checklist Pre-flight (prisma validate, check-env.js, logging centralizado), 08 — Plan de Implementacion y Despliegue (seccion padre referenciada) (+9 more)

### Community 25 - "Auth, Seguridad y Modelo BD"
Cohesion: 0.13
Nodes (17): Auth y Seguridad (NextAuth v5, RBAC, mustChangePassword, idempotencyKey, processCode), Trazabilidad Antifraude (processCode unico + relacion obligatoria Order-PaymentProof), 01.03 — Modelo de Base de Datos Prisma SQL, Politica de Datos Privados vs Publicos (firstName/lastName/dni nunca expuestos), Configuracion Neon + Prisma (DATABASE_URL local vs Neon, DATABASE_URL_NON_POOLING), 01.04 — Libreria de Animaciones y Diseno Visual (nota referenciada, no incluida en este chunk), Bloque 1: <ProductGallery/> (zoom hover, carrusel miniaturas, next/image priority), Bloque 4: <RatingsAndReviews/> — promedio, distribucion, badge Compra Verificada (+9 more)

### Community 26 - "User Avatar & Reviews"
Cohesion: 0.18
Nodes (10): 0a444d0 18/97/2026, UserAvatar(), UserAvatarProps, maskSensitive(), ProductReviews(), ReviewFormData, reviewSchema, AvatarUploader() (+2 more)

### Community 27 - "Politicas Legales y Envios"
Cohesion: 0.14
Nodes (17): 05.02 (referenciada como 'Gestion de Clientes (CRM) y Usuarios') — nota real 05.02 es la Bandeja POS, 07 — Marco Legal y Politicas (seccion padre referenciada, sin archivo indice localizado), 06.03 — Logistica de Envios e Integracion con Courier (nota referenciada, no incluida en este chunk), Flujo de Aprobacion Manual (QR -> voucher Cloudinary -> AWAITING_VERIFICATION -> admin aprueba), Responsabilidad Admin-Driven (no compartir capturas de clientes, archivar vouchers tras conciliacion), Recoleccion de Datos (identificacion, contacto, transaccionales, cookies), Uso y Tratamiento (finalidad primaria/secundaria, seguridad, no venta a terceros), 07.03 — Politica de Privacidad y Proteccion de Datos (+9 more)

### Community 28 - "Hero Banner & Carousel"
Cohesion: 0.18
Nodes (15): HeroBanner(), BannerView, Carousel(), CarouselApi, CarouselContent(), CarouselContext, CarouselContextProps, CarouselItem() (+7 more)

### Community 29 - "Reglas del Proyecto (CLAUDE.md)"
Cohesion: 0.17
Nodes (16): Mapeo Fisico de Imagenes por slug (public/imagenes/Lista de Animes, Lineas de figuras), Assets Locales (public/Imagenes, no renombrar), Organizacion de Componentes (src/components/), Capa de Datos (schema.prisma, seed.ts, prisma.ts, transformers.ts, types/index.ts), CLAUDE.md — Guia del Proyecto, Integracion graphify (grafo de conocimiento del repo), Regla: no usar Modales, usar paginas dedicadas para formularios, Regla: no usar Server Actions, usar Route Handlers (+8 more)

### Community 30 - "Peru Heat Map Component"
Cohesion: 0.14
Nodes (10): DeptFeatureProps, geo, PeruHeatMap(), SEQUENTIAL_BLUE, DepartmentStat, DEPARTMENT_CODES, departmentLabel(), PERU_DEPARTMENTS (+2 more)

### Community 31 - "Order Summary & Pricing"
Cohesion: 0.21
Nodes (12): OrderSummary(), OrderSummaryProps, BundleDiscount, calculateBundleDiscount(), effectivePrice(), PricingItem, ProductBundle(), ProductBundleProps (+4 more)

### Community 32 - "Quick Access & Magnetic Button"
Cohesion: 0.17
Nodes (9): 7205424 version ultima, 8b3e1a0 version 5, QuickAccessPanel(), quickLinks, useCoarsePointer(), MagneticButton(), MagneticButtonProps, SpotlightCard() (+1 more)

### Community 33 - "Avatar Upload & Cloudinary"
Cohesion: 0.22
Nodes (8): AVATAR_DIR, ef3a883 version 7, isCloudinaryEnabled(), IMAGE_EXT, SniffedImage, sniffImageType(), ADMIN_FOLDERS, USER_FOLDERS

### Community 34 - "Acquisitions Cost Calculation"
Cohesion: 0.19
Nodes (10): createSchema, ACQUISITION_MONTHS, AcquisitionDerived, AcquisitionInputs, computeAcquisition(), igvAmount(), MONTH_ORDER, r2() (+2 more)

### Community 35 - "Preventas y Separaciones"
Cohesion: 0.21
Nodes (13): 05.04 (referenciada como 'Logistica Interna y Preventas') — nota real es 'Gestion de Notificaciones, CRM y Correos Transaccionales', 05.03 — Control de Inventario y Preventas, Visor Dual de Stock (Fisico inmediato vs Transito/Lotes Aduanas), Alertas Automaticas de Low Stock, Motor de Preventas (adelanto, saldo, ETA, semaforo de cobranzas, cancelacion), Gestion de Variantes de Producto (Nuevo/Sellado, Loose, Caja Danada) con SKU unico, 05 — Panel Administrativo y POS (indice de seccion), Modelo de Negocio (catalogo dual, pago dual, envios WhatsApp, preventas/separaciones, trazabilidad) (+5 more)

### Community 36 - "Legal Pages (Terms/Privacy)"
Cohesion: 0.19
Nodes (6): LegalPage(), LegalPageProps, LegalSection, metadata, metadata, metadata

### Community 37 - "PRD Resumen de Requisitos"
Cohesion: 0.19
Nodes (13): Autenticacion (4.2): registro email/password, login, proteccion de rutas por rol, Categorias de Productos (8): PCs, Monitores, Teclados, Mouse, Audifonos, Almacenamiento, Componentes, PRD (referenciado, detallado en otro chunk), Estados de Pedido (PRD): PENDING→CONFIRMED→PROCESSING→SHIPPED→DELIVERED / CANCELLED, Fases de Implementacion (11): 1.UI mock completada, 2.Backend en progreso, 3.Auth pendiente, 4.Pagos Stripe pendiente, 5.Deploy pendiente, Marcas Soportadas: ASUS, MSI, Corsair, Logitech, Razer, HyperX, Kingston, Samsung, LG, Dell, NVIDIA, AMD, Metodos de Pago (PRD): CARD, TRANSFER, WALLET, CASH_ON_DELIVERY, Modelo de Datos (5): User-Address-Order-OrderItem-Product-Category-Brand (+5 more)

### Community 38 - "Checkout Coupon & Shipping"
Cohesion: 0.23
Nodes (8): AppliedCoupon, CouponInput(), CouponInputProps, CheckoutFormData, checkoutSchema, SHIPPING_OPTIONS, RadioGroup(), RadioGroupItem()

### Community 39 - "Transactional Email Sending"
Cohesion: 0.36
Nodes (10): client(), layout(), OrderEmailData, orderRow(), send(), sendOrderDeliveredEmail(), sendOrderReceivedEmail(), sendOrderShippedEmail() (+2 more)

### Community 40 - "Core DB Migration Schema"
Cohesion: 0.38
Nodes (10): accounts, brands, categories, lines, order_items, orders, payment_proofs, products (+2 more)

### Community 41 - "Cart Summary & Product Detail"
Cohesion: 0.25
Nodes (6): CartSummaryProps, links, ProductDetail(), ProductDetailProps, navigation, Separator()

### Community 42 - "Env Config & Payment Gateways"
Cohesion: 0.25
Nodes (11): Configuration (path alias @/*, remote image patterns, build de deploy), Despliegue en Vercel (build: npx prisma generate && next build, Edge Middleware, Node 20+), 02.06 — Autenticacion Segura con Google y NextAuth v5, Configuracion .env (GOOGLE_CLIENT_ID/SECRET, NEXTAUTH_SECRET, NEXTAUTH_URL), Configuracion Google Cloud Console (OAuth consent, origenes/redirect URIs, dominio latienditadeblue.org.pe), 03.01 — Pasarela Automatizada Mercado Pago, Flujo E2E de Pago (Checkout -> Preference -> Pago -> Webhook -> Estado PAID/FAILED), UX del Boton de Pago (loading Bluet, Checkout Pro / Brick embebido) (+3 more)

### Community 43 - "Modelo de Datos (Entidades)"
Cohesion: 0.35
Nodes (11): Address (Direcciones), Brand (Marcas), Category (Categorias), Modelo de Datos - BasicTechShop (referenciado, detallado en otro chunk), Order (Pedidos), Estados de Pedido (PENDING→CONFIRMED→PROCESSING→SHIPPED→DELIVERED / CANCELLED), OrderItem (Items del Pedido), Product (Productos) (+3 more)

### Community 44 - "Estructura de Paginas y Rutas"
Cohesion: 0.31
Nodes (11): Estructura de API Routes (auth, users, categories, brands, products, addresses, orders), Paginas de Administracion, API Routes (listado detallado con metodos HTTP), Paginas de Checkout, Listado de Paginas - BasicTechShop (referenciado, detallado en otro chunk), Estructura de Layouts (root, (shop), (admin-panel)), Proteccion de Rutas (Middleware), Paginas de Perfil de Usuario (+3 more)

### Community 45 - "Seed Script & Image Scan"
Cohesion: 0.22
Nodes (9): adapter, ANIMES_DIR, LINEAS_DIR, main(), pool, prisma, PUBLIC_DIR, scanImageFolder() (+1 more)

### Community 46 - "Stock Release Cron Job"
Cohesion: 0.24
Nodes (3): 3db2e43 version 2, releaseAbandonedStock(), registerSchema

### Community 47 - "README Overview del Proyecto"
Cohesion: 0.24
Nodes (10): Boveda de Obsidian (docs/Boveda-Proyecto-Ecommerce), Base de Datos Local (PostgreSQL 18, latiendita_blue, usuarios seed), Project Overview: e-commerce peruano de figuras coleccionables, README.md — La Tiendita de Blue, Seccion Documentacion (enlaces a CLAUDE.md, PLAN.md, DATA-MODEL.md, PAGES.md, PRD.md, Boveda), Estructura del Proyecto (arbol src/), Requisitos e Instalacion (Node 20+, Postgres 18, npm install, migrate, seed), Scripts Disponibles (dev/build/start/lint/db:seed/db:migrate) (+2 more)

### Community 48 - "Mercado Pago Client Setup"
Cohesion: 0.31
Nodes (5): getClient(), getPaymentClient(), getPreferenceClient(), isMercadoPagoEnabled(), schema

### Community 49 - "Campaigns & Discounts Migration"
Cohesion: 0.36
Nodes (7): announcements, banners, categories, coupons, discount_rules, lines, orders

### Community 50 - "Root Layout & Providers"
Cohesion: 0.32
Nodes (4): metadata, SessionProvider(), SessionProviderProps, ThemeProvider()

### Community 51 - "Cart & Checkout Test Findings"
Cohesion: 0.25
Nodes (8): cart-store.ts (referenciado, detallado en otro chunk), ProductCard component, ProductGallery component, Checkout dual (envios + pago manual con QR/voucher o Mercado Pago; idempotencia; processCode), Hallazgo: carrito de compras falla al agregar un segundo producto, Hallazgo: errores de manejo de imagenes (src faltante, href vacio), TC008 Shopping Cart Operations (FAILED, HIGH), TC009 Checkout Flow Success (FAILED, CRITICAL)

### Community 52 - "Product Card & Grid"
Cohesion: 0.29
Nodes (4): ProductCard(), ProductCardProps, ProductGrid(), ProductGridProps

### Community 53 - "Git Commit History"
Cohesion: 0.43
Nodes (7): main, 2ee7082 version 3, 2f6d845 revision 1, 3b141c8 16/07/2026, 583a96a 15/07/2026, 9b525c4 version 1, d837aff version 2

### Community 54 - "Preorders & Acquisitions Migration"
Cohesion: 0.67
Nodes (5): import_batch_items, import_batches, preorder_reservations, products, users

### Community 55 - "Stats Counter Animation"
Cohesion: 0.40
Nodes (3): CountUp(), CountUpProps, StatsBand()

### Community 56 - "Checkout Success Page"
Cohesion: 0.33
Nodes (2): shippingIcons, shippingLabels

### Community 57 - "NextAuth Type Definitions"
Cohesion: 0.33
Nodes (5): DefaultJWT, DefaultUser, JWT, Session, User

### Community 58 - "Security Headers Config"
Cohesion: 0.50
Nodes (3): csp, nextConfig, securityHeaders

### Community 59 - "Perfil de Usuario y Privacidad"
Cohesion: 0.50
Nodes (4): 02.03 — Sistema de Perfiles y Datos Privados de Admin, Flujo de Cambio Forzado (mustChangePassword, /auth/forced-reset), Diseno de Interfaces Protegidas (perfil cliente enmascarado, panel admin con datos completos), Matriz de Visibilidad de Datos (username/avatarUrl publicos vs realName/dni/phone/address privados)

### Community 60 - "Brand/Line Migration"
Cohesion: 1.00
Nodes (2): brands, lines

### Community 61 - "Separation Payments Migration"
Cohesion: 1.00
Nodes (2): preorder_reservations, separation_payments

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
- **320 isolated node(s):** `eslintConfig`, `csp`, `securityHeaders`, `nextConfig`, `config` (+315 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Checkout Success Page`** (2 nodes): `shippingIcons`, `shippingLabels`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Brand/Line Migration`** (2 nodes): `brands`, `lines`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Separation Payments Migration`** (2 nodes): `preorder_reservations`, `separation_payments`
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