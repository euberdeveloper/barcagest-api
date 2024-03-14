/*
  Warnings:

  - A unique constraint covering the columns `[contract_number]` on the table `parking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "parking_contract_number_key" ON "parking"("contract_number");
