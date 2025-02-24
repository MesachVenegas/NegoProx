import { Module } from '@nestjs/common';

import { BusinessRepository } from '@infrastructure/repositories/business.repository';
import { BusinessServicesService } from '@application/business-services/business-services.service';
import { BusinessServicesController } from '@infrastructure/controllers/business-services.controller';
import { BusinessServicesRepository } from '@infrastructure/repositories/business-service.repository';

@Module({
  controllers: [BusinessServicesController],
  providers: [
    BusinessServicesService,
    BusinessServicesRepository,
    BusinessRepository,
  ],
})
export class BusinessServicesModule {}
