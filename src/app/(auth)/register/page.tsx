import Link from "next/link"
import Image from "next/image"
import { RegisterForm } from "@/components/auth/RegisterForm"
import { isGoogleEnabled } from "@/lib/auth"

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="relative size-8 overflow-hidden rounded-full">
            <Image
              src="/Imagenes/LOGO BLUE.jpeg"
              alt="La Tiendita de Blue"
              fill
              className="object-cover"
            />
          </div>
          La Tiendita de Blue
        </Link>
        <RegisterForm googleEnabled={isGoogleEnabled()} />
      </div>
    </div>
  )
}
