import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import compression from 'compression';
// import { doubleCsrf } from 'csrf-csrf';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from '@shared/exceptions/http-exceptions.filter';
import { ResponseInterceptor } from '@shared/interceptors/response.interceptor';
import { PrismaKnownExceptionFilter } from '@/shared/exceptions/prisma-know-exceptions.filter';
import { PrismaUnknownExceptionFilter } from './shared/exceptions/prisma-unknown-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: process.env.APP_ORIGIN ?? '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // Global Filters
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PrismaKnownExceptionFilter(),
    new PrismaUnknownExceptionFilter(),
  );
  // Global Interceptors
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ResponseInterceptor(),
  );
  // Enable Compression Response
  app.use(
    compression({
      level: 6,
      threshold: 1024,
      filter: shouldCompress,
    }),
  );

  // CSRF Protection
  // const csrfOptions = {
  //   getSecret: () => process.env.CSRF_SECRET || '',
  //   cookieName: 'ngx.tk',
  //   cookieOptions: {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //   },
  //   size: 64,
  //   ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
  // };
  // const { doubleCsrfProtection } = doubleCsrf(csrfOptions);
  // app.use(doubleCsrfProtection);
  app.use(cookieParser());

  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: { target: false, value: false },
    }),
  );

  // APi Prefix and Versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: process.env.APP_VERSION ?? '1',
  });

  // Compression filter
  function shouldCompress(req: Request, res: Response) {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle(process.env.APP_NAME ?? 'NegoProx API')
    .setDescription(
      process.env.APP_DESCRIPTION ?? 'The NegoProx API description',
    )
    .setVersion(process.env.APP_VERSION ?? '1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`api/v${process.env.APP_VERSION}`, app, document);

  await app.listen(process.env.APP_PORT ?? 3000, () => {
    Logger.log(
      `🚀 Application is running on: http://localhost:${process.env.APP_PORT ?? 8000}/api/v${process.env.APP_VERSION}`,
    );
  });
}
bootstrap().catch((e) => {
  Logger.error(e);
});
