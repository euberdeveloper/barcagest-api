import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
