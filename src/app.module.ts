import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from './common/config';

import { HttpUsersModule } from './users/http-users.module';
import { TypeOrmFilter } from './filters/typeorm.filter';
import { HttpAuthModule } from './auth/http-auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: config.database.type as any,
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      synchronize: true,
      autoLoadEntities: true
    }),
    AuthModule,
    HttpUsersModule,
    HttpAuthModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeOrmFilter
    }
  ],
  controllers: [AuthController]
})
export class AppModule {}
