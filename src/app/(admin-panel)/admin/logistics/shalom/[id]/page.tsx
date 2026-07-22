"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ShalomContactForm,
  type ShalomContactData,
} from "@/components/admin/ShalomContactForm"

export default function EditShalomContactPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [data, setData] = useState<ShalomContactData | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/shalom-contacts/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => (d ? setData(d) : setNotFound(true)))
      .catch(() => setNotFound(true))
  }, [id])

  if (notFound) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-muted-foreground">No encontramos este contacto.</p>
        <Button asChild variant="outline">
          <Link href="/admin/logistics">Volver</Link>
        </Button>
      </div>
    )
  }
  if (!data) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return <ShalomContactForm mode="edit" editId={id} initialData={data} />
}
