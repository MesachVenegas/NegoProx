import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { envSchema } from './config/config.schema';
import configuration from './config/configuration';
import { PrismaModule } from '@prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CsrfGuard } from './security/guards/csrf.guard';
import { SecurityModule } from './security/security.module';
import { BusinessModule } from './modules/business/business.module';
import { HttpLoggerMiddleware } from '@shared/middlewares/http-logger.middleware';
import { BusinessServicesModule } from './modules/business-services/business-services.module';

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
