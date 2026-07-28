import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { SessionProvider } from "@/components/providers/SessionProvider"
import { NavigationTracker } from "@/components/layout/NavigationTracker"
import { BackButton } from "@/components/layout/BackButton"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
const OG_IMAGE = "https://res.cloudinary.com/dj4rzcu4p/image/upload/v1785193035/latiendita/marketing/og-home.png"
const SITE_TITLE = "La Tiendita de Blue - Anime Store"
const SITE_DESCRIPTION =
  "Figuras, peluches, mangas y merch anime en stock, preventa y online para coleccionistas en Peru."

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    // favicon.ico (app/favicon.ico) ya se registra solo vía convención de
    // Next.js; estos son los tamaños explícitos que generó favicon.io.
    icon: [
      { url: "/Imagenes/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/Imagenes/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/Imagenes/favicon_io/apple-touch-icon.png",
  },
  manifest: "/Imagenes/favicon_io/site.webmanifest",
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: APP_URL,
    siteName: "La Tiendita de Blue",
    locale: "es_PE",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <NavigationTracker />
            {children}
            <BackButton />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
