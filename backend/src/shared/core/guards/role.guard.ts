import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Role } from '@/shared/constants/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from '@/modules/user/dto/user-response.dto';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(cxt: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      cxt.getHandler(),
      cxt.getClass(),
    ]);

    if (!requiredRoles) return true;

    const req = cxt.switchToHttp().getRequest<Request>();
    if (!req.user)
      throw new ForbiddenException('Access Denied, unauthenticated user');

    const user = plainToInstance(ResponseUserDto, req.user);

    const isAuthorized = requiredRoles.some((role) =>
      user.userType.includes(role),
    );

    if (!isAuthorized)
      throw new ForbiddenException(
        'Access Denied, user level no have necessary permissions',
      );

    return true;
  }
}
