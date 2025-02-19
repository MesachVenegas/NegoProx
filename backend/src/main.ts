import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from '@shared/exceptions/http-exceptions.filter';
import { ResponseInterceptor } from '@shared/interceptors/response.interceptor';
import { PrismaKnownExceptionFilter } from '@/shared/exceptions/prisma-know-exceptions.filter';
import { PrismaUnknownExceptionFilter } from './shared/exceptions/prisma-unknown-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envs = app.get(ConfigService);

  // Security
  app.enableCors({
    origin: envs.get<string>('security.originUrl') ?? '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

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

  app.use(cookieParser());

  // APi Prefix and Versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: envs.get<string>('app.version') ?? '1',
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
      `🚀 Application is running on: http://localhost:${envs.get<string>('app.port') ?? 3000}/api/v${envs.get<string>('app.version')}`,
    );
  });
}
bootstrap().catch((e) => {
  Logger.error(e);
});
