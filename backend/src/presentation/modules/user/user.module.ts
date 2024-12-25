import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from '@infrastructure/services/user/user.service';
import { MailModule } from '@infrastructure/email/services/email.module';
import { VerifyUserUseCase } from '@app/use-cases/user/verify-email.use-case';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { ResetPasswordUseCase } from '@app/use-cases/user/reset-password.use-case';

@Module({
  imports: [MailModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    VerifyUserUseCase,
    ResetPasswordUseCase,
    JwtService,
  ],
  exports: [UserService],
})
export class UserModule {}
