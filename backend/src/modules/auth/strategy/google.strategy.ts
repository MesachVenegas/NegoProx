import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../auth.service';
import { Profile } from '../interfaces/profile.interface';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
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
    return this.authService.findOrCreateGoogleUser(profile);
  }
}
