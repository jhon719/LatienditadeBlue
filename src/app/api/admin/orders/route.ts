import { NextRequest, NextResponse } from "next/server"
import type { Prisma } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

// Control logístico global del admin (bóveda 05 / 06.03)
export async function GET(request: NextRequest) {
  const { response } = await requireAdmin()
  if (response) return response

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")

    const where: Prisma.OrderWhereInput = {}
    if (status && status !== "all") {
      where.status = status.toUpperCase() as Prisma.OrderWhereInput["status"]
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          // El admin sí ve los datos reales del cliente (bóveda 02.03)
          user: {
            select: {
              username: true,
              email: true,
              firstName: true,
              lastName: true,
              dni: true,
              phone: true,
              tiktokUsername: true,
            },
          },
          items: {
            include: { product: { select: { name: true, images: true } } },
          },
          paymentProof: true,
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.order.count({ where }),
    ])

    return NextResponse.json({
      orders: orders.map((order) => ({
        id: order.id,
        processCode: order.processCode,
        status: order.status,
        paymentMethod: order.paymentMethod,
        totalAmount: Number(order.totalAmount),
        shippingCost: Number(order.shippingCost),
        shippingType: order.shippingType,
        shippingStatus: order.shippingStatus,
        receiverName: order.receiverName,
        receiverPhone: order.receiverPhone,
        deliveryAddress: order.deliveryAddress,
        trackingNumber: order.trackingNumber,
        createdAt: order.createdAt.toISOString(),
        customer: order.user,
        items: order.items.map((item) => ({
          id: item.id,
          name: item.product.name,
          image: item.product.images[0] ?? null,
          quantity: item.quantity,
          price: Number(item.price),
        })),
        proof: order.paymentProof
          ? {
              id: order.paymentProof.id,
              imageUrl: order.paymentProof.imageUrl,
              operationNumber: order.paymentProof.operationNumber,
              status: order.paymentProof.status,
              createdAt: order.paymentProof.createdAt.toISOString(),
            }
          : null,
      })),
      total,
    })
  } catch (error) {
    console.error("Error fetching admin orders:", error)
    return NextResponse.json(
      { error: "Error al obtener órdenes" },
      { status: 500 }
    )
  }
}
