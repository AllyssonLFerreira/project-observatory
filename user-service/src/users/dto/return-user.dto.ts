import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  username: string;
  birthday: Date;

  constructor(userEntity: UserEntity) {
    this.id = userEntity.user_id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.username = userEntity.username;
    this.birthday = userEntity.birthday;
  }
}
