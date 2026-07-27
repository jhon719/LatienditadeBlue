import Image from "next/image"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AcceptTermsForm } from "@/components/auth/AcceptTermsForm"

export default async function AcceptTermsPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const { callbackUrl } = await searchParams

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="relative h-24 w-24">
          <Image
            src="/Imagenes/Mascota BLUE.png"
            alt="Bluet"
            fill
            className="object-contain"
          />
        </div>
        <div className="text-center">
          <h1 className="font-display text-2xl uppercase tracking-wide text-foreground">
            Antes de continuar
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Actualizamos nuestros Términos y Condiciones. Necesitamos que los
            leas y los aceptes para seguir usando La Tiendita de Blue.
          </p>
        </div>
        <AcceptTermsForm callbackUrl={callbackUrl || "/"} />
      </div>
    </div>
  )
}
