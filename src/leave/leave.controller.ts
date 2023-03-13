import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtGuard } from '@/auth/guard';
import { GetUser } from '@/auth/decorator';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { AuthenticatedUser } from '@/auth/entities/authenticated-user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Leave')
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) { }

  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser() user: AuthenticatedUser, @Body() createLeaveDto: CreateLeaveDto) {
    return this.leaveService.create(user, createLeaveDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@GetUser('division_id') divisionId: number) {
    return this.leaveService.findAll(divisionId);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto) {
    return this.leaveService.update(+id, updateLeaveDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveService.remove(+id);
  }
}
