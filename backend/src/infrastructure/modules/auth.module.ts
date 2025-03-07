import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { TokenVersionModule } from './token-version.module';
import { AuthController } from '../controllers/auth.controller';
import { UserPrismaRepository } from '../repositories/user.repository';
import { AuthPrismaRepository } from '../repositories/auth.repository';
import { JwtStrategy } from '@/infrastructure/strategies/jwt.strategy';
import { LocalStrategy } from '@/infrastructure/strategies/local.strategy';
import { GoogleStrategy } from '@/infrastructure/strategies/google.strategy';
import { AccountPrismaRepository } from '../repositories/account.repository';
import { TokenVersionPrismaRepository } from '../repositories/token-version.repository';
import { AccountModule } from './account.module';

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
    AccountModule,
  ],
  providers: [
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy,
    UserPrismaRepository,
    AuthPrismaRepository,
    AccountPrismaRepository,
    TokenVersionPrismaRepository,
  ],
  controllers: [AuthController],
  exports: [AuthPrismaRepository],
})
export class AuthModule {}
