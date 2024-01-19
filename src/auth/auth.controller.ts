import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: ExpressRequest) {
    return req.user;
  }
}
