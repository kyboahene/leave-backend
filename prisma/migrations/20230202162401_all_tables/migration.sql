-- CreateEnum
CREATE TYPE "EmployeeType" AS ENUM ('JUNIOR', 'SENOIR');

-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('ANNUAL', 'CASUAL', 'PARTENITY', 'MARTENTY');

-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('STARTED', 'DIRECTOR_APPROVE', 'SCHEDULE_OFFICER_REVIEWS');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "hire_date" TIMESTAMP(3) NOT NULL,
    "employee_type" "EmployeeType" NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "access_level" INTEGER NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Division" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "division_id" INTEGER NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "division_id" INTEGER NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "region_id" INTEGER NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leave" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "no_of_days" INTEGER NOT NULL,
    "leave_year" "LeaveType" NOT NULL,
    "status" "LeaveStatus" NOT NULL DEFAULT 'STARTED',
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "Leave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "body" TEXT NOT NULL,
    "leave_id" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employees_user_id_key" ON "employees"("user_id");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "Division"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave" ADD CONSTRAINT "Leave_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_leave_id_fkey" FOREIGN KEY ("leave_id") REFERENCES "Leave"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
