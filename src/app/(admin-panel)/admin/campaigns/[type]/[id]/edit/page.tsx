"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  CampaignForm,
  CAMPAIGN_TYPE_OPTIONS,
  type CampaignData,
  type CampaignType,
} from "@/components/admin/CampaignForm"

// Página dedicada de edición de campañas (regla CLAUDE.md: sin modales)

export default function EditCampaignPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>
}) {
  const { type, id } = use(params)
  const [item, setItem] = useState<CampaignData | null>(null)
  const [notFound, setNotFound] = useState(false)

  const validType = CAMPAIGN_TYPE_OPTIONS.some((t) => t.value === type)

  useEffect(() => {
    if (!validType) return
    fetch(`/api/admin/campaigns/${type}/${id}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setItem(data)
        else setNotFound(true)
      })
      .catch(() => setNotFound(true))
  }, [type, id, validType])

  if (!validType || notFound) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <p className="text-muted-foreground">
          No encontramos esta campaña. Puede que haya sido eliminada.
        </p>
        <Button asChild variant="outline">
          <Link href="/admin/campaigns">Volver a campañas</Link>
        </Button>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <CampaignForm
      mode="edit"
      initialType={type as CampaignType}
      editId={id}
      initialData={item}
    />
  )
}
