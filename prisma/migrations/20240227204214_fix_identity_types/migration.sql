/*
  Warnings:

  - Changed the type of `identity_city` on the `customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `identity_issued_at` on the `customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "customer" DROP COLUMN "identity_city",
ADD COLUMN     "identity_city" TEXT NOT NULL,
DROP COLUMN "identity_issued_at",
ADD COLUMN     "identity_issued_at" DATE NOT NULL;
