import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  private purgeUser(user: User): Omit<User, 'password'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...purgedUser } = user;
    return purgedUser;
  }

  async validateUserLocal(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      return this.purgeUser(user);
    }

    return null;
  }

  async validateUserJwt(payload: any): Promise<Omit<User, 'password'> | null> {
    const id = payload.sub;
    const email = payload.username;
    const user = await this.usersService.findById(id);

    if (user && user.email === email) {
      return this.purgeUser(user);
    }

    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { username: user.email, sub: user.id };
    return {
      user,
      token: this.jwtService.sign(payload)
    };
  }
}
