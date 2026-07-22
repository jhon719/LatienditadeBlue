import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react"

// Layout compartido de las páginas de autenticación: panel de marca animado
// (desktop) + zona de formulario sobre fondo pastel. Estilo split-screen.

const FEATURES = [
  {
    icon: PackageCheck,
    title: "Figuras originales",
    text: "Stock real, preventas y pedidos online de tus animes favoritos",
  },
  {
    icon: ShieldCheck,
    title: "Pagos seguros",
    text: "Yape, Plin, transferencia o Mercado Pago con verificación",
  },
  {
    icon: Truck,
    title: "Envíos a todo el Perú",
    text: "Recojo en tienda, motorizado en Lima o courier a provincia",
  },
]

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1.1fr_1fr]">
      {/* Panel de marca (solo desktop) */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#142F5C] via-[#1d3b6e] to-[#4A80BE] lg:flex lg:flex-col">
        <div className="dots-overlay pointer-events-none absolute inset-0 opacity-40" />

        {/* Blobs decorativos animados */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#4A80BE]/50 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-[#F5B400]/20 blur-3xl animate-blob [animation-delay:4s]" />
        <div className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-[#7FB3E8]/40 blur-3xl animate-blob [animation-delay:8s]" />

        {/* Destellos */}
        <Sparkles className="absolute left-[18%] top-[22%] h-5 w-5 text-[#F5B400] animate-twinkle" />
        <Sparkles className="absolute right-[22%] top-[14%] h-4 w-4 text-white/70 animate-twinkle [animation-delay:1s]" />
        <Sparkles className="absolute left-[12%] bottom-[28%] h-4 w-4 text-[#7FB3E8] animate-twinkle [animation-delay:2s]" />

        <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
          <Link href="/" className="flex w-fit items-center gap-3 text-white">
            <div className="relative size-11 overflow-hidden rounded-full ring-2 ring-white/40">
              <Image
                src="/Imagenes/LOGO BLUE.jpeg"
                alt="La Tiendita de Blue"
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
            <span className="font-display text-2xl tracking-wide">
              La Tiendita de Blue
            </span>
          </Link>

          <div className="max-w-md">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-[#FFF5D1] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-[#F5B400]" />
              Coleccionables de anime en Perú
            </p>
            <h1 className="font-display text-5xl leading-[0.95] text-white xl:text-6xl">
              Tu próxima figura
              <span className="block bg-gradient-to-r from-[#F5B400] to-[#FFF5D1] bg-clip-text text-transparent">
                te está esperando
              </span>
            </h1>

            <ul className="mt-8 space-y-4">
              {FEATURES.map((f, i) => (
                <li
                  key={f.title}
                  className="flex items-start gap-3 animate-fade-up"
                  style={{ animationDelay: `${200 + i * 120}ms` }}
                >
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur">
                    <f.icon className="h-4.5 w-4.5 text-[#F5B400]" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{f.title}</p>
                    <p className="text-xs text-[#DBE3EE]">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-end justify-between">
            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} La Tiendita de Blue · Hecho con 💙 en Perú
            </p>
            <div className="relative h-36 w-36 animate-float-soft xl:h-44 xl:w-44">
              <div className="absolute inset-4 rounded-full bg-[#F5B400]/30 blur-2xl" />
              <Image
                src="/Imagenes/Mascota BLUE.png"
                alt="Bluet, la mascota"
                fill
                className="relative object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
                sizes="176px"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Zona del formulario */}
      <main className="relative flex flex-col items-center justify-center overflow-hidden p-6 md:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_0%,#E1F0FF_0%,transparent_60%),radial-gradient(50%_40%_at_10%_100%,#FFF5D1_0%,transparent_55%)] dark:bg-[radial-gradient(60%_50%_at_80%_0%,rgba(74,128,190,0.18)_0%,transparent_60%),radial-gradient(50%_40%_at_10%_100%,rgba(245,180,0,0.10)_0%,transparent_55%)]" />

        <Link
          href="/"
          className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver a la tienda
        </Link>

        {/* Logo en móvil (el panel de marca está oculto) */}
        <Link href="/" className="relative z-10 mb-6 flex items-center gap-2 lg:hidden">
          <div className="relative size-10 overflow-hidden rounded-full ring-2 ring-[#4A80BE]/30">
            <Image
              src="/Imagenes/LOGO BLUE.jpeg"
              alt="La Tiendita de Blue"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <span className="font-display text-xl">La Tiendita de Blue</span>
        </Link>

        <div className="relative z-10 w-full max-w-md animate-fade-up">{children}</div>
      </main>
    </div>
  )
}
