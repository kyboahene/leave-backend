import * as argon from "argon2";
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) { }

  async hashPassword(password: string) {
    return await argon.hash(password);
  }

  async create(divisionId: number, createEmployeeDto: CreateEmployeeDto) {
    try {
      const hashedPassword = await this.hashPassword(createEmployeeDto.password);

      const employees = await this.prisma.user.create({
        data: {
          password: hashedPassword,
          name: createEmployeeDto.name,
          email: createEmployeeDto.email,
          employee: {
            create: {
              division_id: divisionId,
              hire_date: createEmployeeDto.hire_date,
              region_id: createEmployeeDto.district_id,
              district_id: createEmployeeDto.district_id,
              employee_type: createEmployeeDto.employee_type,
            }
          }
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
    try {
      const createDto = createEmployeeDto.map((dto: CreateEmployeeDto) => {
        return {
          password: "pass123",
          name: dto.name,
          email: dto.email,
          employee: {
            create: {
              division_id: divisionId,
              hire_date: dto.hire_date,
              region_id: dto.district_id,
              district_id: dto.district_id,
              employee_type: dto.employee_type,
            }
          }
        }
      })

      const employees = await this.prisma.user.createMany({
        data: createDto
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
