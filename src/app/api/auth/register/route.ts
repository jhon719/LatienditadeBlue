import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "El username debe tener al menos 3 caracteres")
    .max(20, "El username no puede superar 20 caracteres")
    .regex(/^[a-z0-9._-]+$/i, "Solo letras, números, puntos, guiones y guiones bajos"),
  email: z.string().email("Email no válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[0-9!@#$%^&*(),.?":{}|<>_-]/, "Debe incluir al menos un número o símbolo"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }

    const { username, email, password } = parsed.data

    const existingEmail = await prisma.user.findUnique({ where: { email } })
    if (existingEmail) {
      if (!existingEmail.passwordHash) {
        return NextResponse.json(
          { error: "Esta cuenta ya está vinculada a Google. Inicia sesión con Google." },
          { status: 400 }
        )
      }
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      )
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    })
    if (existingUsername) {
      return NextResponse.json(
        { error: "El username ya está en uso" },
        { status: 400 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        username: username.toLowerCase(),
        email,
        passwordHash,
      },
      select: { id: true, username: true, email: true },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json(
      { error: "Error al registrar usuario" },
      { status: 500 }
    )
  }
}
