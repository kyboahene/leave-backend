import { ApiProperty } from "@nestjs/swagger";
import { EmployeeType } from "@prisma/client";
import { IsString, IsNotEmpty, IsEnum, IsNumber, IsDate } from "class-validator";

export class CreateEmployeeDto {
    @ApiProperty({
        description: 'The name of the employee',
        example: "John Doe"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: 'The email of the employee',
        example: "john.doe@mailinator.com"
    })
    @IsString()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: 'The password of the employee',
        example: "pass123"
    })
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({
        description: 'The hire date of the employee',
        example: ""
    })
    @IsDate()
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
    @IsNotEmpty()
    region_id: number

    @ApiProperty({
        description: 'The district id of the employee',
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    district_id: number


    @ApiProperty({
        description: 'The department id of the employee',
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    dept_id: number
}
