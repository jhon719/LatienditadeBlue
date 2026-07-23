import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production"

// Content Security Policy (bóveda 04.02 §3). Se permite 'unsafe-inline' en
// scripts/estilos porque Next.js inyecta el bootstrap de hidratación inline sin
// nonce; aun así el CSP bloquea scripts de orígenes externos no autorizados, que
// es el vector principal de XSS. En dev se habilitan 'unsafe-eval' y websockets
// para React Refresh / HMR de Turbopack.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ")

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]

const nextConfig: NextConfig = {
  // Permite acceder al servidor de desarrollo a través de túneles ngrok
  // (protección anti DNS-rebinding de Next.js: sin esto, el dev server
  // rechaza peticiones cuyo Host no coincide con localhost).
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.io", "*.ngrok.app"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
};

export default nextConfig;
