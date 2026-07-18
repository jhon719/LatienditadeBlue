import Link from "next/link"
import { redirect } from "next/navigation"
import { Pencil } from "lucide-react"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { maskSensitive } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AvatarUploader } from "@/components/profile/AvatarUploader"

export const dynamic = "force-dynamic"

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const [user, orderStats, totalSpent] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        dni: true,
        phone: true,
        address: true,
        avatarFileName: true,
        createdAt: true,
      },
    }),
    prisma.order.groupBy({
      by: ["status"],
      where: { userId: session.user.id },
      _count: true,
    }),
    prisma.order.aggregate({
      where: {
        userId: session.user.id,
        status: { in: ["PAID_APPROVED", "COMPLETED"] },
      },
      _sum: { totalAmount: true },
    }),
  ])

  if (!user) redirect("/login")

  const totalOrders = orderStats.reduce((acc, s) => acc + s._count, 0)
  const completed =
    orderStats.find((s) => s.status === "COMPLETED")?._count ?? 0

  return (
    <div className="space-y-6">
      {/* Cabecera del perfil con avatar local */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <AvatarUploader
              username={user.username}
              avatarFileName={user.avatarFileName}
            />
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold">@{user.username}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground">
                Coleccionista desde{" "}
                {user.createdAt.toLocaleDateString("es-PE", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Pedidos</CardDescription>
            <CardTitle className="text-2xl">{totalOrders}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pedidos Completados</CardDescription>
            <CardTitle className="text-2xl text-green-600">{completed}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Invertido</CardDescription>
            <CardTitle className="text-2xl">
              S/ {Number(totalSpent._sum.totalAmount ?? 0).toFixed(2)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Datos privados enmascarados (bóveda 02.03) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>
              Estos datos solo los ves tú y el administrador para coordinar tus envíos
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/profile/settings">
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Nombre</dt>
              <dd className="font-medium">
                {user.firstName || user.lastName
                  ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">DNI</dt>
              <dd className="font-medium">{maskSensitive(user.dni)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Teléfono</dt>
              <dd className="font-medium">{maskSensitive(user.phone)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Dirección de envío</dt>
              <dd className="font-medium">{maskSensitive(user.address)}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}
