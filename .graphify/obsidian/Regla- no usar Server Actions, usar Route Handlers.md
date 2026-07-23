# Regla: no usar Server Actions, usar Route Handlers

- **Type:** document
- **Source:** `CLAUDE.md`
- **Community:** [[Reglas del Proyecto (CLAUDE.md)]]

## Rationale

Regla explicita del proyecto actual. Varias notas de la boveda (02.03, 03.02, 04.02) muestran ejemplos de codigo o texto que usan 'use server' / Server Actions, lo cual contradice esta regla vigente — posible evidencia de que el proyecto migro de Server Actions a Route Handlers en algun momento posterior a la redaccion de esas notas.

## Outgoing Relations

- **conceptually_related_to** → [[CLAUDE.md — Guia del Proyecto]]

## Incoming Relations

- [[Flujo Admin de Aprobacion de Voucher (Server Action que cambia AWAITING_VERIFICATION a PAID)]] **conceptually_related_to** → this
- [[Convenciones (Sin Server Actions, RHF+Zod, Zustand, paginas dedicadas, datos privados, no renombrar assets)]] **shares_data_with** → this _(inferred, 0.9)_
- [[Checklist de Seguridad (Code Review)- dangerouslySetInnerHTML, validacion server-side con zod, npm audit, cookies httpOnly-secure-sameSite]] **conceptually_related_to** → this

---
_Part of the graphify knowledge graph. See [[index]] to navigate._