import { GetUser } from '@/auth/decorator';
import { JwtGuard } from '@/auth/guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './entities/district.entity';

@ApiTags('District')
@Controller('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) { }
  @ApiCreatedResponse({
    description: "Creates district object as response",
    type: District
  })
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtsService.create(createDistrictDto);
  }

  @ApiCreatedResponse({
    description: "Returns an array of district object(s) as response",
    type: [District]
  })
  @UseGuards(JwtGuard)
  @Get()
  findAll(@GetUser('division_id') divisionId: number) {
    return this.districtsService.findAll(divisionId);
  }

  @ApiCreatedResponse({
    description: "Returns a district object as response",
    type: District
  })
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtsService.findOne(+id);
  }

  @ApiCreatedResponse({
    description: "Returns the updated district object as response",
    type: District
  })
  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDistrictDto: UpdateDistrictDto) {
    return this.districtsService.update(+id, updateDistrictDto);
  }

  @ApiCreatedResponse({
    description: "Returns a successful message",
    type: "District deleted successful"
  })
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtsService.remove(+id);
  }
}
