"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PERU_DEPARTMENTS } from "@/lib/peru"

const settingsSchema = z.object({
  firstName: z.string().max(60).optional(),
  lastName: z.string().max(60).optional(),
  dni: z
    .string()
    .regex(/^\d{8}$/, "El DNI debe tener 8 dígitos")
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^\d{9}$/, "El teléfono debe tener 9 dígitos")
    .or(z.literal("")),
  address: z.string().max(200).optional(),
  // Departamento del Perú (alimenta el mapa de calor del admin, bóveda 05.01)
  department: z.string(),
  // Opt-in de promociones (bóveda 05.04 §4, Ley 29733)
  marketingOptIn: z.boolean(),
})

type SettingsFormData = z.infer<typeof settingsSchema>

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/[0-9!@#$%^&*(),.?":{}|<>_-]/, "Incluye un número o símbolo"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

type PasswordFormData = z.infer<typeof passwordSchema>

interface ProfileSettingsFormProps {
  initialData: SettingsFormData
  hasPassword: boolean
}

export function ProfileSettingsForm({
  initialData,
  hasPassword,
}: ProfileSettingsFormProps) {
  const router = useRouter()
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [passwordSaved, setPasswordSaved] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  })
  const department = watch("department")

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  const onSubmit = async (data: SettingsFormData) => {
    setError(null)
    setSaved(false)
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const result = await res.json().catch(() => null)
      setError(result?.error ?? "No se pudieron guardar los cambios")
      return
    }
    setSaved(true)
    router.refresh()
  }

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setPasswordSaved(false)
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: data.password }),
    })
    if (res.ok) {
      setPasswordSaved(true)
      passwordForm.reset()
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Datos personales</CardTitle>
          <CardDescription>
            Se usan para tus boletas y la coordinación de entregas. Nunca se
            muestran públicamente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            {saved && (
              <div className="rounded-md bg-[#E2FBE9] p-3 text-sm font-semibold text-[#1E7E34]">
                Datos guardados correctamente ✨
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombres</Label>
                <Input id="firstName" {...register("firstName")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellidos</Label>
                <Input id="lastName" {...register("lastName")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dni">DNI</Label>
                <Input id="dni" placeholder="45678128" maxLength={8} {...register("dni")} />
                {errors.dni && (
                  <p className="text-xs text-destructive">{errors.dni.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono (WhatsApp)</Label>
                <Input id="phone" placeholder="999888777" maxLength={9} {...register("phone")} />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Dirección de envío</Label>
                <Input
                  id="address"
                  placeholder="Av. Larco 1234, Miraflores, Lima"
                  {...register("address")}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Departamento</Label>
                <Select
                  value={department || undefined}
                  onValueChange={(v) => setValue("department", v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="¿Desde qué parte del Perú nos compras?" />
                  </SelectTrigger>
                  <SelectContent>
                    {PERU_DEPARTMENTS.map((d) => (
                      <SelectItem key={d.code} value={d.code}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground sm:col-span-2">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 accent-[#4A80BE]"
                  {...register("marketingOptIn")}
                />
                <span>
                  Quiero recibir novedades, preventas y promociones por correo
                </span>
              </label>
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Guardar cambios
            </Button>
          </form>
        </CardContent>
      </Card>

      {hasPassword && (
        <Card>
          <CardHeader>
            <CardTitle>Cambiar contraseña</CardTitle>
            <CardDescription>
              Usa una contraseña segura con números o símbolos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              {passwordSaved && (
                <div className="rounded-md bg-[#E2FBE9] p-3 text-sm font-semibold text-[#1E7E34]">
                  Contraseña actualizada ✨
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Nueva contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    {...passwordForm.register("password")}
                  />
                  {passwordForm.formState.errors.password && (
                    <p className="text-xs text-destructive">
                      {passwordForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...passwordForm.register("confirmPassword")}
                  />
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-xs text-destructive">
                      {passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                variant="outline"
                disabled={passwordForm.formState.isSubmitting}
              >
                {passwordForm.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Actualizar contraseña
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
