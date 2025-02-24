import { Module } from '@nestjs/common';

import { UserService } from '@application/user/use-cases/user.service';
import { BusinessService } from '@application/business/business.service';
import { UserRepository } from '@infrastructure/repositories/user.repository';
import { BusinessController } from '@infrastructure/controllers/business.controller';
import { BusinessRepository } from '@infrastructure/repositories/business.repository';

@Module({
  providers: [BusinessService, BusinessRepository, UserService, UserRepository],
  controllers: [BusinessController],
  exports: [BusinessService, BusinessRepository],
})
export class BusinessModule {}
