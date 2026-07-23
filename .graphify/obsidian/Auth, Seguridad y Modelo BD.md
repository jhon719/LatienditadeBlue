# Auth, Seguridad y Modelo BD

> 17 nodes

## Key Concepts

- **01.03 — Modelo de Base de Datos Prisma SQL** (10 connections) — `docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.03 — Modelo de Base de Datos Prisma SQL]].md`
- **02.02 — Galeria Interactiva y Detalle de Producto** (7 connections) — `docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.02 — Galeria Interactiva y Detalle de Producto]].md`
- **Auth y Seguridad (NextAuth v5, RBAC, mustChangePassword, idempotencyKey, processCode)** (6 connections) — `CLAUDE.md`
- **Politica de Datos Privados vs Publicos (firstName/lastName/dni nunca expuestos)** (3 connections) — `docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.03 — Modelo de Base de Datos Prisma SQL]].md`
- **04.02 — Blindaje contra SQL Injection y XSS** (3 connections) — `docs/Boveda-Proyecto-Ecommerce/04-Seguridad-Y-Prevencion-De-Errores/[[04.02 — Blindaje contra SQL Injection y XSS]].md`
- **02.04 — Sistema de Resenas Vinculado a Usuarios (nota referenciada, no incluida en este chunk)** (3 connections) — `docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.04 — Sistema de Resenas Vinculado a Usuarios (nota referenciada, no incluida en este chunk)]].md`
- **Modelo de Datos (listado de entidades Prisma)** (2 connections) — `README.md`
- **Trazabilidad Antifraude (processCode unico + relacion obligatoria Order-PaymentProof)** (2 connections) — `docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.03 — Modelo de Base de Datos Prisma SQL]].md`
- **Bloque 4: <RatingsAndReviews/> — promedio, distribucion, badge Compra Verificada** (2 connections) — `docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.02 — Galeria Interactiva y Detalle de Producto]].md`
- **Blindaje SQL Injection (consultas parametrizadas de Prisma, $queryRaw template tag)** (2 connections) — `docs/Boveda-Proyecto-Ecommerce/04-Seguridad-Y-Prevencion-De-Errores/[[04.02 — Blindaje contra SQL Injection y XSS]].md`
- **Derechos ARCO (Ley N 29733 Peru) — Acceso, Rectificacion, Cancelacion, Oposicion** (2 connections) — `docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.03 — Politica de Privacidad y Proteccion de Datos]].md`
- **Configuracion Neon + Prisma (DATABASE_URL local vs Neon, DATABASE_URL_NON_POOLING)** (2 connections) — `docs/Boveda-Proyecto-Ecommerce/08-Plan-de-Implementacion-y-Despliegue/[[08.01 — Estrategia de Despliegue y Configuracion de Entornos]].md`
- **Arquitectura de 5 Bloques de la Interfaz (Layout)** (1 connections) — `docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.02 — Galeria Interactiva y Detalle de Producto]].md`
- **Bloque 1: <ProductGallery/> (zoom hover, carrusel miniaturas, next/image priority)** (1 connections) — `docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.02 — Galeria Interactiva y Detalle de Producto]].md`
- **Bloque 5: <QuestionsAndAnswers/> — acordeon + CTA WhatsApp con Bluet** (1 connections) — `docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.02 — Galeria Interactiva y Detalle de Producto]].md`
- **Blindaje XSS (auto-escaping React 19, prohibicion de dangerouslySetInnerHTML sin DOMPurify)** (1 connections) — `docs/Boveda-Proyecto-Ecommerce/04-Seguridad-Y-Prevencion-De-Errores/[[04.02 — Blindaje contra SQL Injection y XSS]].md`
- **01.04 — Libreria de Animaciones y Diseno Visual (nota referenciada, no incluida en este chunk)** (1 connections) — `docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.04 — Libreria de Animaciones y Diseno Visual (nota referenciada, no incluida en este chunk)]].md`

## Relationships

- [[Reglas del Proyecto (CLAUDE.md)]] (4 shared connections)
- [[Estructura de Directorios Next.js]] (4 shared connections)
- [[README Overview del Proyecto]] (2 shared connections)
- [[Politicas Legales y Envios]] (2 shared connections)
- [[Flujo de Boleta y Despliegue]] (1 shared connections)

## Source Files

- `CLAUDE.md`
- `README.md`
- `docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.03 — Modelo de Base de Datos Prisma SQL]].md`
- `docs/Boveda-Proyecto-Ecommerce/01-Core-Y-Arquitectura/[[01.04 — Libreria de Animaciones y Diseno Visual (nota referenciada, no incluida en este chunk)]].md`
- `docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.02 — Galeria Interactiva y Detalle de Producto]].md`
- `docs/Boveda-Proyecto-Ecommerce/02-Frontend-Experiencia-Homidori/[[02.04 — Sistema de Resenas Vinculado a Usuarios (nota referenciada, no incluida en este chunk)]].md`
- `docs/Boveda-Proyecto-Ecommerce/04-Seguridad-Y-Prevencion-De-Errores/[[04.02 — Blindaje contra SQL Injection y XSS]].md`
- `docs/Boveda-Proyecto-Ecommerce/07-Soporte-Y-Legal/[[07.03 — Politica de Privacidad y Proteccion de Datos]].md`
- `docs/Boveda-Proyecto-Ecommerce/08-Plan-de-Implementacion-y-Despliegue/[[08.01 — Estrategia de Despliegue y Configuracion de Entornos]].md`

## Audit Trail

- EXTRACTED: 34 (69%)
- INFERRED: 15 (31%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [[index]] to navigate.*