import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createHashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return hash(password, saltOrRounds);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const passwordHashed = await this.createHashPassword(
      createUserDto.user_password,
    );

    return this.userRepository.save({
      ...createUserDto,
      user_password: passwordHashed,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserByID(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        user_id: id,
      },
    });

    if (!user) {
      throw new NotFoundException(`user id: ${id} not found`);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        user_email: email,
      },
    });

    if (!email) {
      throw new NotFoundException(`email ${email} does not exist`);
    }
    return user;
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.getUserByID(id);

    return this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    await this.getUserByID(id);
    return this.userRepository.delete({ user_id: id });
  }
}
