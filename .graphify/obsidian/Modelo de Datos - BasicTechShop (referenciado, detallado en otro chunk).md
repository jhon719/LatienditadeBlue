# Modelo de Datos - BasicTechShop (referenciado, detallado en otro chunk)

- **Type:** document
- **Source:** `docs/DATA-MODEL.md`
- **Community:** [[Modelo de Datos (Entidades)]]

## Outgoing Relations

- **conceptually_related_to** → [[Plan- La Tiendita de Blue (referenciado, detallado en otro chunk)]]

## Incoming Relations

- [[Address (Direcciones)]] **conceptually_related_to** → this
- [[Estructura de API Routes (auth, users, categories, brands, products, addresses, orders)]] **conceptually_related_to** → this
- [[Brand (Marcas)]] **conceptually_related_to** → this
- [[Category (Categorias)]] **conceptually_related_to** → this
- [[Order (Pedidos)]] **conceptually_related_to** → this
- [[Estados de Pedido (PENDING→CONFIRMED→PROCESSING→SHIPPED→DELIVERED - CANCELLED)]] **conceptually_related_to** → this
- [[OrderItem (Items del Pedido)]] **conceptually_related_to** → this
- [[Product (Productos)]] **conceptually_related_to** → this
- [[Roles y Permisos (CUSTOMER-MODERATOR-ADMIN)]] **conceptually_related_to** → this
- [[User (Usuarios)]] **conceptually_related_to** → this
- [[Modelo de Datos (5)- User-Address-Order-OrderItem-Product-Category-Brand]] **semantically_similar_to** → this _(inferred, 0.85)_
- [[Seccion Documentacion (enlaces a CLAUDE.md, PLAN.md, DATA-MODEL.md, PAGES.md, PRD.md, Boveda)]] **references** → this

---
_Part of the graphify knowledge graph. See [[index]] to navigate._