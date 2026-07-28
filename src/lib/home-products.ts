import { prisma } from "@/lib/prisma"

// Selección aleatoria de productos activos para el home (catálogo parcial y
// secciones por categoría destacada). RANDOM() en Postgres es aceptable para
// el volumen de este catálogo; no requiere una tabla de "featured slots".
export async function getRandomActiveProductIds(
  take: number,
  categoryId?: string
): Promise<string[]> {
  const rows = categoryId
    ? await prisma.$queryRaw<{ id: string }[]>`
        SELECT id FROM products
        WHERE "isActive" = true AND "categoryId" = ${categoryId}
        ORDER BY RANDOM() LIMIT ${take}
      `
    : await prisma.$queryRaw<{ id: string }[]>`
        SELECT id FROM products
        WHERE "isActive" = true
        ORDER BY RANDOM() LIMIT ${take}
      `
  return rows.map((r) => r.id)
}

// SELECT ... WHERE id IN (...) no preserva el orden aleatorio, así que se
// reordena en memoria según la lista de ids ya barajada.
export async function fetchProductsByIds(ids: string[]) {
  if (ids.length === 0) return []

  const rows = await prisma.product.findMany({
    where: { id: { in: ids } },
    include: {
      category: true,
      line: true,
      brand: true,
      reviews: { select: { rating: true } },
    },
  })

  const byId = new Map(rows.map((p) => [p.id, p]))
  return ids
    .map((id) => byId.get(id))
    .filter((p): p is (typeof rows)[number] => p !== undefined)
}
