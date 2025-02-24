import { Module } from '@nestjs/common';

import { BusinessService } from '@application/business/business.service';
import { UserPrismaRepository } from '@infrastructure/repositories/user.repository';
import { BusinessController } from '@infrastructure/controllers/business.controller';
import { BusinessRepository } from '@infrastructure/repositories/business.repository';

@Module({
  providers: [BusinessService, BusinessRepository, UserPrismaRepository],
  controllers: [BusinessController],
  exports: [BusinessService, BusinessRepository],
})
export class BusinessModule {}
