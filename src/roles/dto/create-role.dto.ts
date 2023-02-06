import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class CreateRoleDto {
    @ApiProperty({
        description: 'The name of the role',
        example: "Super Admin"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: 'The access level of the role',
        example: 6
    })
    @IsNumber()
    @IsNotEmpty()
    access_level: number
}
