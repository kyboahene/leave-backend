import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtGuard } from '@/auth/guard';
import { GetUser } from '@/auth/decorator';
import { Employee } from './entities/employee.entity';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@ApiTags('Employee')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @UseGuards(JwtGuard)
  @Post()
  @ApiCreatedResponse({
    description: "Created employee object as response",
    type: Employee
  })
  @ApiBadRequestResponse({
    description: 'Employee cannot be created. Try again!'
  })
  create(@GetUser('division_id') divisionId: number, @Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(divisionId, createEmployeeDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  @ApiCreatedResponse({
    description: "Created an array of employee object(s) as response",
    type: [Employee]
  })
  @ApiBadRequestResponse({
    description: 'Employees cannot be retrieved. Try again!'
  })
  findAll(@GetUser('division_id') divisionId: number) {
    return this.employeesService.findAll(divisionId);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
