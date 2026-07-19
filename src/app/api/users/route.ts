import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

// Listado de clientes para el admin: incluye datos privados (bóveda 02.03,
// visibles exclusivamente por el rol ADMIN)
export async function GET(request: NextRequest) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { searchParams } = new URL(request.url)
    const role = searchParams.get("role")

    const users = await prisma.user.findMany({
      where: role && role !== "all" ? { role: role.toUpperCase() as "ADMIN" | "CUSTOMER" } : undefined,
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        dni: true,
        phone: true,
        address: true,
        avatarFileName: true,
        role: true,
        mustChangePassword: true,
        passwordHash: true,
        createdAt: true,
        _count: { select: { orders: true } },
        orders: {
          where: { status: { in: ["PAID_APPROVED", "COMPLETED"] } },
          select: { totalAmount: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(
      users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        dni: user.dni,
        phone: user.phone,
        address: user.address,
        avatarFileName: user.avatarFileName,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
        isGoogleAccount: !user.passwordHash,
        createdAt: user.createdAt.toISOString(),
        orderCount: user._count.orders,
        totalSpent: user.orders.reduce(
          (acc, o) => acc + Number(o.totalAmount),
          0
        ),
      }))
    )
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { error: "Error al obtener usuarios" },
      { status: 500 }
    )
  }
}
