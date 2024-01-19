import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';

import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

import config from '../common/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: config.security.jwt.secret,
      signOptions: {
        expiresIn: config.security.jwt.expiresIn,
        issuer: config.security.jwt.issuer
      }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
