import Image from "next/image"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { ForcedResetForm } from "@/components/auth/ForcedResetForm"

export default async function ForcedResetPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

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
            ¡Hola coleccionista!
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Para mantener tu cuenta ultra segura tras tu solicitud de soporte,
            por favor ingresa tu nueva contraseña personalizada.
          </p>
        </div>
        <ForcedResetForm />
      </div>
    </div>
  )
}
