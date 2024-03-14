/*
  Warnings:

  - Made the column `residence_street` on table `customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `residence_city` on table `customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `residence_zip` on table `customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `residence_country` on table `customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "residence_street" SET NOT NULL,
ALTER COLUMN "residence_city" SET NOT NULL,
ALTER COLUMN "residence_zip" SET NOT NULL,
ALTER COLUMN "residence_country" SET NOT NULL;
