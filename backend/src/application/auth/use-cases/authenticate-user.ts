import { JwtService } from '@nestjs/jwt';

import { UserProfileAccDto } from '@/infrastructure/dto/user/user-profile-acc.dto';
import { TokenVersionRepository } from '@/domain/interfaces/token-version-repository';

export class AuthenticateUserUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenVersionRepository: TokenVersionRepository,
  ) {}

  async execute(user: UserProfileAccDto) {
    const version = await this.tokenVersionRepository.getVersion(user.id);
    const payload = {
      sub: user.id,
      email: user.email,
      picture: user.userProfile?.profilePicture || null,
      role: user.userType,
      tokenVersion: version,
    };

    const token = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.userProfile?.profilePicture || null,
        role: user.userType,
      },
      access_token: token,
    };
  }
}
