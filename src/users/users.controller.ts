import { User } from '@prisma/client';
import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { Roles } from '@/auth/decorator/role.decorator';
import { RoleGuard } from '@/auth/guard/role.guard';

@ApiTags('User')
@Controller('user')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Roles([6])
    @UseGuards(JwtGuard, RoleGuard)
    @Get()
    @ApiCreatedResponse({
        description: "Returns an array of user objects as response",
    })
    @ApiBadRequestResponse({
        description: 'Users cannot be retrieved. Try again!'
    })
    getUsers(@GetUser('division_id') divisionId: number) {
        this.userService.findAll(divisionId)
    }


    @UseGuards(JwtGuard)
    @Get("/me")
    @ApiCreatedResponse({
        description: "Created user object as response",
    })
    @ApiBadRequestResponse({
        description: 'User cannot be retrieved. Try again!'
    })
    getUser(@GetUser() user: User) {
        return user
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() userDto: UserDto) {
        return this.userService.update(+id, userDto);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
