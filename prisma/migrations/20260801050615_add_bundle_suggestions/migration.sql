-- CreateTable
CREATE TABLE "product_bundle_suggestions" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "suggestedId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_bundle_suggestions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_bundle_suggestions_productId_order_idx" ON "product_bundle_suggestions"("productId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "product_bundle_suggestions_productId_suggestedId_key" ON "product_bundle_suggestions"("productId", "suggestedId");

-- AddForeignKey
ALTER TABLE "product_bundle_suggestions" ADD CONSTRAINT "product_bundle_suggestions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_bundle_suggestions" ADD CONSTRAINT "product_bundle_suggestions_suggestedId_fkey" FOREIGN KEY ("suggestedId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
