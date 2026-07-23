# Hallazgo: carrito de compras falla al agregar un segundo producto

- **Type:** document
- **Source:** `testsprite_tests/testsprite-mcp-test-report.md`
- **Community:** [[Cart & Checkout Test Findings]]

## Rationale

Posible condicion de carrera o problema de estado en el store Zustand del carrito; bloquea todo el flujo de compra (checkout).

## Outgoing Relations

- **references** → [[cart-store.ts (referenciado, detallado en otro chunk)]]
- **conceptually_related_to** → [[Checkout dual (envios + pago manual con QR-voucher o Mercado Pago; idempotencia; processCode)]] _(inferred, 0.65)_
- **conceptually_related_to** → [[TestSprite AI Testing Report (MCP)]]

## Incoming Relations

- [[Recomendaciones del reporte (seccion 5)]] **rationale_for** → this
- [[TC008 Shopping Cart Operations (FAILED, HIGH)]] **cites** → this
- [[TC009 Checkout Flow Success (FAILED, CRITICAL)]] **cites** → this

---
_Part of the graphify knowledge graph. See [[index]] to navigate._