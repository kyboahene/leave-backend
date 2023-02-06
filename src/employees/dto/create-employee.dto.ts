import { ApiProperty } from "@nestjs/swagger";
import { EmployeeType } from "@prisma/client";
import { IsString, IsNotEmpty, IsEnum, IsNumber } from "class-validator";

export class CreateEmployeeDto {
    @ApiProperty({
        description: 'The name of the employee',
        example: "Finance"
    })
    @IsString()
    @IsNotEmpty()
    hire_date: Date

    @ApiProperty({
        description: 'The type of the employee',
        example: "JUNIOR"
    })
    @IsString()
    @IsEnum(EmployeeType)
    employee_type: "JUNIOR" | "SENIOR"

    @ApiProperty({
        description: 'The region id of the employee',
        example: 1
    })
    @IsNumber()
    region_id: number

    @IsNumber()
    district_id: number

    @IsNumber()
    user_id: number
}
