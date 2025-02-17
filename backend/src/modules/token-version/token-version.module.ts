import { Module } from '@nestjs/common';

import { TokenVersionService } from './token-version.service';
import { TokenVersionRepository } from './token-version.repository';

@Module({
  controllers: [],
  providers: [TokenVersionService, TokenVersionRepository],
  exports: [TokenVersionService],
})
export class TokenVersionModule {}
