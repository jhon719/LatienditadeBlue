-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('FIGURA', 'MANGA', 'PELUCHE', 'LLAVERO', 'ROPA', 'MERCH');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "type" "ProductType" NOT NULL DEFAULT 'FIGURA';

-- CreateIndex
CREATE INDEX "products_type_idx" ON "products"("type");
