import { LeaveStatus, LeaveType } from "@prisma/client"

export class Leave {
    id: number
    no_of_days: number
    leave_type: LeaveType
    status: LeaveStatus
    start_date: Date
    end_date: Date
    employee_id: number
    updated_at: Date
    created_at: Date
}
