import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { envs } from '@shared/config';
import { JwtPayload } from '@shared/interfaces';

@Injectable()
export class JwtBearerStrategy extends PassportStrategy(
  Strategy,
  'jwt-bearer',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envs.jwt.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  }
}
