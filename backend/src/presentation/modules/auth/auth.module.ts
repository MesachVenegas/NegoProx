import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import {
  GoogleAuthUseCase,
  LoginUserUseCase,
  RegisterUserUseCase,
  RequestResetPasswordUseCase,
} from '@app/use-cases/user';
import { envs } from '@shared/config';
import {
  JwtBearerStrategy,
  GoogleStrategy,
} from '@infrastructure/services/auth/strategy';
import { AuthController } from './auth.controller';
import { AuthService } from '@infrastructure/services/auth/auth.service';
import { EmailService } from '@infrastructure/email/services/email.service';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { AccountRepository } from '@infrastructure/repositories';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
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
    GoogleStrategy,
    LoginUserUseCase,
    AccountRepository,
    JwtBearerStrategy,
    GoogleAuthUseCase,
    RegisterUserUseCase,
    RequestResetPasswordUseCase,
  ],
  exports: [AuthService],
})
export class AuthModule {}
