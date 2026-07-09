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
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#4A80BE] solid-shadow-yellow">
                <span className="font-display text-3xl">B</span>
              </div>
              <div>
                <p className="font-display text-4xl leading-none">La Tiendita</p>
                <p className="text-sm font-bold text-[#F5B400]">de Blue</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/75">
              Figuras, peluches, mangas y merch anime para coleccionistas. Stock, preventas y pedidos online con atencion cercana.
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
              <li><Link href="/products?status=stock">Figuras en stock</Link></li>
              <li><Link href="/products?status=preventa">Preventa</Link></li>
              <li><Link href="/products?category=peluches">Peluches</Link></li>
              <li><Link href="/products?category=mangas">Mangas</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl">Ubicaciones</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex gap-2"><MapPin className="h-4 w-4 text-[#F5B400]" /> Feria Grau</li>
              <li className="flex gap-2"><MapPin className="h-4 w-4 text-[#F5B400]" /> Centro Civico</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-2xl">Contacto</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex gap-2"><Phone className="h-4 w-4 text-[#F5B400]" /> +51 999 888 777</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 text-[#F5B400]" /> hola@latienditadeblue.pe</li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-white/15" />
        <p className="text-sm text-white/60">&copy; {new Date().getFullYear()} La Tiendita de Blue. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
