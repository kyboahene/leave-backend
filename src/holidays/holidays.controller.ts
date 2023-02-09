import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtGuard } from '@/auth/guard';
import { GetUser } from '@/auth/decorator';
import { HolidaysService } from './holidays.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';

@Controller('holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) { }

  @Post()
  @UseGuards(JwtGuard)
  create(@GetUser('division_id') divisionId: number, @Body() createHolidayDto: CreateHolidayDto) {
    return this.holidaysService.create(divisionId, createHolidayDto);
  }

  @Get()
  findAll(@GetUser('division_id') divisionId: number) {
    return this.holidaysService.findAll(divisionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holidaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHolidayDto: UpdateHolidayDto) {
    return this.holidaysService.update(+id, updateHolidayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holidaysService.remove(+id);
  }
}
