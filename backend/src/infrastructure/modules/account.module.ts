import { Module } from '@nestjs/common';
import { AccountPrismaRepository } from '../repositories/account.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [AccountPrismaRepository],
  exports: [AccountPrismaRepository],
})
export class AccountModule {}
