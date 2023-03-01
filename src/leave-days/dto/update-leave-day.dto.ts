import { PartialType } from '@nestjs/swagger';
import { CreateLeaveDayDto } from './create-leave-day.dto';

export class UpdateLeaveDayDto extends PartialType(CreateLeaveDayDto) {}
