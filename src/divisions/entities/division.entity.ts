import { ApiProperty } from "@nestjs/swagger"

export class Division {
    @ApiProperty({
        description: 'The id of the division',
        example: 1
    })
    id: number

    @ApiProperty({
        description: 'The name of the division',
        example: "BOD"
    })
    name: string

    @ApiProperty({
        description: 'The date and time the division details was last updated',
        example: "2020-18-01"
    })
    updated_at: Date

    @ApiProperty({
        description: 'The time and date the division was created',
        example: "2020-18-01"
    })
    created_at: Date
}
