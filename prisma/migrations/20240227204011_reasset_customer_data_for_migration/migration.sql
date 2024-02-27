/*
  Warnings:

  - Added the required column `identity_city` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identity_issued_at` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Made the column `birth_place` on table `customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "identity_city" "IdentificationType" NOT NULL,
ADD COLUMN     "identity_issued_at" "IdentificationType" NOT NULL,
ALTER COLUMN "birth_place" SET NOT NULL;
