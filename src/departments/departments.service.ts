import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from '@/prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) { }

  async create(divisionId: number, createDepartmentDto: CreateDepartmentDto) {
    try {
      const roles = await this.prisma.department.create({
        data: {
          ...createDepartmentDto,
          division_id: divisionId
        }
      })

      return roles
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException('Role already exists')
        }
      }
    }
  }

  findAll(divisionId: number) {
    try {
      return this.prisma.department.findMany({
        where: {
          division_id: divisionId
        },
        include: {
          division: {
            select: {
              id: true,
              name: true
            }
          }
        }
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.department.findUnique({
        where: { id },
        include: {
          division: true
        }
      });
    } catch (error) {
      throw new Error(error)
    }
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      return this.prisma.department.update({
        where: { id },
        data: updateDepartmentDto,
      });
    } catch (error) {
      throw new Error(error)
    }
  }

  remove(id: number) {
    try {
      return this.prisma.department.delete({ where: { id } });
    } catch (error) {
      throw new Error(error)
    }
  }
}
