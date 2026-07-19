import Link from "next/link"
import type { AnnouncementView } from "@/types"

// Cinta de anuncios superior (bóveda 05.05 §2 "Top Bar"): franja delgada en
// la parte superior absoluta, con colores configurables desde el admin
export function AnnouncementBar({
  announcement,
}: {
  announcement: AnnouncementView | null
}) {
  if (!announcement) return null

  const content = (
    <p
      className="py-2 text-center text-xs font-bold tracking-wide"
      style={{ color: announcement.textColor }}
    >
      {announcement.text}
    </p>
  )

  return (
    <div style={{ backgroundColor: announcement.bgColor }}>
      {announcement.linkUrl ? (
        <Link href={announcement.linkUrl} className="block hover:opacity-90">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  )
}
