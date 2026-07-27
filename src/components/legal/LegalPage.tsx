import Image from "next/image"
import { STORE_WHATSAPP_DISPLAY, storeWhatsappUrl } from "@/lib/social"

// Bloque de contenido dentro de una sección o subsección, en el orden en que
// debe renderizarse (ej: párrafo introductorio + lista + párrafo de cierre).
type LegalBlock = { p: string } | { list: string[] }

interface LegalSubsection {
  number: string
  title: string
  blocks: LegalBlock[]
}

interface LegalSection {
  title: string
  /** Atajo para una sección de solo bullets (retorna/privacidad) */
  items?: string[]
  /** Mezcla ordenada de párrafos y listas (términos, con texto más denso) */
  blocks?: LegalBlock[]
  /** Sub-secciones numeradas (ej: 8.1, 8.2...) */
  subsections?: LegalSubsection[]
}

interface LegalPageProps {
  title: string
  intro: string
  sections: LegalSection[]
  updatedAt: string
  /** Declaración final fuera de la numeración (ej: aceptación al comprar) */
  closing?: string
}

function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        "p" in block ? (
          <p key={i} className="text-sm leading-relaxed text-foreground/85">
            {block.p}
          </p>
        ) : (
          <ul key={i} className="space-y-2">
            {block.list.map((item, j) => (
              <li key={j} className="flex gap-2 text-sm leading-relaxed text-foreground/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5B400]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )
      )}
    </>
  )
}

// Plantilla compartida para las páginas del Marco Legal (bóveda 07)
export function LegalPage({ title, intro, sections, updatedAt, closing }: LegalPageProps) {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0">
          <Image
            src="/Imagenes/Mascota BLUE.png"
            alt="Bluet"
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="font-display text-4xl uppercase tracking-wide text-[#142F5C] dark:text-foreground">
            {title}
          </h1>
          <p className="text-xs text-muted-foreground">
            Última actualización: {updatedAt}
          </p>
        </div>
      </div>

      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{intro}</p>

      <div className="space-y-8">
        {sections.map((section, index) => (
          <section key={section.title} className="space-y-3">
            <h2 className="font-display text-2xl uppercase tracking-wide text-primary">
              {index + 1}. {section.title}
            </h2>

            {section.items && (
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed text-foreground/85"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5B400]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.blocks && (
              <div className="space-y-3">
                <LegalBlocks blocks={section.blocks} />
              </div>
            )}

            {section.subsections && (
              <div className="space-y-5">
                {section.subsections.map((sub) => (
                  <div key={sub.number} className="space-y-2 border-l-2 border-[#F5B400]/40 pl-4">
                    <h3 className="font-display text-base uppercase tracking-wide text-[#142F5C] dark:text-foreground">
                      {sub.number} {sub.title}
                    </h3>
                    <div className="space-y-2">
                      <LegalBlocks blocks={sub.blocks} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {closing && (
        <p className="mt-10 border-t pt-6 text-sm font-semibold italic leading-relaxed text-foreground/85">
          {closing}
        </p>
      )}

      <div className="mt-12 rounded-2xl border border-dashed border-primary/40 bg-[#E1F0FF]/30 p-5 text-sm text-muted-foreground dark:bg-primary/10">
        ¿Tienes dudas sobre estas políticas? Escríbenos por WhatsApp al{" "}
        <a
          href={storeWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-primary underline"
        >
          {STORE_WHATSAPP_DISPLAY}
        </a>{" "}
        y te ayudamos con gusto. ✨
      </div>
    </div>
  )
}
