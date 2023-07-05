import { IsNotEmpty, IsString } from 'class-validator';

export class RequestLogin {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
