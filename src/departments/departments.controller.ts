import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@/auth/guard';
import { GetUser } from '@/auth/decorator';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) { }

  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser('division_id') divisionId: number, @Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(divisionId, createDepartmentDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAll(@GetUser('division_id') divisionId: number) {
    return this.departmentsService.findAll(divisionId);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.departmentsService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.departmentsService.remove(+id);
  }
}
