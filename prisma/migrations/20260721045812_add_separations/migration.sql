-- CreateEnum
CREATE TYPE "SeparationKind" AS ENUM ('STOCK', 'PREORDER');

-- CreateEnum
CREATE TYPE "SeparationPaymentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "preorder_reservations" ADD COLUMN     "kind" "SeparationKind" NOT NULL DEFAULT 'PREORDER',
ALTER COLUMN "depositPaid" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "separation_payments" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "operationNumber" TEXT,
    "imageUrl" TEXT,
    "status" "SeparationPaymentStatus" NOT NULL DEFAULT 'PENDING',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedAt" TIMESTAMP(3),

    CONSTRAINT "separation_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "separation_payments_reservationId_idx" ON "separation_payments"("reservationId");

-- CreateIndex
CREATE INDEX "separation_payments_status_idx" ON "separation_payments"("status");

-- AddForeignKey
ALTER TABLE "separation_payments" ADD CONSTRAINT "separation_payments_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "preorder_reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
