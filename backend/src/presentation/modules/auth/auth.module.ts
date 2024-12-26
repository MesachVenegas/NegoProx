import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {
  LoginUserUseCase,
  RegisterUserUseCase,
  RequestResetPasswordUseCase,
} from '@app/use-cases/user';
import { envs } from '@shared/config';
import { AuthController } from './auth.controller';
import { AuthService } from '@infrastructure/services/auth/auth.service';
import { EmailService } from '@infrastructure/email/services/email.service';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { JwtBearerStrategy } from '@infrastructure/services/auth/strategy/jwt-bearer.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envs.jwt.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    EmailService,
    UserRepository,
    LoginUserUseCase,
    JwtBearerStrategy,
    RegisterUserUseCase,
    RequestResetPasswordUseCase,
  ],
  exports: [AuthService],
})
export class AuthModule {}
