import { EmployeeType } from '@prisma/client';
export class AuthenticatedUser {
    id: number
    name: string
    email: string
    hire_date: number
    employee_id: number
    employee_type: EmployeeType
    division_id: number
}