import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestAuthDto } from './dto/auth.request.dto';
import { ResponseAuthDto } from './dto/auth.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() requestDto: RequestAuthDto): Promise<ResponseAuthDto> {
    return this.authService.login(requestDto);
  }
}
