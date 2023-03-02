import { PrismaService } from '@/prisma/prisma.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) { }

  matchRoles(roles: number[], userRole: number) {
    return roles.some(role => role === userRole)
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<number[]>('roles', context.getHandler())
    // const roles = this.prisma.role.findMany({
    //   select: { access_level: true }
    // }).then((data) => {
    //   return data
    // })

    if (roles) return true

    const request = context.switchToHttp().getRequest()
    const user = request.user
    return this.matchRoles(roles, user.access_level)
  }
}
