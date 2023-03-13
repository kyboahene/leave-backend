import { ApiProperty } from "@nestjs/swagger";
import { EmployeeType } from "@prisma/client";
import { User } from "@/users/entities/user.entity";
import { District } from "@/districts/entities/district.entity";
import { Division } from "@/divisions/entities/division.entity";

export class Employee {
    @ApiProperty({
        description: 'The id of the employee',
        example: 1
    })
    id: number

    @ApiProperty({
        description: 'The date the employee was hired',
        example: '2010-08-20'
    })
    hire_date: Date

    @ApiProperty({
        description: 'The type of the employee',
        example: EmployeeType
    })
    employee_type: EmployeeType

    @ApiProperty({
        description: 'The division of the employee',
        example: Division
    })
    division: Division

    @ApiProperty({
        description: 'The district of the employee',
        example: District
    })
    district: District


    @ApiProperty({
        description: 'The user details of the employee',
        example: District
    })
    user: User

    @ApiProperty({
        description: 'The date and time the employee details was last updated',
        example: "2020-18-01"
    })
    updated_at: Date

    @ApiProperty({
        description: 'The time and date the employee was created',
        example: "2020-18-01"
    })
    created_at: Date
}
