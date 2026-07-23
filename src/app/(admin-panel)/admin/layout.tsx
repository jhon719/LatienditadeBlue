import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Defensa en profundidad (no confiar solo en middleware.ts): los CVE de
  // bypass de middleware de Next.js podrían saltarse el filtro de rol, así que
  // cada Server Component de /admin revalida la sesión antes de tocar datos.
  const session = await auth()
  if (session?.user?.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="lg:pl-64">
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
