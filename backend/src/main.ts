import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from '@/shared/filters/http-exceptions.filter';
import { ResponseInterceptor } from '@shared/interceptors/response.interceptor';
import { PrismaKnownExceptionFilter } from '@/shared/filters/prisma-know-exceptions.filter';
import { PrismaUnknownExceptionFilter } from './shared/filters/prisma-unknown-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envs = app.get(ConfigService);
  const urlOrigin = envs.get<string>('security.originUrl');
  const isProduction = envs.get<string>('app.environment') === 'production';

  // Security
  app.use(cookieParser());
  app.enableCors({
    origin: [urlOrigin ?? '*', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'blob:', 'https:', 'http:'],
          connectSrc: [
            "'self'",
            'https://accounts.google.com',
            'https://*.googleapis.com',
            'http://localhost:3000',
            urlOrigin ?? '*',
            // payment provider url
          ],
          objectSrc: ["'none'"],
          baseUri: ["'none'"],
          formAction: ["'self'"],
          upgradeInsecureRequests: isProduction ? [] : null,
        },
      },
      xContentTypeOptions: true,
      xFrameOptions: { action: 'deny' },
      strictTransportSecurity: isProduction
        ? {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
          }
        : false,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    }),
  );

  // Global Filters
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PrismaKnownExceptionFilter(),
    new PrismaUnknownExceptionFilter(),
  );

  // Global Interceptors amd Serializers
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ResponseInterceptor(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
      validationError: { target: false, value: false },
    }),
  );

  // Enable Compression Response
  app.use(
    compression({
      level: 6,
      threshold: 1024,
      filter: shouldCompress,
    }),
  );
  // Compression filter
  function shouldCompress(req: Request, res: Response) {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }

  // APi Prefix and Versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: envs.get<string>('app.version') ?? '1',
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle(envs.get<string>('app.name') ?? 'NegoProx API')
    .setDescription(
      envs.get<string>('app.description') ?? 'The NegoProx API description',
    )
    .setVersion(envs.get<string>('app.version') ?? '1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(
    `api/v${envs.get<string>('app.version')}/docs`,
    app,
    document,
  );

  await app.listen(envs.get<string>('app.port') || 3000, () => {
    Logger.log(
      `🚀 Application is running on: http://localhost:${envs.get<string>('app.port') ?? 3000}`,
    );
    Logger.log(
      `📄 Read Documentation: http://localhost:${envs.get<string>('app.port') ?? 3000}/api/v${envs.get<string>('app.version')}/docs`,
    );
  });
}
bootstrap().catch((e) => {
  Logger.error(e);
});
