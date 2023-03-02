import { LeaveType } from '@prisma/client';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLeaveDto {
    @IsEnum(LeaveType)
    leave_type: LeaveType

    @IsDate()
    startDate: Date

    @IsString()
    @IsOptional()
    comment: string

    @IsNumber()
    @IsOptional()
    no_of_days: number
}
