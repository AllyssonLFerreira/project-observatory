import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthToken, UserPayload } from './models/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
    throw new Error('Email or Password provided is incorret');
  }

  async login(user: UserEntity): Promise<AuthToken> {
    const payload: UserPayload = {
      sub: user.user_id,
      name: user.name,
      email: user.email,
      username: user.username,
      birthday: user.birthday,
    };

    const generateJwt = await this.jwtService.sign(payload);

    return {
      access_token: generateJwt,
    };
  }
}
