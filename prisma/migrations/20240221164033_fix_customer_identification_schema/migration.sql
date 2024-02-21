/*
  Warnings:

  - Added the required column `identification_type` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Made the column `identification_code` on table `customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "identification_type" "IdentificationType" NOT NULL,
ALTER COLUMN "identification_code" SET NOT NULL;
