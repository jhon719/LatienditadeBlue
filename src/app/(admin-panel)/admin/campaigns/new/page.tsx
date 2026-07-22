"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import {
  CampaignForm,
  CAMPAIGN_TYPE_OPTIONS,
  type CampaignType,
} from "@/components/admin/CampaignForm"

// Página dedicada de creación de campañas (regla CLAUDE.md: sin modales)

function NewCampaignContent() {
  const searchParams = useSearchParams()
  const initialType = searchParams.get("type") as CampaignType | null

  return (
    <CampaignForm
      mode="create"
      initialType={
        initialType && CAMPAIGN_TYPE_OPTIONS.some((t) => t.value === initialType)
          ? initialType
          : "banners"
      }
    />
  )
}

export default function NewCampaignPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <NewCampaignContent />
    </Suspense>
  )
}
