import { TopBar } from "@/components/layout/TopBar"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AnnouncementBar } from "@/components/layout/AnnouncementBar"
import { getActiveAnnouncement } from "@/lib/campaigns"

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Cinta de anuncios administrable (bóveda 05.05)
  const announcement = await getActiveAnnouncement().catch(() => null)

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar
        announcement={
          announcement
            ? {
                id: announcement.id,
                text: announcement.text,
                linkUrl: announcement.linkUrl ?? undefined,
                bgColor: announcement.bgColor,
                textColor: announcement.textColor,
              }
            : null
        }
      />
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
