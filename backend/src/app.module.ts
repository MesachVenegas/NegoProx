import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from '@presentation/modules/auth.module';

import { PrismaModule } from '@presentation/modules/prisma.module';
import { UserModule } from '@presentation/modules/user.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
