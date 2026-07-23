# route.ts

- **Type:** code
- **Source:** `src/app/api/orders/route.ts`:L1
- **Community:** [[Campaigns & Coupon Validation]]

## Outgoing Relations

- **imports_from** → [[api-guards.ts]]
- **imports** → [[requireAdmin()]]
- **imports** → [[requireUser()]]
- **imports_from** → [[campaigns.ts]]
- **imports** → [[applyDiscountRules()]]
- **imports** → [[getActiveDiscountRules()]]
- **imports** → [[validateCoupon()]]
- **imports_from** → [[email.ts]]
- **imports** → [[sendOrderReceivedEmail()]]
- **imports_from** → [[pricing.ts]]
- **imports** → [[calculateBundleDiscount()]]
- **imports_from** → [[prisma.ts]]
- **imports_from** → [[transformers.ts]]
- **imports** → [[transformOrder()]]
- **contains** → [[createOrderSchema]]
- **contains** → [[generateProcessCode()]]
- **contains** → [[GET() (route 6)]]
- **contains** → [[POST() (route 17)]]
- **contains** → [[SHIPPING_COSTS]]

## Incoming Relations

- [[0a444d0 18-97-2026]] **MODIFIES** → this
- [[2982ca1 iniciar proyecto]] **MODIFIES** → this
- [[3db2e43 version 2]] **MODIFIES** → this
- [[487cc56 version 4]] **MODIFIES** → this
- [[ef3a883 version 7]] **MODIFIES** → this

---
_Part of the graphify knowledge graph. See [[index]] to navigate._