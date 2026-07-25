# syntax=docker/dockerfile:1

# Node 22 LTS: Node 20 salió de mantenimiento en abril de 2026 (ya no recibe
# parches de seguridad). package.json declara engines >=20, y Next 16.2 +
# Prisma 7.9 soportan 22, así que el salto es directo.
FROM node:22-slim AS base
RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl ca-certificates wget \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# ---------- Etapa de build ----------
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1

# Next.js incrusta las NEXT_PUBLIC_* en el bundle durante `next build`; pasarlas
# solo en runtime (docker-compose) las dejaría como undefined en el cliente
# (BluetBubble, ProductDetail, LegalPage leen el número de WhatsApp).
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_WHATSAPP_NUMBER
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_WHATSAPP_NUMBER=$NEXT_PUBLIC_WHATSAPP_NUMBER

# DATABASE_URL y AUTH_SECRET son placeholders solo para el build: todas las
# páginas que tocan Prisma son force-dynamic y no hay generateStaticParams
# (no se abre ninguna conexión real), y NextAuth valida el secret de forma
# perezosa (en la primera request, no al importar el módulo) — pero se dejan
# como placeholder por si algún import a nivel de módulo llegara a leerlos.
# (El linter de BuildKit marca "AUTH_SECRET" como advertencia por el nombre,
# no por el valor; es un placeholder inofensivo y no bloquea el build.)
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build?schema=public" \
    AUTH_SECRET="placeholder-no-usado-en-runtime"

# package.json + prisma primero para cachear `npm ci`: el hook postinstall
# corre `prisma generate`, que necesita prisma/schema.prisma y prisma.config.ts
# ya presentes (schema.prisma no declara `url`; vive en el config).
COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
RUN npm ci

COPY . .
RUN npm run build

# ---------- Etapa de runtime ----------
FROM base AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

# Server standalone de Next.js (mínimo, con solo los node_modules trazados)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prisma schema and configuration
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./

# Install Prisma CLI and dotenv in the runner to ensure all transitive dependencies
# (like 'effect', 'c12') are present. This fixes MODULE_NOT_FOUND errors.
RUN npm install prisma@7.8.0 dotenv@17.2.3 --no-save \
  && chown -R nextjs:nodejs /app/node_modules

COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh && chown nextjs:nodejs docker-entrypoint.sh

# Destinos del fallback a disco de /api/upload y /api/user/avatar cuando
# Cloudinary no está configurado. Deben pertenecer a nextjs para que el proceso
# pueda escribir, y así los volúmenes de docker-compose heredan esa propiedad
# al crearse (si quedaran como root, la subida fallaría con EACCES).
RUN mkdir -p public/uploads public/Imagenes/avatar \
  && chown -R nextjs:nodejs public/uploads public/Imagenes/avatar

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ || exit 1

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]
