import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

// Routes that require authentication
const protectedRoutes = ["/profile", "/checkout"]

// Routes only for admin users
const adminRoutes = ["/admin"]

// Routes only for guests (not logged in)
const guestRoutes = ["/login", "/register"]

// Páginas legales que deben poder leerse aunque el usuario todavía no haya
// aceptado los Términos (si no, no podría leerlos antes de aceptar)
const legalReadingRoutes = ["/terms", "/privacy", "/returns"]

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isAdmin = req.auth?.user?.role === "ADMIN"
  const mustChangePassword = req.auth?.user?.mustChangePassword === true
  const justRegistered = req.auth?.user?.justRegistered === true

  // Cambio forzado de contraseña (bóveda 02.03.01): bloquear navegación
  // hasta definir una nueva clave, excepto la propia página de reset
  if (isLoggedIn && mustChangePassword && nextUrl.pathname !== "/forced-reset") {
    return NextResponse.redirect(new URL("/forced-reset", nextUrl))
  }
  if (isLoggedIn && !mustChangePassword && nextUrl.pathname === "/forced-reset") {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  // Aceptación de Términos y Condiciones (bóveda 07.01): solo en primer
  // login post-registro (normal o Google), fuerza /accept-terms antes de
  // acceder a cualquier parte del sitio.
  const isLegalReadingRoute = legalReadingRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  )
  if (
    isLoggedIn &&
    !mustChangePassword &&
    justRegistered &&
    nextUrl.pathname !== "/accept-terms" &&
    !isLegalReadingRoute
  ) {
    const acceptUrl = new URL("/accept-terms", nextUrl)
    acceptUrl.searchParams.set("callbackUrl", nextUrl.pathname)
    return NextResponse.redirect(acceptUrl)
  }
  if (isLoggedIn && !justRegistered && nextUrl.pathname === "/accept-terms") {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  // Check if the current path matches any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  )

  // Check if the current path matches any admin route
  const isAdminRoute = adminRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  )

  // Check if the current path matches any guest route
  const isGuestRoute = guestRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  )

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", nextUrl)
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to home if accessing admin route without admin role
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  // Redirect to home if accessing guest route while logged in
  if (isGuestRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Match all routes except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
