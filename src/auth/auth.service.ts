import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { AuthDto, LoginDto } from '@/auth/dto';
import { User } from '@/interfaces/user.interface';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async signup(dto: AuthDto) {
        const hashedPassword = await argon.hash(dto.password)

        try {
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: hashedPassword,
                }
            })
            delete user.password

            return user
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException('User already exists')
                }
            }
        }
    }

    async login(dto: LoginDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            })
            if (!user)
                throw new ForbiddenException('Wrong email/password')


            const matches = await argon.verify(user.password, dto.password)
            if (!matches)
                throw new ForbiddenException('Wrong email/password')

            delete user.password

            const accessToken = await this.signToken(user)

            return {
                ...user,
                accessToken
            }
        } catch (error) {
            throw new ForbiddenException(error)
        }
    }

    signToken(data: User): Promise<string> {
        return this.jwt.signAsync(data, {
            expiresIn: '1h',
            secret: this.config.get('JWT_SECRET')
        })
    }
}
