-- CreateTable
CREATE TABLE "corner_ads" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "linkUrl" TEXT NOT NULL,
    "altText" TEXT NOT NULL DEFAULT 'Anuncio',
    "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT',
    "validFrom" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "corner_ads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "corner_ads_status_idx" ON "corner_ads"("status");
