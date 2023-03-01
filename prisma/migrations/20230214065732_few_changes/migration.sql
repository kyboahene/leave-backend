/*
  Warnings:

  - The values [PARTENITY,MARTENTY] on the enum `LeaveType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "LeaveStatus" ADD VALUE 'HOD_APPROVE';

-- AlterEnum
BEGIN;
CREATE TYPE "LeaveType_new" AS ENUM ('ANNUAL', 'CASUAL', 'PART', 'MATERNITY', 'SICK');
ALTER TABLE "Leave" ALTER COLUMN "leave_type" TYPE "LeaveType_new" USING ("leave_type"::text::"LeaveType_new");
ALTER TYPE "LeaveType" RENAME TO "LeaveType_old";
ALTER TYPE "LeaveType_new" RENAME TO "LeaveType";
DROP TYPE "LeaveType_old";
COMMIT;
