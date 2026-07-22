import Image from "next/image"
import { Radio } from "lucide-react"
import { TiktokIcon } from "@/components/common/TiktokIcon"
import { SOCIAL_LINKS } from "@/lib/social"

// TikTok oficial de la marca hermana Manchas (registrado en src/lib/social.ts)
const TIKTOK_URL =
  SOCIAL_LINKS.find((s) => s.label === "Manchas Merch")?.url ??
  "https://www.tiktok.com/@manchas.merch"

// ---------------------------------------------------------------------------
// Franja horizontal compacta: logo + nombre + CTA de TikTok sobre el banner.
// Va arriba de la grilla en secciones que no son figuras.
// ---------------------------------------------------------------------------
export function ManchasStoreBanner() {
  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-[#142F5C] to-[#1d3b6e] text-white shadow-sm">
      <div className="flex items-stretch gap-4 p-3 sm:p-4">
        {/* Recorte compacto del banner (altura acotada) */}
        <div className="relative hidden w-40 shrink-0 overflow-hidden rounded-xl sm:block md:w-56">
          <Image
            src="/Imagenes/manchas store banner.png"
            alt="Manchas Store"
            fill
            className="object-cover"
            sizes="224px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-2">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl ring-2 ring-white/30">
              <Image
                src="/Imagenes/manchas store logo.jpeg"
                alt="Logo Manchas Store"
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
            <div>
              <p className="font-display text-xl leading-none tracking-wide">
                Manchas Store
              </p>
              <p className="text-xs text-[#DBE3EE]">
                Mangas, peluches y merch de anime
              </p>
            </div>
          </div>
          <p className="text-xs text-[#DBE3EE]">
            Síguenos en TikTok: transmisiones en vivo, sorteos y nuevos ingresos.
          </p>
        </div>

        <a
          href={TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 self-center rounded-full bg-white px-4 py-2 text-sm font-bold text-[#142F5C] transition-transform hover:scale-[1.03]"
        >
          <TiktokIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Ver TikTok</span>
        </a>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Banners verticales (anuncio + transmisión en vivo → TikTok).
// orientation="column" para el aside lateral; "row" para móvil/tablet.
// ---------------------------------------------------------------------------
export function ManchasStoreVerticals({
  orientation = "column",
}: {
  orientation?: "column" | "row"
}) {
  const wrap =
    orientation === "column"
      ? "flex flex-col gap-4"
      : "grid grid-cols-2 gap-3"

  return (
    <div className={wrap}>
      {/* Anuncio vertical */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-border shadow-sm">
        <Image
          src="/Imagenes/machas store vertical anuncio.png"
          alt="Anuncio Manchas Store"
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 45vw, 240px"
        />
      </div>

      {/* Transmisión en vivo → TikTok */}
      <a
        href={TIKTOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-border shadow-sm"
        title="Ver transmisión en vivo en TikTok"
      >
        <Image
          src="/Imagenes/trasmiciones en vivo manchas store.png"
          alt="Transmisiones en vivo de Manchas Store en TikTok"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 1280px) 45vw, 240px"
        />
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
          <Radio className="h-3 w-3 animate-pulse" />
          EN VIVO
        </span>
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-gradient-to-t from-black/70 to-transparent p-2 text-center text-[11px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
          <TiktokIcon className="h-3 w-3" />
          Toca para ver en TikTok
        </span>
      </a>
    </div>
  )
}
