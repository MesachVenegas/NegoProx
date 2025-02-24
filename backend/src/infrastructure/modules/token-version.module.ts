import { Module } from '@nestjs/common';

import { TokenVersionService } from '@application/token-version/token-version.service';
import { TokenVersionRepository } from '@infrastructure/repositories/token-version.repository';

@Module({
  controllers: [],
  providers: [TokenVersionService, TokenVersionRepository],
  exports: [TokenVersionService],
})
export class TokenVersionModule {}
