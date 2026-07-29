import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { AnnouncementBar } from "@/components/layout/AnnouncementBar"
import { CompleteProfileBanner } from "@/components/common/CompleteProfileBanner"
import { WelcomeTour } from "@/components/common/WelcomeTour"
import { PromoPopup } from "@/components/common/PromoPopup"
import { CornerAd } from "@/components/common/CornerAd"
import { getActiveAnnouncement, getActivePopup, getActiveCornerAd } from "@/lib/campaigns"

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Cinta de anuncios y popup promocional administrables (bóveda 05.05)
  const [announcement, popup, cornerAd] = await Promise.all([
    getActiveAnnouncement().catch(() => null),
    getActivePopup().catch(() => null),
    getActiveCornerAd().catch(() => null),
  ])

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
      <Header />
      <CompleteProfileBanner />
      <main className="flex-1">{children}</main>
      <Footer />
      <WelcomeTour />
      {popup && (
        <PromoPopup
          id={popup.id}
          imageUrl={popup.imageUrl}
          linkUrl={popup.linkUrl}
          altText={popup.altText}
        />
      )}
      {cornerAd && (
        <CornerAd
          id={cornerAd.id}
          imageUrl={cornerAd.imageUrl}
          linkUrl={cornerAd.linkUrl}
          altText={cornerAd.altText}
        />
      )}
    </div>
  )
}
