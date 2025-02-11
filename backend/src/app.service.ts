import { Injectable } from '@nestjs/common';
import envs from '@shared/config/main.config';

@Injectable()
export class AppService {
  welcomeApi(): object {
    return {
      name: envs.app.name,
      description: envs.app.description,
      version: envs.app.version,
      environment: envs.app.environment,
    };
  }
}
