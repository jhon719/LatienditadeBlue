import { Suspense } from "react"
import { LoginForm } from "@/components/auth/LoginForm"
import { AuthShell } from "@/components/auth/AuthShell"
import { isGoogleEnabled } from "@/lib/auth"

// Sin esto, Next.js pre-renderiza la pagina como estatica en el build de
// Docker (donde GOOGLE_CLIENT_ID/SECRET no existen) y congela googleEnabled
// en false para siempre, aunque el contenedor en produccion si tenga las
// credenciales correctas en runtime.
export const dynamic = "force-dynamic"

export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense fallback={<div className="text-center">Cargando...</div>}>
        <LoginForm googleEnabled={isGoogleEnabled()} />
      </Suspense>
    </AuthShell>
  )
}
