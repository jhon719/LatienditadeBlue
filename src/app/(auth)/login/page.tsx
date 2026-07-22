import { Suspense } from "react"
import { LoginForm } from "@/components/auth/LoginForm"
import { AuthShell } from "@/components/auth/AuthShell"
import { isGoogleEnabled } from "@/lib/auth"

export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense fallback={<div className="text-center">Cargando...</div>}>
        <LoginForm googleEnabled={isGoogleEnabled()} />
      </Suspense>
    </AuthShell>
  )
}
