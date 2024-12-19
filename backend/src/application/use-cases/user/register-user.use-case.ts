import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { ConflictException, Injectable } from '@nestjs/common';

import { envs } from '@shared/config';
import { RegisterDto } from '@app/dto/auth';
import { HashPassword } from '@shared/utils';
import { UserRegisteredDTO } from '@app/dto/user/user.dto';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { EmailService } from '@infrastructure/email/services/email.service';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}
  async execute(
    dto: RegisterDto,
  ): Promise<{ message: string; user: UserRegisteredDTO }> {
    const userExists = await this.userRepository.findUserByEmail(dto.email);

    if (userExists) {
      throw new ConflictException(
        `A account whit this email (${userExists.email}) already exists`,
      );
    }

    dto.password = HashPassword(dto.password);
    const user = await this.userRepository.create(dto);

    const logoUrl = `${envs.app.logoUrl}`;
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload, {
      secret: envs.jwt.emailSecret,
      expiresIn: '20m',
    });

    const verificationUrl = `${envs.app.frontVerificationUrl}${token}`;

    await this.emailService.sendVerificationEmail(
      user,
      verificationUrl,
      logoUrl,
    );

    return {
      message: 'Verification email sent',
      user: plainToInstance(UserRegisteredDTO, user, {
        excludeExtraneousValues: true,
      }),
    };
  }
}
