# Checklist de Seguridad (Code Review): dangerouslySetInnerHTML, validacion server-side con zod, npm audit, cookies httpOnly/secure/sameSite

- **Type:** document
- **Source:** `docs/Boveda-Proyecto-Ecommerce/04-Seguridad-Y-Prevencion-De-Errores/[[04.02 — Blindaje contra SQL Injection y XSS]].md`
- **Community:** [[Reglas del Proyecto (CLAUDE.md)]]

## Rationale

Menciona validar inputs 'en el Server Action usando zod', asumiendo el uso de Server Actions — en conflicto con la regla actual del proyecto de usar solo Route Handlers.

## Outgoing Relations

- **conceptually_related_to** → [[Regla- no usar Server Actions, usar Route Handlers]]
- **shares_data_with** → [[Regla- formularios con react-hook-form + zod]] _(inferred, 0.6)_
- **conceptually_related_to** → [[04.02 — Blindaje contra SQL Injection y XSS]]

---
_Part of the graphify knowledge graph. See [[index]] to navigate._