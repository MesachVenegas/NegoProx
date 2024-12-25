import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

import { envs } from '@shared/config';
import { UserRepository } from '@infrastructure/repositories/user.repository';

@Injectable()
export class VerifyUserUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(token: string) {
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
    if (!existUser) throw new NotFoundException('User not found or not exists');
    if (existUser.email_confirmed) {
      throw new ConflictException('Email already confirmed');
    }
    await this.userRepository.markEmailAsConfirmed(decoded.sub);
  }
}
