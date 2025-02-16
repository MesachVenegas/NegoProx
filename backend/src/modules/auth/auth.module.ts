import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/user.repository';
import { TokenVersionModule } from '../token-version/token-version.module';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET || 'secret',
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '30m' },
      }),
    }),
    TokenVersionModule,
  ],
  providers: [AuthService, UserRepository, AuthRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
