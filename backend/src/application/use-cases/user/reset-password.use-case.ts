import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

import { envs } from '@shared/config';
import { HashPassword } from '@shared/utils';
import { UserRepository } from '@infrastructure/repositories';

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(token: string, password: string) {
    let decoded: any;
    try {
      decoded = await this.jwtService.verify(token, {
        secret: envs.jwt.emailSecret,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ConflictException('Token expired');
      }
      throw new BadRequestException('Invalid token');
    }

    const existUser = await this.userRepository.findUserById(decoded.sub);
    if (!existUser) {
      throw new ConflictException('User not found or not exists');
    }
    const hashedPassword = HashPassword(password);
    await this.userRepository.resetPassword(decoded.sub, hashedPassword);
  }
}
