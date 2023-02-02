import { GetUser } from '@/auth/decorator';
import { JwtGuard } from '@/auth/guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {

    @UseGuards(JwtGuard)
    @Get("")
    getUser(@GetUser() user: User) {
        return user
    }

}
