import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { UserModule } from '@modules/user.module';
import { AuthModule } from '@modules/auth.module';
import { CsrfGuard } from '@/shared/guards/csrf.guard';
import { BusinessModule } from '@modules/business.module';
import { envSchema } from '@/infrastructure/config/config.schema';
import configuration from '@/infrastructure/config/configuration';
import { PrismaModule } from '@/infrastructure/orm/prisma.module';
import { SecurityModule } from '@/infrastructure/modules/security.module';
import { BusinessServicesModule } from '@modules/business-services.module';
import { HttpLoggerMiddleware } from '@/shared/middlewares/http-logger.middleware';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}.local`,
      validationSchema: envSchema,
      load: [configuration],
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    BusinessModule,
    BusinessServicesModule,
    SecurityModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: CsrfGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes({ path: '/*path', method: RequestMethod.ALL });
  }
}
