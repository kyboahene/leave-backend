import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import {
    Injectable,
    ForbiddenException,
    BadRequestException,
} from "@nestjs/common";

import { AuthDto, LoginDto } from "@/auth/dto";
import { User } from "@/users/entities/user.entity";
import { PrismaService } from "../prisma/prisma.service";
import { SendResetEmailDto } from "./dto/send-email.dto";
import { PasswordResetDto } from "./dto/password-reset.dto";

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService,
        private config: ConfigService
    ) { }

    async signup(dto: AuthDto) {
        const hashedPassword = await argon.hash(dto.password);

        try {
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: hashedPassword,
                },
            });
            delete user.password;

            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("User already exists");
                }
            }

            throw error;
        }
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
            include: {
                employee: {
                    select: {
                        division_id: true,
                    },
                },
            },
        });
        if (!user) throw new ForbiddenException("Wrong email/password");

        const matches = await argon.verify(user.password, dto.password);
        if (!matches) throw new ForbiddenException("Wrong email/password");

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            division_id: user.employee.division_id,
        };

        const accessToken = await this.signToken(userData, "3h");

        delete user.password
        delete user.employee

        return {
            ...user,
            accessToken,
        };
    }

    async sendEmail(email: SendResetEmailDto) {
        const user = await this.prisma.user.findUnique({
            where: email,
        });

        if (!user) throw new BadRequestException("Invalid email");

        const token = await this.signToken(user, "10m");
        const resetPasswordUrl = `${this.config.get("BASE_URL")}:${this.config.get(
            "PORT"
        )}/auth/resetPassword?token=${token}`;

        return {
            url: resetPasswordUrl,
        };
    }

    async resetPassword(token: string, passwordResetDto: PasswordResetDto) {
        if (passwordResetDto.password !== passwordResetDto.confirmPassword)
            throw new BadRequestException("Passwords are not the same.");

        const user = await this.verifyToken(token);

        if (!user) throw new ForbiddenException("Incorrect token");

        const hashedPassword = await argon.hash(passwordResetDto.password);

        await this.prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });

        return {
            message: "Password reset successfully",
        };
    }

    signToken(
        data: { id: number; name: string; email: string; division_id?: number },
        duration: string
    ): Promise<string> {
        return this.jwt.signAsync(data, {
            expiresIn: duration,
            secret: this.config.get("JWT_SECRET"),
        });
    }

    verifyToken(token: string): Promise<User> {
        return this.jwt.verifyAsync(token, {
            secret: this.config.get("JWT_SECRET"),
        });
    }
}
