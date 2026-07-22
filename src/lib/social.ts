// Redes sociales oficiales de La Tiendita de Blue (y marca hermana Manchas).
// Se usan en la home ("Síguenos") y en el footer.

export type SocialPlatform = "tiktok" | "instagram" | "facebook"

export interface SocialLink {
  platform: SocialPlatform
  label: string
  handle: string
  url: string
}

// Perfil de TikTok de un cliente a partir de su handle guardado ("@usuario" o "usuario")
export const tiktokProfileUrl = (handle: string) =>
  `https://www.tiktok.com/@${handle.replace(/^@+/, "")}`

// Enlace de chat de WhatsApp a un número peruano de 9 dígitos (o ya con 51)
export const whatsappChatUrl = (phone: string, message?: string) => {
  const digits = phone.replace(/\D/g, "")
  const withCountry = digits.startsWith("51") ? digits : `51${digits}`
  const text = message ? `?text=${encodeURIComponent(message)}` : ""
  return `https://wa.me/${withCountry}${text}`
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "tiktok",
    label: "Blue Store",
    handle: "@blue.store.per",
    url: "https://www.tiktok.com/@blue.store.per?_r=1&_t=ZS-96y4YuqsBFt",
  },
  {
    platform: "tiktok",
    label: "Blue Store 2",
    handle: "@blue.store.two",
    url: "https://www.tiktok.com/@blue.store.two?lang=es",
  },
  {
    platform: "instagram",
    label: "Instagram",
    handle: "@la.tiendita.de.blue",
    url: "https://www.instagram.com/la.tiendita.de.blue?igsh=eGQ1Z3QzaTN2c3Uz",
  },
  {
    platform: "facebook",
    label: "Facebook",
    handle: "La Tiendita de Blue",
    url: "https://www.facebook.com/profile.php?id=61587453824567&rdid=fmPv4gTOGK6cKEmg&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1KBeyawZF3%2F#",
  },
  {
    platform: "tiktok",
    label: "Manchas Merch",
    handle: "@manchas.merch",
    url: "https://www.tiktok.com/@manchas.merch",
  },
]
