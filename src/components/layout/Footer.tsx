import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { SocialIcon } from "@/components/common/SocialIcon"
import { PaymentMethods } from "@/components/common/PaymentMethods"
import {
  SOCIAL_LINKS,
  STORE_EMAIL,
  STORE_WHATSAPP_DISPLAY,
  storeWhatsappUrl,
} from "@/lib/social"
import { PICKUP_POINTS } from "@/lib/locations"

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-[#142F5C] text-white">
      <div className="blue-container py-12">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-3xl">
                <Image
                  src="/Imagenes/BLUE PAGINA.png"
                  alt="La Tiendita de Blue"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="font-display text-4xl leading-none">La Tiendita</p>
                <p className="text-sm font-bold text-[#F5B400]">de Blue</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/75">
              Figuras y merch anime para coleccionistas. Stock, preventas y
              pedidos online con atencion cercana.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${s.label} · ${s.handle}`}
                  className="rounded-full bg-white/10 p-3 transition hover:-translate-y-0.5 hover:bg-[#F5B400] hover:text-[#142F5C]"
                >
                  <SocialIcon platform={s.platform} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-2xl">Catalogo</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li><Link href="/products?status=stock" className="hover:text-[#F5B400]">Figuras en stock</Link></li>
              <li><Link href="/products?status=preventa" className="hover:text-[#F5B400]">Preventa</Link></li>
              <li><Link href="/products?sortBy=newest" className="hover:text-[#F5B400]">Recien llegados</Link></li>
              <li><Link href="/products" className="hover:text-[#F5B400]">Todo el catalogo</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li><Link href="/terms" className="hover:text-[#F5B400]">Terminos y condiciones</Link></li>
              <li><Link href="/returns" className="hover:text-[#F5B400]">Devoluciones y reembolsos</Link></li>
              <li><Link href="/privacy" className="hover:text-[#F5B400]">Politica de privacidad</Link></li>
            </ul>
            <h3 className="mt-6 font-display text-2xl">Puntos de recojo</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              {PICKUP_POINTS.map((point) => (
                <li key={point.id}>
                  <a
                    href={point.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 hover:text-[#F5B400]"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-[#F5B400]" /> {point.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <a
                  href={storeWhatsappUrl("¡Hola! Quiero más información sobre sus figuras. ✨")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 hover:text-[#F5B400]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#F5B400]" /> {STORE_WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#F5B400]" /> {STORE_EMAIL}
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-white/15" />
        <PaymentMethods variant="dark" />
        <Separator className="my-6 bg-white/15" />
        <p className="text-sm text-white/60">&copy; {new Date().getFullYear()} La Tiendita de Blue. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
