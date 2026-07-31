import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/api-guards"

// Lotes de importación (stock en tránsito / aduanas) — bóveda 05.03

export async function GET() {
  const { response } = await requireAdmin()
  if (response) return response

  const batches = await prisma.importBatch.findMany({
    include: {
      items: { include: { product: { select: { name: true, images: true } } } },
      _count: { select: { preorders: true } },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(
    batches.map((b) => ({
      id: b.id,
      name: b.name,
      supplier: b.supplier,
      trackingRef: b.trackingRef,
      shipDate: b.shipDate?.toISOString() ?? null,
      eta: b.eta?.toISOString() ?? null,
      status: b.status,
      receivedAt: b.receivedAt?.toISOString() ?? null,
      notes: b.notes,
      images: b.images,
      createdAt: b.createdAt.toISOString(),
      preorderCount: b._count.preorders,
      items: b.items.map((it) => ({
        id: it.id,
        productId: it.productId,
        name: it.product.name,
        image: it.product.images[0] ?? null,
        quantity: it.quantity,
        unitCost: it.unitCost ? Number(it.unitCost) : null,
      })),
    }))
  )
}

const itemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
  unitCost: z.number().nonnegative().optional().nullable(),
  // Estado a aplicar al producto del catálogo al agregarlo al lote. La mayoría
  // de productos en un lote todavía están en camino, así que PREVENTA es el
  // default; el admin cambia a STOCK si está registrando un lote ya recibido.
  status: z.enum(["PREVENTA", "STOCK"]).default("PREVENTA"),
})

const createSchema = z.object({
  name: z.string().min(2),
  supplier: z.string().optional().nullable(),
  trackingRef: z.string().optional().nullable(),
  shipDate: z.string().datetime().optional().nullable(),
  eta: z.string().datetime().optional().nullable(),
  notes: z.string().optional().nullable(),
  images: z.array(z.string()).default([]),
  items: z.array(itemSchema).default([]),
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
    const eta = d.eta ? new Date(d.eta) : null

    const batch = await prisma.$transaction(async (tx) => {
      const created = await tx.importBatch.create({
        data: {
          name: d.name,
          supplier: d.supplier || null,
          trackingRef: d.trackingRef || null,
          shipDate: d.shipDate ? new Date(d.shipDate) : null,
          eta,
          notes: d.notes || null,
          images: d.images,
          items: {
            create: d.items.map((it) => ({
              productId: it.productId,
              quantity: it.quantity,
              unitCost: it.unitCost ?? null,
            })),
          },
        },
      })

      // Refleja el estado elegido por ítem en el producto del catálogo: si es
      // PREVENTA, además le hereda el ETA del lote como fecha estimada de llegada.
      for (const it of d.items) {
        await tx.product.update({
          where: { id: it.productId },
          data: {
            status: it.status,
            expectedDate: it.status === "PREVENTA" ? eta : null,
          },
        })
      }

      return created
    })
    return NextResponse.json({ id: batch.id }, { status: 201 })
  } catch (error) {
    console.error("Error creating batch:", error)
    return NextResponse.json({ error: "Error al crear el lote" }, { status: 500 })
  }
}
