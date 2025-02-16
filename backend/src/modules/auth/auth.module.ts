import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/user.repository';
import { TokenVersionModule } from '../token-version/token-version.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (conf: ConfigService) => ({
        secret: conf.get('jwt.JWT_SECRET'),
        signOptions: { expiresIn: conf.get('jwt.JWT_EXPIRES_IN') },
      }),
    }),
    TokenVersionModule,
  ],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
