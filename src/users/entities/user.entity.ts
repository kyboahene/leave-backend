import { ApiProperty } from "@nestjs/swagger"

export class User {
    @ApiProperty({
        description: 'The id of the user',
        example: 1
    })
    id: number

    @ApiProperty({
        description: 'The name of the user',
        example: "John Doe"
    })
    name: string

    @ApiProperty({
        description: 'The email of the role',
        example: "john.doe@gmail.com"
    })
    email: string

    @ApiProperty({
        description: 'The date and time it was created',
        example: '2020-09-10'
    })
    created_at: Date

    @ApiProperty({
        description: 'The date and time it was updated recently',
        example: '2020-09-10'
    })
    updated_at: Date
}