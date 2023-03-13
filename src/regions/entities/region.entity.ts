import { ApiProperty } from "@nestjs/swagger"
import { Division } from "@prisma/client"

export class Region {
    @ApiProperty({
        description: 'The id of the region',
        example: 1
    })
    id: number

    @ApiProperty({
        description: 'The name of the region',
        example: "Accra"
    })
    name: string

    @ApiProperty({
        description: 'The division the region was created',
        example: 1
    })
    division: Division

    @ApiProperty({
        description: 'The time and date the holiday was created',
        example: "2020-18-01"
    })
    created_at: Date

    @ApiProperty({
        description: 'The date and time the holiday details was last updated',
        example: "2020-18-01"
    })
    updated_at: Date
}
