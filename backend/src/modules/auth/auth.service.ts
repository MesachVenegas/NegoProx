import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { AuthRepository } from './auth.repository';
import { UserRepository } from '../user/user.repository';
import { UserProfileAccDto } from '../user/dto/user-profile-acc.dto';
import { Profile } from './interfaces/profile.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly authRepo: AuthRepository,
    private readonly jwt: JwtService,
  ) {}

  // async validateUser(
  //   email: string,
  //   password: string,
  // ): Promise<UserProfileAccDto> {
  //   return;
  // }

  async findOrCreateGoogleUser(profile: Profile): Promise<UserProfileAccDto> {
    const user = await this.authRepo.authenticateGoogleAccount(profile);
    return user;
  }

  generateJwtToken(user: UserProfileAccDto, csrfToken?: string) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.userType,
      // TODO: add call to get token version
    };

    return {
      accessToken: this.jwt.sign(payload),
      csrfToken,
    };
  }
}
