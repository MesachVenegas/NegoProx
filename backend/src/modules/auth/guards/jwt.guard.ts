import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  handleRequest(
    err: unknown,
    user: any,
    info: Error | null,
    ctx: ExecutionContext,
  ) {
    if (info instanceof TokenExpiredError)
      throw new UnauthorizedException('token expired, please login again');

    if (info?.message === 'No auth token')
      throw new UnauthorizedException('token was not provided');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return super.handleRequest(err, user, info, ctx);
  }
}
