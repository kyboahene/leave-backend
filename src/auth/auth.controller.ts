import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthDto, LoginDto } from './dto';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @ApiCreatedResponse({
        description: "Created user object as response",
    })
    @ApiBadRequestResponse({
        description: 'User cannot be registered. Try again!'
    })
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiCreatedResponse({
        description: "Receives user object as response",
    })
    @ApiBadRequestResponse({
        description: 'User cannot login. Try again!'
    })
    login(@Body() dto: LoginDto) {
        this.authService.login(dto);
    }
}
