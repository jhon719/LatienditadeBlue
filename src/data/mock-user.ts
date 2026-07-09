import { products } from "./mock-products"

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  createdAt: string
}

export interface Address {
  id: string
  label: string
  name: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

export interface OrderItem {
  productId: string
  name: string
  brand: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "verifying_manual" | "approved" | "rejected"
  paymentMethod: string
  shippingAddress: string
  createdAt: string
  updatedAt: string
  operationNumber?: string
  proofImage?: string
}

export const userProfile: UserProfile = {
  id: "1",
  name: "Juan Perez",
  email: "juan.perez@email.com",
  phone: "+51 999 888 777",
  createdAt: "2024-01-15",
}

export const addresses: Address[] = [
  {
    id: "1",
    label: "Casa",
    name: "Juan Perez",
    phone: "+51 999 888 777",
    address: "Av. Principal 123, Dpto 401",
    city: "Lima",
    state: "Lima",
    zipCode: "15001",
    isDefault: true,
  },
  {
    id: "2",
    label: "Oficina",
    name: "Juan Perez",
    phone: "+51 999 888 777",
    address: "Jr. Comercio 456, Piso 3",
    city: "Miraflores",
    state: "Lima",
    zipCode: "15074",
    isDefault: false,
  },
]

export const orders: Order[] = [
  {
    id: "ORD-2024-001",
    items: [
      {
        productId: "1",
        name: "Nendoroid Frieren",
        brand: "Good Smile Company",
        price: 249.90,
        quantity: 1,
        image: products[0].images[0],
      },
    ],
    total: 249.90,
    status: "delivered",
    paymentMethod: "Tarjeta •••• 3456",
    shippingAddress: "Av. Principal 123, Lima",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-20",
  },
  {
    id: "ORD-2024-002",
    items: [
      {
        productId: "3",
        name: "Satoru Gojo - Shibuya Incident Ver.",
        brand: "Banpresto",
        price: 119.90,
        quantity: 1,
        image: products[2].images[0],
      },
      {
        productId: "6",
        name: "Peluche Nezuko Kamado - Mini Mascot",
        brand: "Sega",
        price: 69.90,
        quantity: 1,
        image: products[5].images[0],
      },
    ],
    total: 189.80,
    status: "shipped",
    paymentMethod: "Yape",
    shippingAddress: "Jr. Comercio 456, Miraflores",
    createdAt: "2024-03-18",
    updatedAt: "2024-03-19",
  },
  {
    id: "ORD-2024-003",
    items: [
      {
        productId: "2",
        name: "Nendoroid Fern",
        brand: "Good Smile Company",
        price: 239.90,
        quantity: 1,
        image: products[1].images[0],
      },
    ],
    total: 239.90,
    status: "verifying_manual",
    paymentMethod: "Transferencia BCP (Manual)",
    shippingAddress: "Av. Principal 123, Lima",
    createdAt: "2024-03-20",
    updatedAt: "2024-03-20",
    operationNumber: "TX-982341",
    proofImage: "https://images.unsplash.com/photo-1554418651-70309daf95f5?w=500", // simulated screenshot
  },
  {
    id: "ORD-2024-004",
    items: [
      {
        productId: "5",
        name: "Hatsune Miku - AMP+ Mermaid Princess Ver.",
        brand: "Taito",
        price: 149.90,
        quantity: 1,
        image: products[4].images[0],
      },
    ],
    total: 149.90,
    status: "cancelled",
    paymentMethod: "Tarjeta •••• 7890",
    shippingAddress: "Av. Principal 123, Lima",
    createdAt: "2024-03-10",
    updatedAt: "2024-03-11",
  },
]

export const favorites = [products[0], products[2], products[6], products[9]]
