import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaveDaysService } from './leave-days.service';
import { CreateLeaveDayDto } from './dto/create-leave-day.dto';
import { UpdateLeaveDayDto } from './dto/update-leave-day.dto';

@Controller('leave-days')
export class LeaveDaysController {
  constructor(private readonly leaveDaysService: LeaveDaysService) {}

  @Post()
  create(@Body() createLeaveDayDto: CreateLeaveDayDto) {
    return this.leaveDaysService.create(createLeaveDayDto);
  }

  @Get()
  findAll() {
    return this.leaveDaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveDaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveDayDto: UpdateLeaveDayDto) {
    return this.leaveDaysService.update(+id, updateLeaveDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveDaysService.remove(+id);
  }
}
