import dayjs from "dayjs";
import { EmployeeType, LeaveType } from "@prisma/client";
import { Injectable, ForbiddenException } from "@nestjs/common";
import { AuthenticatedUser } from "@/auth/entities/authenticated-user.entity";
import { LeaveStatus } from "@prisma/client";
import { PrismaService } from "@/prisma/prisma.service";
import { CreateLeaveDto } from "./dto/create-leave.dto";
import { UpdateLeaveDto } from "./dto/update-leave.dto";
import { Leave } from "./entities/leave.entity";

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) { }

  async create(user: AuthenticatedUser, createLeaveDto: CreateLeaveDto) {
    let annualLeave: Leave[] = []
    let leaveDays = 0;
    const travelingDays = 2;
    const year = new Date().getFullYear()


    // check for a request for annual leave for the year
    if (createLeaveDto.leave_type !== LeaveType.ANNUAL) {
      annualLeave = await this.prisma.leave.findMany({
        where: {
          leave_type: LeaveType.ANNUAL,
          created_at: {
            lte: new Date(`${year}-12-31`),
            gte: new Date(`${year}-01-01`)
          }
        }
      })

      if (annualLeave.length < 1)
        throw new ForbiddenException(
          "You have not requested for an annual leave for the year yet."
        );
    }


    // check whether previous request has been approved
    const prevLeave = await this.prisma.leave.findMany({
      where: {
        employee_id: user?.employee_id,
      },
      orderBy: { created_at: "asc" }
    });

    if (prevLeave[0].status !== LeaveStatus.DIRECTOR_APPROVE)
      throw new ForbiddenException(
        "Your previous leave request is still in approval process."
      );


    switch (createLeaveDto.leave_type) {
      case LeaveType.ANNUAL:
        if (user.employee_type === EmployeeType.JUNIOR) {
          const duration = dayjs(new Date()).year() - dayjs(user.hire_date).year();
          switch (true) {
            case duration < 3:
              leaveDays = 24 + travelingDays;
              break;
            case duration === 4 || duration === 5:
              leaveDays = 28 + travelingDays;
              break;

            case duration >= 6 || duration <= 10:
              leaveDays = 29 + travelingDays;
              break;
            default:
              leaveDays = 36 + travelingDays;
              break;
          }
        }

        if (user.employee_type === EmployeeType.SENIOR)
          leaveDays = 36 + travelingDays;
        break;
      case LeaveType.CASUAL:
        if (createLeaveDto.no_of_days > 5)
          throw new ForbiddenException('Please you can not request for more than 5 days.')

        // check the exhaustion of the requested annual leave for the year
        const requestedAnnual = annualLeave.find((leave: Leave) => leave.status === LeaveStatus.DIRECTOR_APPROVE)

        // const annualLeave = await this.prisma.leave.findMany({
        //   where: {
        //     leave_type: LeaveType.ANNUAL,
        //     status: LeaveStatus.DIRECTOR_APPROVE,
        //     created_at: {
        //       lte: new Date(`${year}-12-31`),
        //       gte: new Date(`${year}-01-01`)
        //     }
        //   }
        // })
        break

      case LeaveType.MATERNITY:
        leaveDays = 90
        break

      case LeaveType.PART:
        if (createLeaveDto.no_of_days > 5)
          throw new ForbiddenException('Please you can not request for more than 5 days.')

      default:
        leaveDays = createLeaveDto.no_of_days
        break;
    }



    const newLeave = await this.prisma.leave.create({
      data: {
        leave_type: createLeaveDto.leave_type,
        employee_id: user.employee_id,
        no_of_days: leaveDays,
        start_date: createLeaveDto.startDate,
        comment: {
          create: {
            body: createLeaveDto.comment,
            employee_id: user.employee_id,
          },
        },
      },
    });

    return newLeave;
  }

  findAll(divisionId: number) {
    return this.prisma.leave.findMany({
      where: { employee: { division_id: divisionId } },
    });
  }

  findOne(id: number) {
    return this.prisma.leave.findUnique({ where: { id } })
  }

  update(id: number, updateLeaveDto: UpdateLeaveDto) {
    return this.prisma.leave.update({ where: { id }, data: updateLeaveDto })
  }

  remove(id: number) {
    return this.prisma.leave.delete({ where: { id } });
  }
}
