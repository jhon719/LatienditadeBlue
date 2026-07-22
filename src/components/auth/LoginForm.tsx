"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleButton } from "./GoogleButton"

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm({ googleEnabled = false }: { googleEnabled?: boolean }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      setError(
        result.code === "credentials"
          ? "Email o contraseña incorrectos"
          : "Esta cuenta está vinculada a Google. Inicia sesión con Google."
      )
      return
    }

    router.push(callbackUrl)
    router.refresh()
  }

  return (
    <div className="glass-card p-7 sm:p-9">
      <div className="mb-7 text-center">
        <h1 className="font-display text-4xl">
          <span className="bg-gradient-to-r from-[#142F5C] to-[#4A80BE] bg-clip-text text-transparent dark:from-white dark:to-[#7FB3E8]">
            Bienvenido de vuelta
          </span>
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Inicia sesión para seguir tus pedidos y preventas
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm font-medium text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="font-semibold">
            Email
          </Label>
          <div className="group relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              className="h-11 rounded-xl bg-background/60 pl-10"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="font-semibold">
            Contraseña
          </Label>
          <div className="group relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="h-11 rounded-xl bg-background/60 pl-10 pr-10"
              {...register("password")}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn-shine h-11 w-full rounded-xl text-sm font-bold text-white shadow-lg shadow-[#4A80BE]/30 transition-transform hover:scale-[1.015] active:scale-[0.99]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            <>
              Iniciar Sesión
              <ArrowRight className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>

        {googleEnabled && (
          <>
            <div className="relative text-center text-xs text-muted-foreground">
              <span className="relative z-10 bg-transparent px-2 backdrop-blur-sm">
                o continúa con
              </span>
              <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
            </div>
            <GoogleButton callbackUrl={callbackUrl} />
          </>
        )}

        <p className="pt-1 text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Regístrate gratis
          </Link>
        </p>
      </form>
    </div>
  )
}
