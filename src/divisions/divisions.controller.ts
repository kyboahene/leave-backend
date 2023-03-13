import { JwtGuard } from '@/auth/guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { Division } from './entities/division.entity';
import { DivisionsService } from './divisions.service';
import { CreateDivisionDto, UpdateDivisionDto } from './dto';

@ApiTags('Division')
@Controller('divisions')
export class DivisionsController {
  constructor(private readonly divisionsService: DivisionsService) { }

  @ApiCreatedResponse({
    description: 'Returns the created division object as response',
    type: Division
  })
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createDivisionDto: CreateDivisionDto) {
    return this.divisionsService.create(createDivisionDto);
  }

  @ApiCreatedResponse({
    description: 'Returns an array of division object(s) as response',
    type: [Division]
  })
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.divisionsService.findAll();
  }

  @ApiCreatedResponse({
    description: 'Returns a division object as response',
    type: Division
  })
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.divisionsService.findOne(+id);
  }

  @ApiCreatedResponse({
    description: 'Returns the updated division object as response',
    type: Division
  })
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDivisionDto: UpdateDivisionDto) {
    return this.divisionsService.update(+id, updateDivisionDto);
  }

  @ApiCreatedResponse({
    description: 'Returns a successful message',
    type: "Division was deleted successfully"
  })
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.divisionsService.remove(+id);
  }
}
