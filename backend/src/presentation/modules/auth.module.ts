import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { envs } from '@shared/config';
import { LoginUserUseCase } from '@app/use-cases/login-user.use-case';
import { AuthService } from '@infrastructure/services/auth/auth.service';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { AuthController } from '@presentation/controllers/auth/auth.controller';
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
  providers: [AuthService, UserRepository, LoginUserUseCase, JwtBearerStrategy],
  exports: [AuthService],
})
export class AuthModule {}
