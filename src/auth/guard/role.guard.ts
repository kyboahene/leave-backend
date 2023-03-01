import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private prisma: PrismaService) { }

    matchRoles(roles: { name: string }[], userRole: string) {
        return roles.some(role => role.name === userRole)
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // const roles = this.reflector.get<string[]>('roles', context.getHandler())
        const roles = await this.prisma.role.findMany({
            select: { name: true }
        })

        if (roles) return true

        const request = context.switchToHttp().getRequest()
        const user = request.user
        return this.matchRoles(roles, user.role)
    }
}