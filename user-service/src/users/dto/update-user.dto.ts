import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  user_name: string;

  @IsEmail()
  @IsNotEmpty()
  user_email: string;

  @IsString()
  @IsNotEmpty()
  user_username: string;

  @IsDateString()
  user_birthday: string;
}

export class UpdatePassordUserDto {
  @IsString()
  @IsNotEmpty()
  user_password: string;
}
