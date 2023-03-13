import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateDistrictDto {
    @ApiProperty({
        description: "The name of the district",
        example: "Asikuma"
    })
    @IsString()
    name: string

    @ApiProperty({
        description: "The id of the region in which the district is found",
        example: 1
    })
    @IsNumber()
    region_id: number
}
