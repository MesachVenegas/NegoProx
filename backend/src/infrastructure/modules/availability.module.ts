import { Module } from '@nestjs/common';
import { AvailabilityController } from '../controllers/availability.controller';
import { AvailabilityPrismaRepository } from '../repositories/availability.repository';
import { BusinessPrismaRepository } from '../repositories/business.repository';
import { UtilsService } from '../services/utils.service';

@Module({
  controllers: [AvailabilityController],
  providers: [
    AvailabilityPrismaRepository,
    BusinessPrismaRepository,
    UtilsService,
  ],
  exports: [AvailabilityPrismaRepository],
})
export class AvailabilityModule {}
