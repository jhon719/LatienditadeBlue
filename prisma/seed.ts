import "dotenv/config"
import fs from "node:fs"
import path from "node:path"
import { PrismaClient, ProductStatus } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import bcrypt from "bcryptjs"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const PUBLIC_DIR = path.join(process.cwd(), "public")
const ANIMES_DIR = path.join(PUBLIC_DIR, "Imagenes", "Lista de Animes")
const LINEAS_DIR = path.join(PUBLIC_DIR, "Imagenes", "Lineas de figuras")

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function titleCase(name: string): string {
  return name
    .split(" ")
    .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ")
}

// Escanea una carpeta de public/ y devuelve [{ name, slug, imageUrl }]
function scanImageFolder(dir: string, publicPrefix: string) {
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    .map((file) => {
      const base = file.replace(/\.[^.]+$/, "")
      return {
        name: titleCase(base),
        slug: slugify(base),
        imageUrl: `${publicPrefix}/${file}`,
      }
    })
}

async function main() {
  console.log("Seeding La Tiendita de Blue...")

  // Limpiar datos existentes (orden por dependencias)
  await prisma.paymentProof.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.review.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.line.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  // ==================== CATEGORÍAS (Lista de Animes) ====================
  const animeFiles = scanImageFolder(ANIMES_DIR, "/Imagenes/Lista de Animes")
  const trendingSlugs = new Set(["one-piece", "demon-slayer", "frieren", "dragon-ball"])

  const categoryIds: Record<string, string> = {}
  for (const anime of animeFiles) {
    const created = await prisma.category.create({
      data: {
        name: anime.name,
        slug: anime.slug,
        imageUrl: anime.imageUrl,
        isTrending: trendingSlugs.has(anime.slug),
      },
    })
    categoryIds[anime.slug] = created.id
  }
  console.log(`Categorías creadas: ${animeFiles.length}`)

  // ==================== LÍNEAS (Lineas de figuras) ====================
  const lineFiles = scanImageFolder(LINEAS_DIR, "/Imagenes/Lineas de figuras")
  const featuredLineSlugs = new Set(["ichiban-kuji", "masterlise", "luminasta", "grandista"])

  const lineIds: Record<string, string> = {}
  for (const line of lineFiles) {
    const created = await prisma.line.create({
      data: {
        name: line.name,
        slug: line.slug,
        imageUrl: line.imageUrl,
        isFeatured: featuredLineSlugs.has(line.slug),
      },
    })
    lineIds[line.slug] = created.id
  }
  console.log(`Líneas creadas: ${lineFiles.length}`)

  // ==================== MARCAS (Fabricantes) ====================
  // Si existe una imagen con el mismo slug en "Lineas de figuras", se reutiliza
  const brandNames = ["Banpresto", "Bandai", "Good Smile Company", "Taito", "Sega", "FuRyu", "Kotobukiya", "Konami"]
  const lineImageBySlug = new Map(lineFiles.map((l) => [l.slug, l.imageUrl]))

  const brandIds: Record<string, string> = {}
  for (const name of brandNames) {
    const slug = slugify(name)
    const created = await prisma.brand.create({
      data: { name, slug, imageUrl: lineImageBySlug.get(slug) ?? null },
    })
    brandIds[slug] = created.id
  }
  console.log(`Marcas creadas: ${brandNames.length}`)

  // ==================== USUARIOS ====================
  const admin = await prisma.user.create({
    data: {
      email: "admin@latienditadeblue.com",
      username: "blue.admin",
      passwordHash: await bcrypt.hash("Admin-Blue-2026", 10),
      firstName: "Admin",
      lastName: "Blue",
      role: "ADMIN",
    },
  })

  const demo = await prisma.user.create({
    data: {
      email: "cliente@demo.com",
      username: "coleccionista01",
      passwordHash: await bcrypt.hash("Cliente-Demo-2026", 10),
      firstName: "Cliente",
      lastName: "Demo",
      dni: "45678128",
      phone: "999888777",
      address: "Av. Larco 1234, Miraflores, Lima",
      role: "CUSTOMER",
    },
  })
  console.log("Usuarios creados: admin@latienditadeblue.com / cliente@demo.com")

  // ==================== PRODUCTOS ====================
  const img = (seed: string) =>
    `https://images.unsplash.com/${seed}?w=900&h=900&fit=crop`

  type SeedProduct = {
    name: string
    category: string
    line?: string
    brand: string
    price: number
    status: ProductStatus
    stockQty: number
    expectedDate?: Date
    isFeatured?: boolean
    description: string
    images: string[]
  }

  const productsData: SeedProduct[] = [
    {
      name: "Monkey D. Luffy Gear 5 - Masterlise",
      category: "one-piece",
      line: "masterlise",
      brand: "banpresto",
      price: 189.9,
      status: "STOCK",
      stockQty: 5,
      isFeatured: true,
      description:
        "Figura Masterlise de Luffy Gear 5 con base especial y acabados premium. Altura aprox. 25 cm, PVC/ABS. Ideal para vitrina.",
      images: [img("photo-1607604276583-eef5d076aa5f"), img("photo-1578632767115-351597cf2477")],
    },
    {
      name: "Roronoa Zoro King of Artist - Wano",
      category: "one-piece",
      line: "grandista",
      brand: "banpresto",
      price: 159.9,
      status: "STOCK",
      stockQty: 3,
      isFeatured: true,
      description:
        "Zoro en pose de combate con sus tres katanas, línea King of Artist. Escultura dinámica con detalle en el kimono de Wano.",
      images: [img("photo-1534447677768-be436bb09401")],
    },
    {
      name: "Tanjiro Kamado - Ichiban Kuji Premio A",
      category: "demon-slayer",
      line: "ichiban-kuji",
      brand: "bandai",
      price: 249.9,
      status: "PREVENTA",
      stockQty: 8,
      expectedDate: new Date("2026-10-15"),
      isFeatured: true,
      description:
        "Premio A del Ichiban Kuji de Demon Slayer: Tanjiro con efecto de Danza del Dios del Fuego. Caja sellada de lotería japonesa.",
      images: [img("photo-1542751371-adc38448a05e")],
    },
    {
      name: "Frieren - Luminasta Sousou no Frieren",
      category: "frieren",
      line: "luminasta",
      brand: "sega",
      price: 139.9,
      status: "STOCK",
      stockQty: 6,
      isFeatured: true,
      description:
        "Frieren con su báculo en la línea Luminasta de Sega. Acabado mate y base translúcida, altura aprox. 18 cm.",
      images: [img("photo-1563089145-599997674d42")],
    },
    {
      name: "Goku Super Saiyan - Grandista Nero",
      category: "dragon-ball",
      line: "grandista",
      brand: "banpresto",
      price: 199.9,
      status: "STOCK",
      stockQty: 2,
      description:
        "Goku SSJ línea Grandista Nero, escala grande (28 cm) con esculpido de músculos y cabello con sombreado especial.",
      images: [img("photo-1608889175123-8ee362201f81")],
    },
    {
      name: "Vegeta Ultra Ego - Ichiban Kuji Premio B",
      category: "dragon-ball",
      line: "ichiban-kuji",
      brand: "bandai",
      price: 229.9,
      status: "PREVENTA",
      stockQty: 10,
      expectedDate: new Date("2026-11-20"),
      description:
        "Vegeta Ultra Ego del Ichiban Kuji Dragon Ball Super. Preventa asegurada con adelanto, llegada estimada noviembre 2026.",
      images: [img("photo-1620336655055-088d06e36bf0")],
    },
    {
      name: "Marin Kitagawa - Coreful Uniforme",
      category: "my-dress-up-darling",
      line: "coreful",
      brand: "taito",
      price: 119.9,
      status: "STOCK",
      stockQty: 4,
      description:
        "Marin Kitagawa en uniforme escolar, línea Coreful de Taito. Figura de 20 cm con base personalizada.",
      images: [img("photo-1613376023733-0a73315d9b06")],
    },
    {
      name: "Rem - Relaxtime Re:Zero",
      category: "re-zero",
      line: "relaxtime",
      brand: "sega",
      price: 99.9,
      status: "AGOTADO",
      stockQty: 0,
      description:
        "Rem sentada en pose relajada, línea Relaxtime. Perfecta para escritorio, altura 14 cm.",
      images: [img("photo-1566576912321-d58ddd7a6088")],
    },
    {
      name: "Ai Hoshino - Ichiban Kuji Oshi no Ko",
      category: "oshi-no-ko",
      line: "ichiban-kuji",
      brand: "bandai",
      price: 259.9,
      status: "PREVENTA",
      stockQty: 6,
      expectedDate: new Date("2026-12-05"),
      description:
        "Ai en su vestido de idol, Premio A del Ichiban Kuji de Oshi no Ko. Incluye base con destellos.",
      images: [img("photo-1611930022073-b7a4ba5fcccd")],
    },
    {
      name: "Nezuko Kamado - Glitter y Glamours",
      category: "demon-slayer",
      line: "glitter-y-glamours",
      brand: "banpresto",
      price: 129.9,
      status: "STOCK",
      stockQty: 7,
      description:
        "Nezuko línea Glitter & Glamours con acabado brillante en el kimono. Altura 23 cm.",
      images: [img("photo-1601850494422-3cf14624b0b3")],
    },
    {
      name: "Hatsune Miku - Noodle Stopper Figure",
      category: "vocaloid",
      line: "noddle-stopper-figure",
      brand: "furyu",
      price: 89.9,
      status: "STOCK",
      stockQty: 9,
      description:
        "Miku sentada estilo Noodle Stopper de FuRyu, para apoyar en tu vaso de ramen o en la repisa. 14 cm.",
      images: [img("photo-1531525645387-7f14be1bdbbd")],
    },
    {
      name: "Frieren y Fern Set - Trio Try It",
      category: "frieren",
      line: "trio-try-it",
      brand: "furyu",
      price: 169.9,
      status: "STOCK",
      stockQty: 3,
      description:
        "Set de Frieren y Fern en la línea Trio Try It de FuRyu. Dos figuras de 18 cm con bases independientes.",
      images: [img("photo-1620428268482-cf1851a36764")],
    },
  ]

  const productIds: Record<string, string> = {}
  for (const p of productsData) {
    const slug = slugify(p.name)
    const created = await prisma.product.create({
      data: {
        name: p.name,
        slug,
        description: p.description,
        price: p.price,
        status: p.status,
        expectedDate: p.expectedDate,
        stockQty: p.stockQty,
        images: p.images,
        isFeatured: p.isFeatured ?? false,
        categoryId: categoryIds[p.category],
        lineId: p.line ? lineIds[p.line] : null,
        brandId: brandIds[p.brand],
      },
    })
    productIds[slug] = created.id
  }
  console.log(`Productos creados: ${productsData.length}`)

  // ==================== ORDEN DEMO COMPLETADA + RESEÑA VERIFICADA ====================
  const luffyId = productIds[slugify("Monkey D. Luffy Gear 5 - Masterlise")]
  const order = await prisma.order.create({
    data: {
      processCode: "ORD-DEMO1",
      idempotencyKey: "seed-demo-order-1",
      userId: demo.id,
      totalAmount: 199.9,
      shippingCost: 10,
      shippingType: "LOCAL_DELIVERY",
      shippingStatus: "DELIVERED",
      receiverName: "Cliente Demo",
      receiverPhone: "999888777",
      deliveryAddress: "Av. Larco 1234, Miraflores, Lima",
      paymentMethod: "MANUAL_TRANSFER",
      status: "COMPLETED",
      items: {
        create: [{ productId: luffyId, quantity: 1, price: 189.9 }],
      },
    },
  })

  await prisma.paymentProof.create({
    data: {
      orderId: order.id,
      userId: demo.id,
      imageUrl: "/Imagenes/Pagos/YAPE QR.jpeg",
      operationNumber: "00123456",
      status: "APPROVED",
    },
  })

  await prisma.review.create({
    data: {
      userId: demo.id,
      productId: luffyId,
      rating: 5,
      comment:
        "Llegó súper bien embalado y la figura es idéntica a las fotos. La atención por WhatsApp fue rapidísima. ¡Volveré a comprar!",
      images: [],
    },
  })
  console.log("Orden demo y reseña verificada creadas")

  console.log("Seed completado ✨")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
