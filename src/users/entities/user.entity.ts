import { Employee } from "@prisma/client"

export class User {
    id: number
    name: string
    email: string
    employee?: Employee
    created_at: Date
    updated_at: Date
}