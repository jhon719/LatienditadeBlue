import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/api-guards"
import { MIN_DEPOSIT, defaultDueDate } from "@/lib/separations"
import { SEPARATION_INCLUDE, serializeSeparation } from "@/lib/separations-server"
import { applyDiscountRules, getActiveDiscountRules } from "@/lib/campaigns"

// Separaciones del propio cliente (bóveda 05.06 §4: panel "Mi Cuenta")
export async function GET() {
  const { session, response } = await requireUser()
  if (response) return response

  const separations = await prisma.preorderReservation.findMany({
    where: { userId: session!.user.id },
    include: SEPARATION_INCLUDE,
    orderBy: [{ status: "asc" }, { dueDate: "asc" }],
  })

  return NextResponse.json(separations.map(serializeSeparation))
}

const createSchema = z.object({
  productId: z.string().min(1),
  deposit: z.number().min(MIN_DEPOSIT),
  operationNumber: z.string().min(3),
  imageUrl: z.string().url(),
})

// El cliente inicia una separación pagando el adelanto (bóveda 05.06 §2).
// El adelanto queda PENDING hasta que el admin lo valide en la Bandeja POS;
// recién ahí la reserva queda confirmada. Para stock físico se reserva la
// unidad de inmediato (evita sobreventa durante la revisión).
export async function POST(request: NextRequest) {
  const { session, response } = await requireUser()
  if (response) return response

  try {
    const body = await request.json()
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }
    const d = parsed.data

    const product = await prisma.product.findFirst({
      where: { id: d.productId, isActive: true },
      select: {
        id: true,
        price: true,
        status: true,
        stockQty: true,
        categoryId: true,
        lineId: true,
      },
    })
    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }
    if (product.status === "AGOTADO") {
      return NextResponse.json(
        { error: "Este producto está agotado y no se puede apartar" },
        { status: 400 }
      )
    }

    const kind = product.status === "PREVENTA" ? "PREORDER" : "STOCK"
    if (kind === "STOCK" && product.stockQty < 1) {
      return NextResponse.json(
        { error: "No hay stock disponible para apartar" },
        { status: 400 }
      )
    }

    // Precio efectivo (con descuento de campaña activo, igual que ve el cliente)
    const rules = await getActiveDiscountRules()
    const sale = applyDiscountRules(product, rules)
    const total = sale?.salePrice ?? Number(product.price)
    if (d.deposit > total) {
      return NextResponse.json(
        { error: "El adelanto no puede superar el precio total" },
        { status: 400 }
      )
    }

    // Evitar separaciones duplicadas activas del mismo producto por el mismo cliente
    const existing = await prisma.preorderReservation.findFirst({
      where: {
        userId: session!.user.id,
        productId: d.productId,
        status: { in: ["PENDING", "ARRIVED"] },
      },
      select: { id: true },
    })
    if (existing) {
      return NextResponse.json(
        { error: "Ya tienes una separación activa de este producto" },
        { status: 409 }
      )
    }

    const separation = await prisma.$transaction(async (tx) => {
      const created = await tx.preorderReservation.create({
        data: {
          userId: session!.user.id,
          productId: d.productId,
          kind,
          totalPrice: total,
          depositPaid: 0, // se acredita al aprobar el adelanto en la Bandeja POS
          status: "PENDING",
          dueDate: defaultDueDate(kind),
          payments: {
            create: {
              amount: d.deposit,
              operationNumber: d.operationNumber,
              imageUrl: d.imageUrl,
              status: "PENDING",
              note: "Adelanto de separación",
            },
          },
        },
      })
      if (kind === "STOCK") {
        await tx.product.update({
          where: { id: d.productId },
          data: { stockQty: { decrement: 1 } },
        })
      }
      return created
    })

    return NextResponse.json({ id: separation.id }, { status: 201 })
  } catch (error) {
    console.error("Error creating buyer separation:", error)
    return NextResponse.json({ error: "Error al crear la separación" }, { status: 500 })
  }
}
