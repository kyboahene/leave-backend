/*
  Warnings:

  - The values [SENOIR] on the enum `EmployeeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EmployeeType_new" AS ENUM ('JUNIOR', 'SENIOR');
ALTER TABLE "employees" ALTER COLUMN "employee_type" TYPE "EmployeeType_new" USING ("employee_type"::text::"EmployeeType_new");
ALTER TYPE "EmployeeType" RENAME TO "EmployeeType_old";
ALTER TYPE "EmployeeType_new" RENAME TO "EmployeeType";
DROP TYPE "EmployeeType_old";
COMMIT;
