# Order (Pedidos)

- **Type:** document
- **Source:** `docs/DATA-MODEL.md`
- **Community:** [[Modelo de Datos (Entidades)]]

## Outgoing Relations

- **references** → [[Address (Direcciones)]]
- **conceptually_related_to** → [[Modelo de Datos - BasicTechShop (referenciado, detallado en otro chunk)]]
- **conceptually_related_to** → [[Estados de Pedido (PENDING→CONFIRMED→PROCESSING→SHIPPED→DELIVERED - CANCELLED)]]
- **references** → [[User (Usuarios)]]

## Incoming Relations

- [[OrderItem (Items del Pedido)]] **references** → this

---
_Part of the graphify knowledge graph. See [[index]] to navigate._