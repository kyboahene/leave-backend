import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { CreateRoleDto, UpdateRoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) { }

  async create(createRoleDto: CreateRoleDto) {
    try {
      const roles = await this.prisma.role.create({
        data: createRoleDto
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

  findAll() {
    return this.prisma.role.findMany()
  }

  findOne(id: number) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  remove(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
