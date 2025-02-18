import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/user.repository';
import { TokenVersionModule } from '../token-version/token-version.module';
import { AuthRepository } from './auth.repository';
import { LocalStrategy } from './strategy/local.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';

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
