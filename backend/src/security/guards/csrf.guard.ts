import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { SecurityService } from '../security.service';
import { IS_PUBLIC_KEY } from '@/shared/core/decorators/public.decorator';

@Injectable()
export class CsrfGuard implements CanActivate {
  private readonly logger = new Logger(CsrfGuard.name);
  constructor(
    private readonly reflector: Reflector,
    private readonly security: SecurityService,
    private readonly config: ConfigService,
  ) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    // Development debug
    if (this.config.get<string>('app.environment') === 'development') {
      this.logger.debug(
        `CsrfGuard: ${isPublic} - handler: ${ctx.getHandler().name}`,
      );
    }

    // if route is public resolve as true
    if (isPublic) return Promise.resolve(true);

    const req = ctx.switchToHttp().getRequest<Request>();
    const res = ctx.switchToHttp().getResponse<Response>();

    return new Promise((resolve, reject) => {
      this.security.middleware(req, res, (err: any) => {
        if (err) return reject(new ForbiddenException(err));
        return resolve(true);
      });
    });
  }
}
