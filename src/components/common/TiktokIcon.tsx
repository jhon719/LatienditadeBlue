import { cn } from "@/lib/utils"

// Glifo de marca de TikTok (monocromo, hereda color vía currentColor)
export function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-4 w-4", className)}
    >
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.2v12.44a2.6 2.6 0 0 1-2.6 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.4-2.48V7.2a5.8 5.8 0 0 0-.8-.06 5.83 5.83 0 1 0 5.83 5.83V8.9a7.45 7.45 0 0 0 4.32 1.38V7.1a4.28 4.28 0 0 1-3.3-1.28Z" />
    </svg>
  )
}
