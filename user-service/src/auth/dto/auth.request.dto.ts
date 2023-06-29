import { IsString } from 'class-validator';

export class RequestAuthDto {
  @IsString()
  user_email: string;

  @IsString()
  user_password: string;
}
