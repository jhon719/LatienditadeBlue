-- CreateTable
CREATE TABLE "acquisitions" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'NEW',
    "lote" INTEGER,
    "weight" DOUBLE PRECISION,
    "commission" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "cost" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "shippingNac" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "shippingInt" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "exchangeRate" DOUBLE PRECISION,
    "total" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "totalSoles" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "igv" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "approxRevenue" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "revenue" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "boxNumber" INTEGER,
    "shipmentNumber" INTEGER,
    "code" TEXT,
    "purchaseDate" TIMESTAMP(3),
    "imageUrl" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "acquisitions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "acquisitions_month_idx" ON "acquisitions"("month");

-- CreateIndex
CREATE INDEX "acquisitions_boxNumber_idx" ON "acquisitions"("boxNumber");
