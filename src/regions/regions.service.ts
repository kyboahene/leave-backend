import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from '@/prisma/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) { }

  async create(divisionId: number, createRegionDto: CreateRegionDto) {
    try {
      const region = await this.prisma.region.create({
        data: {
          ...createRegionDto,
          division_id: divisionId
        },
      })

      return region
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException('Region already exists')
        }
      }
    }
  }

  findAll(divisionId: number) {
    return this.prisma.region.findMany({
      where: {
        division_id: divisionId
      }
    })
  }

  findOne(id: number) {
    return this.prisma.division.findUnique({ where: { id } });
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return this.prisma.division.update({
      where: { id },
      data: updateRegionDto
    })
  }

  remove(id: number) {
    return this.prisma.region.delete({ where: { id } })
  }
}
