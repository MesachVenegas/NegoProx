import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';

import { envs } from '@shared/config';
import { UserRepository } from '@infrastructure/repositories';
import { EmailService } from '@infrastructure/email/services/email.service';

@Injectable()
export class RequestResetPasswordUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(email: string) {
    const userExists = await this.userRepository.findUserByEmail(email);
    if (!userExists) {
      throw new NotFoundException('User not found or not exists');
    }

    const logoUrl = `${envs.app.logoUrl}`;
    const payload = { sub: userExists.id };
    const token = this.jwtService.sign(payload, {
      secret: envs.jwt.emailSecret,
      expiresIn: '10m',
    });

    const resetTokenUrl = `${envs.app.frontVerificationUrl}${token}`;

    await this.emailService.sendEmailWithTokenVerification(
      userExists,
      resetTokenUrl,
      logoUrl,
      'Restablecer contraseña',
      'reset-password',
    );

    return { message: 'Password reset email sent' };
  }
}
