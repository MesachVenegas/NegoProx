import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { PrismaService } from '@/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { UserTokenVersionDto } from '@/modules/user/dto/user-token.dto';

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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('security.jwrSecret') || 'secret',
    });
  }

  async validate(payload: Payload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: { tokenVersion: true, userProfile: true },
    });
    if (!user) throw new NotFoundException('User not found');
    if (!user || user.tokenVersion?.version !== payload.tokenVersion) {
      throw new UnauthorizedException('Invalid session');
    }
    if (user.isDisabled)
      throw new UnauthorizedException('User account disabled');

    return plainToInstance(UserTokenVersionDto, user);
  }
}
