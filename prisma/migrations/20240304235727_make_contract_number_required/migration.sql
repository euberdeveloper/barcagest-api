/*
  Warnings:

  - Made the column `contract_number` on table `parking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "parking" ALTER COLUMN "contract_number" SET NOT NULL;
