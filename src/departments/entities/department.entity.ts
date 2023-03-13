import { ApiProperty } from "@nestjs/swagger";
import { Division } from "@prisma/client";

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

    @ApiProperty({
        description: "The division of the department",
        example: 1
    })
    division: Division
}
