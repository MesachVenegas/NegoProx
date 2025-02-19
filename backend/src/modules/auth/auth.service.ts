import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthRepository } from './auth.repository';
import { Profile } from '../../shared/interfaces/profile.interface';
import { UserRepository } from '../user/user.repository';
// import { SecurityService } from '@/security/security.service';
import { comparePassword, hashPassword } from '@/shared/utils/hash.util';
import { TokenVersionService } from '../token-version/token-version.service';
import { UserProfileAccDto } from '../user/dto/user-profile-acc.dto';
import { RegisterLocalUserDto } from '../user/dto/register-local-user.dto';
import { User } from '../user/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userRepo: UserRepository,
    private readonly authRepo: AuthRepository,
    // private readonly security: SecurityService,
    private readonly tokenVersion: TokenVersionService,
  ) {}

  async registerLocalUser(dto: RegisterLocalUserDto) {
    dto.password = await hashPassword(dto.password);
    const user = plainToInstance(User, dto);
    const userCreated = await this.userRepo.createLocalUser(user);
    return plainToInstance(UserProfileAccDto, userCreated);
  }

  async validateLocalUser(
    email: string,
    password: string,
  ): Promise<UserProfileAccDto> {
    const user = await this.authRepo.findLocalUser(email);
    if (user && user.accounts[0].provider !== 'local')
      throw new ConflictException('User signed with external provider');
    if (!user || !user.password) throw new NotFoundException('user not found');
    const valid = await comparePassword(password, user.password);
    if (!valid) throw new UnauthorizedException('invalid credentials');
    if (user.isDisabled) throw new UnauthorizedException('user disabled');
    return plainToInstance(UserProfileAccDto, user);
  }

  async findOrCreateGoogleUser(profile: Profile): Promise<UserProfileAccDto> {
    return this.authRepo.authenticateGoogleAccount(profile);
  }

  async authResponse(user: UserProfileAccDto) {
    // const csrfToken = this.security.generateToken(req, res);
    const payload = await this.generatePayload(user);
    const jwToken = this.jwt.sign(payload);

    // cookie setter
    // res.cookie('__auth', jwToken, {
    //   httpOnly: true,
    //   secure: this.config.get<string>('app.environment') === 'production',
    //   sameSite: 'strict',
    //   maxAge: 3600000,
    // });

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
