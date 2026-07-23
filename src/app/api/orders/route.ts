import { NextRequest, NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { z } from "zod"
import crypto from "node:crypto"
import { prisma } from "@/lib/prisma"
import { requireUser } from "@/lib/api-guards"
import { transformOrder } from "@/lib/transformers"
import { calculateBundleDiscount } from "@/lib/pricing"
import {
  getActiveDiscountRules,
  applyDiscountRules,
  validateCoupon,
} from "@/lib/campaigns"
import { sendOrderReceivedEmail } from "@/lib/email"

export async function GET() {
  const { session, response } = await requireUser()
  if (response) return response

  try {
    const orders = await prisma.order.findMany({
      where: { userId: session!.user.id },
      include: {
        items: {
          include: { product: { select: { name: true, images: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(orders.map(transformOrder))
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      { error: "Error al obtener pedidos" },
      { status: 500 }
    )
  }
}

// Costos de envío (bóveda 03.03)
const SHIPPING_COSTS: Record<string, number> = {
  PICKUP: 0,
  LOCAL_DELIVERY: 10,
  NATIONAL_COURIER: 0, // Pago en destino (Shalom/Olva)
}

const PREORDER_LIMIT = 5

const createOrderSchema = z
  .object({
    idempotencyKey: z.string().uuid("Clave de idempotencia no válida"),
    items: z
      .array(
        z.object({
          productId: z.string().min(1),
          quantity: z.number().int().min(1).max(20),
        })
      )
      .min(1, "El carrito está vacío"),
    shippingType: z.enum(["PICKUP", "LOCAL_DELIVERY", "NATIONAL_COURIER"]),
    receiverName: z.string().min(3, "Nombre del receptor requerido").max(100),
    receiverPhone: z
      .string()
      .regex(/^\d{9}$/, "El teléfono debe tener 9 dígitos"),
    deliveryAddress: z.string().max(250).optional(),
    paymentMethod: z.enum(["MANUAL_TRANSFER", "MERCADO_PAGO"]),
    couponCode: z.string().max(30).optional(),
    proof: z
      .object({
        imageUrl: z.string().min(1, "Sube tu comprobante"),
        operationNumber: z
          .string()
          .min(4, "Ingresa el número de operación")
          .max(30),
      })
      .optional(),
  })
  .refine(
    (data) => data.shippingType === "PICKUP" || !!data.deliveryAddress?.trim(),
    {
      message: "La dirección de entrega es obligatoria para envíos",
      path: ["deliveryAddress"],
    }
  )
  .refine(
    (data) => data.paymentMethod !== "MANUAL_TRANSFER" || !!data.proof,
    {
      message: "Adjunta tu comprobante de pago",
      path: ["proof"],
    }
  )

function generateProcessCode(): string {
  // Código de trazabilidad tipo ORD-X8A9B (bóveda 01.03)
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let code = ""
  for (let i = 0; i < 5; i++) {
    code += alphabet[crypto.randomInt(alphabet.length)]
  }
  return `ORD-${code}`
}

export async function POST(request: NextRequest) {
  const { session, response } = await requireUser()
  if (response) return response

  try {
    const body = await request.json()
    const parsed = createOrderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Datos no válidos" },
        { status: 400 }
      )
    }

    const data = parsed.data
    const userId = session!.user.id
    const shippingCost = SHIPPING_COSTS[data.shippingType]

    // Reglas de precio activas (bóveda 05.05): el precio congelado de cada
    // ítem es el precio efectivo (rebajado si hay campaña)
    const activeRules = await getActiveDiscountRules()

    // Transacción atómica: validar stock, reservarlo y crear la orden
    const order = await prisma.$transaction(async (tx) => {
      const productIds = data.items.map((i) => i.productId)
      const products = await tx.product.findMany({
        where: { id: { in: productIds }, isActive: true },
      })

      if (products.length !== productIds.length) {
        throw new Error("PRODUCT_NOT_FOUND")
      }

      const unitPrice = (product: (typeof products)[number]) =>
        applyDiscountRules(product, activeRules)?.salePrice ?? Number(product.price)

      let subtotal = 0
      for (const item of data.items) {
        const product = products.find((p) => p.id === item.productId)!

        if (product.status === "AGOTADO") {
          throw new Error(`SIN_STOCK:${product.name}`)
        }
        if (product.status === "PREVENTA") {
          if (item.quantity > PREORDER_LIMIT) {
            throw new Error(`LIMITE_PREVENTA:${product.name}`)
          }
        }
        if (product.stockQty < item.quantity) {
          throw new Error(`SIN_STOCK:${product.name}`)
        }

        subtotal += unitPrice(product) * item.quantity
      }

      // Reservar stock de forma atómica (se restaura si el pago es rechazado).
      // El guard `stockQty >= quantity` dentro del WHERE evita la sobreventa por
      // condición de carrera: si dos checkouts compiten por la última unidad, el
      // UPDATE toma un lock de fila y solo uno afecta count=1; el otro obtiene 0.
      for (const item of data.items) {
        const reserved = await tx.product.updateMany({
          where: { id: item.productId, stockQty: { gte: item.quantity } },
          data: { stockQty: { decrement: item.quantity } },
        })
        if (reserved.count === 0) {
          const p = products.find((x) => x.id === item.productId)!
          throw new Error(`SIN_STOCK:${p.name}`)
        }
      }
      // Marcar agotados los que llegaron a 0
      await tx.product.updateMany({
        where: { id: { in: productIds }, stockQty: { lte: 0 }, status: "STOCK" },
        data: { status: "AGOTADO" },
      })

      // Descuento "Combina y Ahorra" calculado en servidor (bóveda 02.02)
      const { discount } = calculateBundleDiscount(
        data.items.map((item) => {
          const product = products.find((p) => p.id === item.productId)!
          return {
            categoryId: product.categoryId,
            price: unitPrice(product),
            quantity: item.quantity,
          }
        })
      )

      // Cupón (bóveda 05.05 §4): se revalida en servidor sobre el subtotal
      // ya rebajado, y su contador se incrementa con guard anti-carrera
      let couponDiscount = 0
      let couponId: string | null = null
      let couponCode: string | null = null
      if (data.couponCode) {
        const result = await validateCoupon(data.couponCode, subtotal - discount)
        if (!result.valid) {
          throw new Error(`CUPON:${result.error}`)
        }
        const claimed = await tx.coupon.updateMany({
          where: {
            id: result.coupon.id,
            OR: [
              { maxUses: null },
              { usedCount: { lt: result.coupon.maxUses ?? 0 } },
            ],
          },
          data: { usedCount: { increment: 1 } },
        })
        if (claimed.count === 0) {
          throw new Error("CUPON:Este cupón ya alcanzó su límite de usos")
        }
        couponDiscount = result.discount
        couponId = result.coupon.id
        couponCode = result.coupon.code
      }

      const totalAmount = subtotal - discount - couponDiscount + shippingCost

      // Generar processCode único
      let processCode = generateProcessCode()
      while (await tx.order.findUnique({ where: { processCode } })) {
        processCode = generateProcessCode()
      }

      const created = await tx.order.create({
        data: {
          processCode,
          idempotencyKey: data.idempotencyKey,
          userId,
          totalAmount,
          shippingCost,
          discountAmount: discount,
          couponDiscount,
          couponId,
          couponCode,
          shippingType: data.shippingType,
          receiverName: data.receiverName,
          receiverPhone: data.receiverPhone,
          deliveryAddress: data.deliveryAddress?.trim() || null,
          paymentMethod: data.paymentMethod,
          status:
            data.paymentMethod === "MANUAL_TRANSFER"
              ? "VERIFYING_MANUAL"
              : "PENDING_PAYMENT",
          items: {
            create: data.items.map((item) => {
              const product = products.find((p) => p.id === item.productId)!
              return {
                productId: item.productId,
                quantity: item.quantity,
                price: unitPrice(product), // Precio congelado (con rebaja de campaña)
              }
            }),
          },
          ...(data.paymentMethod === "MANUAL_TRANSFER" && data.proof
            ? {
                paymentProof: {
                  create: {
                    userId,
                    imageUrl: data.proof.imageUrl,
                    operationNumber: data.proof.operationNumber,
                  },
                },
              }
            : {}),
        },
      })

      return created
    })

    // Correo "pedido recibido" (bóveda 05.04) — no bloquea la respuesta si falla
    await sendOrderReceivedEmail({
      email: session!.user.email ?? "",
      processCode: order.processCode,
      totalAmount: Number(order.totalAmount),
      paymentMethod: order.paymentMethod,
      shippingType: order.shippingType,
      receiverName: order.receiverName,
    })

    return NextResponse.json(
      {
        id: order.id,
        processCode: order.processCode,
        status: order.status,
        totalAmount: Number(order.totalAmount),
        shippingType: order.shippingType,
      },
      { status: 201 }
    )
  } catch (error) {
    // Idempotencia: doble clic → misma key → violación de unicidad (bóveda 04.01)
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Tu pedido ya está siendo procesado." },
        { status: 409 }
      )
    }

    const message = error instanceof Error ? error.message : ""
    if (message.startsWith("CUPON:")) {
      return NextResponse.json({ error: message.slice(6) }, { status: 400 })
    }
    if (message.startsWith("SIN_STOCK:")) {
      return NextResponse.json(
        { error: `No hay stock suficiente de "${message.slice(10)}"` },
        { status: 400 }
      )
    }
    if (message.startsWith("LIMITE_PREVENTA:")) {
      return NextResponse.json(
        { error: `Máximo ${PREORDER_LIMIT} unidades por preventa` },
        { status: 400 }
      )
    }
    if (message === "PRODUCT_NOT_FOUND") {
      return NextResponse.json(
        { error: "Algún producto del carrito ya no está disponible" },
        { status: 400 }
      )
    }

    console.error("Error creating order:", error)
    return NextResponse.json(
      { error: "Error al crear el pedido" },
      { status: 500 }
    )
  }
}
