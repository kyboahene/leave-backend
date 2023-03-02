import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtGuard } from '@/auth/guard';
import { GetUser } from '@/auth/decorator';
import { HolidaysService } from './holidays.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';

@Controller('holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) { }


  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser('division_id') divisionId: number, @Body() createHolidayDto: CreateHolidayDto) {
    return this.holidaysService.create(divisionId, createHolidayDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@GetUser('division_id') divisionId: number) {
    return this.holidaysService.findAll(divisionId);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holidaysService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHolidayDto: UpdateHolidayDto) {
    return this.holidaysService.update(+id, updateHolidayDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holidaysService.remove(+id);
  }
}
