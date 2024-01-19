import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { PurgedUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUserLocal(email: string, password: string) {
    const user = await this.usersService.findByCredentials(email, password);
    if (user) {
      return user;
    }
    return null;
  }

  async validateUserJwt(payload: any): Promise<PurgedUser | null> {
    const id = payload.sub;
    const email = payload.username;
    const user = await this.usersService.findById(id);

    if (user && user.email === email) {
      return user;
    }

    return null;
  }

  async login(user: PurgedUser) {
    const payload = { username: user.email, sub: user.id };
    return {
      user,
      token: this.jwtService.sign(payload)
    };
  }
}
