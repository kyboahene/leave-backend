import { Controller, Get, UseGuards, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';


import { JwtGuard } from '@/auth/guard';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dto';

@ApiTags('Role')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) { }

  // @UseGuards(JwtGuard)
  @Post()
  @ApiCreatedResponse({
    description: "Created role object as response",
    type: Role
  })
  @ApiBadRequestResponse({
    description: 'Role cannot be created. Try again!'
  })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  // @UseGuards(JwtGuard)
  @Get()
  @ApiCreatedResponse({
    description: "Returns an array of role object(s)",
    type: [Role]
  })
  @ApiBadRequestResponse({
    description: 'Roles cannot be retrieved. Try again!'
  })
  findAll() {
    return this.rolesService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.rolesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  // @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.rolesService.remove(+id);
  }
}
