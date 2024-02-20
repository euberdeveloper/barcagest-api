/*
  Warnings:

  - You are about to drop the `park` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "park" DROP CONSTRAINT "park_customer_id_fkey";

-- DropTable
DROP TABLE "park";

-- CreateTable
CREATE TABLE "parking" (
    "id" SERIAL NOT NULL,
    "vehicle_type" TEXT NOT NULL,
    "vehicle_brand" TEXT NOT NULL,
    "vehicle_plate" TEXT NOT NULL,
    "registration_year" INTEGER NOT NULL,
    "size_in_meters" DOUBLE PRECISION NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "check_in" TIMESTAMP(3),
    "check_out" TIMESTAMP(3),
    "contract_number" TEXT,
    "price" DECIMAL(9,2) NOT NULL,
    "notes" TEXT,
    "customer_id" INTEGER NOT NULL,

    CONSTRAINT "parking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parking" ADD CONSTRAINT "parking_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
