import type { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

// El build de Docker usa un DATABASE_URL placeholder (ver Dockerfile): sin
// force-dynamic, `next build` intentaría prerenderizar este archivo con una
// conexión real a Prisma y el build fallaría.
export const dynamic = "force-dynamic"

// Base pública del sitio (bóveda 03.05): definida por variable de entorno en
// cada ambiente (GitHub Actions var NEXT_PUBLIC_APP_URL en producción).
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

// Jerarquía de sitelinks: solo páginas públicas indexables. Rutas privadas
// (admin, profile, cart, checkout, accept-terms, forced-reset) quedan fuera
// y además bloqueadas en robots.ts.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    select: { slug: true, updatedAt: true },
  })

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/returns`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes]
}
