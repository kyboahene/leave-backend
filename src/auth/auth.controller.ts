import { SendResetEmailDto } from './dto/send-email.dto';
import { Controller, Post, Body, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

import { AuthDto, LoginDto } from './dto';
import { AuthService } from './auth.service';
import { PasswordResetDto } from './dto/password-reset.dto';

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
        return this.authService.login(dto);
    }

    @Post('/sendEmail')
    sendResetEmail(@Body() email: SendResetEmailDto) {
        return this.authService.sendEmail(email)
    }

    @Post('resetPassword')
    resetPassword(@Query('token') token: string, @Body() passwordResetDto: PasswordResetDto) {
        return this.authService.resetPassword(token, passwordResetDto)
    }
}
