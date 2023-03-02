/*
  Warnings:

  - You are about to drop the column `leave_year` on the `Leave` table. All the data in the column will be lost.
  - Added the required column `employee_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leave_type` to the `Leave` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "employee_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "leave_year",
ADD COLUMN     "leave_type" "LeaveType" NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
