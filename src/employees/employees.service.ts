import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) { }

  async create(divisionId: number, createEmployeeDto: CreateEmployeeDto) {
    try {
      const employees = await this.prisma.employee.create({
        data: {
          ...createEmployeeDto,
          division_id: divisionId
        }
      })

      return employees
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException('Employee already exists')
        }
      }

      throw new Error(error)
    }
  }

  async createMany(divisionId: number, createEmployeeDto: CreateEmployeeDto[]) {
    const employeeDto = createEmployeeDto.map((dto) => {
      return {
        ...dto,
        division_id: divisionId
      }
    })

    try {
      const employees = await this.prisma.employee.createMany({
        data: employeeDto
      })

      return employees
    } catch (error) {
      throw new Error(error)
    }
  }

  findAll(divisionId: number) {
    try {
      return this.prisma.employee.findMany({
        where: {
          division_id: divisionId
        }
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.employee.findUnique({
        where: { id }
      });
    } catch (error) {
      throw new Error(error)
    }
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      return this.prisma.employee.update({
        where: { id },
        data: updateEmployeeDto,
      });
    } catch (error) {
      throw new Error(error)
    }
  }

  remove(id: number) {
    try {
      return this.prisma.employee.delete({ where: { id } });
    } catch (error) {
      throw new Error(error)
    }
  }
}
