import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';

import { PrismaService } from '@/infrastructure/orm/prisma.service';
import { UserTokenVersionDto } from '@/infrastructure/dto/user/user-token.dto';

interface Payload {
  sub: string;
  email: string;
  role: string;
  tokenVersion: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          return (request.cookies['_ngx_session_'] as string) || null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('security.jwrSecret') as string,
    });
  }

  async validate(payload: Payload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: { tokenVersion: true, userProfile: true },
    });

    if (!user) throw new ForbiddenException('User session invalid');
    if (user.tokenVersion?.version !== payload.tokenVersion) {
      throw new ForbiddenException('Session expired');
    }
    if (user.isDisabled)
      throw new UnauthorizedException('User account disabled');
    if (user.isDeleted) throw new UnauthorizedException('User account deleted');

    return plainToInstance(UserTokenVersionDto, user);
  }
}
