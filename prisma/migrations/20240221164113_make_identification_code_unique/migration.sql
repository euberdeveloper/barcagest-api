/*
  Warnings:

  - A unique constraint covering the columns `[identification_code]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customer_identification_code_key" ON "customer"("identification_code");
