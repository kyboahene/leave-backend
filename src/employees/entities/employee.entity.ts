import { ApiProperty } from "@nestjs/swagger";

export class Employee {
    @ApiProperty({
        description: 'The id of the employee',
        example: 1
    })
    id: number

    @ApiProperty({
        description: 'The date the employee was hired',
        example: ''
    })
    hire_date: Date
}
