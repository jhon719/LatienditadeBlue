import { NextRequest, NextResponse } from "next/server"
import type { Prisma } from "@prisma/client"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"
import { MIN_DEPOSIT, defaultDueDate } from "@/lib/separations"
import { SEPARATION_INCLUDE, serializeSeparation } from "@/lib/separations-server"

// Separaciones / Apartados (bóveda 05.06 / 05.07)

export async function GET(request: NextRequest) {
  const { response } = await requireAdmin()
  if (response) return response

  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")

  const where: Prisma.PreorderReservationWhereInput = {}
  if (status && status !== "all") {
    if (status === "PENDING_BALANCE") {
      where.status = { in: ["PENDING", "ARRIVED"] }
    } else {
      where.status = status as Prisma.PreorderReservationWhereInput["status"]
    }
  }

  const separations = await prisma.preorderReservation.findMany({
    where,
    include: SEPARATION_INCLUDE,
    orderBy: [{ status: "asc" }, { dueDate: "asc" }],
  })

  return NextResponse.json(separations.map(serializeSeparation))
}

const createSchema = z.object({
  userId: z.string().min(1),
  productId: z.string().min(1),
  kind: z.enum(["STOCK", "PREORDER"]),
  batchId: z.string().optional().nullable(),
  totalPrice: z.number().positive(),
  initialDeposit: z.number().min(MIN_DEPOSIT),
  dueDate: z.string().datetime().optional().nullable(),
  notes: z.string().optional().nullable(),
})

export async function POST(request: NextRequest) {
  const { response } = await requireAdmin()
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
    if (d.initialDeposit > d.totalPrice) {
      return NextResponse.json(
        { error: "El adelanto no puede superar el precio total" },
        { status: 400 }
      )
    }

    // Para separaciones de STOCK físico se reserva una unidad (DISPONIBLE → SEPARADO)
    if (d.kind === "STOCK") {
      const product = await prisma.product.findUnique({
        where: { id: d.productId },
        select: { stockQty: true },
      })
      if (!product || product.stockQty < 1) {
        return NextResponse.json(
          { error: "No hay stock disponible para separar este producto" },
          { status: 400 }
        )
      }
    }

    const due = d.dueDate ? new Date(d.dueDate) : defaultDueDate(d.kind)

    const separation = await prisma.$transaction(async (tx) => {
      const created = await tx.preorderReservation.create({
        data: {
          userId: d.userId,
          productId: d.productId,
          kind: d.kind,
          batchId: d.batchId || null,
          totalPrice: d.totalPrice,
          depositPaid: d.initialDeposit,
          status: "PENDING",
          dueDate: due,
          notes: d.notes || null,
          // El adelanto inicial queda registrado como abono aprobado
          payments: {
            create: {
              amount: d.initialDeposit,
              status: "APPROVED",
              approvedAt: new Date(),
              note: "Adelanto inicial",
            },
          },
        },
      })

      // Reserva de stock físico
      if (d.kind === "STOCK") {
        await tx.product.update({
          where: { id: d.productId },
          data: { stockQty: { decrement: 1 } },
        })
      }

      return created
    })

    return NextResponse.json({ id: separation.id }, { status: 201 })
  } catch (error) {
    console.error("Error creating separation:", error)
    return NextResponse.json({ error: "Error al crear la separación" }, { status: 500 })
  }
}
