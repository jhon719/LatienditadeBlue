"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Loader2, Trash2, Pencil, Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TiktokIcon } from "@/components/common/TiktokIcon"
import { WhatsappIcon } from "@/components/common/WhatsappIcon"

interface Contact {
  id: string
  tiktokUsername: string | null
  fullName: string
  dni: string | null
  phone: string | null
  shalomAddress: string | null
  notes: string | null
}

const tiktokUrl = (handle: string) =>
  `https://www.tiktok.com/@${handle.replace(/^@+/, "")}`

export function ShalomDirectoryTab() {
  const [items, setItems] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set("search", search)
      const res = await fetch(`/api/admin/shalom-contacts?${params}`)
      setItems(res.ok ? await res.json() : [])
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    const t = setTimeout(load, 250)
    return () => clearTimeout(t)
  }, [load])

  const remove = async (id: string) => {
    await fetch(`/api/admin/shalom-contacts/${id}`, { method: "DELETE" })
    await load()
  }

  return (
    <div className="space-y-4">
      <p className="rounded-md bg-[#E1F0FF]/50 px-3 py-2 text-xs text-[#142F5C] dark:bg-[#101f38]/60 dark:text-[#7FB3E8]">
        Directorio de clientes con su agencia Shalom más cercana (importado del
        formulario de envíos). Úsalo para despachar pedidos a provincia.
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-[280px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, TikTok, DNI o celular…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button asChild>
          <Link href="/admin/logistics/shalom/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo contacto
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No hay contactos con este filtro.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>TikTok</TableHead>
                    <TableHead>DNI</TableHead>
                    <TableHead>WhatsApp</TableHead>
                    <TableHead className="min-w-[240px]">Agencia Shalom</TableHead>
                    <TableHead className="w-[80px] text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.fullName}</TableCell>
                      <TableCell>
                        {c.tiktokUsername ? (
                          <a
                            href={tiktokUrl(c.tiktokUsername)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[#4A80BE] hover:underline"
                          >
                            <TiktokIcon className="h-3.5 w-3.5" />
                            {c.tiktokUsername}
                          </a>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">{c.dni ?? "—"}</TableCell>
                      <TableCell>
                        {c.phone ? (
                          <span className="inline-flex items-center gap-1.5 text-sm">
                            <WhatsappIcon className="h-3.5 w-3.5 text-[#25D366]" />
                            {c.phone}
                          </span>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {c.shalomAddress ? (
                          <span className="flex items-start gap-1.5">
                            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8a6d00]" />
                            <span className="line-clamp-2">{c.shalomAddress}</span>
                          </span>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <Link href={`/admin/logistics/shalom/${c.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Eliminar contacto</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Se eliminará a {c.fullName} del directorio Shalom.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => remove(c.id)}>
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      {!loading && (
        <p className="text-xs text-muted-foreground">{items.length} contacto(s)</p>
      )}
    </div>
  )
}
