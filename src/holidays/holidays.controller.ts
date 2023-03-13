import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtGuard } from '@/auth/guard';
import { GetUser } from '@/auth/decorator';
import { Holiday } from './entities/holiday.entity';
import { HolidaysService } from './holidays.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';

@ApiTags('Holiday')
@Controller('holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) { }

  @ApiProperty({
    description: 'Returns the created holiday object as response',
    example: Holiday
  })
  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser('division_id') divisionId: number, @Body() createHolidayDto: CreateHolidayDto) {
    return this.holidaysService.create(divisionId, createHolidayDto);
  }

  @ApiProperty({
    description: 'Returns an array of holiday objects as response',
    example: [Holiday]
  })
  @UseGuards(JwtGuard)
  @Get()
  findAll(@GetUser('division_id') divisionId: number) {
    return this.holidaysService.findAll(divisionId);
  }

  @ApiProperty({
    description: 'Returns a holiday object as response',
    example: Holiday
  })
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holidaysService.findOne(+id);
  }

  @ApiProperty({
    description: 'Returns the updated holiday object as response',
    example: Holiday
  })
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHolidayDto: UpdateHolidayDto) {
    return this.holidaysService.update(+id, updateHolidayDto);
  }

  @ApiProperty({
    description: 'Returns a successful message',
    example: "Holiday was deleted successfully"
  })
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holidaysService.remove(+id);
  }
}
