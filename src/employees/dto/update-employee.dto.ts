import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto {
    @ApiProperty({
        description: 'The type of the employee',
        example: "JUNIOR"
    })
    @IsString()
    @IsOptional()
    employee_type: "JUNIOR" | "SENIOR"

    @ApiProperty({
        description: 'The region id of the employee',
        example: 1
    })
    @IsNumber()
    @IsOptional()
    region_id: number

    @ApiProperty({
        description: 'The district id of the employee',
        example: 1
    })
    @IsNumber()
    @IsOptional()
    district_id: number

}
