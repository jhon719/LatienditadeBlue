# Liberacion de stock (06.01): cancelacion de ordenes PENDING_PAYMENT y liberacion tras 60 min

- **Type:** document
- **Source:** `docs/PLAN.md`
- **Community:** [[Plan de Implementacion Resumen]]

## Rationale

Evita bloqueo de inventario por pagos de pasarela abandonados; configurable via STOCK_RELEASE_MINUTES; ejecutado por endpoint de cron (Vercel Cron con CRON_SECRET) mas disparo oportunista al abrir el dashboard admin.

## Outgoing Relations

- **references** → [[Boveda de Obsidian (docs-Boveda-Proyecto-Ecommerce, 8 secciones)]]
- **conceptually_related_to** → [[Plan- La Tiendita de Blue (referenciado, detallado en otro chunk)]]

---
_Part of the graphify knowledge graph. See [[index]] to navigate._