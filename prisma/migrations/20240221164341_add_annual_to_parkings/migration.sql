/*
  Warnings:

  - Added the required column `is_annual` to the `parking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parking" ADD COLUMN     "is_annual" BOOLEAN NOT NULL;
