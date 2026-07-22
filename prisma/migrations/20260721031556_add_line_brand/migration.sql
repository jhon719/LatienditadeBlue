-- AlterTable
ALTER TABLE "lines" ADD COLUMN     "brandId" TEXT;

-- CreateIndex
CREATE INDEX "lines_brandId_idx" ON "lines"("brandId");

-- AddForeignKey
ALTER TABLE "lines" ADD CONSTRAINT "lines_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
