import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthRequest } from 'src/auth/models/auth';
import { UserEntity } from 'src/users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    if (request) {
      return request.user;
    }
  },
);
