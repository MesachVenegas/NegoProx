import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { TokenVersionModule } from './token-version.module';
import { AuthController } from '../controllers/auth.controller';
import { AuthRepository } from '../repositories/auth.repository';
import { UserRepository } from '../repositories/user.repository';
import { AuthService } from '@application/auth/use-case/auth.service';
import { JwtStrategy } from '@application/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@application/auth/strategies/local.strategy';
import { GoogleStrategy } from '@application/auth/strategies/google.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('security.jwrSecret') || 'secret',
        signOptions: {
          expiresIn: config.get<string>('security.jwtExpiresIn') || '1h',
        },
      }),
      inject: [ConfigService],
    }),
    TokenVersionModule,
  ],
  providers: [
    AuthService,
    UserRepository,
    AuthRepository,
    LocalStrategy,
    GoogleStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
