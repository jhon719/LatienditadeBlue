"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Search, Loader2, KeyRound, Copy, Check, ContactRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { UserAvatar } from "@/components/common/UserAvatar"

interface AdminUser {
  id: string
  username: string
  email: string
  firstName: string | null
  lastName: string | null
  dni: string | null
  phone: string | null
  address: string | null
  avatarFileName: string | null
  role: string
  loyaltyTier: string
  mustChangePassword: boolean
  isGoogleAccount: boolean
  createdAt: string
  orderCount: number
  totalSpent: number
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [resetTarget, setResetTarget] = useState<AdminUser | null>(null)
  const [resetting, setResetting] = useState(false)
  const [tempPassword, setTempPassword] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/users")
      if (res.ok) setUsers(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const filtered = users.filter((user) => {
    const q = searchQuery.toLowerCase()
    return (
      user.username.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      (user.dni ?? "").includes(q) ||
      `${user.firstName ?? ""} ${user.lastName ?? ""}`.toLowerCase().includes(q)
    )
  })

  // Flujo "Cambio por Solicitud de Soporte" (bóveda 02.03.01)
  const handleReset = async () => {
    if (!resetTarget) return
    setResetting(true)
    try {
      const res = await fetch(`/api/admin/users/${resetTarget.id}/reset-password`, {
        method: "POST",
      })
      if (res.ok) {
        const data = await res.json()
        setTempPassword(data.tempPassword)
        fetchUsers()
      }
    } finally {
      setResetting(false)
    }
  }

  const copyTemp = () => {
    if (tempPassword) {
      navigator.clipboard.writeText(tempPassword)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <p className="text-muted-foreground">
          Clientes registrados con sus datos de contacto y envío (solo visible para ti)
        </p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por username, email, DNI o nombre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Datos privados</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Pedidos</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="w-[130px]">Soporte</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No se encontraron usuarios
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Link
                          href={`/admin/users/${user.id}`}
                          className="flex items-center gap-3 hover:opacity-80"
                        >
                          <UserAvatar
                            username={user.username}
                            avatarFileName={user.avatarFileName}
                            size={36}
                          />
                          <div>
                            <p className="flex items-center gap-1 font-medium">
                              @{user.username}
                              <ContactRound className="h-3.5 w-3.5 text-muted-foreground" />
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">
                          {user.firstName || user.lastName
                            ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
                            : "—"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.dni ? `DNI ${user.dni}` : "Sin DNI"}
                          {user.phone ? ` · ${user.phone}` : ""}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.role === "ADMIN" ? "default" : "secondary"}
                        >
                          {user.role === "ADMIN" ? "Admin" : "Cliente"}
                        </Badge>
                        {user.isGoogleAccount && (
                          <Badge variant="outline" className="ml-1 text-[10px]">
                            Google
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{user.orderCount}</TableCell>
                      <TableCell className="font-semibold">
                        S/ {user.totalSpent.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {!user.isGoogleAccount && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-xs"
                            onClick={() => {
                              setTempPassword(null)
                              setResetTarget(user)
                            }}
                          >
                            <KeyRound className="h-3.5 w-3.5" />
                            Reset clave
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Confirmación + clave temporal */}
      <AlertDialog
        open={!!resetTarget}
        onOpenChange={(open) => {
          if (!open) {
            setResetTarget(null)
            setTempPassword(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {tempPassword
                ? "Clave temporal generada"
                : `Resetear contraseña de @${resetTarget?.username}`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {tempPassword
                ? "Envía esta clave al cliente por WhatsApp. Al iniciar sesión, el sistema le pedirá crear una contraseña nueva."
                : "Se generará una clave temporal y el usuario deberá cambiarla en su próximo inicio de sesión. ¿Continuar?"}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {tempPassword && (
            <div className="flex items-center justify-between rounded-xl border bg-muted p-4">
              <code className="font-mono text-lg font-bold">{tempPassword}</code>
              <Button variant="outline" size="sm" onClick={copyTemp}>
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}

          <AlertDialogFooter>
            {tempPassword ? (
              <AlertDialogAction
                onClick={() => {
                  setResetTarget(null)
                  setTempPassword(null)
                }}
              >
                Listo
              </AlertDialogAction>
            ) : (
              <>
                <AlertDialogCancel disabled={resetting}>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    e.preventDefault()
                    handleReset()
                  }}
                  disabled={resetting}
                >
                  {resetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generar clave temporal
                </AlertDialogAction>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
