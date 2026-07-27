import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { SessionProvider } from "@/components/providers/SessionProvider"
import { NavigationTracker } from "@/components/layout/NavigationTracker"
import { BackButton } from "@/components/layout/BackButton"

export const metadata: Metadata = {
  title: "La Tiendita de Blue - Anime Store",
  description:
    "Figuras, peluches, mangas y merch anime en stock, preventa y online para coleccionistas en Peru.",
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
