import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDivisionDto {
    @ApiProperty({
        description: 'The name of the division',
        example: "BOD"
    })
    @IsString()
    name: string
}
