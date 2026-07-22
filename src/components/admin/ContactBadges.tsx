import { TiktokIcon } from "@/components/common/TiktokIcon"
import { WhatsappIcon } from "@/components/common/WhatsappIcon"
import { tiktokProfileUrl, whatsappChatUrl } from "@/lib/social"

// Iconos de contacto rápido para tablas admin (Órdenes, Usuarios): TikTok del
// cliente y chat directo de WhatsApp, con micro-animación al hover.
export function ContactBadges({
  tiktokUsername,
  phone,
  whatsappMessage,
}: {
  tiktokUsername?: string | null
  phone?: string | null
  whatsappMessage?: string
}) {
  if (!tiktokUsername && !phone) return null

  return (
    <div className="mt-1 flex items-center gap-1.5">
      {tiktokUsername && (
        <a
          href={tiktokProfileUrl(tiktokUsername)}
          target="_blank"
          rel="noopener noreferrer"
          title={`TikTok: ${tiktokUsername}`}
          className="group inline-flex items-center gap-1 rounded-full bg-black/5 px-1.5 py-0.5 text-[10px] font-semibold text-foreground/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-md dark:bg-white/10 dark:hover:bg-white dark:hover:text-black"
        >
          <TiktokIcon className="h-3 w-3 transition-transform duration-200 group-hover:scale-110" />
          <span className="max-w-[90px] truncate">{tiktokUsername}</span>
        </a>
      )}
      {phone && (
        <a
          href={whatsappChatUrl(phone, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          title={`WhatsApp: ${phone}`}
          className="group inline-flex items-center gap-1 rounded-full bg-[#25D366]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#1E7E34] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#25D366] hover:text-white hover:shadow-md dark:text-[#5fe0a0]"
        >
          <WhatsappIcon className="h-3 w-3 transition-transform duration-200 group-hover:scale-110" />
          {phone}
        </a>
      )}
    </div>
  )
}
