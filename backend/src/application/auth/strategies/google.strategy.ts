import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { AccountPrismaRepository } from '@/infrastructure/repositories/account.repository';
import { AuthPrismaRepository } from '@/infrastructure/repositories/auth.repository';
import { GoogleLoginUseCase } from '../use-case/login-google';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly config: ConfigService,
    private readonly authPrismaRepository: AuthPrismaRepository,
    private readonly accountPrismaRepository: AccountPrismaRepository,
  ) {
    super({
      clientID: config.get<string>('external.googleId') || '',
      clientSecret: config.get<string>('external.googleSecret') || '',
      callbackURL: config.get<string>('external.googlecallbackUrl') || '',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const LoginGoogle = new GoogleLoginUseCase(
      this.authPrismaRepository,
      this.accountPrismaRepository,
    );

    const user = await LoginGoogle.execute(profile);

    return user;
  }
}
