import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { envs } from '@shared/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: envs.app.default_version,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle(`${envs.app.name} API`)
    .setDescription(`${envs.app.description}`)
    .setVersion(`${envs.app.default_version}`)
    .addBearerAuth()
    .addOAuth2()
    .build();
  const document = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(envs.app.port, () => {
    Logger.log(`Server running on port ${envs.app.port}`);
  });
}
bootstrap();
