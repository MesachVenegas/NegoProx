import { Module } from '@nestjs/common';

import { TokenVersionPrismaRepository } from '@infrastructure/repositories/token-version.repository';
import { TokenVersionService } from '../services/token-version.service';

@Module({
  controllers: [],
  providers: [TokenVersionService, TokenVersionPrismaRepository],
  exports: [TokenVersionPrismaRepository],
})
export class TokenVersionModule {}
