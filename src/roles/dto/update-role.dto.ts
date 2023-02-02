import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsNumber, IsNotEmpty } from 'class-validator'

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @ApiProperty({
        description: 'The id of the role',
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    role_id: number
}
