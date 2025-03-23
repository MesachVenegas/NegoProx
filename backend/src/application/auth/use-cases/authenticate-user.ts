import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserProfileAccDto } from '@/infrastructure/dto/user/user-profile-acc.dto';
import { TokenVersionRepository } from '@/domain/interfaces/token-version-repository';
import { UserSigned } from '@/infrastructure/dto/auth/auth-response.dto';

export class AuthenticateUserUseCase {
  config = new ConfigService();
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenVersionRepository: TokenVersionRepository,
  ) {}

  async execute(user: UserProfileAccDto, res: Response): Promise<UserSigned> {
    const version = await this.tokenVersionRepository.getVersion(user.id);
    const payload = {
      sub: user.id,
      slug: user.userProfile?.slug,
      name: `${user.name} ${user.lastName}`,
      email: user.email,
      avatar: user.userProfile?.profilePicture || null,
      role: user.userType,
      tokenVersion: version,
    };

    const token = this.jwtService.sign(payload);

    res.cookie('_ngx_access_token', token, {
      httpOnly: true,
      secure: this.config.get<string>('app.environment') === 'production',
      sameSite: 'lax',
    });

    return this.jwtService.decode<UserSigned>(token);
  }
}
