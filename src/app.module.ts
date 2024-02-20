import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from 'nestjs-prisma';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { CustomersModule } from './customers/customers.module';

import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { AuthorizationGuard } from './auth/guards/authorization.guard';

@Module({
    imports: [
        PrismaModule.forRoot({
            isGlobal: true
        }),
        AuthModule,
        RolesModule,
        UsersModule,
        CustomersModule
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: AuthorizationGuard
        }
    ]
})
export class AppModule {}
