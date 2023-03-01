import { IsDate, IsNumber } from "class-validator"

export class CreateLeaveDayDto {
    @IsDate()
    start_date: Date

    @IsDate()
    end_date: Date

    @IsNumber()
    no_of_days: number

    @IsNumber()
    leave_id: number
}
