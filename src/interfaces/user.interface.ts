import { Employee } from "@/interfaces/employee.interface";

export interface User {
    id: number,
    name: string,
    email: string,
    employee?: Employee,
    created_at: Date,
    updated_at: Date,
}