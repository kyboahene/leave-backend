import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { PrismaService } from '@/prisma/prisma.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictsService {
  constructor(private prisma: PrismaService) { }

  async create(createDistrictDto: CreateDistrictDto) {

    try {
      const district = await this.prisma.district.create({
        data: createDistrictDto
      })


      return district;
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

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return this.prisma.division.update({
      where: { id },
      data: updateDistrictDto
    })
  }

  remove(id: number) {
    return this.prisma.region.delete({ where: { id } })
  }
}
