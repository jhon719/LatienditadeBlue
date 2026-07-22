"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { GoogleButton } from "./GoogleButton"

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "El username debe tener al menos 3 caracteres")
    .max(20, "Máximo 20 caracteres")
    .regex(/^[a-z0-9._-]+$/i, "Solo letras, números, puntos y guiones"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[0-9!@#$%^&*(),.?":{}|<>_-]/, "Incluye al menos un número o símbolo"),
  confirmPassword: z.string(),
  marketingOptIn: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm({ googleEnabled = false }: { googleEnabled?: boolean }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { marketingOptIn: false },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setError(null)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          marketingOptIn: data.marketingOptIn,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || "Error al registrar usuario")
        return
      }

      const signInResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (signInResult?.error) {
        router.push("/login")
        return
      }

      router.push("/")
      router.refresh()
    } catch {
      setError("Error al registrar usuario")
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-card p-7 sm:p-9">
        <div className="mb-7 text-center">
          <h1 className="font-display text-4xl">
            <span className="bg-gradient-to-r from-[#142F5C] to-[#4A80BE] bg-clip-text text-transparent dark:from-white dark:to-[#7FB3E8]">
              Únete a la colección
            </span>
          </h1>
          <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-[#F5B400]" />
            Crea tu cuenta y no te pierdas ninguna preventa
          </p>
        </div>
        <div>
          {error && (
            <div className="mb-6 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="coleccionista01"
                  className="h-11 rounded-xl bg-background/60"
                  {...register("username")}
                />
                <FieldDescription>
                  Es tu nombre público en las reseñas de la tienda.
                </FieldDescription>
                {errors.username && (
                  <FieldError>{errors.username.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="h-11 rounded-xl bg-background/60"
                  {...register("email")}
                />
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      className="h-11 rounded-xl bg-background/60"
                      {...register("password")}
                    />
                    {errors.password && (
                      <FieldError>{errors.password.message}</FieldError>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirmar Contraseña
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="h-11 rounded-xl bg-background/60"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <FieldError>{errors.confirmPassword.message}</FieldError>
                    )}
                  </Field>
                </Field>
                <FieldDescription>
                  Mínimo 8 caracteres con al menos un número o símbolo.
                </FieldDescription>
              </Field>
              <Field>
                <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-[#4A80BE]"
                    {...register("marketingOptIn")}
                  />
                  <span>
                    Quiero recibir novedades, preventas y promociones por correo
                    (opcional)
                  </span>
                </label>
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="btn-shine h-11 w-full rounded-xl text-sm font-bold text-white shadow-lg shadow-[#4A80BE]/30 transition-transform hover:scale-[1.015] active:scale-[0.99]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    "Crear Cuenta"
                  )}
                </Button>
                {googleEnabled && <GoogleButton />}
                <FieldDescription className="text-center">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Iniciar Sesión
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </div>
      </div>
      <FieldDescription className="px-6 text-center">
        Al continuar, aceptas nuestros{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          Términos de Servicio
        </Link>{" "}
        y{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Política de Privacidad
        </Link>
        .
      </FieldDescription>
    </div>
  )
}
