import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

import { IS_PUBLIC_KEY } from '@/shared/core/decorators/public.decorator';
import { DoubleCsrfUtilities } from 'csrf-csrf';

@Injectable()
export class CsrfGuard implements CanActivate {
  private readonly logger = new Logger(CsrfGuard.name);
  constructor(
    @Inject('CSRF_UTILITIES') private readonly csrfUtils: DoubleCsrfUtilities,
    private readonly reflector: Reflector,
  ) {}

  canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    // if route is public resolve as true
    if (isPublic) return Promise.resolve(true);

    const req = ctx.switchToHttp().getRequest<Request>();
    const res = ctx.switchToHttp().getResponse<Response>();

    return new Promise((resolve, reject) => {
      this.csrfUtils.doubleCsrfProtection(req, res, (err: any) => {
        if (err) {
          reject(new ForbiddenException(`CSRF: ${err}`));
        } else {
          resolve(true);
        }
      });
    });
  }
}
