import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/auth.guard';
import { AuthRequest } from './models/auth';
import { IsPublic } from '../common/decorators/public.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(new LocalAuthGuard('local'))
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
