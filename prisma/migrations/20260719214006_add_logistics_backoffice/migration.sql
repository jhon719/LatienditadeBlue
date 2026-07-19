-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('IN_TRANSIT', 'RECEIVED');

-- CreateEnum
CREATE TYPE "PreorderStatus" AS ENUM ('PENDING', 'ARRIVED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "import_batches" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "supplier" TEXT,
    "trackingRef" TEXT,
    "eta" TIMESTAMP(3),
    "status" "BatchStatus" NOT NULL DEFAULT 'IN_TRANSIT',
    "receivedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "import_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "import_batch_items" (
    "id" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitCost" DECIMAL(10,2),

    CONSTRAINT "import_batch_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "preorder_reservations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "batchId" TEXT,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "depositPaid" DECIMAL(10,2) NOT NULL,
    "status" "PreorderStatus" NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "preorder_reservations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "import_batches_status_idx" ON "import_batches"("status");

-- CreateIndex
CREATE INDEX "import_batch_items_batchId_idx" ON "import_batch_items"("batchId");

-- CreateIndex
CREATE INDEX "preorder_reservations_status_idx" ON "preorder_reservations"("status");

-- CreateIndex
CREATE INDEX "preorder_reservations_userId_idx" ON "preorder_reservations"("userId");

-- AddForeignKey
ALTER TABLE "import_batch_items" ADD CONSTRAINT "import_batch_items_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "import_batches"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_batch_items" ADD CONSTRAINT "import_batch_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preorder_reservations" ADD CONSTRAINT "preorder_reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preorder_reservations" ADD CONSTRAINT "preorder_reservations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preorder_reservations" ADD CONSTRAINT "preorder_reservations_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "import_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
