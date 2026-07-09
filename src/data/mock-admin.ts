export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "customer"
  status: "active" | "inactive" | "suspended"
  createdAt: string
  orders: number
  totalSpent: number
}

export interface Payment {
  id: string
  orderId: string
  userId: string
  userName: string
  amount: number
  method: "card" | "transfer" | "wallet" | "manual"
  status: "completed" | "pending" | "failed" | "refunded" | "verifying" | "rejected"
  createdAt: string
  operationNumber?: string
  proofImage?: string
}

export interface Order {
  id: string
  userId: string
  userName: string
  items: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "verifying_manual" | "approved" | "rejected"
  createdAt: string
  operationNumber?: string
  proofImage?: string
}

export const users: User[] = [
  {
    id: "1",
    name: "Juan Perez",
    email: "juan@email.com",
    role: "customer",
    status: "active",
    createdAt: "2024-01-15",
    orders: 5,
    totalSpent: 1250.00,
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@email.com",
    role: "customer",
    status: "active",
    createdAt: "2024-02-20",
    orders: 3,
    totalSpent: 890.50,
  },
  {
    id: "3",
    name: "Carlos Rodriguez",
    email: "carlos@email.com",
    role: "customer",
    status: "inactive",
    createdAt: "2024-01-10",
    orders: 1,
    totalSpent: 299.99,
  },
  {
    id: "4",
    name: "Ana Martinez",
    email: "ana@email.com",
    role: "admin",
    status: "active",
    createdAt: "2023-12-01",
    orders: 0,
    totalSpent: 0,
  },
  {
    id: "5",
    name: "Luis Sanchez",
    email: "luis@email.com",
    role: "customer",
    status: "suspended",
    createdAt: "2024-03-05",
    orders: 2,
    totalSpent: 450.00,
  },
  {
    id: "6",
    name: "Carmen Lopez",
    email: "carmen@email.com",
    role: "customer",
    status: "active",
    createdAt: "2024-03-10",
    orders: 8,
    totalSpent: 2100.75,
  },
  {
    id: "7",
    name: "Pedro Diaz",
    email: "pedro@email.com",
    role: "customer",
    status: "active",
    createdAt: "2024-02-28",
    orders: 4,
    totalSpent: 980.00,
  },
  {
    id: "8",
    name: "Sofia Torres",
    email: "sofia@email.com",
    role: "customer",
    status: "active",
    createdAt: "2024-03-15",
    orders: 2,
    totalSpent: 560.25,
  },
]

export const payments: Payment[] = [
  {
    id: "PAY-001",
    orderId: "ORD-001",
    userId: "1",
    userName: "Juan Perez",
    amount: 249.90,
    method: "card",
    status: "completed",
    createdAt: "2024-03-20 14:30",
  },
  {
    id: "PAY-002",
    orderId: "ORD-002",
    userId: "2",
    userName: "Maria Garcia",
    amount: 189.80,
    method: "wallet",
    status: "completed",
    createdAt: "2024-03-20 12:15",
  },
  {
    id: "PAY-003",
    orderId: "ORD-003",
    userId: "6",
    userName: "Carmen Lopez",
    amount: 239.90,
    method: "manual",
    status: "verifying",
    createdAt: "2024-03-20 10:45",
    operationNumber: "TX-982341",
    proofImage: "https://images.unsplash.com/photo-1554418651-70309daf95f5?w=600&h=800&fit=crop", // voucher image
  },
  {
    id: "PAY-004",
    orderId: "ORD-004",
    userId: "7",
    userName: "Pedro Diaz",
    amount: 149.90,
    method: "card",
    status: "failed",
    createdAt: "2024-03-19 18:20",
  },
  {
    id: "PAY-005",
    orderId: "ORD-005",
    userId: "8",
    userName: "Sofia Torres",
    amount: 199.90,
    method: "card",
    status: "completed",
    createdAt: "2024-03-19 15:10",
  },
]

export const orders: Order[] = [
  {
    id: "ORD-001",
    userId: "1",
    userName: "Juan Perez",
    items: 1,
    total: 249.90,
    status: "delivered",
    createdAt: "2024-03-20",
  },
  {
    id: "ORD-002",
    userId: "2",
    userName: "Maria Garcia",
    items: 2,
    total: 189.80,
    status: "shipped",
    createdAt: "2024-03-20",
  },
  {
    id: "ORD-003",
    userId: "6",
    userName: "Carmen Lopez",
    items: 1,
    total: 239.90,
    status: "verifying_manual",
    createdAt: "2024-03-20",
    operationNumber: "TX-982341",
    proofImage: "https://images.unsplash.com/photo-1554418651-70309daf95f5?w=600&h=800&fit=crop",
  },
  {
    id: "ORD-004",
    userId: "7",
    userName: "Pedro Diaz",
    items: 1,
    total: 149.90,
    status: "cancelled",
    createdAt: "2024-03-19",
  },
  {
    id: "ORD-005",
    userId: "8",
    userName: "Sofia Torres",
    items: 1,
    total: 199.90,
    status: "delivered",
    createdAt: "2024-03-19",
  },
]

export const dashboardStats = {
  totalRevenue: 24530.80,
  revenueChange: 15.4,
  totalOrders: 154,
  ordersChange: 10.2,
  totalCustomers: 342,
  customersChange: 12.5,
  totalProducts: 85,
  productsChange: 6.8,
}

export const recentSales = [
  { name: "Juan Perez", email: "juan@email.com", amount: 249.90 },
  { name: "Maria Garcia", email: "maria@email.com", amount: 189.80 },
  { name: "Carmen Lopez", email: "carmen@email.com", amount: 239.90 },
  { name: "Pedro Diaz", email: "pedro@email.com", amount: 149.90 },
  { name: "Sofia Torres", email: "sofia@email.com", amount: 199.90 },
]
