import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    findAll(divisionId: number) {
        return this.prisma.user.findMany({
            where: {
                employee: {
                    division_id: divisionId
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                role_id: true,
                employee: true,

            }
        })
    }

    findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    update(id: number, data: UserDto) {
        return this.prisma.user.update({ where: { id }, data });
    }

    remove(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
