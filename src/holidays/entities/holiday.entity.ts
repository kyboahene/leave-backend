import { Division } from '@prisma/client';
import { ApiProperty } from "@nestjs/swagger";

export class Holiday {
    @ApiProperty({
        description: 'The id of the holiday',
        example: 1
    })
    id: number

    @ApiProperty({
        description: 'The id of the holiday',
        example: 1
    })
    holiday: Date

    @ApiProperty({
        description: 'The division the holiday was created',
        example: "BOD"
    })
    division: Division

    @ApiProperty({
        description: 'The date and time the holiday details was last updated',
        example: "2020-18-01"
    })
    updated_at: Date

    @ApiProperty({
        description: 'The time and date the holiday was created',
        example: "2020-18-01"
    })
    created_at: Date
}
