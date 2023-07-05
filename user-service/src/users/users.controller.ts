import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UserEntity } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { IsPublic } from 'src/common/decorators/public.decorator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @IsPublic()
  @UsePipes(ValidationPipe)
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /* @Get('user')
  async findAll(): Promise<ReturnUserDto[]> {
    return (await this.usersService.getAllUsers()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  } */

  /* @Get('user')
  async findOne(@Param('id') id: number): Promise<ReturnUserDto> {
    const user = await this.usersService.getUserByID(id);
    return new ReturnUserDto(user);
  } */

  @Get('user')
  findUser(@CurrentUser() user: ReturnUserDto) {
    return user;
  }

  @UsePipes(ValidationPipe)
  @Patch('user/update/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @UsePipes(ValidationPipe)
  @Delete('user/:id')
  async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.usersService.deleteUser(id);
  }
}
