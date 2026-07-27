import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminMobileBar } from "@/components/admin/AdminMobileBar"

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
        <AdminMobileBar />
        {/* min-w-0 evita que una tabla ancha estire el layout y genere
            scroll horizontal en toda la página */}
        <main className="min-w-0 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
