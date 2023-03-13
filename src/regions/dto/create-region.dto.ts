import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRegionDto {
    @ApiProperty({
        description: 'The name of the region',
        example: "Accra"
    })
    @IsString()
    name: string
}
