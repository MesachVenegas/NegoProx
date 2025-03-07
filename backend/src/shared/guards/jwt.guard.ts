import { IS_PUBLIC_KEY } from '@/shared/decorators/public.decorator';
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(ctx);
  }
  handleRequest(
    err: unknown,
    user: any,
    info: Error | null,
    ctx: ExecutionContext,
  ) {
    if (info instanceof TokenExpiredError)
      throw new UnauthorizedException('Session expired, please login again');

    if (info?.message === 'No auth token')
      throw new UnauthorizedException('Token was not provided');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return super.handleRequest(err, user, info, ctx);
  }
}
