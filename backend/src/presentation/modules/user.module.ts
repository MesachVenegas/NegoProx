import { Module } from '@nestjs/common';
import { UserService } from '@infrastructure/services/user/user.service';
import { UserController } from '@presentation/controllers/user/user.controller';
import { VerifyUserUseCase } from '@app/use-cases/user/verify-email.use-case';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { MailModule } from './email.module';

@Module({
  imports: [MailModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, VerifyUserUseCase, JwtService],
  exports: [UserService],
})
export class UserModule {}
