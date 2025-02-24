import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Profile } from 'passport-google-oauth20';
import { plainToInstance } from 'class-transformer';

import { SecurityService } from '@/application/security/security.service';
import { comparePassword, hashPassword } from '@/shared/utils/hash.util';
import { UserRepository } from '@/infrastructure/repositories/user.repository';
import { AuthRepository } from '@/infrastructure/repositories/auth.repository';
import { UserProfileAccDto } from '@/infrastructure/dto/user/user-profile-acc.dto';
import { TokenVersionService } from '@/application/token-version/token-version.service';
import { RegisterLocalUserDto } from '@/infrastructure/dto/user/register-local-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userRepo: UserRepository,
    private readonly authRepo: AuthRepository,
    private readonly security: SecurityService,
    private readonly tokenVersion: TokenVersionService,
  ) {}

  async registerLocalUser(dto: RegisterLocalUserDto) {
    dto.password = await hashPassword(dto.password);
    const userCreated = await this.userRepo.createLocalUser(dto);
    return plainToInstance(UserProfileAccDto, userCreated);
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.authRepo.findLocalUser(email);
    if (user && user.accounts[0].provider !== 'local')
      throw new ConflictException('User signed with external provider');
    if (!user || !user.password) throw new NotFoundException('user not found');
    const valid = await comparePassword(password, user.password);
    if (!valid) throw new UnauthorizedException('invalid credentials');
    if (user.isDisabled) throw new UnauthorizedException('user disabled');
    return user;
  }

  async findOrCreateGoogleUser(profile: Profile) {
    return this.authRepo.authenticateGoogleAccount(profile);
  }

  async authResponse(user: UserProfileAccDto, req: Request, res: Response) {
    const payload = await this.generatePayload(user);
    const jwToken = this.jwt.sign(payload);

    this.security.generateCsrfToken(req, res);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.userProfile?.profilePicture || null,
        role: user.userType,
      },
      access_token: jwToken,
    };
  }

  async logout(user: UserProfileAccDto) {
    const result = await this.tokenVersion.invalidateTokenVersion(user.id);
    if (!result) throw new NotFoundException('User not found');
    return result;
  }

  private async generatePayload(user: UserProfileAccDto) {
    const tokenVersion = await this.tokenVersion.getTokenVersion(user.id);
    return {
      sub: user.id,
      email: user.email,
      picture: user.userProfile?.profilePicture || null,
      role: user.userType,
      tokenVersion: tokenVersion,
    };
  }
}
