import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { ProfileSettingsForm } from "@/components/profile/ProfileSettingsForm"

export const dynamic = "force-dynamic"

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      firstName: true,
      lastName: true,
      dni: true,
      phone: true,
      address: true,
      department: true,
      marketingOptIn: true,
      tiktokUsername: true,
      tiktokUrl: true,
      passwordHash: true,
    },
  })

  if (!user) redirect("/login")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Configuración</h2>
        <p className="text-muted-foreground">
          Actualiza tus datos personales para la coordinación de envíos
        </p>
      </div>

      <ProfileSettingsForm
        initialData={{
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          dni: user.dni ?? "",
          phone: user.phone ?? "",
          address: user.address ?? "",
          department: user.department ?? "",
          marketingOptIn: user.marketingOptIn,
          tiktokUsername: user.tiktokUsername ?? "",
          tiktokUrl: user.tiktokUrl ?? "",
        }}
        hasPassword={!!user.passwordHash}
      />
    </div>
  )
}
