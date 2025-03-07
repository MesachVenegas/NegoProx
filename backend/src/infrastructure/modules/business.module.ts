import { Module } from '@nestjs/common';

import { UserPrismaRepository } from '@infrastructure/repositories/user.repository';
import { BusinessController } from '@infrastructure/controllers/business.controller';
import { BusinessPrismaRepository } from '@infrastructure/repositories/business.repository';

@Module({
  providers: [BusinessPrismaRepository, UserPrismaRepository],
  controllers: [BusinessController],
  exports: [BusinessPrismaRepository],
})
export class BusinessModule {}
