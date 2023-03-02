import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateLeaveDayDto } from './dto/create-leave-day.dto';
import { UpdateLeaveDayDto } from './dto/update-leave-day.dto';

@Injectable()
export class LeaveDaysService {
  constructor(private prisma: PrismaService) { }

  async create(createLeaveDayDto: CreateLeaveDayDto) {
    const leaveDay = await this.prisma.leaveDays.create({
      data: createLeaveDayDto
    })

    return leaveDay
  }

  findByLeaveId(id: number) {
    return this.prisma.leaveDays.findMany({
      where: {
        leave_id: id
      }
    })
  }

  findAll() {
    return this.prisma.leaveDays.findMany({})
  }

  findOne(id: number) {
    return this.prisma.leaveDays.findUnique({ where: { id } })
  }

  update(id: number, updateLeaveDayDto: UpdateLeaveDayDto) {
    return this.prisma.leaveDays.update({ where: { id }, data: updateLeaveDayDto })
  }

  remove(id: number) {
    return this.prisma.leaveDays.delete({ where: { id } })
  }
}
