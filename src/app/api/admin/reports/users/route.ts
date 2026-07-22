import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

// Reporte de usuarios (solo ADMIN): datos de contacto + identidad TikTok + compras.
export async function GET() {
  const { response } = await requireAdmin()
  if (response) return response

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      username: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      dni: true,
      department: true,
      address: true,
      role: true,
      loyaltyTier: true,
      tiktokUsername: true,
      tiktokUrl: true,
      createdAt: true,
      orders: {
        select: { status: true, totalAmount: true },
      },
    },
  })

  const rows = users.map((u) => {
    const paid = u.orders.filter((o) =>
      ["PAID_APPROVED", "COMPLETED"].includes(o.status)
    )
    return {
      username: u.username,
      fullName: `${u.firstName ?? ""} ${u.lastName ?? ""}`.trim() || null,
      email: u.email,
      phone: u.phone,
      dni: u.dni,
      department: u.department,
      address: u.address,
      role: u.role,
      loyaltyTier: u.loyaltyTier,
      tiktokUsername: u.tiktokUsername,
      tiktokUrl: u.tiktokUrl,
      ordersCount: paid.length,
      totalSpent: paid.reduce((acc, o) => acc + Number(o.totalAmount), 0),
      createdAt: u.createdAt.toISOString(),
    }
  })

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    count: rows.length,
    users: rows,
  })
}
