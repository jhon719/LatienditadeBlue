import { RegisterForm } from "@/components/auth/RegisterForm"
import { AuthShell } from "@/components/auth/AuthShell"
import { isGoogleEnabled } from "@/lib/auth"

export default function RegisterPage() {
  return (
    <AuthShell>
      <RegisterForm googleEnabled={isGoogleEnabled()} />
    </AuthShell>
  )
}
