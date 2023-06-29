import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RequestAuthDto } from './dto/auth.request.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Payload, ResponseAuthDto } from './dto/auth.response.dto';
import { ReturnUserDto } from 'src/users/dto/return-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(requestDto: RequestAuthDto): Promise<ResponseAuthDto> {
    const user: UserEntity | undefined = await this.userService
      .getUserByEmail(requestDto.user_email)
      .catch(() => undefined);

    const passwordVerification = await compare(
      requestDto.user_password,
      user?.user_password || '',
    );
    if (!user || !passwordVerification) {
      throw new NotFoundException(`Email or Passoword invalid`);
    }
    return {
      access_token: this.jwtService.sign({ ...new Payload(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
