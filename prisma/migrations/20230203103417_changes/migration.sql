/*
  Warnings:

  - Added the required column `district_id` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `division_id` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "district_id" INTEGER NOT NULL,
ADD COLUMN     "division_id" INTEGER NOT NULL,
ADD COLUMN     "region_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "Division"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_district_id_fkey" FOREIGN KEY ("district_id") REFERENCES "District"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;
