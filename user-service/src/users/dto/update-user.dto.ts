import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsDateString()
  birthday: string;
}

export class UpdatePassordUserDto {
  @IsString()
  @IsNotEmpty()
  user_password: string;
}
