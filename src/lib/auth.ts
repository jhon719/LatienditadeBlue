import NextAuth, { type NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

// Google solo se activa si hay credenciales en .env (bóveda 02.06)
export function isGoogleEnabled(): boolean {
  return !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET
}

// Genera un username único a partir del email (pedro.gomez → pedro.gomez, pedro.gomez1, ...)
async function generateUsername(email: string): Promise<string> {
  const base = email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "")
    .slice(0, 20) || "coleccionista"

  let candidate = base
  let suffix = 0
  while (await prisma.user.findUnique({ where: { username: candidate } })) {
    suffix += 1
    candidate = `${base}${suffix}`
  }
  return candidate
}

const providers: NextAuthConfig["providers"] = [
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        return null
      }

      const user = await prisma.user.findUnique({
        where: { email: credentials.email as string },
      })

      if (!user) {
        return null
      }

      // Cuenta creada con Google: no tiene contraseña local (bóveda 02.03.01)
      if (!user.passwordHash) {
        throw new Error(
          "Esta cuenta está vinculada a Google. Por favor, inicia sesión con tu cuenta de Google."
        )
      }

      const passwordMatch = await bcrypt.compare(
        credentials.password as string,
        user.passwordHash
      )

      if (!passwordMatch) {
        return null
      }

      return {
        id: user.id,
        email: user.email,
        name: user.username,
        role: user.role,
        username: user.username,
        mustChangePassword: user.mustChangePassword,
      }
    },
  }),
]

if (isGoogleEnabled()) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: false,
    })
  )
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  callbacks: {
    async signIn({ user, account }) {
      // Al entrar con Google por primera vez, crear el usuario con username generado
      if (account?.provider === "google" && user.email) {
        const existing = await prisma.user.findUnique({
          where: { email: user.email },
        })
        if (!existing) {
          const username = await generateUsername(user.email)
          await prisma.user.create({
            data: {
              email: user.email,
              username,
              passwordHash: null,
              avatarFileName: null, // Fallback automático a Mascota BLUE.png
            },
          })
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        // En Google el id del token es el sub de Google; usar siempre el id de nuestra DB
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: {
            id: true,
            role: true,
            username: true,
            mustChangePassword: true,
          },
        })
        if (dbUser) {
          token.id = dbUser.id
          token.role = dbUser.role
          token.username = dbUser.username
          token.mustChangePassword = dbUser.mustChangePassword
        }
      }
      // Refrescar el flag tras el cambio forzado de contraseña
      if (token.id && token.mustChangePassword) {
        const fresh = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { mustChangePassword: true },
        })
        if (fresh) token.mustChangePassword = fresh.mustChangePassword
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.username = token.username as string
        session.user.mustChangePassword = token.mustChangePassword as boolean
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
})
