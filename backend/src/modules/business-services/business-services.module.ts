import { Module } from '@nestjs/common';
import { BusinessServicesService } from './business-services.service';
import { BusinessServicesController } from './business-services.controller';
import { BusinessServicesRepository } from './business-service.repository';
import { BusinessRepository } from '../business/business.repository';

@Module({
  controllers: [BusinessServicesController],
  providers: [
    BusinessServicesService,
    BusinessServicesRepository,
    BusinessRepository,
  ],
})
export class BusinessServicesModule {}
