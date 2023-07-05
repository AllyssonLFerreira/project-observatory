import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = await this.userRepository.save({
      ...createUserDto,
      user_password: await bcrypt.hash(createUserDto.password, 10),
    });
    delete newUser.password;
    return newUser;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserByID(id: number) {
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

  async getUserByEmail(email: string) {
    const userIsTrue = await this.userRepository.findOne({
      where: { email: email },
    });
    return userIsTrue;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.getUserByID(id);
    return this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async deleteUser(id: number) {
    await this.getUserByID(id);
    return this.userRepository.delete({ user_id: id });
  }
}
