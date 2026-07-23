# Transactional Email Sending

> 12 nodes

## Key Concepts

- **email.ts** (14 connections) — `src/lib/email.ts`
- **send()** (6 connections) — `src/lib/email.ts`
- **layout()** (5 connections) — `src/lib/email.ts`
- **orderRow()** (5 connections) — `src/lib/email.ts`
- **sendOrderReceivedEmail()** (5 connections) — `src/lib/email.ts`
- **sendPaymentApprovedEmail()** (5 connections) — `src/lib/email.ts`
- **sendOrderShippedEmail()** (5 connections) — `src/lib/email.ts`
- **sendOrderDeliveredEmail()** (5 connections) — `src/lib/email.ts`
- **client()** (2 connections) — `src/lib/email.ts`
- **isEmailEnabled()** (1 connections) — `src/lib/email.ts`
- **OrderEmailData** (1 connections) — `src/lib/email.ts`
- **SHIPPING_LABELS** (1 connections) — `src/lib/email.ts`

## Relationships

- [[Product Admin API Routes]] (4 shared connections)
- [[Campaigns & Coupon Validation]] (2 shared connections)
- [[Acquisitions & Shalom API Routes]] (1 shared connections)

## Source Files

- `src/lib/email.ts`

## Audit Trail

- EXTRACTED: 55 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*