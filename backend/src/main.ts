import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';

import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from '@shared/exceptions/http-exceptions.filter';
import { ResponseInterceptor } from '@shared/interceptors/response.interceptor';
import { PrismaExceptionFilter } from '@shared/exceptions/prisma-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors('*');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: { target: false, value: false },
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: process.env.APP_VERSION,
  });

  await app.listen(process.env.PORT ?? 8000, () => {
    Logger.log(
      `🚀 Application is running on: http://localhost:${process.env.APP_PORT ?? 8000}/api/v${process.env.APP_VERSION}`,
    );
  });
}
bootstrap().catch((e) => {
  Logger.error(e);
});
