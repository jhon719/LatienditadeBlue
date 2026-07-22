import { Instagram, Facebook } from "lucide-react"
import { TiktokIcon } from "@/components/common/TiktokIcon"
import type { SocialPlatform } from "@/lib/social"
import { cn } from "@/lib/utils"

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform
  className?: string
}) {
  if (platform === "instagram") return <Instagram className={cn("h-5 w-5", className)} />
  if (platform === "facebook") return <Facebook className={cn("h-5 w-5", className)} />
  return <TiktokIcon className={cn("h-5 w-5", className)} />
}

// Clases de fondo de marca por red (para las tarjetas/botones sociales)
export const SOCIAL_BG: Record<SocialPlatform, string> = {
  tiktok: "bg-gradient-to-br from-[#010101] to-[#25161d]",
  instagram: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  facebook: "bg-gradient-to-br from-[#1877F2] to-[#0a52c0]",
}
