-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_leave_id_fkey";

-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_division_id_fkey";

-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_region_id_fkey";

-- DropForeignKey
ALTER TABLE "Leave" DROP CONSTRAINT "Leave_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "Region" DROP CONSTRAINT "Region_division_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_user_id_fkey";

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "Division"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "Division"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave" ADD CONSTRAINT "Leave_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_leave_id_fkey" FOREIGN KEY ("leave_id") REFERENCES "Leave"("id") ON DELETE CASCADE ON UPDATE CASCADE;
