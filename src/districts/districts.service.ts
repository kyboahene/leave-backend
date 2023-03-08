import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import { PrismaService } from "@/prisma/prisma.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";

@Injectable()
export class DistrictsService {
  constructor(private prisma: PrismaService) { }

  async create(createDistrictDto: CreateDistrictDto) {
    try {
      const district = await this.prisma.district.create({
        data: createDistrictDto,
      });

      return district;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException("Region already exists");
        }
      }
    }
  }

  findAll(divisionId: number) {
    return this.prisma.district.findMany({
      where: {
        region: {
          division_id: divisionId,
        },
      },
      include: {
        region: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.district.findUnique({
      where: { id },
      include: { region: true },
    });
  }

  update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return this.prisma.district.update({
      where: { id },
      data: updateDistrictDto,
    });
  }

  remove(id: number) {
    return this.prisma.district.delete({ where: { id } });
  }
}
