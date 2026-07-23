# Mercado Pago Client Setup

> 10 nodes

## Key Concepts

- **route.ts** (13 connections) — `src/app/api/webhook/mercadopago/route.ts`
- **mercadopago.ts** (8 connections) — `src/lib/mercadopago.ts`
- **getClient()** (3 connections) — `src/lib/mercadopago.ts`
- **getPreferenceClient()** (3 connections) — `src/lib/mercadopago.ts`
- **getPaymentClient()** (3 connections) — `src/lib/mercadopago.ts`
- **isMercadoPagoEnabled()** (2 connections) — `src/lib/mercadopago.ts`
- **GET()** (1 connections) — `src/app/api/payments/mercadopago/route.ts`
- **schema** (1 connections) — `src/app/api/payments/mercadopago/route.ts`
- **POST()** (1 connections) — `src/app/api/webhook/mercadopago/route.ts`
- **isMercadoPagoSandbox()** (1 connections) — `src/lib/mercadopago.ts`

## Relationships

- [[Acquisitions & Shalom API Routes]] (3 shared connections)
- [[User Avatar & Reviews]] (2 shared connections)
- [[Stock Release Cron Job]] (2 shared connections)
- [[Campaigns & Coupon Validation]] (1 shared connections)

## Source Files

- `src/app/api/payments/mercadopago/route.ts`
- `src/app/api/webhook/mercadopago/route.ts`
- `src/lib/mercadopago.ts`

## Audit Trail

- EXTRACTED: 36 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*