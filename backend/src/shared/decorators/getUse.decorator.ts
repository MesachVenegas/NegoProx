import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { JwtPayload } from '@app/interfaces/auth/jwt-payload.interface';

export const GetUser = createParamDecorator(
  (data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
    const req: Express.Request = ctx.switchToHttp().getRequest();
    const userData = req.user as JwtPayload;

    if (data && data in userData) {
      return userData[data];
    }

    return {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    };
  },
);
