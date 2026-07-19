"use client"

import Image from "next/image"

interface UserAvatarProps {
  avatarFileName?: string | null
  username: string
  size?: number
}

// Avatar del usuario (bóveda 02.04). `avatarFileName` puede ser:
//  - una URL completa de Cloudinary (latiendita/avatars), o
//  - un nombre de archivo local en public/Imagenes/avatar/
// En ambos casos la mascota Bluet es el fallback oficial.
export function UserAvatar({ avatarFileName, username, size = 40 }: UserAvatarProps) {
  const srcPath = avatarFileName
    ? avatarFileName.startsWith("http")
      ? avatarFileName
      : `/Imagenes/avatar/${avatarFileName}`
    : "/Imagenes/Mascota BLUE.png"

  return (
    <div
      style={{ width: size, height: size }}
      className="relative flex-shrink-0 overflow-hidden rounded-full border border-border bg-secondary shadow-inner"
    >
      <Image
        src={srcPath}
        alt={`Avatar de ${username}`}
        fill
        sizes={`${size}px`}
        className="object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.srcset = ""
          target.src = "/Imagenes/Mascota BLUE.png"
        }}
      />
    </div>
  )
}
