import { RegisterForm } from "@/components/auth/RegisterForm"
import { AuthShell } from "@/components/auth/AuthShell"
import { isGoogleEnabled } from "@/lib/auth"

// Ver nota en login/page.tsx: sin esto, googleEnabled queda congelado en
// false desde el build de Docker.
export const dynamic = "force-dynamic"

export default function RegisterPage() {
  return (
    <AuthShell>
      <RegisterForm googleEnabled={isGoogleEnabled()} />
    </AuthShell>
  )
}
