import { Module } from '@nestjs/common';

import { AuthController } from '@presentation/controllers/auth/auth.controller';
import { AuthService } from '@infrastructure/services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '@shared/config';
import { UserModule } from './user.module';
import { JwtBearerStrategy } from '@infrastructure/services/auth/strategy/jwt-bearer.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envs.jwt.secret,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtBearerStrategy],
  exports: [AuthService],
})
export class AuthModule {}
