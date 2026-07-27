import type { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/profile",
        "/cart",
        "/checkout",
        "/accept-terms",
        "/forced-reset",
        "/api",
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
