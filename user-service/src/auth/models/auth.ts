import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';

export class AuthRequest extends Request {
  user: UserEntity;
}

export interface UserPayload {
  sub: number;
  name: string;
  email: string;
  username: string;
  birthday: Date;
  iat?: number;
  exp?: number;
}

export interface AuthToken {
  access_token: string;
}
