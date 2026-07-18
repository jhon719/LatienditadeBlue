"use client"

import Image from "next/image"

interface UserAvatarProps {
  avatarFileName?: string | null
  username: string
  size?: number
}

// Avatar local (bóveda 02.04): archivo en public/Imagenes/avatar/,
// con la mascota Bluet como fallback oficial
export function UserAvatar({ avatarFileName, username, size = 40 }: UserAvatarProps) {
  const srcPath = avatarFileName
    ? `/Imagenes/avatar/${avatarFileName}`
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
