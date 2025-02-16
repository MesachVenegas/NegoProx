import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../auth.service';
import { Profile } from '../interfaces/common.interfaces';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {
    super({
      clientID: config.get('google.GOOGLE_CLIENT_ID') || '',
      clientSecret: config.get('google.GOOGLE_CLIENT_SECRET') || '',
      callbackURL: config.get('google.GOOGLE_CALLBACK_URL') || '',
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
