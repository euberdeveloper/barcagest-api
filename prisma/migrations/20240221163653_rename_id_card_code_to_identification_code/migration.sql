/*
  Warnings:

  - You are about to drop the column `id_card_code` on the `customer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "id_card_code",
ADD COLUMN     "identification_code" TEXT;
