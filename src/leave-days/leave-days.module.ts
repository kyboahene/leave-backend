import { Module } from '@nestjs/common';
import { LeaveDaysService } from './leave-days.service';
import { LeaveDaysController } from './leave-days.controller';

@Module({
  controllers: [LeaveDaysController],
  providers: [LeaveDaysService]
})
export class LeaveDaysModule {}
