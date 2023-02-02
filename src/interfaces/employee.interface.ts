import { User } from "./user.interface";

export interface Employee {
    id: number,
    user_id?: User,
    hire_date: Date,
    created_at: Date,
    updated_at: Date,
}