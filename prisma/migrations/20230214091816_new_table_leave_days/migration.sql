-- CreateTable
CREATE TABLE "LeaveDays" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "no_of_days" INTEGER NOT NULL,
    "leave_id" INTEGER NOT NULL,

    CONSTRAINT "LeaveDays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeaveDays" ADD CONSTRAINT "LeaveDays_leave_id_fkey" FOREIGN KEY ("leave_id") REFERENCES "Leave"("id") ON DELETE CASCADE ON UPDATE CASCADE;
