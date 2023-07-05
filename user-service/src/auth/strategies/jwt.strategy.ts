import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserPayload } from '../models/auth';
import { ReturnUserDto } from 'src/users/dto/return-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: UserPayload): Promise<ReturnUserDto> {
    const userReceived = await {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      username: payload.username,
      birthday: payload.birthday,
    };
    return userReceived;
  }
}
