import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from '@/prisma/prisma.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';

@Injectable()
export class HolidaysService {
  constructor(private prisma: PrismaService) { }

  async create(divisionId: number, createHolidayDto: CreateHolidayDto) {
    try {
      const holidays = await this.prisma.holiday.create({
        data: {
          ...createHolidayDto,
          division_id: divisionId
        }
      })

      return holidays
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException('Employee already exists')
        }
      }

      throw new Error(error)
    }
  }

  findAll(divisionId: number) {
    return this.prisma.holiday.findMany({
      where: {
        division_id: divisionId
      }
    })
  }

  findOne(id: number) {
    return this.prisma.holiday.findUnique({
      where: { id }
    });
  }

  update(id: number, updateHolidayDto: UpdateHolidayDto) {
    return this.prisma.holiday.update({
      where: { id },
      data: updateHolidayDto,
    });
  }

  remove(id: number) {
    return this.prisma.holiday.delete({ where: { id } });
  }
}
