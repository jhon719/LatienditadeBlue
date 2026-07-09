import type { Brand, Category, Product } from "@/types"

export const categories: Category[] = [
  { id: "figuras", name: "Figuras", slug: "figuras", icon: "Package", productCount: 24 },
  { id: "peluches", name: "Peluches", slug: "peluches", icon: "Heart", productCount: 16 },
  { id: "mangas", name: "Mangas", slug: "mangas", icon: "BookOpen", productCount: 12 },
  { id: "merch", name: "Merch", slug: "merch", icon: "ShoppingBag", productCount: 28 },
]

export const brands: Brand[] = [
  { id: "banpresto", name: "Banpresto", productCount: 15 },
  { id: "taito", name: "Taito", productCount: 12 },
  { id: "furyu", name: "Furyu", productCount: 9 },
  { id: "good-smile", name: "Good Smile Company", productCount: 8 },
  { id: "sega", name: "Sega Prize", productCount: 10 },
  { id: "qposket", name: "Q Posket", productCount: 6 },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Frieren Nendoroid DX - Beyond Journey",
    slug: "frieren-nendoroid-dx",
    brand: "Good Smile Company",
    category: "figuras",
    price: 249.9,
    originalPrice: 289.9,
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=900&h=900&fit=crop",
    ],
    description:
      "Figura articulada de Frieren con accesorios de viaje, baculo, libro de hechizos y piezas de expresion intercambiables. Ideal para vitrinas de coleccion anime.",
    specs: {
      Fabricante: "Good Smile Company",
      Linea: "Nendoroid",
      Altura: "10 cm aprox.",
      Material: "PVC y ABS",
      Anime: "Frieren",
    },
    stock: 6,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    status: "STOCK",
    anime: "Frieren",
    scale: "Nendoroid",
  },
  {
    id: "2",
    name: "Satoru Gojo Luminasta - Hollow Purple",
    slug: "satoru-gojo-luminasta",
    brand: "Taito",
    category: "figuras",
    price: 159.9,
    originalPrice: 179.9,
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=900&h=900&fit=crop",
    ],
    description:
      "Figura prize con pose dinamica inspirada en Jujutsu Kaisen. Acabado mate, base transparente y silueta lista para destacar en el estante.",
    specs: {
      Fabricante: "Taito",
      Linea: "Luminasta",
      Altura: "21 cm aprox.",
      Material: "PVC",
      Anime: "Jujutsu Kaisen",
    },
    stock: 11,
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    status: "ONLINE",
    anime: "Jujutsu Kaisen",
    scale: "21 cm",
  },
  {
    id: "3",
    name: "Luffy Gear 5 Ichiban Kuji - Last One",
    slug: "luffy-gear-5-ichiban-kuji",
    brand: "Banpresto",
    category: "figuras",
    price: 219.9,
    images: [
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=900&fit=crop",
    ],
    description:
      "Figura de Luffy en modo Gear 5 con volumen, expresion potente y pintura de alto contraste. Pieza principal para fans de One Piece.",
    specs: {
      Fabricante: "Banpresto",
      Linea: "Ichiban Kuji",
      Altura: "20 cm aprox.",
      Material: "PVC y ABS",
      Anime: "One Piece",
    },
    stock: 3,
    isNew: true,
    isFeatured: true,
    rating: 5,
    status: "STOCK",
    anime: "One Piece",
    scale: "20 cm",
  },
  {
    id: "4",
    name: "Hatsune Miku AMP+ Mermaid Princess",
    slug: "hatsune-miku-amp-mermaid-princess",
    brand: "Taito",
    category: "figuras",
    price: 149.9,
    images: [
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=900&h=900&fit=crop",
    ],
    description:
      "Miku en version princesa sirena con colores suaves y detalles translucidos. Una figura prize muy fotografica para coleccionistas.",
    specs: {
      Fabricante: "Taito",
      Linea: "AMP+",
      Altura: "23 cm aprox.",
      Material: "PVC",
      Anime: "Vocaloid",
    },
    stock: 0,
    isNew: false,
    isFeatured: true,
    rating: 4.7,
    status: "AGOTADO",
    anime: "Vocaloid",
    scale: "23 cm",
  },
  {
    id: "5",
    name: "Peluche Uma Musume Special Week Gift",
    slug: "peluche-uma-musume-special-week",
    brand: "Furyu",
    category: "peluches",
    price: 289.9,
    images: [
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=900&h=900&fit=crop",
    ],
    description:
      "Peluche suave de coleccion con bordados finos, uniforme detallado y formato perfecto para exhibir junto a figuras de Uma Musume.",
    specs: {
      Fabricante: "Furyu",
      Linea: "Gift Plush",
      Tamano: "18 cm aprox.",
      Material: "Poliester",
      Anime: "Uma Musume",
    },
    stock: 8,
    isNew: true,
    isFeatured: true,
    rating: 4.9,
    status: "PREVENTA",
    anime: "Uma Musume",
    scale: "18 cm",
  },
  {
    id: "6",
    name: "Peluche Pochita Big Hug",
    slug: "peluche-pochita-big-hug",
    brand: "Sega Prize",
    category: "peluches",
    price: 159.9,
    images: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=900&h=900&fit=crop",
    ],
    description:
      "Peluche grande y abrazable de Pochita con costuras resistentes y textura extra suave. Preventa recomendada para fans de Chainsaw Man.",
    specs: {
      Fabricante: "Sega Prize",
      Linea: "Big Hug",
      Tamano: "40 cm aprox.",
      Material: "Poliester",
      Anime: "Chainsaw Man",
    },
    stock: 12,
    isNew: true,
    isFeatured: false,
    rating: 4.8,
    status: "PREVENTA",
    anime: "Chainsaw Man",
    scale: "40 cm",
  },
  {
    id: "7",
    name: "Manga Jujutsu Kaisen Vol. 0",
    slug: "manga-jujutsu-kaisen-vol-0",
    brand: "Ivrea",
    category: "mangas",
    price: 39.9,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=900&h=900&fit=crop",
    ],
    description:
      "La precuela esencial de Jujutsu Kaisen. Edicion en espanol para completar coleccion o empezar lectura con Yuta Okkotsu.",
    specs: {
      Editorial: "Ivrea",
      Idioma: "Espanol",
      Formato: "Rustica",
      Paginas: "200 aprox.",
      Anime: "Jujutsu Kaisen",
    },
    stock: 18,
    isNew: false,
    isFeatured: false,
    rating: 4.8,
    status: "STOCK",
    anime: "Jujutsu Kaisen",
    scale: "Manga",
  },
  {
    id: "8",
    name: "Set Acrilico Frieren & Himmel",
    slug: "set-acrilico-frieren-himmel",
    brand: "La Tiendita",
    category: "merch",
    price: 49.9,
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=900&fit=crop",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&h=900&fit=crop",
    ],
    description:
      "Set de acrilicos decorativos con soporte transparente, ideal para escritorio, repisa o setup. Diseno compacto de alta nitidez.",
    specs: {
      Material: "Acrilico",
      Tamano: "7 cm aprox.",
      Tipo: "Stand coleccionable",
      Anime: "Frieren",
    },
    stock: 24,
    isNew: true,
    isFeatured: false,
    rating: 4.7,
    status: "STOCK",
    anime: "Frieren",
    scale: "Acrilico",
  },
]

