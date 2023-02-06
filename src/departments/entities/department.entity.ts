import { ApiProperty } from "@nestjs/swagger";

export class Department {
    @ApiProperty({
        description: 'The id of the department',
        example: 1
    })
    id: number

    @ApiProperty({
        description: 'The name of the department',
        example: "Finance"
    })
    name: string
}
