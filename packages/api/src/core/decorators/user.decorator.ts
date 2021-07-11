import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserAttributes } from 'src/modules/users/models/user.model';

export const AuthorizedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export interface AuthorizedUserData extends UserAttributes {}
