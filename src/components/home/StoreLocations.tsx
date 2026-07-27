import { ExternalLink, PackageCheck } from "lucide-react"
import { GradientText } from "@/components/common/GradientText"
import { PICKUP_POINTS, mapEmbedUrl } from "@/lib/locations"

// Puntos de recojo de pedidos (no son locales de la tienda: son puntos de
// encuentro para entregar). El mapa usa el embed clásico de Google Maps
// (`output=embed`), que no necesita API key ni cuenta de facturación.
export function StoreLocations() {
  return (
    <section className="blue-container py-10 sm:py-14">
      <div className="mb-6 text-center sm:mb-8">
        <p className="text-xs font-extrabold uppercase text-[#4A80BE] sm:text-sm">
          Coordinamos por WhatsApp
        </p>
        <h2 className="font-display text-4xl leading-none sm:text-5xl">
          <GradientText>Puntos de recojo</GradientText>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-xs text-muted-foreground sm:text-sm">
          Nos encontramos aqui para entregarte tu pedido. Acordamos dia y hora
          por WhatsApp antes de la entrega.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {PICKUP_POINTS.map((point) => (
          <div
            key={point.id}
            className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
          >
            <iframe
              src={mapEmbedUrl(point.mapQuery)}
              title={`Mapa de ${point.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-52 w-full border-0 sm:h-64"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wide text-[#4A80BE]">
                  <PackageCheck className="h-3.5 w-3.5 shrink-0" /> Punto de recojo
                </p>
                <p className="mt-0.5 font-display text-2xl leading-none text-foreground sm:text-3xl">
                  {point.name}
                </p>
                <p className="mt-1 text-xs font-semibold text-muted-foreground sm:text-sm">
                  {point.detail}
                </p>
                {point.address && (
                  <p className="text-[11px] text-muted-foreground sm:text-xs">
                    {point.address}
                  </p>
                )}
              </div>
              <a
                href={point.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#4A80BE] px-4 py-2 text-xs font-extrabold text-white transition hover:brightness-110 sm:text-sm"
              >
                Abrir en Maps <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
