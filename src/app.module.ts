import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthModule } from "./auth/auth.module";
import { RolesModule } from './roles/roles.module';
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { DivisionsModule } from './divisions/divisions.module';
import { EmployeesModule } from "./employees/employees.module";
import { DepartmentsModule } from './departments/departments.module';
import { RegionsModule } from './regions/regions.module';
import { DistrictsModule } from './districts/districts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    PrismaModule,
    EmployeesModule,
    DivisionsModule,
    DepartmentsModule,
    RegionsModule,
    DistrictsModule,
    CommentsModule,
  ],
})
export class AppModule { }
