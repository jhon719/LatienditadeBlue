# Cart & Checkout Test Findings

> 8 nodes

## Key Concepts

- **Hallazgo: carrito de compras falla al agregar un segundo producto** (6 connections) — `testsprite_tests/testsprite-mcp-test-report.md`
- **Hallazgo: errores de manejo de imagenes (src faltante, href vacio)** (4 connections) — `testsprite_tests/testsprite-mcp-test-report.md`
- **TC008 Shopping Cart Operations (FAILED, HIGH)** (3 connections) — `testsprite_tests/testsprite-mcp-test-report.md`
- **Checkout dual (envios + pago manual con QR/voucher o Mercado Pago; idempotencia; processCode)** (2 connections) — `docs/PLAN.md`
- **TC009 Checkout Flow Success (FAILED, CRITICAL)** (2 connections) — `testsprite_tests/testsprite-mcp-test-report.md`
- **cart-store.ts (referenciado, detallado en otro chunk)** (1 connections) — `src/stores/cart-store.ts`
- **ProductCard component** (1 connections) — `src/components/products/ProductCard.tsx`
- **ProductGallery component** (1 connections) — `src/components/products/ProductGallery.tsx`

## Relationships

- [[TestSprite Findings Report]] (5 shared connections)
- [[Plan de Implementacion Resumen]] (1 shared connections)

## Source Files

- `docs/PLAN.md`
- `src/components/products/ProductCard.tsx`
- `src/components/products/ProductGallery.tsx`
- `src/stores/cart-store.ts`
- `testsprite_tests/testsprite-mcp-test-report.md`

## Audit Trail

- EXTRACTED: 18 (90%)
- INFERRED: 2 (10%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*