/*
  Warnings:

  - Added the required column `updated_at` to the `parking` table without a default value. This is not possible if the table is not empty.
  - Made the column `end_date` on table `parking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "parking" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "end_date" SET NOT NULL;
