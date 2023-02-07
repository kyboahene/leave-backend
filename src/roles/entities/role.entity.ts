import { ApiProperty } from '@nestjs/swagger';

export class Role {
    @ApiProperty({
        description: 'The id of the role',
        example: 1
    })
    id: number

    @ApiProperty({
        description: 'The name of the role',
        example: "Super Admin"
    })
    name: string

    @ApiProperty({
        description: 'The access level of the role',
        example: 6
    })
    access_level: number

    @ApiProperty({
        description: 'The date and time it was created',
        example: ''
    })
    created_at: Date

    @ApiProperty({
        description: 'The date and time it was updated',
        example: ''
    })
    updated_at: Date
}
