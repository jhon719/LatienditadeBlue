# Hallazgo critico: RBAC no aplicado, clientes acceden al panel admin

- **Type:** document
- **Source:** `testsprite_tests/testsprite-mcp-test-report.md`
- **Community:** [[TestSprite Findings Report]]

## Rationale

Hallazgo critico de seguridad: usuarios con rol CUSTOMER podian acceder al panel admin sin restriccion; requiere que src/middleware.ts valide el rol antes de permitir acceso a rutas /admin.

## Outgoing Relations

- **references** → [[src-middleware.ts]]
- **conceptually_related_to** → [[Autenticacion (registro username, Google condicional, reset forzado, RBAC middleware)]] _(inferred, 0.7)_
- **conceptually_related_to** → [[TestSprite AI Testing Report (MCP)]]

## Incoming Relations

- [[Recomendaciones del reporte (seccion 5)]] **rationale_for** → this
- [[TC005 Role-Based Access Control Enforcement (FAILED, CRITICAL)]] **cites** → this

---
_Part of the graphify knowledge graph. See [[index]] to navigate._