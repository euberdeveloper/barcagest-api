/*
  Warnings:

  - Changed the type of `identification_type` on the `customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `identity_city` on the `customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `identity_issued_at` on the `customer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "IdentityType" AS ENUM ('ID_CARD', 'PASSPORT', 'DRIVING_LICENSE', 'BOAT_LICENSE');

-- AlterTable
ALTER TABLE "customer" DROP COLUMN "identification_type",
ADD COLUMN     "identification_type" "IdentityType" NOT NULL,
DROP COLUMN "identity_city",
ADD COLUMN     "identity_city" "IdentityType" NOT NULL,
DROP COLUMN "identity_issued_at",
ADD COLUMN     "identity_issued_at" "IdentityType" NOT NULL;

-- DropEnum
DROP TYPE "IdentificationType";
