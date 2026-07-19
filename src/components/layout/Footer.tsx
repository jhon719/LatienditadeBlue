import Image from "next/image"
import Link from "next/link"
import { Instagram, Mail, MapPin, MessageCircle, Music2, Phone } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-[#142F5C] text-white">
      <div className="blue-container py-12">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-3xl solid-shadow-yellow">
                <Image
                  src="/Imagenes/LOGO BLUE.jpeg"
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
            <div className="mt-5 flex gap-3">
              {[Instagram, Music2, MessageCircle].map((Icon, index) => (
                <Link key={index} href="#" className="rounded-full bg-white/10 p-3 transition hover:bg-[#F5B400] hover:text-[#142F5C]">
                  <Icon className="h-5 w-5" />
                </Link>
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
            <h3 className="mt-6 font-display text-2xl">Ubicaciones</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li className="flex gap-2"><MapPin className="h-4 w-4 text-[#F5B400]" /> Feria Grau</li>
              <li className="flex gap-2"><MapPin className="h-4 w-4 text-[#F5B400]" /> Centro Civico</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li>
                <a href="https://wa.me/51997763962" target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-[#F5B400]">
                  <Phone className="h-4 w-4 text-[#F5B400]" /> +51 997 763 962
                </a>
              </li>
              <li className="flex gap-2"><Mail className="h-4 w-4 text-[#F5B400]" /> hola@latienditadeblue.com</li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-white/15" />
        <p className="text-sm text-white/60">&copy; {new Date().getFullYear()} La Tiendita de Blue. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
