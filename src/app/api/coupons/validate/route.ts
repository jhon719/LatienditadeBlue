import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { requireUser } from "@/lib/api-guards"
import { validateCoupon } from "@/lib/campaigns"

const schema = z.object({
  code: z.string().min(2).max(30),
  subtotal: z.number().min(0),
})

// Validación en tiempo real de códigos de descuento en el checkout
// (bóveda 06.01 Fase 1 + 05.05 §4)
export async function POST(request: NextRequest) {
  const { response } = await requireUser()
  if (response) return response

  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos no válidos" }, { status: 400 })
  }

  const result = await validateCoupon(parsed.data.code, parsed.data.subtotal)

  if (!result.valid) {
    return NextResponse.json({ valid: false, error: result.error }, { status: 400 })
  }

  return NextResponse.json({
    valid: true,
    code: result.coupon.code,
    discount: result.discount,
    description: result.coupon.description,
  })
}
