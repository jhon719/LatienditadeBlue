"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Loader2, Flame, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
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
import type { Category, Line, Brand } from "@/types"

const ENDPOINT: Record<"category" | "line" | "brand", string> = {
  category: "/api/categories",
  line: "/api/lines",
  brand: "/api/brands",
}

// CRUD de Categorías (animes), Líneas y Marcas — imágenes en Cloudinary (bóveda 02.05)
export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [lines, setLines] = useState<Line[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "category" | "line" | "brand"
    id: string
    name: string
  } | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [catRes, lineRes, brandRes] = await Promise.all([
        fetch("/api/categories?all=true"),
        fetch("/api/lines?all=true"),
        fetch("/api/brands?all=true"),
      ])
      setCategories(catRes.ok ? await catRes.json() : [])
      setLines(lineRes.ok ? await lineRes.json() : [])
      setBrands(brandRes.ok ? await brandRes.json() : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const patchCategory = async (id: string, data: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)))
    await fetch(`/api/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  }

  const patchLine = async (id: string, data: Partial<Line>) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...data } : l)))
    await fetch(`/api/lines/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  }

  const patchBrand = async (id: string, data: Partial<Brand>) => {
    setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)))
    await fetch(`/api/brands/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    setDeleteError(null)
    try {
      const res = await fetch(`${ENDPOINT[deleteTarget.type]}/${deleteTarget.id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const result = await res.json().catch(() => null)
        setDeleteError(result?.error ?? "No se pudo eliminar")
        return
      }
      setDeleteTarget(null)
      await fetchData()
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categorías, Líneas y Marcas</h1>
          <p className="text-muted-foreground">
            Controla qué animes, líneas y fabricantes se muestran en la tienda
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo registro
          </Link>
        </Button>
      </div>

      {/* Categorías (animes) */}
      <Card>
        <CardHeader>
          <CardTitle>Categorías (Animes / Series)</CardTitle>
          <CardDescription>Imágenes alojadas en Cloudinary</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[70px]">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Activa</TableHead>
                <TableHead>
                  <span className="flex items-center gap-1">
                    Tendencia <Flame className="h-3.5 w-3.5 text-[#F5B400]" />
                  </span>
                </TableHead>
                <TableHead className="w-[90px] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>
                    <div className="relative h-10 w-16 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={cat.imageUrl ?? "/Imagenes/Mascota BLUE.png"}
                        alt={cat.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{cat.name}</p>
                    <p className="text-xs text-muted-foreground">{cat.slug}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{cat.productCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={cat.isActive}
                      onCheckedChange={(v) => patchCategory(cat.id, { isActive: v })}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={cat.isTrending}
                      onCheckedChange={(v) => patchCategory(cat.id, { isTrending: v })}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/admin/categories/category/${cat.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          setDeleteTarget({ type: "category", id: cat.id, name: cat.name })
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Líneas de figuras */}
      <Card>
        <CardHeader>
          <CardTitle>Líneas de figuras</CardTitle>
          <CardDescription>
            La mayoría pertenece a un fabricante (columna Marca)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[70px]">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Activa</TableHead>
                <TableHead>Destacada</TableHead>
                <TableHead className="w-[90px] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => (
                <TableRow key={line.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={line.imageUrl ?? "/Imagenes/Mascota BLUE.png"}
                        alt={line.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{line.name}</p>
                    <p className="text-xs text-muted-foreground">{line.slug}</p>
                  </TableCell>
                  <TableCell>
                    {line.brand ? (
                      <span className="flex items-center gap-2">
                        {line.brand.imageUrl && (
                          <div className="relative h-6 w-6 overflow-hidden rounded-full bg-muted">
                            <Image
                              src={line.brand.imageUrl}
                              alt={line.brand.name}
                              fill
                              className="object-cover"
                              sizes="24px"
                            />
                          </div>
                        )}
                        <span className="text-sm">{line.brand.name}</span>
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Sin asignar</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{line.productCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={line.isActive}
                      onCheckedChange={(v) => patchLine(line.id, { isActive: v })}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={line.isFeatured}
                      onCheckedChange={(v) => patchLine(line.id, { isFeatured: v })}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/admin/categories/line/${line.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          setDeleteTarget({ type: "line", id: line.id, name: line.name })
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Marcas (fabricantes) */}
      <Card>
        <CardHeader>
          <CardTitle>Marcas (Fabricantes)</CardTitle>
          <CardDescription>Banpresto, Bandai, Sega, Taito, FuRyu...</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[70px]">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Activa</TableHead>
                <TableHead className="w-[90px] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                      <Image
                        src={brand.imageUrl ?? "/Imagenes/Mascota BLUE.png"}
                        alt={brand.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{brand.name}</p>
                    <p className="text-xs text-muted-foreground">{brand.slug}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{brand.productCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={brand.isActive}
                      onCheckedChange={(v) => patchBrand(brand.id, { isActive: v })}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/admin/categories/brand/${brand.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          setDeleteTarget({ type: "brand", id: brand.id, name: brand.name })
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null)
            setDeleteError(null)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar &quot;{deleteTarget?.name}&quot;</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Si tiene productos asociados, se
              te pedirá desactivarlo en su lugar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {deleteError}
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleting}>
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
