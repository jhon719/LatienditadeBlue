# La Tiendita de Blue

E-commerce peruano de figuras coleccionables y merchandising de anime, construido con Next.js 16, TypeScript y Tailwind CSS.

## Descripción

**La Tiendita de Blue** es una tienda online de figuras de anime, peluches, mangas y merch, con catálogo por anime (categoría), línea de figura y marca (fabricante). Incluye:

- **Tienda pública**: Catálogo con filtros (anime/línea/marca/estado), carrito, checkout con pago manual (Yape/Plin/transferencia) y Mercado Pago
- **Panel de usuario**: Perfil con avatar, historial de pedidos, separaciones (preventa) y rastreo Shalom
- **Panel de administración**: Bandeja POS (validación de vouchers), órdenes, logística, productos, campañas, usuarios y reportes

## Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| Next.js 16 | Framework (App Router) |
| TypeScript | Lenguaje |
| Tailwind CSS v4 | Estilos |
| shadcn/ui | Componentes UI |
| Prisma 7 | ORM |
| PostgreSQL | Base de datos |
| Zustand | Estado global |
| NextAuth.js v5 | Autenticación (Credentials + Google) |

## Requisitos

- Node.js 18+
- PostgreSQL 18 (local, DB `latiendita_blue`)

## Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd la-tiendita-de-blue

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Ejecutar migraciones
npx prisma migrate dev

# Sembrar datos iniciales
npm run db:seed
```

## Desarrollo

```bash
# Servidor de desarrollo
npm run dev

# Abrir http://localhost:3000
```

Usuarios seed: `admin@latienditadeblue.com` (ADMIN) y `cliente@demo.com` (cliente demo) — credenciales en `prisma/seed.ts`.

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera build de producción (incluye `prisma generate`) |
| `npm run start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint |
| `npm run db:seed` | Siembra datos iniciales |

## Estructura del Proyecto

```
src/
├── app/
│   ├── (shop)/          # Rutas públicas (tienda)
│   ├── (admin-panel)/   # Panel de administración
│   ├── (auth)/          # Login y registro
│   └── api/             # Route handlers
├── components/
│   ├── ui/              # shadcn/ui
│   ├── layout/          # Header, Footer, Nav
│   ├── home/            # Secciones de la home
│   ├── products/        # Componentes de productos
│   ├── cart/ checkout/  # Carrito y checkout
│   ├── admin/           # Panel admin
│   └── profile/         # Perfil de usuario
├── lib/                 # Utilidades (prisma, auth, social, transformers)
├── stores/              # Zustand stores
└── types/               # Tipos TypeScript
```

## Documentación

- [CLAUDE.md](./CLAUDE.md) - Guía del proyecto para desarrollo asistido
- [Plan](./docs/PLAN.md) - Plan de implementación
- Bóveda Obsidian (`docs/Boveda-Proyecto-Ecommerce`) - Especificación completa del negocio

## Licencia

MIT
