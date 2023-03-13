import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtGuard } from '@/auth/guard';
import { GetUser } from '@/auth/decorator';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@ApiTags('Department')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) { }

  @ApiCreatedResponse({
    description: "Created department object as response",
    type: Department
  })
  @UseGuards(JwtGuard)
  @Post()
  create(@GetUser('division_id') divisionId: number, @Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(divisionId, createDepartmentDto);
  }

  @ApiCreatedResponse({
    description: "Returns an array of department object as response",
    type: [Department]
  })
  @UseGuards(JwtGuard)
  @Get()
  findAll(@GetUser('division_id') divisionId: number) {
    return this.departmentsService.findAll(divisionId);
  }

  @ApiCreatedResponse({
    description: "Returns a department object as response",
    type: Department
  })
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.departmentsService.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Returns the updated department object as response",
    type: Department
  })
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @ApiCreatedResponse({
    description: "Returns a successful message",
    type: "Department deleted successfully"
  })
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.departmentsService.remove(+id);
  }
}
