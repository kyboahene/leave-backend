import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class AuthDto {
    @ApiProperty({
        description: 'The name of the user',
        example: "John Doe"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        description: "The email address of the user",
        example: "john.doe@gmail.com"
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: "The password of the user",
        example: "pass@123"
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @IsNotEmpty()
    role_id: number;
}