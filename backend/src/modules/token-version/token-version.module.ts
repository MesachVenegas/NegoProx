import { Module } from '@nestjs/common';
import { TokenVersionController } from './token-version.controller';
import { TokenVersionService } from './token-version.service';

@Module({
  controllers: [TokenVersionController],
  providers: [TokenVersionService]
})
export class TokenVersionModule {}
