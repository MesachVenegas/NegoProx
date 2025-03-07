import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

import { Role } from '@/domain/constants/role.enum';
import { plainToInstance } from 'class-transformer';
import { ROLES_KEY } from '../decorators/role.decorator';
import { ResponseUserDto } from '@/infrastructure/dto/user/user-response.dto';

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
        'Access Denied!, user no have a role with necessary permissions',
      );

    return true;
  }
}
