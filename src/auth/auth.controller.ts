import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

import { AuthService } from './auth.service';
import { PurgedUser } from 'src/users/interfaces/user.interface';
import { LocalAuthGuard } from './guards/local.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest) {
    return this.authService.login(req.user as PurgedUser);
  }

  @Get('profile')
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }
}
