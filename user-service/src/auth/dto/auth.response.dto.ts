import { ReturnUserDto } from 'src/users/dto/return-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

export interface ResponseAuthDto {
  user: ReturnUserDto;
  access_token: string;
}

export class Payload {
  id: number;
  email: string;

  constructor(user: UserEntity) {
    this.id = user.user_id;
    this.email = user.user_email;
  }
}
