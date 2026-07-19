import Image from "next/image"

interface LegalSection {
  title: string
  items: string[]
}

interface LegalPageProps {
  title: string
  intro: string
  sections: LegalSection[]
  updatedAt: string
}

// Plantilla compartida para las páginas del Marco Legal (bóveda 07)
export function LegalPage({ title, intro, sections, updatedAt }: LegalPageProps) {
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
          <section key={section.title}>
            <h2 className="mb-3 font-display text-2xl uppercase tracking-wide text-primary">
              {index + 1}. {section.title}
            </h2>
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
          </section>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-dashed border-primary/40 bg-[#E1F0FF]/30 p-5 text-sm text-muted-foreground dark:bg-primary/10">
        ¿Tienes dudas sobre estas políticas? Escríbenos por WhatsApp al{" "}
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51997763962"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-primary underline"
        >
          +51 997 763 962
        </a>{" "}
        y te ayudamos con gusto. ✨
      </div>
    </div>
  )
}
