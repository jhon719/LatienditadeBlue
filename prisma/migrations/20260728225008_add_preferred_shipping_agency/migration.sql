-- CreateEnum
CREATE TYPE "ShippingAgency" AS ENUM ('SHALOM', 'OLVA');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "preferredShippingAgency" "ShippingAgency";
