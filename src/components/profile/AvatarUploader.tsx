"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserAvatar } from "@/components/common/UserAvatar"

interface AvatarUploaderProps {
  username: string
  avatarFileName: string | null
}

export function AvatarUploader({ username, avatarFileName }: AvatarUploaderProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Cache-buster para ver el avatar nuevo al instante
  const [version, setVersion] = useState(0)

  const handleFile = async (file: File) => {
    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/user/avatar", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) {
        const result = await res.json().catch(() => null)
        setError(result?.error ?? "Error al subir el avatar")
        return
      }
      setVersion((v) => v + 1)
      router.refresh()
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" key={version}>
        <UserAvatar username={username} avatarFileName={avatarFileName} size={96} />
        <Button
          size="icon"
          variant="secondary"
          className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full shadow"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Camera className="h-4 w-4" />
          )}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ""
          }}
        />
      </div>

      {error && <p className="text-xs text-destructive font-medium">{error}</p>}

      <div className="rounded-lg bg-blue-50 p-3 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-2">Requisitos del avatar:</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Tamaño máximo: <span className="font-semibold">5 MB</span></li>
          <li>Resolución recomendada: <span className="font-semibold">400 x 400 px</span> (mínimo 200 x 200 px)</li>
          <li>Formatos: JPG, PNG o WebP</li>
        </ul>
      </div>
    </div>
  )
}
