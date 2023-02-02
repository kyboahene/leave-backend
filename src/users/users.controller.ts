import { User } from '@prisma/client';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@ApiTags('User')
@Controller('user')
export class UsersController {

    @UseGuards(JwtGuard)
    @Get("")
    @ApiCreatedResponse({
        description: "Created user object as response",
    })
    @ApiBadRequestResponse({
        description: 'User cannot be retrieved. Try again!'
    })
    getUser(@GetUser() user: User) {
        return user
    }

}
