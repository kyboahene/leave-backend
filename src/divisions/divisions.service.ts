import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { CreateDivisionDto, UpdateDivisionDto } from './dto';

@Injectable()
export class DivisionsService {
  constructor(private prisma: PrismaService) { }

  async create(createDivisionDto: CreateDivisionDto) {
    try {
      const division = await this.prisma.division.create({
        data: createDivisionDto
      })

      return division
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException('Role already exists')
        }
      }
    }
  }

  findAll() {
    return this.prisma.division.findMany()
  }

  findOne(id: number) {
    try {
      return this.prisma.division.findUnique({ where: { id } })
    } catch (error) {
      throw new Error(error)
    }
  }

  update(id: number, updateDivisionDto: UpdateDivisionDto) {
    try {
      return this.prisma.division.update({
        where: { id },
        data: updateDivisionDto
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  remove(id: number) {
    try {
      return this.prisma.division.delete({ where: { id } })
    } catch (error) {
      throw new Error(error)
    }
  }
}
