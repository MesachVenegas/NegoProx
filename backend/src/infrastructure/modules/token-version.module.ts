import { Module } from '@nestjs/common';

import { TokenVersionService } from '@application/token-version/token-version.service';
import { TokenVersionPrismaRepository } from '@infrastructure/repositories/token-version.repository';

@Module({
  controllers: [],
  providers: [TokenVersionService, TokenVersionPrismaRepository],
  exports: [TokenVersionPrismaRepository],
})
export class TokenVersionModule {}
