import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { BusinessRepository } from './business.repository';

@Module({
  providers: [BusinessService, BusinessRepository],
  controllers: [BusinessController],
  exports: [BusinessService],
})
export class BusinessModule {}
