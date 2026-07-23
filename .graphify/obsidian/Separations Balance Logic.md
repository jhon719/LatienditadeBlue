# Separations Balance Logic

> 28 nodes

## Key Concepts

- **route.ts** (16 connections) — `src/app/api/separations/route.ts`
- **route.ts** (13 connections) — `src/app/api/separations/[id]/payments/route.ts`
- **separations-server.ts** (13 connections) — `src/lib/separations-server.ts`
- **separations.ts** (13 connections) — `src/lib/separations.ts`
- **route.ts** (9 connections) — `src/app/api/admin/separations/[id]/payments/[paymentId]/route.ts`
- **recalcSeparation()** (3 connections) — `src/lib/separations-server.ts`
- **serializeSeparation()** (3 connections) — `src/lib/separations-server.ts`
- **SEPARATION_INCLUDE** (3 connections) — `src/lib/separations-server.ts`
- **computeBalance()** (3 connections) — `src/lib/separations.ts`
- **defaultDueDate()** (2 connections) — `src/lib/separations.ts`
- **computeSemaphore()** (2 connections) — `src/lib/separations.ts`
- **validatePaymentAmount()** (2 connections) — `src/lib/separations.ts`
- **Params** (1 connections) — `src/app/api/admin/separations/[id]/payments/[paymentId]/route.ts`
- **schema** (1 connections) — `src/app/api/admin/separations/[id]/payments/[paymentId]/route.ts`
- **PATCH()** (1 connections) — `src/app/api/admin/separations/[id]/payments/[paymentId]/route.ts`
- **Params** (1 connections) — `src/app/api/separations/[id]/payments/route.ts`
- **schema** (1 connections) — `src/app/api/separations/[id]/payments/route.ts`
- **POST()** (1 connections) — `src/app/api/separations/[id]/payments/route.ts`
- **GET()** (1 connections) — `src/app/api/separations/route.ts`
- **createSchema** (1 connections) — `src/app/api/separations/route.ts`
- **POST()** (1 connections) — `src/app/api/separations/route.ts`
- **Db** (1 connections) — `src/lib/separations-server.ts`
- **SeparationWithRelations** (1 connections) — `src/lib/separations-server.ts`
- **SeparationKind** (1 connections) — `src/lib/separations.ts`
- **SeparationStatus** (1 connections) — `src/lib/separations.ts`
- *... and 3 more nodes in this community*

## Relationships

- [[Acquisitions & Shalom API Routes]] (14 shared connections)
- [[Campaigns & Coupon Validation]] (5 shared connections)
- [[Product Admin API Routes]] (3 shared connections)

## Source Files

- `src/app/api/admin/separations/[id]/payments/[paymentId]/route.ts`
- `src/app/api/separations/[id]/payments/route.ts`
- `src/app/api/separations/route.ts`
- `src/lib/separations-server.ts`
- `src/lib/separations.ts`

## Audit Trail

- EXTRACTED: 98 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*