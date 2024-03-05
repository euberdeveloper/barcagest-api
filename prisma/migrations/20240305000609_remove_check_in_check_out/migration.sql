/*
  Warnings:

  - You are about to drop the column `check_in` on the `parking` table. All the data in the column will be lost.
  - You are about to drop the column `check_out` on the `parking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "parking" DROP COLUMN "check_in",
DROP COLUMN "check_out";