export const trendBanners = [
  {
    title: "Uma Musume",
    subtitle: "Peluches Gift y figuras prize",
    href: "/products?anime=uma-musume",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=1200&h=600&fit=crop",
    tone: "from-[#F5B400]/90 to-[#4A80BE]/80",
  },
  {
    title: "Jujutsu Kaisen",
    subtitle: "Gojo, Geto y Shibuya",
    href: "/products?anime=jujutsu-kaisen",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop",
    tone: "from-[#142F5C]/90 to-[#4A80BE]/70",
  },
  {
    title: "Frieren",
    subtitle: "Nendoroids y merch del viaje",
    href: "/products?anime=frieren",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&h=600&fit=crop",
    tone: "from-[#4A80BE]/90 to-[#F5B400]/70",
  },
  {
    title: "Overlord",
    subtitle: "Escalas oscuras y preventas",
    href: "/products?anime=overlord",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=600&fit=crop",
    tone: "from-[#142F5C]/90 to-black/60",
  },
]

export const categoryTiles = [
  {
    label: "Figuras en Stock",
    href: "/products?category=figuras&status=stock",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=900&h=520&fit=crop",
  },
  {
    label: "Figuras en Preventa",
    href: "/products?category=figuras&status=preventa",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=900&h=520&fit=crop",
  },
  {
    label: "Peluches",
    href: "/products?category=peluches",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=900&h=520&fit=crop",
  },
  {
    label: "Mangas y Merch",
    href: "/products?category=merch",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=900&h=520&fit=crop",
  },
]

export const animeButtons = [
  "Frieren",
  "Jujutsu Kaisen",
  "One Piece",
  "Uma Musume",
  "Chainsaw Man",
  "Vocaloid",
]

export const brandButtons = [
  { name: "Banpresto", short: "BAN", href: "/products?brand=banpresto", color: "bg-white" },
  { name: "Taito", short: "TAI", href: "/products?brand=taito", color: "bg-[#F5B400]" },
  { name: "Furyu", short: "FRY", href: "/products?brand=furyu", color: "bg-[#142F5C] text-white" },
  { name: "Good Smile", short: "GSC", href: "/products?brand=good-smile", color: "bg-[#F2F2F2]" },
  { name: "Sega Prize", short: "SEG", href: "/products?brand=sega", color: "bg-white" },
  { name: "Q Posket", short: "QPO", href: "/products?brand=qposket", color: "bg-[#4A80BE] text-white" },
]

export const customerReviews = [
  {
    name: "Mika A.",
    handle: "Coleccionista de Nendos",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop",
    comment: "Mi Frieren llego bien protegida y me avisaron cada paso por WhatsApp. La caja impecable.",
  },
  {
    name: "Renzo C.",
    handle: "Fan de One Piece",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop",
    comment: "Pague manual con voucher y la aprobacion fue rapida. El recojo en feria fue super ordenado.",
  },
  {
    name: "Aoi T.",
    handle: "Peluche hunter",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop",
    comment: "La preventa estuvo clara, con fecha estimada y actualizaciones. Volveria a comprar.",
  },
]

export const manualOrders = [
  {
    id: "LTB-1042",
    customer: "Camila Rojas",
    total: "S/ 409.80",
    status: "Pago Manual",
    method: "Yape",
    time: "Hace 12 min",
    items: ["Frieren Nendoroid DX", "Set Acrilico Frieren"],
    voucher: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=650&fit=crop",
  },
  {
    id: "LTB-1041",
    customer: "Diego Salas",
    total: "S/ 219.90",
    status: "Por revisar",
    method: "Transferencia BCP",
    time: "Hace 28 min",
    items: ["Luffy Gear 5 Ichiban Kuji"],
    voucher: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=650&fit=crop",
  },
]
