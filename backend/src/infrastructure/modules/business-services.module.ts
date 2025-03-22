import { Module } from '@nestjs/common';

import { BusinessPrismaRepository } from '@infrastructure/repositories/business.repository';
import { BusinessServicesController } from '@infrastructure/controllers/business-services.controller';
import { BusinessServicesPrismaRepository } from '@infrastructure/repositories/business-service.repository';
import { UtilsService } from '../services/utils.service';

@Module({
  controllers: [BusinessServicesController],
  providers: [
    BusinessServicesPrismaRepository,
    BusinessPrismaRepository,
    UtilsService,
  ],
})
export class BusinessServicesModule {}
