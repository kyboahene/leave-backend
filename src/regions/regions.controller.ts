import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@/auth/guard';
import { GetUser } from '@/auth/decorator';
import { RegionsService } from './regions.service';
import { CreateRegionDto, UpdateRegionDto } from './dto';
import { Region } from './entities/region.entity';

@ApiTags('Region')
@Controller('regions')
export class RegionsController {
  constructor(private regionsService: RegionsService) { }

  @UseGuards(JwtGuard)
  @Post()
  @ApiCreatedResponse({
    description: "Created region object as response",
    type: Region
  })
  @ApiBadRequestResponse({
    description: 'Region cannot be created. Try again!'
  })
  create(@GetUser('division_id') divisionId: number, @Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(divisionId, createRegionDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  @ApiCreatedResponse({
    description: "Returned an array of region object(s) as response",
    type: [Region]
  })
  @ApiBadRequestResponse({
    description: 'Region cannot be created. Try again!'
  })
  findAll(@GetUser('division_id') divisionId: number) {
    return this.regionsService.findAll(divisionId);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
