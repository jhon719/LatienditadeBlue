# Campaigns & Coupon Validation

> 21 nodes

## Key Concepts

- **route.ts** (24 connections) — `src/app/api/orders/route.ts`
- **campaigns.ts** (20 connections) — `src/lib/campaigns.ts`
- **requireUser()** (10 connections) — `src/lib/api-guards.ts`
- **route.ts** (7 connections) — `src/app/api/coupons/validate/route.ts`
- **getActiveDiscountRules()** (7 connections) — `src/lib/campaigns.ts`
- **liveCampaignWhere()** (4 connections) — `src/lib/campaigns.ts`
- **applyDiscountRules()** (4 connections) — `src/lib/campaigns.ts`
- **validateCoupon()** (4 connections) — `src/lib/campaigns.ts`
- **getActiveBanners()** (3 connections) — `src/lib/campaigns.ts`
- **getActiveAnnouncement()** (3 connections) — `src/lib/campaigns.ts`
- **isCampaignLive()** (2 connections) — `src/lib/campaigns.ts`
- **GET()** (1 connections) — `src/app/api/orders/route.ts`
- **schema** (1 connections) — `src/app/api/coupons/validate/route.ts`
- **POST()** (1 connections) — `src/app/api/coupons/validate/route.ts`
- **SHIPPING_COSTS** (1 connections) — `src/app/api/orders/route.ts`
- **createOrderSchema** (1 connections) — `src/app/api/orders/route.ts`
- **generateProcessCode()** (1 connections) — `src/app/api/orders/route.ts`
- **POST()** (1 connections) — `src/app/api/orders/route.ts`
- **Schedulable** (1 connections) — `src/lib/campaigns.ts`
- **PriceableProduct** (1 connections) — `src/lib/campaigns.ts`
- **CouponValidation** (1 connections) — `src/lib/campaigns.ts`

## Relationships

- [[Acquisitions & Shalom API Routes]] (9 shared connections)
- [[Brand-Category API & Transformers]] (5 shared connections)
- [[Separations Balance Logic]] (5 shared connections)
- [[Stock Release Cron Job]] (3 shared connections)
- [[Product Admin API Routes]] (3 shared connections)
- [[Home Marquee Components]] (3 shared connections)
- [[Avatar Upload & Cloudinary]] (2 shared connections)
- [[Transactional Email Sending]] (2 shared connections)
- [[Order Summary & Pricing]] (2 shared connections)
- [[Footer & Social Icons]] (2 shared connections)
- [[User Avatar & Reviews]] (1 shared connections)
- [[Auth Layout & Test Config]] (1 shared connections)

## Source Files

- `src/app/api/coupons/validate/route.ts`
- `src/app/api/orders/route.ts`
- `src/lib/api-guards.ts`
- `src/lib/campaigns.ts`

## Audit Trail

- EXTRACTED: 98 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*