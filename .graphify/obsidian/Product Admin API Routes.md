# Product Admin API Routes

> 28 nodes

## Key Concepts

- **route.ts** (42 connections) — `src/app/api/products/[id]/route.ts`
- **campaign-admin.ts** (14 connections) — `src/lib/campaign-admin.ts`
- **route.ts** (11 connections) — `src/app/api/admin/campaigns/[type]/route.ts`
- **CAMPAIGN_TYPES** (3 connections) — `src/lib/campaign-admin.ts`
- **isCampaignType()** (3 connections) — `src/lib/campaign-admin.ts`
- **campaignModel()** (3 connections) — `src/lib/campaign-admin.ts`
- **normalizeDates()** (3 connections) — `src/lib/campaign-admin.ts`
- **Params** (1 connections) — `src/app/api/products/[id]/route.ts`
- **GET()** (1 connections) — `src/app/api/products/[id]/route.ts`
- **updateSchema** (1 connections) — `src/app/api/lines/[id]/route.ts`
- **PATCH()** (1 connections) — `src/app/api/lines/[id]/route.ts`
- **DELETE()** (1 connections) — `src/app/api/products/[id]/route.ts`
- **Params** (1 connections) — `src/app/api/admin/campaigns/[type]/route.ts`
- **GET()** (1 connections) — `src/app/api/admin/campaigns/[type]/route.ts`
- **POST()** (1 connections) — `src/app/api/admin/campaigns/[type]/route.ts`
- **STOCK_HELD** (1 connections) — `src/app/api/admin/orders/[id]/route.ts`
- **actionSchema** (1 connections) — `src/app/api/admin/proofs/[id]/route.ts`
- **POST()** (1 connections) — `src/app/api/admin/proofs/[id]/route.ts`
- **schema** (1 connections) — `src/app/api/admin/shalom-contacts/[id]/route.ts`
- **crmSchema** (1 connections) — `src/app/api/admin/users/[id]/route.ts`
- **updateProductSchema** (1 connections) — `src/app/api/products/[id]/route.ts`
- **PUT()** (1 connections) — `src/app/api/products/[id]/route.ts`
- **scheduling** (1 connections) — `src/lib/campaign-admin.ts`
- **bannerSchema** (1 connections) — `src/lib/campaign-admin.ts`
- **announcementSchema** (1 connections) — `src/lib/campaign-admin.ts`
- *... and 3 more nodes in this community*

## Relationships

- [[Acquisitions & Shalom API Routes]] (7 shared connections)
- [[Brand-Category API & Transformers]] (6 shared connections)
- [[Transactional Email Sending]] (4 shared connections)
- [[Stock Release Cron Job]] (3 shared connections)
- [[Campaigns & Coupon Validation]] (3 shared connections)
- [[Separations Balance Logic]] (3 shared connections)
- [[Acquisitions Cost Calculation]] (2 shared connections)
- [[User Avatar & Reviews]] (1 shared connections)
- [[Auth Layout & Test Config]] (1 shared connections)

## Source Files

- `src/app/api/admin/campaigns/[type]/route.ts`
- `src/app/api/admin/orders/[id]/route.ts`
- `src/app/api/admin/proofs/[id]/route.ts`
- `src/app/api/admin/shalom-contacts/[id]/route.ts`
- `src/app/api/admin/users/[id]/route.ts`
- `src/app/api/lines/[id]/route.ts`
- `src/app/api/products/[id]/route.ts`
- `src/lib/campaign-admin.ts`

## Audit Trail

- EXTRACTED: 100 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*