import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/api-guards"
import { DEPARTMENT_CODES } from "@/lib/peru"

export async function GET() {
  const { session, response } = await requireUser()
  if (response) return response

  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      dni: true,
      phone: true,
      address: true,
      department: true,
      avatarFileName: true,
      marketingOptIn: true,
      createdAt: true,
    },
  })

  return NextResponse.json(user)
}

const profileSchema = z.object({
  firstName: z.string().max(60).optional().nullable(),
  lastName: z.string().max(60).optional().nullable(),
  dni: z
    .string()
    .regex(/^\d{8}$/, "El DNI debe tener 8 dígitos")
    .optional()
    .nullable()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^\d{9}$/, "El teléfono debe tener 9 dígitos")
    .optional()
    .nullable()
    .or(z.literal("")),
  address: z.string().max(200).optional().nullable(),
  // Departamento del Perú para el mapa de calor (bóveda 05.01)
  department: z.enum(DEPARTMENT_CODES).optional().nullable().or(z.literal("")),
  marketingOptIn: z.boolean().optional(),
})

export async function PATCH(request: NextRequest) {
  const { session, response } = await requireUser()
  if (response) return response

  const body = await request.json().catch(() => null)
  const parsed = profileSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
      { status: 400 }
    )
  }

  const data = Object.fromEntries(
    Object.entries(parsed.data).map(([k, v]) => [k, v === "" ? null : v])
  )

  const user = await prisma.user.update({
    where: { id: session!.user.id },
    data,
    select: {
      firstName: true,
      lastName: true,
      dni: true,
      phone: true,
      address: true,
      department: true,
      marketingOptIn: true,
    },
  })

  return NextResponse.json(user)
}
