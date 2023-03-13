import { Region } from "@/regions/entities/region.entity";
import { ApiProperty } from "@nestjs/swagger";

export class District {
    @ApiProperty({
        description: 'The id of the district',
        example: 1
    })
    id: number

    @ApiProperty({
        description: 'The name of the district',
        example: "John Doe"
    })
    name: string

    @ApiProperty({
        description: 'The region of the district',
        example: "Central"
    })
    region: Region

    @ApiProperty({
        description: 'The date and time the district details was last updated',
        example: "2020-18-01"
    })
    updated_at: Date

    @ApiProperty({
        description: 'The time and date the district was created',
        example: "2020-18-01"
    })
    created_at: Date
}
