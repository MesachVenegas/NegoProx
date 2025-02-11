import { NestFactory, Reflector } from '@nestjs/core';
import {
  Logger,
  ValidationPipe,
  VersioningType,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { AppModule } from './app.module';
import envs from './shared/config/main.config';

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
    defaultVersion: envs.app.version,
  });

  await app.listen(envs.app.port, () => {
    Logger.debug(`[${envs.app.name}] Environment: ${envs.app.environment}`);
    Logger.debug(
      `[${envs.app.name}] Application is running on: ${envs.app.url}/api/v${envs.app.version}`,
    );
  });
}

void bootstrap();
