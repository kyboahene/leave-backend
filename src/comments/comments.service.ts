import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) { }

  async create(employeeId: number, createCommentDto: CreateCommentDto) {
    const comments = await this.prisma.comment.create({
      data: {
        body: createCommentDto.body,
        employee_id: employeeId,
        leave_id: 1,
      }
    })
    return comments;
  }

  findAll() {
    return this.prisma.comment.findMany({});
  }

  findOne(id: number) {
    return this.prisma.comment.findMany({ where: { id } });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto
    });
  }

  remove(id: number) {
    return this.prisma.comment.delete({ where: { id } })
  }
}
