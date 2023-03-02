import { LeaveType } from '@prisma/client';
import { IsDate, IsEnum, IsNumber } from 'class-validator';

export class UpdateLeaveDto {
    @IsEnum(LeaveType)
    leave_type?: LeaveType

    @IsDate()
    startDate?: Date

    @IsNumber()
    no_of_days?: number
}
