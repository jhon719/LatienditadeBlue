# TestSprite AI Testing Report (MCP)

- **Type:** document
- **Source:** `testsprite_tests/testsprite-mcp-test-report.md`
- **Community:** [[TestSprite Findings Report]]

## Rationale

Reporte generado el 2026-01-03 bajo el nombre de proyecto 'ecommerce-basictech' (coincide con la identidad 'BasicTechShop' de docs/PRD.md, docs/DATA-MODEL.md y docs/PAGES.md, no con 'La Tiendita de Blue'). URLs de Cloudinary en el log muestran la carpeta 'basictech/products', reforzando que el nombre interno del proyecto era 'basictech' antes/durante estas pruebas. Detecta bugs criticos (RBAC, carrito, creacion de productos en admin) que docs/PLAN.md (julio 2026) marca como completados, sugiriendo que fueron corregidos posteriormente o requieren re-verificacion. Existe version HTML identica en testsprite-mcp-test-report.html (mismo contenido, otro formato).

## Outgoing Relations

- **references** → [[PRD (referenciado, detallado en otro chunk)]]
- **shares_data_with** → [[Raw Test Report Draft-Template (con placeholders {{TODO-AI_ANALYSIS}})]]

## Incoming Relations

- [[Hallazgo- creacion de producto en panel admin falla con datos validos]] **conceptually_related_to** → this
- [[Hallazgo- seleccion de rol por defecto incorrecta al crear usuario (Administrador en vez de Cliente)]] **conceptually_related_to** → this
- [[Hallazgo- carrito de compras falla al agregar un segundo producto]] **conceptually_related_to** → this
- [[Hallazgo- errores de manejo de imagenes (src faltante, href vacio)]] **conceptually_related_to** → this
- [[Advertencia de performance- falta prop 'sizes' en imagenes Next.js con fill]] **conceptually_related_to** → this
- [[Hallazgo- boton 'Editar' del perfil no activa el modo edicion]] **conceptually_related_to** → this
- [[Hallazgo critico- RBAC no aplicado, clientes acceden al panel admin]] **conceptually_related_to** → this
- [[Recomendaciones del reporte (seccion 5)]] **conceptually_related_to** → this
- [[TC001 User Registration Success (Passed)]] **conceptually_related_to** → this
- [[TC002 User Registration Validation Errors (Passed)]] **conceptually_related_to** → this
- [[TC003 User Login Success (Passed)]] **conceptually_related_to** → this
- [[TC004 User Login Failure (Passed)]] **conceptually_related_to** → this
- [[TC005 Role-Based Access Control Enforcement (FAILED, CRITICAL)]] **conceptually_related_to** → this
- [[TC006 Product Catalog Filtering and Sorting (Passed)]] **conceptually_related_to** → this
- [[TC007 Product Details Page Display (Passed)]] **conceptually_related_to** → this
- [[TC008 Shopping Cart Operations (FAILED, HIGH)]] **conceptually_related_to** → this
- [[TC009 Checkout Flow Success (FAILED, CRITICAL)]] **conceptually_related_to** → this
- [[TC010 Checkout Flow Payment Failure Handling (Passed)]] **conceptually_related_to** → this
- [[TC011 User Profile Management CRUD (FAILED, MEDIUM)]] **conceptually_related_to** → this
- [[TC012 Admin Panel Product CRUD Operations (FAILED, HIGH)]] **conceptually_related_to** → this
- [[TC013 Admin Panel User Management and Role Assignments (FAILED, MEDIUM)]] **conceptually_related_to** → this
- [[TC014 API Endpoint Response and Error Handling (Passed)]] **conceptually_related_to** → this
- [[TC015 Responsive Design Verification (Passed)]] **conceptually_related_to** → this
- [[TC016 Database Integrity and Relational Constraints (Passed)]] **conceptually_related_to** → this
- [[TC017 Performance and SEO Checks (Passed)]] **conceptually_related_to** → this

---
_Part of the graphify knowledge graph. See [[index]] to navigate._