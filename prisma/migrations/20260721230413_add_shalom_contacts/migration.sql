-- CreateTable
CREATE TABLE "shalom_contacts" (
    "id" TEXT NOT NULL,
    "tiktokUsername" TEXT,
    "fullName" TEXT NOT NULL,
    "dni" TEXT,
    "phone" TEXT,
    "shalomAddress" TEXT,
    "notes" TEXT,
    "submittedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shalom_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "shalom_contacts_fullName_idx" ON "shalom_contacts"("fullName");
