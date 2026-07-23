# Stock Release Cron Job

> 10 nodes

## Key Concepts

- **3db2e43 version 2** (63 connections) — `git`
- **route.ts** (6 connections) — `src/app/api/auth/register/route.ts`
- **release-stock.ts** (6 connections) — `src/lib/release-stock.ts`
- **route.ts** (5 connections) — `src/app/api/cron/release-stock/route.ts`
- **releaseAbandonedStock()** (3 connections) — `src/lib/release-stock.ts`
- **migration.sql** (1 connections) — `prisma/migrations/20260719050630_add_bundle_discount/migration.sql`
- **migration.sql** (1 connections) — `prisma/migrations/20260719210752_add_user_department/migration.sql`
- **registerSchema** (1 connections) — `src/app/api/auth/register/route.ts`
- **POST()** (1 connections) — `src/app/api/auth/register/route.ts`
- **GET()** (1 connections) — `src/app/api/cron/release-stock/route.ts`

## Relationships

- [[Admin Dashboard Charts]] (6 shared connections)
- [[Acquisitions & Shalom API Routes]] (4 shared connections)
- [[Order Summary & Pricing]] (4 shared connections)
- [[Legal Pages (Terms-Privacy)]] (4 shared connections)
- [[Avatar Upload & Cloudinary]] (3 shared connections)
- [[Git Commit History]] (3 shared connections)
- [[Campaign List Page]] (3 shared connections)
- [[Peru Heat Map Component]] (3 shared connections)
- [[Product Admin API Routes]] (3 shared connections)
- [[Footer & Social Icons]] (3 shared connections)
- [[Campaigns & Coupon Validation]] (3 shared connections)
- [[User Avatar & Reviews]] (2 shared connections)

## Source Files

- `git`
- `prisma/migrations/20260719050630_add_bundle_discount/migration.sql`
- `prisma/migrations/20260719210752_add_user_department/migration.sql`
- `src/app/api/auth/register/route.ts`
- `src/app/api/cron/release-stock/route.ts`
- `src/lib/release-stock.ts`

## Audit Trail

- EXTRACTED: 88 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*