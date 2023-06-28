import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  user_id: number;
  user_name: string;
  user_email: string;
  user_username: string;
  user_birthday: Date;

  constructor(userEntity: UserEntity) {
    this.user_id = userEntity.user_id;
    this.user_name = userEntity.user_name;
    this.user_email = userEntity.user_email;
    this.user_username = userEntity.user_username;
    this.user_birthday = userEntity.user_birthday;
  }
}
