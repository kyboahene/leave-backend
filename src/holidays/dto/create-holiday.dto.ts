import { IsDate } from "class-validator";

export class CreateHolidayDto {
    @IsDate()
    holiday: Date
}
