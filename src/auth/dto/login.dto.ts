import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator'

export class LoginDto {
    @ApiProperty({
        description: 'The email of the user',
        example: 'john.doe@gmail.com'
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'pass@123'
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}