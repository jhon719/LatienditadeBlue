"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Loader2, Flame } from "lucide-react"
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
import type { Category, Line } from "@/types"

// CRUD de Categorías (animes) y Líneas con toggles isActive/isTrending (bóveda 02.05)
export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [lines, setLines] = useState<Line[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [catRes, lineRes] = await Promise.all([
        fetch("/api/categories?all=true"),
        fetch("/api/lines?all=true"),
      ])
      setCategories(catRes.ok ? await catRes.json() : [])
      setLines(lineRes.ok ? await lineRes.json() : [])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const patchCategory = async (id: string, data: Partial<Category>) => {
    // UI optimista (bóveda 05.01)
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    )
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
          <h1 className="text-2xl font-bold">Categorías y Líneas</h1>
          <p className="text-muted-foreground">
            Controla qué animes y líneas se muestran en la tienda y cuáles son tendencia
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Categoría / Línea
          </Link>
        </Button>
      </div>

      {/* Categorías (animes) */}
      <Card>
        <CardHeader>
          <CardTitle>Categorías (Animes / Series)</CardTitle>
          <CardDescription>
            Imágenes servidas desde public/Imagenes/Lista de Animes/ usando el slug
          </CardDescription>
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
            Imágenes servidas desde public/Imagenes/Lineas de figuras/ usando el slug
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[70px]">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Productos</TableHead>
                <TableHead>Activa</TableHead>
                <TableHead>Destacada</TableHead>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
