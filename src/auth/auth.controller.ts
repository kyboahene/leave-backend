import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthDto, LoginDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto: LoginDto) {
        this.authService.login(dto);
    }
}
